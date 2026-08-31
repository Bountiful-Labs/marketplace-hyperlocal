'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface HealthStatus {
  status: 'ok' | 'error';
  service: string;
  timestamp: string;
}

export default function Home() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await axios.get<HealthStatus>(`${apiUrl}/health`);
        setHealth(response.data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch health status';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Marketplace Hyperlocal</h1>
      <p>A hyperlocal marketplace connecting local businesses with community members</p>

      <section style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h2>API Health Status</h2>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {health && (
          <div>
            <p>
              <strong>Status:</strong> {health.status}
            </p>
            <p>
              <strong>Service:</strong> {health.service}
            </p>
            <p>
              <strong>Timestamp:</strong> {new Date(health.timestamp).toLocaleString()}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
