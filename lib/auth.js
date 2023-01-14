import { compare, hash } from 'bcrypt';

export async function hashedPassword(password) {
  return await hash(password, 12);
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
