'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

interface Alert {
  id: number;
  latitude: number;
  longitude: number;
  timestamp: string;
  type: string;
}

interface Report {
  id: number;
  content: string;
  timestamp: string;
  type: string;
}

// Dynamically import MapView with no SSR
const MapView = dynamic(() => import('../components/MapView'), { ssr: false });

export default function DashboardPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [alertsRes, reportsRes] = await Promise.all([
        fetch('/api/alert'),
        fetch('/api/report'),
      ]);

      const alertsData = await alertsRes.json();
      const reportsData = await reportsRes.json();

      setAlerts(alertsData.alerts || []);
      setReports(reportsData.reports || []);
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">📍 Geo-Tagged Alerts</h2>
          <div className="rounded overflow-hidden mb-6">
            <MapView alerts={alerts} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {alerts.map(alert => (
              <div
                key={alert.id}
                className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg shadow-sm"
              >
                <p className="text-sm text-gray-700">
                  <strong>📌 Location:</strong> {alert.latitude}, {alert.longitude}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>🕒 Time:</strong> {new Date(alert.timestamp).toLocaleString()}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>⚠️ Type:</strong> {alert.type}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">📝 Offline Reports</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {reports.map(report => (
              <div
                key={report.id}
                className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-lg shadow-sm"
              >
                <p className="text-sm text-gray-700">
                  <strong>🕒 Time:</strong> {new Date(report.timestamp).toLocaleString()}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>📂 Type:</strong> {report.type}
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  <strong>🧾 Content:</strong> {report.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
