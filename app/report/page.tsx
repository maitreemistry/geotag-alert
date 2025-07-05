// Offline report page - app/report/page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function ReportPage() {
  const [report, setReport] = useState('');
  const [saved, setSaved] = useState(false);
  const [synced, setSynced] = useState(false);

  const saveToLocal = () => {
    const reports = JSON.parse(localStorage.getItem('offlineReports') || '[]');
    reports.push({
      content: report,
      timestamp: new Date().toISOString(),
      type: 'offline_report',
    });
    localStorage.setItem('offlineReports', JSON.stringify(reports));
    setReport('');
    setSaved(true);
  };

  const syncReports = async () => {
    const reports = JSON.parse(localStorage.getItem('offlineReports') || '[]');
    if (!reports.length) return;

    const response = await fetch('/api/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reports }),
    });

    if (response.ok) {
      localStorage.removeItem('offlineReports');
      setSynced(true);
    }
  };

  useEffect(() => {
    if (navigator.onLine) syncReports();
    window.addEventListener('online', syncReports);
    return () => window.removeEventListener('online', syncReports);
  }, []);

  return (
    <main className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold">Offline Abuse Report</h2>
      <p className="mt-2 text-sm text-gray-600">
        If you're offline, your report will be stored locally and submitted once you're back online.
      </p>
      <textarea
        className="w-full h-32 p-2 border mt-4 rounded"
        placeholder="Describe the incident..."
        value={report}
        onChange={(e) => setReport(e.target.value)}
      />
      <button
        onClick={saveToLocal}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Save Report
      </button>
      {saved && <p className="mt-2 text-green-600">Report saved locally.</p>}
      {synced && <p className="mt-2 text-indigo-600">Offline reports synced.</p>}
    </main>
  );
}
