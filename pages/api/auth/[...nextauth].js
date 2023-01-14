import { verifyPassword } from '@/lib/auth';
import { connectDb } from '@/lib/db';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectDb();
        const userCollection = client.db().collection('users');

        const user = await userCollection.findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error('User not found');
        }

        const validPassword = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!validPassword) {
          client.close();
          throw new Error('Invalid email or password');
        }

        client.close();
        return {
          email: user.email,
        };
      },
    }),
  ],
});
