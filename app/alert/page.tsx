// Alert page - app/alert/page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function AlertPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [status, setStatus] = useState('Initializing...');

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('Geolocation not supported.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus('Location acquired. Ready to send alert.');
      },
      () => setStatus('Error acquiring location.')
    );
  }, []);

  const sendAlert = async () => {
    if (!location) {
      setStatus('Location not ready.');
      return;
    }

    const response = await fetch('/api/alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...location,
        timestamp: new Date().toISOString(),
        type: 'emergency_alert',
      }),
    });

    setStatus(response.ok ? 'Alert sent successfully.' : 'Failed to send alert.');
  };

  return (
    <main className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold">Geo-Tagged Emergency Alert</h2>
      <p className="mt-2">{status}</p>
      <button
        onClick={sendAlert}
        className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
      >
        Send Alert
      </button>
    </main>
  );
}