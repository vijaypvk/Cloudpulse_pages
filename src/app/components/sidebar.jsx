
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
// import { useRouter } from "next/navigation";
// import { FaDocker } from 'react-icons/fa';
// import { MdMail } from 'react-icons/md';

// export default function Sidebar() {
//   return (
//     <aside className="fixed top-0 left-0 h-screen w-56 rounded-b-md bg-zinc-900 text-white flex flex-col z-50 border-r border-zinc-800">
//       {/* Scrollable Content */}
//       <div className="flex-1 overflow-y-auto p-4">
//         {/* Logo */}
//         <a href="/pages/home">
//         <div className="mb-6 border-b border-gray-600">
//           <h1 className="text-xl font-semibold">Cloudpulse</h1>
//           <span className="text-xs text-zinc-400">v0.18.4</span>
//         </div>
//     </a>
//         {/* Home Section */}
//         <div className="mb-4">
//           <h2 className="text-sm text-zinc-400 mb-2">Home</h2>
//           <ul className="space-y-2">
//             <MenuItem icon={<Folder size={16} />} label="Pages" route="/pages/hostingpage" />
//             <MenuItem icon={<Monitor size={16} />} label="Monitoring"  />
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

//       {/* Footer */}
//       <div className="p-4 border-t border-zinc-800">
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

// function MenuItem({ icon, label, route }) {
//   const router = useRouter();

//   const handleClick = () => {
//     if (route) {
//       router.push(route);
//     }
//   };

//   return (
//     <li
//       onClick={handleClick}
//       className="flex items-center gap-3 px-2 py-2 hover:bg-zinc-800 rounded-md cursor-pointer text-sm font-medium"
//     >
//       {icon}
//       <span>{label}</span>
//     </li>
//   );
// }

// "use client";

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
//   ChevronRight,
//   ChevronUp,
//   Home,
//   Settings,
//   Mail,
// } from "lucide-react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// // Mock Docker icon component using Server icon
// const DockerIcon = () => <Server size={16} />;

// export default function Sidebar() {
//   const router = useRouter();
//   const [activeItem, setActiveItem] = useState("Get Started");
//   const [openSections, setOpenSections] = useState({
//     Home: true,
//     Settings: true,
//   });

//   const toggleSection = (section) => {
//     setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

//   return (
//     <aside className="fixed top-0 left-0 h-screen w-64 bg-zinc-900 text-white flex flex-col z-50 border-r border-zinc-800/50 backdrop-blur-sm">
//       <div className="flex-1 overflow-y-auto">
//         {/* Logo */}
//         <a href="/pages/home">
//           <div className="px-6 py-6 border-b border-zinc-800/50">
//             <div className="flex items-center gap-3 mb-2">
//               <div className="w-8 h-8 rounded-lg flex items-center justify-center">
//                 <img src="/pulse.png" alt="" />
//               </div>
//               <h1 className="text-xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
//                 Cloudpulse
//               </h1>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-xs text-zinc-400 bg-zinc-800 px-2 py-1 rounded-full">
//                 v0.18.4
//               </span>
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//             </div>
//           </div>
//         </a>

//         {/* Navigation Sections */}
//         <div className="px-4 py-4 space-y-6">
//             <MenuItem
//                   icon={<Layers size={16} />}
//                   label="Get Started"
//                   isActive={activeItem === "Get Started"}
//                   onClick={() =>{ setActiveItem("Get Started");
//                      router.push("/pages/home");}
//                   }
//                 />
//           {/* Home Section */}
//           <div>
//             <SectionHeader
//               icon={<Home size={14} />}
//               title="Home"
//               onClick={() => toggleSection("Home")}
//               isOpen={openSections["Home"]}
//             />
//             {openSections["Home"] && (
//               <ul className="space-y-1">
//                 <MenuItem
//                   icon={<Folder size={16} />}
//                   label="Pages"
//                   route="/pages/hostingpage"
//                   isActive={activeItem === "Pages"}
//                   onClick={() => {
//                     setActiveItem("Pages");
//                     router.push("/pages/hostingpage");
//                   }}
//                 />
//                 <MenuItem
//                   icon={<Monitor size={16} />}
//                   label="Monitoring"
//                   isActive={activeItem === "Monitoring"}
//                   onClick={() => setActiveItem("Monitoring")}
//                 />
//                 <MenuItem
//                   icon={<HardDrive size={16} />}
//                   label="Traefik File System"
//                   isActive={activeItem === "Traefik File System"}
//                   onClick={() => setActiveItem("Traefik File System")}
//                 />
//                 <MenuItem
//                   icon={<DockerIcon />}
//                   label="Docker"
//                   isActive={activeItem === "Docker"}
//                   onClick={() => setActiveItem("Docker")}
//                 />
//                 <MenuItem
//                   icon={<Layers size={16} />}
//                   label="Swarm"
//                   isActive={activeItem === "Swarm"}
//                   onClick={() => setActiveItem("Swarm")}
//                 />
//                 <MenuItem
//                   icon={<Mail size={16} />}
//                   label="Requests"
//                   isActive={activeItem === "Requests"}
//                   onClick={() => setActiveItem("Requests")}
//                 />
//               </ul>
//             )}
//           </div>

