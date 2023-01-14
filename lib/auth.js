import { hash } from 'bcrypt';

export async function hashedPassword(password) {
  return await hash(password, 12);
}
