import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import User from '../models/user.js';
import Story from '../models/storyContent.js';

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    const isPasswordValid = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({ msg: 'Invalid password' });
    }

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, '1234', {
      expiresIn: '3h',
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

const signup = async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    username,
    fullName,
    age,
    address,
    phone,
  } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    const encryptedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: encryptedPassword,
      username,
      fullName,
      age,
      address,
      phone,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, '1234', {
      expiresIn: '3h',
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateAccount = async (req, res) => {
  const { id: _id } = req.params;

  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('This id doesnt belong to any user');
  }

  const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });

  res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('This id doesn\'t belong to any user');
  }

  try {
    // Find all stories associated with the user being deleted
    const userStories = await Story.find({ userId: id });

    // Remove user's comments from all stories
    const updateCommentOperations = userStories.map(story =>
      Story.updateOne(
        { _id: story._id },
        { $pull: { comments: { author: id } } }
      )
    );

    // Execute the update operations for comments removal
    await Promise.all(updateCommentOperations);

    // Remove user's ID from the likes array in all stories
    const updateLikesOperations = userStories.map(story =>
      Story.updateOne(
        { _id: story._id },
        { $pull: { likes: id } }
      )
    );

    // Execute the update operations for likes removal
    await Promise.all(updateLikesOperations);

    // Delete stories
    await Story.deleteMany({ userId: id });

    // Delete the user
    await User.findByIdAndDelete(id);

    res.json({ message: 'User, associated stories, comments, and user likes removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user and associated data' });
  }
};

const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the current password provided matches the one stored in the database
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Check if the new password and confirmed password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New passwords do not match' });
    }

    // Encrypt the new password
    const encryptedPassword = await bcrypt.hash(newPassword, 12);

    // Update the user's password
    user.password = encryptedPassword;
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export { login, signup, getUsers, updateAccount, deleteUser, updatePassword };
