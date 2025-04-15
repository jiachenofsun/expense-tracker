"use client";
import { useState, useEffect } from "react";
import SubmitButton from "./SubmitButton";
import Link from "next/link";

// Accepts the server action as a prop
export default function ExpenseForm({ addExpense }) {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-CA"));
  }, []);

  return (
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
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          defaultValue={today}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
        />
      </div>
      <SubmitButton />
      <Link
        href="/view"
        className="text-blue-500 hover:text-blue-600"
      >
        View Expenses
      </Link>
    </form>
  );
}