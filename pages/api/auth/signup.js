import { connectDb } from '@/lib/db';

export default async function handler(req, res) {
  const { email, password } = req.body.data;

  const client = await connectDb();

  client.db();
}
