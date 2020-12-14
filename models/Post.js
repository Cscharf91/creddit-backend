import mongoose, { Schema } from 'mongoose';

const PostSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    min: 5
  },
  body: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model("Post", PostSchema);
export default Post;