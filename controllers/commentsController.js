import Comment from '../models/Comment';
import Post from '../models/Post';
import { body, validationResult } from 'express-validator';

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('username')
      .populate('post')
      .populate('parent')
      .populate('children');
    res.json(comments);
  } catch(err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
}

const createComment = async (req, res) => {
  const newComment = new Comment({ ...req.body });
  try {
    const savedComment = await newComment.save();
    
    // Find parent comment and add itself to its children array
    const parentComment = await Comment.findById(req.body.parent);
    if (parentComment) {
      parentComment.children.push(savedComment);
      const savedParent = await parentComment.save();
    }

    // Find post and add itself to its comments array
    const post = await Post.findById(req.body.post);
    if (post) {
      post.comments.push(savedComment);
      const savedPost = await post.save();
    }
  
    res.json(savedComment);
  } catch(err) {
    res.status(400).json({ msg: err });
  }
}

const getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId)
      .populate('username')
      .populate('post')
      .populate('parent')
      .populate('children');
    res.json(comment);
  } catch(err) {
    res.json(400, { msg: err });
  }
}

const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.updateOne({ _id: req.params.commentId },
      { $set: { ...req.body } });
    res.json(updatedComment);
  } catch(err) {
    res.status(400).json({ msg: err });
  }
}

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    //Delete this comment from its parent's children array
    const parentComment = await Comment.findById(comment.parent._id);
    if (parentComment) {
      const parentCommentIndex = parentComment.children.indexOf(comment._id);
      if (parentCommentIndex > -1) {
        parentComment.children.splice(parentComment, 1);
      }
      const updatedParent = await parentComment.save();
    }

    //Delete this comment from main post's comments array
    const post = await Post.findById(comment.post._id);
    if (post) {
      const commentIndex = post.comments.indexOf(comment._id);
      if (commentIndex > -1) {
        post.comments.splice(commentIndex, 1);
      }
      const updatedPost = await post.save();
    }

    //Delete the comment itself
    const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
    res.json(deletedComment);
  } catch(err) {
    res.status(400).json({ msg: err });
  }
}

export default {
  getComments, createComment, getComment,
  updateComment, deleteComment
}