import mongoose, { Schema } from 'mongoose';

const ZoneSchema = new mongoose.Schema({
  creator: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    min: 3
  },
  description: {
    type: String
  },
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  date: {
    type: Date,
    default: Date.now
  }
});

const Zone = mongoose.model("Zone", ZoneSchema);
export default Zone;