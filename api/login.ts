import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from './_lib/mongodb.js';
import { Account } from './_lib/Account.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, rememberMe } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({ error: 'Vui lòng nhập email và mật khẩu.' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('Thiếu JWT_SECRET');

    await connectDB();

    const account = await Account.findOne({ email: String(email).toLowerCase().trim() });
    const ok = account ? await bcrypt.compare(String(password), account.passwordHash) : false;

    // Cùng một thông báo cho cả "sai email" và "sai mật khẩu"
    if (!account || !ok) {
      return res.status(401).json({ error: 'Email hoặc mật khẩu không đúng.' });
    }

    const maxAge = rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 8; // 7 ngày hoặc 8 giờ
    const token = jwt.sign(
      { id: account._id, email: account.email },
      secret,
      { expiresIn: maxAge }
    );

    const secure = process.env.VERCEL_ENV === 'development' ? '' : '; Secure';
    res.setHeader(
      'Set-Cookie',
      `token=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`
    );

    return res.status(200).json({
      id: account._id,
      fullName: account.fullName,
      email: account.email,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Lỗi máy chủ.' });
  }
}