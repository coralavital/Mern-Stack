import { Server } from 'socket.io';

const initSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000', // Allow requests only from this origin (your front end)
    },
  });
  // Start Socket.io on port 4000
  io.listen(4000);

  let users = [];
  let conversations = [];

  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const addConversation = (members) => {
    !conversations.some((connection) => connection.members === members) &&
      conversations.push({ members });
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const removeConversation = (conversationId) => {
    conversations = conversations.filter((conversation) => conversation.id !== conversationId);
  };

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  io.on('connection', (socket) => {
    // When new user is connected
    console.log('A user connected');

    // Take userId and socketId from user
    socket.on('addUser', (userId) => {
      addUser(userId, socket.id);
      io.emit('getUsers', users);
    });

    // Send and receive messages
    socket.on('sendMessage', ({senderId, receivers, text}) => {
      receivers.map((receiver) => {
        const user = getUser(receiver);
        io.to(user?.socketId).emit('getMessage', {senderId, text});
      })
    });

    socket.on('newConversation', ({members}) => {
      addConversation(members);
      io.emit('newConversation', conversations);
    });

    // Listen for delete conversation event
    socket.on('deleteConversation', ({ conversationId }) => {
      removeConversation(conversationId);
      io.emit('conversationDeleted', conversations);
    });


    // When user is disconnected
    socket.on('disconnect', () => {
      console.log('A user disconnected');
      removeUser(socket.id);
      io.emit('getUsers', users);
    });
  });

  return io;
};
export default initSocketServer;