//           {/* Settings Section */}
//           <div>
//             <SectionHeader
//               icon={<Settings size={14} />}
//               title="Settings"
//               onClick={() => toggleSection("Settings")}
//               isOpen={openSections["Settings"]}
//             />
//             {openSections["Settings"] && (
//               <ul className="space-y-1">
//                 <MenuItem
//                   icon={<Server size={16} />}
//                   label="Web Server"
//                   isActive={activeItem === "Web Server"}
//                   onClick={() => setActiveItem("Web Server")}
//                 />
//                 <MenuItem
//                   icon={<User size={16} />}
//                   label="Profile"
//                   isActive={activeItem === "Profile"}
//                   onClick={() => setActiveItem("Profile")}
//                 />
//                 <MenuItem
//                   icon={<Network size={16} />}
//                   label="Remote Servers"
//                   isActive={activeItem === "Remote Servers"}
//                   onClick={() => setActiveItem("Remote Servers")}
//                 />
//                 <MenuItem
//                   icon={<User size={16} />}
//                   label="Users"
//                   isActive={activeItem === "Users"}
//                   onClick={() => setActiveItem("Users")}
//                 />
//                 <MenuItem
//                   icon={<KeyRound size={16} />}
//                   label="SSH Keys"
//                   isActive={activeItem === "SSH Keys"}
//                   onClick={() => setActiveItem("SSH Keys")}
//                 />
//                 <MenuItem
//                   icon={<GitBranch size={16} />}
//                   label="Git"
//                   isActive={activeItem === "Git"}
//                   onClick={() => setActiveItem("Git")}
//                 />
//                 <MenuItem
//                   icon={<Package size={16} />}
//                   label="Registry"
//                   isActive={activeItem === "Registry"}
//                   onClick={() => setActiveItem("Registry")}
//                 />
//                 <MenuItem
//                   icon={<Cloud size={16} />}
//                   label="S3 Destinations"
//                   isActive={activeItem === "S3 Destinations"}
//                   onClick={() => setActiveItem("S3 Destinations")}
//                 />
//                 <MenuItem
//                   icon={<ShieldCheck size={16} />}
//                   label="Certificates"
//                   isActive={activeItem === "Certificates"}
//                   onClick={() => setActiveItem("Certificates")}
//                 />
//                 <MenuItem
//                   icon={<Layers size={16} />}
//                   label="Cluster"
//                   isActive={activeItem === "Cluster"}
//                   onClick={() => setActiveItem("Cluster")}
//                 />
//                 <MenuItem
//                   icon={<Bell size={16} />}
//                   label="Notifications"
//                   isActive={activeItem === "Notifications"}
//                   onClick={() => setActiveItem("Notifications")}
//                 />
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="p-4 border-t border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm">
//         <div className="mb-3">
//           <h2 className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Account</h2>
//         </div>
//         <div className="group bg-zinc-800/50 hover:bg-zinc-800 rounded-xl p-3 cursor-pointer transition-all duration-200 border border-zinc-700/50 hover:border-zinc-600/50">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="relative">
//                 <div className="bg-[#4a4a4b] p-2 rounded-full">
//                   <User size={16} className="text-white" />
//                 </div>
//                 <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
//               </div>
//               <div className="text-sm">
//                 <p className="font-medium text-white group-hover:text-zinc-100 transition-colors">
//                   Account
//                 </p>
//                 <p className="text-xs text-zinc-400 truncate max-w-32">
//                   vijaypvk001@gmail.com
//                 </p>
//               </div>
//             </div>
//             <ChevronDown size={16} className="text-zinc-400 group-hover:text-zinc-300 transition-all duration-200 group-hover:rotate-180" />
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }

