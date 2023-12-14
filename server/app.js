import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

import storyRoutes from './routes/stories.js';
import userRoutes from './routes/user.js';
import converstationRoutes from './routes/conversations.js';
import messagesRoutes from './routes/messages.js';
import initSocketServer from './socket/index.js';

const app = express();
const PORT = process.env.PORT || 5001;

dotenv.config();
app.use(bodyParser.json({ limit: '32mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '32mb', extended: true }));
app.use(cors({ origin: '*' }));

app.use('/stories', storyRoutes);
app.use('/user', userRoutes);
app.use('/conversation', converstationRoutes);
app.use('/messages', messagesRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Instaverse API');
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Connection to MongoDB failed', err.message);
  }
};

// Start the MongoDB connection
connectDB();

const server = http.createServer(app);
const io = initSocketServer(server);

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});


