'use server'

import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/app/lib/mongodb';
import { revalidatePath } from 'next/cache';

export async function verifyPassword(password) {
  return password === process.env.APP_PASSWORD;
}

export async function deleteExpense(formData) {
  const id = formData.get('id');
  const client = await connectToDatabase();
  const db = client.db('expense_tracker');
  
  await db.collection('expenses').deleteOne({
    _id: new ObjectId(id)
  });
  
  revalidatePath('/view');
}