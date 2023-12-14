import mongoose from 'mongoose';
import Story from '../models/storyContent.js';

const getStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createStory = async (req, res) => {
  const body = req.body;

  const newStory = new Story({
    ...body,
    userId: req.userId,
    postDate: new Date().toISOString(),
  });

  try {
    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateStory = async (req, res) => {
  const { id: _id } = req.params;

  const story = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('This id doesnt belong to any story');
  }

  const updatedStory = await Story.findByIdAndUpdate(_id, story, { new: true });

  res.json(updatedStory);
};

const deleteStory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('This id doesnt belong to any story');
  }

  await Story.findByIdAndDelete(id);

  res.json({ message: 'Story deleted successfully' });
};

const likeStory = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: 'Unauthenticated User' });

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('This id doesnt belong to any story');
  }

  const story = await Story.findById(id);

  const index = story.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    // if user has not liked the story
    story.likes.push(req.userId);
  } else {
    story.likes = story.likes.filter((id) => id !== String(req.userId));
  }

  const updatedStory = await Story.findByIdAndUpdate(id, story, { new: true });

  res.json(updatedStory);
};

const addComment = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: 'Unauthenticated User' });

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('This id doesnt belong to any story');
  }

  const story = await Story.findById(id);

  const comment = req.body;
  story.comments.push(comment);

  story.comments.sort((a, b) => b.postDate - a.postDate);

  const updatedStory = await Story.findByIdAndUpdate(id, story, { new: true });

  res.json(updatedStory);
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ message: 'Unauthenticated User' });

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('This id doesnt belong to any story');
  }

  const story = await Story.findById(id);
  const comment = req.body;

  if (!mongoose.Types.ObjectId.isValid(comment.commentId)) {
    return res.status(404).send('This id doesnt belong to any story');
  }

  story.comments = story.comments.filter(
    (item) => String(item._id) !== comment.commentId
  );

  story.comments.sort((a, b) => b.postDate - a.postDate);

  const updatedStory = await Story.findByIdAndUpdate(id, story, { new: true });
  res.json(updatedStory);
};

const likeComment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('This id doesnt belong to any story');
  }

  const { commentId, userId } = req.body;

  try {
    // Find the story by ID
    const story = await Story.findById(id);

    // Find the comment within the story by ID
    const comment = story.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    const index = comment.likes.findIndex((id) => id === userId);

    if (index === -1) {
      // if user has not liked the story
      comment.likes.push(userId);
    } else {
      comment.likes = comment.likes.filter((id) => id !== userId);
    }

    // Save the updated story
    const updatedStory = await story.save();
    res.json(updatedStory);
    
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

export {
  getStories,
  createStory,
  updateStory,
  deleteStory,
  likeStory,
  addComment,
  deleteComment,
  likeComment,
};
