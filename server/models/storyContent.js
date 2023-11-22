import mongoose from 'mongoose';

const storySchema = mongoose.Schema({
  caption: { type: String, required: true },
  username: { type: String, required: true },
  userId: { type: String, required: true },
  images: { type: [String], default: [] },
  tags: { type: String, default: '' },
  likes: { type: [String], default: [] },
  postDate: { type: Date, default: new Date() },
});

export default mongoose.model('Story', storySchema);
