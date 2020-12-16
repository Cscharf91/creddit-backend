import Vote from '../models/Vote';
import Post from '../models/Post';
import Comment from '../models/Comment';

const getPostVotes = async (req, res) => {
  try {
    const votes = await Vote.find({ post: req.params.postId });
    res.json(votes);
  } catch(err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
}

const getCommentVotes = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.commentId });
    res.json(comments);
  } catch(err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
}

const createVote = async (req, res) => {
  const newZone = new Vote({ ...req.body });
  try {
    const savedZone = await newZone.save();
    res.json(savedZone);
  } catch(err) {
    res.status(400).json({ msg: err });
  }
}

const updateVote = async (req, res) => {
  try {
    const updatedVote = await Post.updateOne({ _id: req.params.voteId },
      { $set: { ...req.body } });
    res.json(updatedVote);
  } catch(err) {
    res.status(400).json({ msg: err });
  }
}

const deleteVote = async (req, res) => {
  try {
    const deletedZone = await Vote.findByIdAndDelete(req.params.voteId);
    res.json(deletedZone);
  } catch(err) {
    res.status(400).json({ msg: err });
  }
}

export default {
  getPostVotes, createVote,
  getCommentVotes, deleteVote,
  updateVote
}