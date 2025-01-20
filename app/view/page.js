import { connectToDatabase } from '@/app/lib/mongodb';
import Link from 'next/link';

const TOTAL_FUNDS_AVAILABLE = 2000;

export default async function ViewExpenses() {
  const client = await connectToDatabase();
  const db = client.db('expense_tracker');
  const expenses = await db.collection('expenses')
    .find({})
    .sort({ date: -1 })
    .toArray();

  // Calculate total expenses by summing up all amount values
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const remainingFunds = TOTAL_FUNDS_AVAILABLE - totalExpenses;

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* Add a new section for the funds summary */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <h3 className="text-sm font-medium text-gray-500">TOTAL FUNDS</h3>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  ${TOTAL_FUNDS_AVAILABLE.toFixed(2)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">TOTAL SPENT</h3>
                <p className="mt-1 text-xl font-semibold text-red-600">
                  ${totalExpenses.toFixed(2)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">REMAINING</h3>
                <p className={`mt-1 text-xl font-semibold ${
                  remainingFunds < 500 ? 'text-red-600' : 'text-green-600'
                }`}>
                  ${remainingFunds.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
            <Link
              href="/"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add New Expense
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenses.map((expense) => (
                  <tr key={expense._id.toString()}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {expense.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      ${expense.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}