'use client'
import { verifyPassword } from '@/app/lib/actions';

import { useState, useEffect } from 'react';

export default function PasswordProtection({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
    setLoading(false);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    
    const isValid = await verifyPassword(password);
    if (isValid) {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
    } else {
      setError('Incorrect password');
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm mx-4">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">Enter Password</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="Enter secret password"
              />
            </div>
            {error && (
              <p className="text-red-500 mb-4">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  return children;
}