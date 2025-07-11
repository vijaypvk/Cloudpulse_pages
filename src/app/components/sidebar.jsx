
// 'use client';

// import {
//   Folder,
//   Monitor,
//   HardDrive,
//   Layers,
//   Server,
//   User,
//   KeyRound,
//   GitBranch,
//   Package,
//   Cloud,
//   ShieldCheck,
//   Network,
//   Bell,
//   ChevronDown,
// } from 'lucide-react';

// import { FaDocker } from 'react-icons/fa'; // 🐳 Docker
// import { MdMail } from 'react-icons/md';   // ✉️ Mail/Request icon

// export default function Sidebar() {
//   return (
//     <aside className="h-full w-64 bg-zinc-900 text-white flex flex-col justify-between p-4 z-40 rounded-2xl border">
//       <div>
//         {/* Logo */}
//         <div className="mb-6">
//           <h1 className="text-xl font-semibold">Cloudpulse</h1>
//           <span className="text-xs text-zinc-400">v0.18.4</span>
//         </div>

//         {/* Home Section */}
//         <div className="mb-4">
//           <h2 className="text-sm text-zinc-400 mb-2">Home</h2>
//           <ul className="space-y-2">
//             <MenuItem icon={<Folder size={16} />} label="Projects" />
//             <MenuItem icon={<Monitor size={16} />} label="Monitoring" />
//             <MenuItem icon={<HardDrive size={16} />} label="Traefik File System" />
//             <MenuItem icon={<FaDocker size={16} />} label="Docker" />
//             <MenuItem icon={<Layers size={16} />} label="Swarm" />
//             <MenuItem icon={<MdMail size={16} />} label="Requests" />
//           </ul>
//         </div>

//         {/* Settings Section */}
//         <div>
//           <h2 className="text-sm text-zinc-400 mb-2">Settings</h2>
//           <ul className="space-y-2">
//             <MenuItem icon={<Server size={16} />} label="Web Server" />
//             <MenuItem icon={<User size={16} />} label="Profile" />
//             <MenuItem icon={<Network size={16} />} label="Remote Servers" />
//             <MenuItem icon={<User size={16} />} label="Users" />
//             <MenuItem icon={<KeyRound size={16} />} label="SSH Keys" />
//             <MenuItem icon={<GitBranch size={16} />} label="Git" />
//             <MenuItem icon={<Package size={16} />} label="Registry" />
//             <MenuItem icon={<Cloud size={16} />} label="S3 Destinations" />
//             <MenuItem icon={<ShieldCheck size={16} />} label="Certificates" />
//             <MenuItem icon={<Layers size={16} />} label="Cluster" />
//             <MenuItem icon={<Bell size={16} />} label="Notifications" />
//           </ul>
//         </div>
//       </div>

//       {/* Account Footer */}
//       <div className="mt-6 border-t border-zinc-700 pt-4">
//         <h2 className="text-sm text-zinc-400 mb-2">Extra</h2>
//         <div className="flex items-center justify-between bg-zinc-800 rounded-lg p-3">
//           <div className="flex items-center space-x-3">
//             <div className="bg-zinc-700 p-1.5 rounded-full">
//               <User size={18} />
//             </div>
//             <div className="text-sm">
//               <p className="font-medium">Account</p>
//               <p className="text-xs text-zinc-400">vijaypvk001@gmail.com</p>
//             </div>
//           </div>
//           <ChevronDown size={16} className="text-zinc-400" />
//         </div>
//       </div>
//     </aside>
//   );
// }

// function MenuItem({ icon, label }) {
//   return (
//     <li className="flex items-center gap-3 px-2 py-2 hover:bg-zinc-800 rounded-md cursor-pointer text-sm font-medium">
//       {icon}
//       <span>{label}</span>
//     </li>
//   );
// }
'use client';

import {
  Folder,
  Monitor,
  HardDrive,
  Layers,
  Server,
  User,
  KeyRound,
  GitBranch,
  Package,
  Cloud,
  ShieldCheck,
  Network,
  Bell,
  ChevronDown,
} from 'lucide-react';
import { FaDocker } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-56 rounded-b-md bg-zinc-900 text-white flex flex-col z-40 border-r border-zinc-800">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Logo */}
        <div className="mb-6 border-b border-gray-600">
          <h1 className="text-xl font-semibold">Cloudpulse</h1>
          <span className="text-xs text-zinc-400">v0.18.4</span>
        </div>

        {/* Home Section */}
        <div className="mb-4">
          <h2 className="text-sm text-zinc-400 mb-2">Home</h2>
          <ul className="space-y-2">
            <MenuItem icon={<Folder size={16} />} label="Pages"  />
            <MenuItem icon={<Monitor size={16} />} label="Monitoring" />
            <MenuItem icon={<HardDrive size={16} />} label="Traefik File System" />
            <MenuItem icon={<FaDocker size={16} />} label="Docker" />
            <MenuItem icon={<Layers size={16} />} label="Swarm" />
            <MenuItem icon={<MdMail size={16} />} label="Requests" />
          </ul>
        </div>

        {/* Settings Section */}
        <div>
          <h2 className="text-sm text-zinc-400 mb-2">Settings</h2>
          <ul className="space-y-2">
            <MenuItem icon={<Server size={16} />} label="Web Server" />
            <MenuItem icon={<User size={16} />} label="Profile" />
            <MenuItem icon={<Network size={16} />} label="Remote Servers" />
            <MenuItem icon={<User size={16} />} label="Users" />
            <MenuItem icon={<KeyRound size={16} />} label="SSH Keys" />
            <MenuItem icon={<GitBranch size={16} />} label="Git" />
            <MenuItem icon={<Package size={16} />} label="Registry" />
            <MenuItem icon={<Cloud size={16} />} label="S3 Destinations" />
            <MenuItem icon={<ShieldCheck size={16} />} label="Certificates" />
            <MenuItem icon={<Layers size={16} />} label="Cluster" />
            <MenuItem icon={<Bell size={16} />} label="Notifications" />
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800">
        <h2 className="text-sm text-zinc-400 mb-2">Extra</h2>
        <div className="flex items-center justify-between bg-zinc-800 rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <div className="bg-zinc-700 p-1.5 rounded-full">
              <User size={18} />
            </div>
            <div className="text-sm">
              <p className="font-medium">Account</p>
              <p className="text-xs text-zinc-400">vijaypvk001@gmail.com</p>
            </div>
          </div>
          <ChevronDown size={16} className="text-zinc-400" />
        </div>
      </div>
    </aside>
  );
}

function MenuItem({ icon, label }) {
  return (
    <li className="flex items-center gap-3 px-2 py-2 hover:bg-zinc-800 rounded-md cursor-pointer text-sm font-medium">
      {icon}
      <span>{label}</span>
    </li>
  );
}
