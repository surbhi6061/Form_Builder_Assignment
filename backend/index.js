import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import formRouter from './routes/formRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

dotenv.config();

connectDB();

app.use('/', formRouter);

app.listen(PORT, () => console.log('Server is running on port', PORT));
