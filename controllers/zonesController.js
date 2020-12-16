import Zone from '../models/Zone';
import Post from '../models/Post';

const getZones = async (req, res) => {
  try {
    const zones = await Zone.find();
    res.json(zones);
  } catch(err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
}

const createZone = async (req, res) => {
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
  getZones, createZone, getZonePosts,
  deleteZone
}