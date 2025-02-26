'use client';
import { useState } from 'react';

export default function ReimbursedCheckbox({ expenseId, initialState, onToggle }) {
  const [isChecked, setIsChecked] = useState(initialState);

  const handleChange = async (e) => {
    setIsChecked(!isChecked);
    const formData = new FormData();
    formData.append('expenseId', expenseId);
    formData.append('currentState', isChecked.toString());
    await onToggle(formData);
  };

  return (
    <form>
      <input
        type="checkbox"
        checked={isChecked}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        onChange={handleChange}
      />
    </form>
  );
} 