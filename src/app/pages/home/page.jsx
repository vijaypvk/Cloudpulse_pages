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
import TerminalDemo from "../../components/terminal";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative flex flex-col md:flex-row h-screen bg-black overflow-hidden">
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
      <main className="flex-1 relative  flex items-center justify-center">


        {/* Globe in the background */}
        <div className="absolute inset-0 mr-10">
          <GlobeDemo />
        </div>
      </main>
    </div>
  );
}
