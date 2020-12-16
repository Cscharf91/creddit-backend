import mongoose, { Schema } from 'mongoose';

const VoteSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId, ref: 'User' 
  },
  vote: {
    type: Number,
    required: true
  },
  post: {
    type: Schema.Types.ObjectId, ref: 'Post' 
  },
  comment: {
    type: Schema.Types.ObjectId, ref: 'Comment' 
  }

});

const Vote = mongoose.model("Vote", VoteSchema);
export default Vote;