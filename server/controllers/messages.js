import Message from '../models/message.js';


const newMessage = async (req, res) => {
    const newMessage = new Message(req.body);

    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).send({ err });
    }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId
    });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ err });
  }
};

export {
    newMessage,
    getMessages
};
