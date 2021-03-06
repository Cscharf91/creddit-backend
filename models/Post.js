import mongoose, { Schema } from 'mongoose';

const PostSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  zone: {
    type: Schema.Types.ObjectId, ref: 'Zone',
    required: true,
  },
  title: {
    type: String,
    required: true,
    min: 5
  },
  image: {
    type: String
  },
  cloudinary_id: {
    type: String
  },
  body: {
    type: String
  },
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  date: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model("Post", PostSchema);
export default Post;