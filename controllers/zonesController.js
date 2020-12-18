import Zone from '../models/Zone';
import Post from '../models/Post';
import { body, validationResult } from 'express-validator';

const getZones = async (req, res) => {
  try {
    const zones = await Zone.find();
    res.json(zones);
  } catch(err) {
    res.status(400).json({ msg: err });
  }
}

const getZone = async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.zoneId);
    res.json(zone);
  } catch(err) {
    res.status(400).json({ msg: err });
  }
}

const createZone = async (req, res) => {
  [
    body('name').trim().isLength({ min: 3 }).escape(),
    body('description').isLength({ max: 100 }).escape()
  ]
  const newZone = new Zone({ ...req.body });
  try {
    const savedZone = await newZone.save();
    res.json(savedZone);
  } catch(err) {
    res.status(400).json({ msg: err });
  }
}

const getZonePosts = async (req, res) => {
  try {
    const posts = await Post.find({ zone: req.params.zoneId })
      .populate('user');
    res.json(posts);
  } catch(err) {
    res.status(400).json({ msg: err });
  }
}

const deleteZone = async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.zoneId);
    const deletedZone = await Zone.findByIdAndDelete(req.params.zoneId);
    res.json(deletedZone);
  } catch(err) {
    res.status(400).json({ msg: err });
  }
}

export default {
  getZones, getZone, createZone, 
  getZonePosts, deleteZone
}