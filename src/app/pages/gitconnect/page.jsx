// "use client";
// import React from "react";
// import { ChevronLeft, UploadCloud, GitBranch } from "lucide-react";

// export default function HostingStart() {
//   return (
//     <main className="min-h-screen bg-black text-white px-6 py-10 relative ml-64">
//       <a href="#" className="text-blue-500 flex items-center gap-2 mb-8">
//         <ChevronLeft className="w-4 h-4" />
//         Back to Compute (Workers) overview
//       </a>

//       <h1 className="text-4xl font-bold mb-2">Get started</h1>
//       <p className="text-gray-300 mb-8">Get started with Workers. How would you like to begin?</p>

//       <div className="flex items-center gap-4 border-b border-gray-700 mb-4">
//         <button className="py-2 px-4 text-gray-400 hover:text-white transition">Workers</button>
//         <button className="py-2 px-4 border-b-2 border-white text-white font-medium">Pages</button>
//       </div>

//       <div className="bg-blue-900 text-sm text-white p-4 rounded mb-6 relative">
//         <span>
//           We recommend using <a href="#" className="underline font-semibold">Cloudflare Workers</a> for new projects. See how Workers compares to Pages in our <a href="#" className="underline">compatibility matrix</a>.
//         </span>
//         <button className="absolute top-3 right-4 text-white text-lg">×</button>
//       </div>

//       <div className="space-y-4">
//         {/* Git Repository Option */}
//         <div className="border border-gray-700 rounded p-5 flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <GitBranch className="text-gray-400" />
//             <div>
//               <h3 className="font-semibold text-white">Import an existing Git repository</h3>
//               <p className="text-gray-400 text-sm">Start by importing an existing Git repository.</p>
//             </div>
//           </div>
//           <button className="border border-blue-500 text-blue-500 px-4 py-1 rounded hover:bg-blue-500 hover:text-white transition">Get started</button>
//         </div>

//         {/* Direct Upload Option */}
//         <div className="border border-gray-700 rounded p-5 flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <UploadCloud className="text-gray-400" />
//             <div>
//               <h3 className="font-semibold text-white">Use direct upload</h3>
//               <p className="text-gray-400 text-sm">Upload your site's assets including HTML, CSS, and JS files directly from your computer.</p>
//             </div>
//           </div>
//           <button className="border border-blue-500 text-blue-500 px-4 py-1 rounded hover:bg-blue-500 hover:text-white transition">Get started</button>
//         </div>
//       </div>
//     </main>
//   );
// }
"use client";
import React from "react";
import { ChevronLeft, UploadCloud, GitBranch } from "lucide-react";
import Sidebar from "@/app/components/sidebar";
export default function HostingStart() {
  return (
  <div >
    <Sidebar />
    <main className="min-h-screen bg-black text-white px-6 py-10 relative ml-64">
      {/* Back Link */}
      <a
        href="/pages/homePage"
        className="text-blue-500 hover:underline flex items-center gap-2 mb-8 transition-all"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Compute (Workers) overview
      </a>

      {/* Title and Subtitle */}
      <h1 className="text-4xl font-extrabold tracking-tight mb-2">Get started</h1>
      <p className="text-gray-400 text-lg mb-8">
        Deploy your first site with ease. Choose how you want to begin.
      </p>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-gray-700 mb-6">
        {/* <button className="py-2 px-4 text-gray-400 hover:text-white transition-colors">
          Workers
        </button> */}
        <button className="py-2 px-4 border-b-2 border-white text-white font-semibold">
          Pages
        </button>
      </div>

      {/* Recommendation Box */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-sm text-white p-4 rounded-lg mb-8 relative shadow-md">
        <span>
          We recommend using{" "}
          <a href="#" className="underline font-semibold hover:text-blue-200">
            cloudpulse workers
          </a>{" "}
          for new projects. Compare Pages and Workers in our{" "}
          <a href="#" className="underline hover:text-blue-200">
            compatibility matrix
          </a>
          .
        </span>
        <button
          className="absolute top-2 right-3 text-white text-xl hover:text-red-400 transition"
          aria-label="Close recommendation"
        >
          ×
        </button>
      </div>

      {/* Options */}
      <div className="space-y-6">
        {/* Git Repository Card */}
        <div className="border border-gray-700 hover:border-blue-500 bg-gray-900/40 backdrop-blur-sm rounded-xl p-6 flex justify-between items-center transition-shadow hover:shadow-lg">
          <div className="flex items-center gap-4">
            <GitBranch className="text-blue-400 w-6 h-6" />
            <div>
              <h3 className="text-white font-semibold text-lg">
                Import an existing Git repository
              </h3>
              <p className="text-gray-400 text-sm">
                Start by importing your code from a Git provider.
              </p>
            </div>
          </div>
          <a href="/pages/gitconnect2">
          <button className="border border-blue-500 text-blue-500 px-5 py-2 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-all">
            Get started
          </button>
          </a>
        </div>

        {/* Direct Upload Card */}
        <div className="border border-gray-700 hover:border-blue-500 bg-gray-900/40 backdrop-blur-sm rounded-xl p-6 flex justify-between items-center transition-shadow hover:shadow-lg">
          <div className="flex items-center gap-4">
            <UploadCloud className="text-green-400 w-6 h-6" />
            <div>
              <h3 className="text-white font-semibold text-lg">
                Use direct upload
              </h3>
              <p className="text-gray-400 text-sm">
                Upload your HTML, CSS, JS files directly from your device.
              </p>
            </div>
          </div>
          <button className="border border-blue-500 text-blue-500 px-5 py-2 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-all">
            Get started
          </button>
        </div>
      </div>
    </main>
    </div>
  );
}
