import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();
const app = express();

// routes
import {courseRoutes} from './routes/course.js';

// Configurations
app.use(express.json());
app.use(cors());
app.use('/api', courseRoutes);

// MongoDB connection
const connectToDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected successfully to MongoDB');
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
    }
};
connectToDB();

const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});