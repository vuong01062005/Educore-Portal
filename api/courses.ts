import type { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import { connectDB } from './_lib/mongodb.js';

const Course =
  mongoose.models.Course ||
  mongoose.model(
    'Course',
    new mongoose.Schema({ title: String, description: String }, { timestamps: true })
  );

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await connectDB();

    if (req.method === 'GET') {
      return res.status(200).json(await Course.find());
    }
    if (req.method === 'POST') {
      return res.status(201).json(await Course.create(req.body));
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}