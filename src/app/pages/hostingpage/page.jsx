"use client";

import Sidebar from '@/app/components/sidebar';
import DashboardHome from '@/app/components/DashboardHome';

export default function Hosting() {
  return (
    <main className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* Sidebar: full width on mobile, fixed width on desktop */}
      <div className="w-full md:w-64 border-r border-white">
        <Sidebar />
      </div>

      {/* Main content: full width on mobile, remaining space on desktop */}
      <div className="flex-1 p-4 overflow-auto">
        <DashboardHome />
      </div>
    </main>
  );
}
