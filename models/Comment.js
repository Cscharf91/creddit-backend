import mongoose, { Schema } from 'mongoose';

const CommentSchema = new mongoose.Schema({
  username: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  post: {
    type: Schema.Types.ObjectId, ref: 'Post'
  },
  parent: {
    type: Schema.Types.ObjectId, ref: 'Comment',
    default: null
  },
  children: [{
    type: Schema.Types.ObjectId, ref: 'Comment',
    default: null
  }],
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;