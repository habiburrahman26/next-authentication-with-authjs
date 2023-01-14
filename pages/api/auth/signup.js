import { hashedPassword } from '../../../lib/auth';
import { connectDb } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.send({ message: 'Only post method allow' });
  }

  const { email, password } = req.body;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    return res
      .status(422)
      .json({ message: 'Invalid email or password less than 7 character' });
  }

  try {
    const client = await connectDb();
    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email: email });

    if (existingUser) {
      return res.json({ message: 'User already created' });
    }

    const encryptedPassword = await hashedPassword(password);
    const result = await db.collection('users').insertOne({
      email: email,
      password: encryptedPassword,
    });

    res.status(201).json({ message: 'user created' });
  } catch (err) {
    console.log(err);
  }
}
