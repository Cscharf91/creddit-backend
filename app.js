import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import userRoutes from './routes/users';
import postRoutes from './routes/posts';
import commentRoutes from './routes/comments';
import voteRoutes from './routes/votes';
import zoneRoutes from './routes/zones';
import cloudinary from './utils/cloudinary';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const atlasUri = process.env.ATLAS_URI;
mongoose.connect(atlasUri,
  { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log('Connected to DB'));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/zones', zoneRoutes);
app.use('/api/votes', voteRoutes);

app.listen(5000, () => console.log("Server is up and running on localhost:5000"));