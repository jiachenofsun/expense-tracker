import { redirect } from 'next/navigation';
import { connectToDatabase } from '@/app/lib/mongodb';
import ExpenseForm from './components/ExpenseForm';

// Server action for adding expenses
async function addExpense(formData) {
  'use server'
  
  const client = await connectToDatabase();
  const db = client.db('expense_tracker');
  
  const name = formData.get('name');
  const description = formData.get('description');
  const amount = formData.get('amount');
  const date = formData.get('date') || new Date().toLocaleDateString('en-CA');

  if (!name || !description || !amount) {
    throw new Error('All fields are required');
  }

  await db.collection('expenses').insertOne({
    name,
    description,
    amount: parseFloat(amount),
    date: date,
    reimbursed: false
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
            <ExpenseForm addExpense={addExpense} />
          </div>
        </div>
      </div>
    </div>
  );
}