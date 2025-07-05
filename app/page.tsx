// Home page - app/page.tsx
export default function Home() {
  return (
    <main className="p-6 text-center">
      <h1 className="text-3xl font-bold text-red-600">Emergency Aid App</h1>
      <p className="mt-4 text-lg">
        A safety app enabling geo-tagged alerts and offline reporting for abuse victims.
      </p>
      <div className="mt-6 space-x-4">
        <a href="/alert" className="px-4 py-2 bg-red-500 text-white rounded">Send Alert</a>
        <a href="/report" className="px-4 py-2 bg-blue-500 text-white rounded">Offline Report</a>
        <a href="/dashboard" className="px-4 py-2 bg-gray-500 text-white rounded">Dashboard</a>
      </div>
    </main>
  );
}