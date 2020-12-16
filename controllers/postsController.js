import Post from '../models/Post';
import Comment from '../models/Comment';
import { body, validationResult } from 'express-validator';

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user')
      .populate('zone');
    res.json(posts);
  } catch(err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
}

const createPost = async (req, res) => {
  const newPost = new Post({ ...req.body });
  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch(err) {
    res.status(400).json({ msg: err });
  }
}

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('user')
      .populate('zone')
      .populate({
        path: 'comments',
        model: 'Comment',
        populate: { 
          path: 'children',
          model: 'Comment' ,
          populate: {
            path: 'children',
            model: 'Comment',
            populate: {
              path: 'children',
              model: 'Comment',
              populate: {
                path: 'children',
                model: 'Comment',
              }
            }
          }
        },
      });
    res.json(post);
  } catch(err) {
    res.status(400).json({ msg: err });
  }
}

const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.updateOne({ _id: req.params.postId },
      { $set: { ...req.body } });
    res.json(updatedPost);
  } catch(err) {
    res.status(400).json({ msg: err });
  }
}

const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId)
    res.json(deletedPost);
  } catch(err) {
    res.status(400).json({ msg: err });
  }
}

export default {
  getPosts, createPost, getPost,
  updatePost, deletePost
}