// "use client";
// import React, { useState } from "react";
// import { GlobeDemo } from "../../components/globe";
// import Sidebar from "../../components/sidebar";
// import { Menu } from "lucide-react";
// import TerminalDemo from "../../components/terminal";
// export default function Home() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-black">

//       {/* Mobile Hamburger */}
//       <button
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//         className="absolute top-4 left-4 z-50 md:hidden bg-zinc-800 p-2 rounded-md text-white"
//       >
//         <Menu size={20} />
//       </button>

//       <Sidebar isOpen={sidebarOpen} />

//       <main className="flex-1 overflow-y-auto">
//               <div>
//       <TerminalDemo/>
//       </div>
//         <GlobeDemo />
//       </main>

//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import { GlobeDemo } from "../../components/globe";
import Sidebar from "../../components/sidebar";
import { Menu } from "lucide-react";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen bg-black overflow-hidden">
      {/* Mobile Hamburger */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 left-4 z-50 md:hidden bg-zinc-800 p-2 rounded-md text-white"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main Content */}
      <main className="flex-1  flex items-center justify-center">
        {/* Globe Background */}
        <div className="absolute inset-0 z-0">
          <GlobeDemo />
        </div>

        {/* Cards Section */}
        <div className="    absolute 
    bottom-5 left-1/2 transform -translate-x-1/2 
    md:bottom-5 md:left-96 md:translate-x-0
    w-full max-w-6xl z-50 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {/* Total Deployments */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-2xl p-5 text-white shadow-md">
              <div className="text-sm text-neutral-300 mb-1">Total Deployments</div>
              <div className="text-3xl font-bold">128</div>
            </div>

            {/* Build Status */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-2xl p-5 text-white shadow-md">
              <div className="text-sm text-neutral-300 mb-1">Build Status</div>
              <div className="flex flex-col text-sm font-medium mt-1">
                <span className="flex items-center gap-2 text-green-400">
                  <svg className="w-3 h-3 fill-green-400" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="10" />
                  </svg>
                  36
                </span>
                <span className="flex items-center gap-2 text-red-400 mt-1">
                  <svg className="w-3 h-3 fill-red-400" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="10" />
                  </svg>
                  2
                </span>
              </div>
            </div>

            {/* Active Projects */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-2xl p-5 text-white shadow-md">
              <div className="text-sm text-neutral-300 mb-1">Active Projects</div>
              <div className="text-3xl font-bold">5</div>
            </div>
          </div>
        </div>

        {/* Activity Panel */}
        <div className="absolute right-4 top-20 z-50 w-60  ">
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-xl p-4 text-white shadow-md">
            <div className="flex items-center  text-lg font-semibold mb-4">
              <span>Activity</span>
              <img src="/map.png" alt="Activity Icon" className="w-[50%] h-[50%] ml-9" />
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-1 bg-green-400 rounded-full" />
                <div>
                  <p>Deployed <code>'proj2'</code> to production</p>
                  <p className="text-neutral-400 text-xs">2 minutes ago</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-1 bg-green-400 rounded-full" />
                <div>
                  <p>Build succeeded for <code>'proj3'</code></p>
                  <p className="text-neutral-400 text-xs">1 hour ago</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-1 bg-red-500 rounded-full" />
                <div>
                  <p>Build failed for <code>'proj2'</code></p>
                  <p className="text-neutral-400 text-xs">1 day ago</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Test Panel */}
        <div className="absolute right-4 bottom-10 z-50 w-60  ">
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-xl p-4 text-white shadow-md">
            <div className="text-lg font-semibold mb-4">Test</div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-1 bg-green-400 rounded-full" />
                <div>
                  <p>Deployed <code>'proj2'</code> to production</p>
                  <p className="text-neutral-400 text-xs">2 minutes ago</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-1 bg-green-400 rounded-full" />
                <div>
                  <p>Build succeeded for <code>'proj3'</code></p>
                  <p className="text-neutral-400 text-xs">1 hour ago</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-1 bg-red-500 rounded-full" />
                <div>
                  <p>Build failed for <code>'proj2'</code></p>
                  <p className="text-neutral-400 text-xs">1 day ago</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