// function SectionHeader({ icon, title, onClick, isOpen }) {
//   return (
//     <div className="flex items-center gap-2 mb-3 px-3 cursor-pointer select-none" onClick={onClick}>
//       <div className="text-zinc-400">{icon}</div>
//       <h2 className="text-xs text-zinc-400 uppercase tracking-wider font-semibold flex-1">{title}</h2>
//       {isOpen ? <ChevronUp size={14} className="text-zinc-400" /> : <ChevronRight size={14} className="text-zinc-400" />}
//     </div>
//   );
// }

// function MenuItem({ icon, label, isActive, onClick }) {
//   return (
//     <li
//       onClick={onClick}
//       className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200 ease-in-out
//         ${isActive
//           ? "bg-zinc-800 text-white border-l-2 border-[#4a4a4b] shadow-lg"
//           : "text-zinc-300 hover:bg-zinc-800/50 hover:text-white"
//         }
//       `}
//     >
//       <div className={`
//         transition-all duration-200 
//         ${isActive ? "text-blue-600 scale-110" : "text-zinc-400 group-hover:text-zinc-300 group-hover:scale-105"}
//       `}>
//         {icon}
//       </div>
//       <span className={`transition-all duration-200 ${isActive ? "font-semibold" : "group-hover:translate-x-1"}`}>
//         {label}
//       </span>
//       {isActive && (
//         <div className="ml-auto w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
//       )}
//     </li>
//   );
// }
"use client";

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
  ChevronRight,
  ChevronUp,
  Home,
  Settings,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// Mock Docker icon component using Server icon
