'use server'

export async function verifyPassword(password) {
  return password === process.env.APP_PASSWORD;
}
