'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get('password') || '').trim();

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed.');
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="admin-shell">
      <div className="admin-card login-card">
        <p className="section-kicker">Admin access</p>
        <h1>AFRICSIS dashboard login</h1>
        <p className="admin-muted">Images, videos, events, and news updates are restricted to authorized administrators only.</p>

        <form onSubmit={handleSubmit} className="admin-form">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="Enter admin password" required />

          {error && <p className="admin-error">{error}</p>}

          <button type="submit" className="btn btn-primary full-width" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Login to dashboard'}
          </button>
        </form>
      </div>
    </main>
  );
}
