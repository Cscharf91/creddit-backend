import mongoose, { Schema } from 'mongoose';

const CommentSchema = new mongoose.Schema({
  username: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  parent: {
    type: Schema.Types.ObjectId, ref: 'User',
    default: null,
  },
  children: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  body: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;