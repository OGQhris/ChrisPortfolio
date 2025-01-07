'use client'

import { useState } from 'react';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export function SubscriptionBar() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to subscribe');
    }
  };

  return (
    <div className="my-6 w-full">
      <div className="flex flex-col sm:flex-row items-end justify-between gap-2">
        <div className="flex flex-col items-start gap-1">
          <h3 className={`text-lg ${playfair.className}`}>Subscribe to My Blog</h3>
          <p className="text-sm text-gray-500">Get notified when I publish new posts</p>
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="px-3 py-2 border md:min-w-[250px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 text-sm"
          >
            {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
      {status === 'success' && (
        <p className="text-green-600 text-sm mt-2 text-center">Thanks for subscribing! Check your email for confirmation.</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-sm mt-2 text-center">{errorMessage}</p>
      )}
    </div>
  );
}
