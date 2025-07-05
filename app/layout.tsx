// Root layout - app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import Navbar from './components/Navbar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800">
      <Navbar />
      {children}
      </body>
    </html>
  );
}
