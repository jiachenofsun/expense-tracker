import { redirect } from 'next/navigation';
import { connectToDatabase } from '@/app/lib/mongodb';
import Link from 'next/link';

// Server action for adding expenses
async function addExpense(formData) {
  'use server'
  
  const client = await connectToDatabase();
  const db = client.db('expense_tracker');
  
  const name = formData.get('name');
  const description = formData.get('description');
  const amount = formData.get('amount');

  if (!name || !description || !amount) {
    throw new Error('All fields are required');
  }

  await db.collection('expenses').insertOne({
    name,
    description,
    amount: parseFloat(amount),
    date: new Date()
  });

  redirect('/view');
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="w-full sm:max-w-xl sm:mx-auto px-4">
        <div className="bg-white shadow-lg sm:rounded-3xl p-6 sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-8 text-gray-900">Add Expense</h1>
            <form action={addExpense} className="space-y-4 flex flex-col items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expense Description
                </label>
                <input
                  type="text"
                  name="description"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amount ($)
                </label>
                <input
                  type="number"
                  name="amount"
                  step="0.01"
                  required
                  placeholder="0.00"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                />
              </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Expense
                </button>
                <Link
                  href="/view"
                  className="text-blue-500 hover:text-blue-600"
                >
                  View Expenses
                </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}