const DockerIcon = () => <Server size={16} />;

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname(); // ✅ Get current route
  const [openSections, setOpenSections] = useState({
    Home: true,
    Settings: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const isActive = (path) => pathname === path;

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-zinc-900 text-white flex flex-col z-50 border-r border-zinc-800/50 backdrop-blur-sm">
      <div className="flex-1 overflow-y-auto">
        {/* Logo */}
        <div
          className="px-6 py-6 border-b border-zinc-800/50 cursor-pointer"
          onClick={() => router.push("/pages/home")}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src="/pulse.png" alt="Logo" />
            </div>
            <h1 className="text-xl font-bold bg-white bg-clip-text text-transparent">
              Cloudpulse
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 bg-zinc-800 px-2 py-1 rounded-full">
              v0.18.4
            </span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="px-4 py-4 space-y-6">
          <MenuItem
            icon={<Layers size={16} />}
            label="Get Started"
            isActive={isActive("/pages/home")}
            onClick={() => router.push("/pages/home")}
          />

          {/* Home Section */}
          <div>
            <SectionHeader
              icon={<Home size={14} />}
              title="Home"
              onClick={() => toggleSection("Home")}
              isOpen={openSections["Home"]}
            />
            {openSections["Home"] && (
              <ul className="space-y-1">
                <MenuItem
                  icon={<Folder size={16} />}
                  label="Pages"
                  isActive={isActive("/pages/hostingpage")}
                  onClick={() => router.push("/pages/hostingpage")}
                />
                <MenuItem
                  icon={<Monitor size={16} />}
                  label="Monitoring"
                  isActive={isActive("/pages/monitoring")}
                  onClick={() => router.push("/pages/monitoring")}
                />
                <MenuItem
                  icon={<HardDrive size={16} />}
                  label="Traefik File System"
                  isActive={isActive("/pages/traefik")}
                  onClick={() => router.push("/pages/traefik")}
                />
                <MenuItem
                  icon={<DockerIcon />}
                  label="Docker"
                  isActive={isActive("/pages/docker")}
                  onClick={() => router.push("/pages/docker")}
                />
                <MenuItem
                  icon={<Layers size={16} />}
                  label="Swarm"
                  isActive={isActive("/pages/swarm")}
                  onClick={() => router.push("/pages/swarm")}
                />
                <MenuItem
                  icon={<Mail size={16} />}
                  label="Requests"
                  isActive={isActive("/pages/requests")}
                  onClick={() => router.push("/pages/requests")}
                />
              </ul>
            )}
          </div>

          {/* Settings Section */}
          <div>
            <SectionHeader
              icon={<Settings size={14} />}
              title="Settings"
              onClick={() => toggleSection("Settings")}
              isOpen={openSections["Settings"]}
            />
            {openSections["Settings"] && (
              <ul className="space-y-1">
                <MenuItem
                  icon={<Server size={16} />}
                  label="Web Server"
                  isActive={isActive("/settings/web-server")}
                  onClick={() => router.push("/settings/web-server")}
                />
                <MenuItem
                  icon={<User size={16} />}
                  label="Profile"
                  isActive={isActive("/settings/profile")}
                  onClick={() => router.push("/settings/profile")}
                />
                <MenuItem
                  icon={<Network size={16} />}
                  label="Remote Servers"
                  isActive={isActive("/settings/remote-servers")}
                  onClick={() => router.push("/settings/remote-servers")}
                />
                <MenuItem
                  icon={<User size={16} />}
                  label="Users"
                  isActive={isActive("/settings/users")}
                  onClick={() => router.push("/settings/users")}
                />
                <MenuItem
                  icon={<KeyRound size={16} />}
                  label="SSH Keys"
                  isActive={isActive("/settings/ssh-keys")}
                  onClick={() => router.push("/settings/ssh-keys")}
                />
                <MenuItem
                  icon={<GitBranch size={16} />}
                  label="Git"
                  isActive={isActive("/settings/git")}
                  onClick={() => router.push("/settings/git")}
                />
                <MenuItem
                  icon={<Package size={16} />}
                  label="Registry"
                  isActive={isActive("/settings/registry")}
                  onClick={() => router.push("/settings/registry")}
                />
                <MenuItem
                  icon={<Cloud size={16} />}
                  label="S3 Destinations"
                  isActive={isActive("/settings/s3")}
                  onClick={() => router.push("/settings/s3")}
                />
                <MenuItem
                  icon={<ShieldCheck size={16} />}
                  label="Certificates"
                  isActive={isActive("/settings/certificates")}
                  onClick={() => router.push("/settings/certificates")}
                />
                <MenuItem
                  icon={<Layers size={16} />}
                  label="Cluster"
                  isActive={isActive("/settings/cluster")}
                  onClick={() => router.push("/settings/cluster")}
                />
                <MenuItem
                  icon={<Bell size={16} />}
                  label="Notifications"
                  isActive={isActive("/settings/notifications")}
                  onClick={() => router.push("/settings/notifications")}
                />
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm">
        <div className="mb-3">
          <h2 className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Account</h2>
        </div>
        <div className="group bg-zinc-800/50 hover:bg-zinc-800 rounded-xl p-3 cursor-pointer transition-all duration-200 border border-zinc-700/50 hover:border-zinc-600/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="bg-[#4a4a4b] p-2 rounded-full">
                  <User size={16} className="text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
              </div>
              <div className="text-sm">
                <p className="font-medium text-white group-hover:text-zinc-100 transition-colors">
                  Account
                </p>
                <p className="text-xs text-zinc-400 truncate max-w-32">
                  vijaypvk001@gmail.com
                </p>
              </div>
            </div>
            <ChevronDown size={16} className="text-zinc-400 group-hover:text-zinc-300 transition-all duration-200 group-hover:rotate-180" />
          </div>
        </div>
      </div>
    </aside>
  );
}

function SectionHeader({ icon, title, onClick, isOpen }) {
  return (
    <div className="flex items-center gap-2 mb-3 px-3 cursor-pointer select-none" onClick={onClick}>
      <div className="text-zinc-400">{icon}</div>
      <h2 className="text-xs text-zinc-400 uppercase tracking-wider font-semibold flex-1">{title}</h2>
      {isOpen ? <ChevronUp size={14} className="text-zinc-400" /> : <ChevronRight size={14} className="text-zinc-400" />}
    </div>
  );
}

function MenuItem({ icon, label, isActive, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200 ease-in-out
        ${isActive
          ? "bg-zinc-800 text-white border-l-2 border-[#4a4a4b] shadow-lg"
          : "text-zinc-300 hover:bg-zinc-800/50 hover:text-white"
        }
      `}
    >
      <div className={`
        transition-all duration-200 
        ${isActive ? "text-blue-600 scale-110" : "text-zinc-400 group-hover:text-zinc-300 group-hover:scale-105"}
      `}>
        {icon}
      </div>
      <span className={`transition-all duration-200 ${isActive ? "font-semibold" : "group-hover:translate-x-1"}`}>
        {label}
      </span>
      {isActive && (
        <div className="ml-auto w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
      )}
    </li>
  );
}
