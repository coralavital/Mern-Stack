import Conversation from '../models/conversation.js';
import mongoose from 'mongoose';

const newConverstation = async (req, res) => {
  const conversation = await Conversation.findOne({
    members: req.body.members,
  });

  if (conversation?.members.length > 0) {
    res.status(200).json(conversation);
  } else {
    const newConverstation = new Conversation({
      members: req.body.members,
    });
    try {
      const savedConversation = await newConverstation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(404).send({ err });
    }
  }
};

const deleteConversation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('This id doesnt belong to any story');
  }

  await Conversation.findByIdAndDelete(id);

  res.json({ message: 'Conversation deleted successfully' });
};


const getUserConverstations = async (req, res) => {
  const { id } = req.params;
  // if (!req.userId) return res.json({ message: 'Unauthenticated User' });
  try {
    const conversations = await Conversation.find({
      members: { $in: [id] },
    });
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json({ err });
  }
};

export { newConverstation, getUserConverstations, deleteConversation };
