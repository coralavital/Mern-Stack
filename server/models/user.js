import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: false },
  fullName: { type: String, required: false },
  phone: { type: String, required: false },
  age: { type: Number, required: false },
});

export default mongoose.model('User', userSchema);
