import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import { connectDB } from './_lib/mongodb.js';
import { Account } from './_lib/Account.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullName, email, password } = req.body ?? {};

    if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin.' });
    }
    if (String(password).length < 8) {
      return res.status(400).json({ error: 'Mật khẩu phải có ít nhất 8 ký tự.' });
    }

    await connectDB();

    const exists = await Account.findOne({ email: String(email).toLowerCase() });
    if (exists) {
      return res.status(409).json({ error: 'Email này đã được đăng ký.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const account = await Account.create({ fullName, email, passwordHash });

    return res.status(201).json({
      id: account._id,
      fullName: account.fullName,
      email: account.email,
    });
  } catch (err: any) {
    if (err?.code === 11000) {
      return res.status(409).json({ error: 'Email này đã được đăng ký.' });
    }
    console.error(err);
    return res.status(500).json({ error: 'Lỗi máy chủ.' });
  }
}