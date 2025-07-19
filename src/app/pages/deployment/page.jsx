
// // "use client";
// // import React, { useState } from "react";
// // import {
// //     ChevronLeft,
// //     ChevronDown,
// //     ChevronRight,
// //     Download,
// //     Copy,
// //     AlertTriangle,
// //     GitBranch,
// //     ExternalLink,
// // } from "lucide-react";
// // import Sidebar from "@/app/components/sidebar";

// // const TABS = ["Build log", "Functions", "Redirects", "Headers"];

// // const SECTION_DATA = [
// //     { title: "Initializing build environment", duration: "2s" },
// //     { title: "Cloning git repository", duration: "2s" },
// //     { title: "Building application", duration: "1m 6s", hasError: true },
// //     { title: "Deploying to Cloudflare's global network", duration: "—" },
// // ];

// // const BUILD_LOG_ENTRIES = [
// //     { time: "20:14:16.625", message: "Checking for configuration in a Wrangler configuration file (BETA)" },
// //     { time: "20:14:17.146", message: "No wrangler.toml file found. Continuing." },
// //     { time: "20:14:17.159", message: "Detected the following tools from environment: npm@10.5.2, node@22.16.0" },
// //     { time: "20:14:17.189", message: "Installing project dependencies: npm clean-install --progress=false" },
// //     { time: "20:14:21.304", message: "npm warn deprecated react-tsparticles@2.12.2" },
// //     { time: "20:14:26.543", message: "npm warn deprecated tsparticles-engine@2.12.0" },
// //     { time: "20:14:39.167", message: "added 558 packages, and audited 559 packages in 16s" },
// //     { time: "20:14:39.167", message: "165 packages are looking for funding" },
// //     { time: "20:14:39.167", message: "run `npm fund` for details" },
// //     { time: "20:14:39.168", message: "found 0 vulnerabilities" },
// //     { time: "20:14:34.169", message: "npm warn exec The following package was not found and will be installed: @cloudflare/next-on-pages@1.19.12" },
// //     { time: "20:14:39.140", message: "Executing user command: npm @cloudflare/next-on-pages@1" },
// // ];

// // export default function CloudflareDeploymentDashboard() {
// //     const [activeTab, setActiveTab] = useState("Build log");
// //     const [expandedSections, setExpandedSections] = useState({
// //         "Initializing build environment": true,
// //         "Cloning git repository": true,
// //         "Building application": true,
// //         "Deploying to Cloudflare's global network": false,
// //     });

// //     const toggleSection = (title) =>
// //         setExpandedSections((prev) => ({
// //             ...prev,
// //             [title]: !prev[title],
// //         }));

// //     const renderBuildLog = () => (
// //         <div className="bg-[#18181b] rounded-lg">
// //             <div className="p-4 border-b border-gray-700">
// //                 <h3 className="text-lg font-semibold">Build log</h3>
// //             </div>
// //             <div className="p-4 space-y-2">
// //                 {SECTION_DATA.map(({ title, duration, hasError }) => {
// //                     const isOpen = expandedSections[title];
// //                     return (
// //                         <div key={title}>
// //                             <div
// //                                 className="flex items-center cursor-pointer hover:bg-gray-700 p-2 rounded"
// //                                 onClick={() => toggleSection(title)}
// //                             >
// //                                 {isOpen ? (
// //                                     <ChevronDown className="w-4 h-4 mr-2" />
// //                                 ) : (
// //                                     <ChevronRight className="w-4 h-4 mr-2" />
// //                                 )}
// //                                 {hasError && <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />}
// //                                 <span>{title}</span>
// //                                 <span className="ml-auto text-gray-400">{duration}</span>
// //                             </div>

// //                             {isOpen && title === "Building application" && (
// //                                 <div className="bg-[#27272a] rounded-lg p-4 mt-2 font-mono text-sm overflow-auto max-h-64 border border-gray-700">
// //                                     {BUILD_LOG_ENTRIES.map((entry, i) => (
// //                                         <div key={i} className="flex">
// //                                             <span className="text-gray-500 mr-4 whitespace-nowrap">{entry.time}</span>
// //                                             <span className="text-gray-300">{entry.message}</span>
// //                                         </div>
// //                                     ))}
// //                                 </div>
// //                             )}
// //                         </div>
// //                     );
// //                 })}
// //                 <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-700">
// //                     <button className="flex items-center text-gray-400 hover:text-white text-sm">
// //                         <Download className="w-4 h-4 mr-1" />
// //                         Download log
// //                     </button>
// //                     <button className="flex items-center text-gray-400 hover:text-white text-sm">
// //                         <Copy className="w-4 h-4 mr-1" />
// //                         Copy log
// //                     </button>
// //                 </div>
// //             </div>
// //         </div>
// //     );

// //     const renderEmptyState = (label) => (
// //         <div className="bg-gray-800 rounded-lg p-6">
// //             <h3 className="text-lg font-semibold mb-4">{label}</h3>
// //             <p className="text-gray-400">No {label.toLowerCase()} configured for this project.</p>
// //         </div>
// //     );

// //     return (
// //         <div className="bg-black text-white min-h-screen p-6">
// //             <div className="max-w-7xl mx-auto flex">
// //                 <Sidebar />

// //                 <div className="flex-1 ml-64">
// //                     {/* Header */}
// //                     <div className="text-sm text-gray-400 flex items-center space-x-2 mx-6 mb-8 ">
// //                         <span><a href="/pages/hostingpage">Pages</a></span>
// //                         <span>›</span>
// //                         <span>Services</span>
// //                     </div>

// //                     {/* Deployment Details */}
// //                     <div className="bg-[#18181b] rounded-lg border border-gray-700 p-6 mb-6">
// //                         <div className="flex justify-between items-start mb-4">
// //                             <h2 className="text-xl font-semibold">Deployment details</h2>
// //                             <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm flex items-center">
// //                                 Manage deployment
// //                                 <ChevronDown className="w-4 h-4 ml-1" />
// //                             </button>
// //                         </div>

// //                         <div className="inline-block bg-blue-600 px-3 py-1 rounded-full text-xs font-medium mb-4">
// //                             Production
// //                         </div>

// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                             <div className="space-y-3">
// //                                 <div className="flex items-center">
// //                                     <span className="text-gray-400 w-20">Repository:</span>
// //                                     <span>Vijayvik/Cloudpulse.hosting</span>
// //                                 </div>
// //                                 <div className="flex items-center">
// //                                     <span className="text-gray-400 w-20">Branch:</span>
// //                                     <GitBranch className="w-4 h-4 mr-2" />
// //                                     <span className="font-mono">main</span>
// //                                     <span className="text-blue-400 ml-2 font-mono">4c23783</span>
// //                                 </div>
// //                             </div>
// //                             <div className="space-y-3">
// //                                 <div className="flex items-center">
// //                                     <span className="text-gray-400 w-20">Status:</span>
// //                                     <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
// //                                     <span className="text-red-500">Failed</span>
// //                                     <span className="text-gray-400 ml-2">8:15 PM July 13, 2025</span>
// //                                 </div>
// //                                 <div className="flex items-center">
// //                                     <span className="text-gray-400 w-20">Duration:</span>
// //                                     <span>1m 9s</span>
// //                                 </div>
// //                             </div>
// //                         </div>

// //                         <div className="mt-4 space-x-4 flex items-center">
// //                             <button className="flex items-center text-gray-400 hover:text-white">
// //                                 <ChevronRight className="w-4 h-4 mr-1" />
// //                                 Build settings
// //                             </button>

// //                             <a
// //                                 href="https://cloudpulse.dev/preview"
// //                                 target="_blank"
// //                                 rel="noopener noreferrer"
// //                                 className="flex items-center text-blue-500 hover:underline"
// //                             >
// //                                 View preview
// //                                 <ExternalLink className="w-4 h-4 ml-1" />
// //                             </a>
// //                         </div>
// //                     </div>

// //                     {/* Tabs */}
// //                     <div className="flex space-x-6 mb-6 border-b border-gray-700">
// //                         {TABS.map((tab) => (
// //                             <button
// //                                 key={tab}
// //                                 onClick={() => setActiveTab(tab)}
// //                                 className={`pb-3 px-1 text-sm font-medium ${activeTab === tab
// //                                         ? "text-blue-400 border-b-2 border-blue-400"
// //                                         : "text-gray-400 hover:text-white"
// //                                     }`}
// //                             >
// //                                 {tab}
// //                             </button>
// //                         ))}
// //                     </div>

// //                     {/* Tab Content */}
// //                     {activeTab === "Build log" && renderBuildLog()}
// //                     {activeTab !== "Build log" && renderEmptyState(activeTab)}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }
// "use client";
// import React, { useState } from "react";
// import {
//     ChevronLeft,
//     ChevronDown,
//     ChevronRight,
//     Download,
//     Copy,
//     AlertTriangle,
//     GitBranch,
//     ExternalLink,
//     CheckCircle,
//     Clock,
//     Globe,
//     Activity,
//     Settings,
// } from "lucide-react";

// const TABS = ["Build log", "Functions", "Redirects", "Headers"];

// // Mock sidebar component
// const Sidebar = () => (
//     <div className="fixed left-0 top-0 h-full w-64 bg-[#18181b] border-r border-gray-700 p-4">
//         <div className="text-lg font-semibold mb-6">CloudPulse</div>
//         <nav className="space-y-2">
//             <div className="text-blue-400 bg-blue-600/20 px-3 py-2 rounded">Pages</div>
//             <div className="text-gray-400 px-3 py-2 hover:text-white cursor-pointer">Workers</div>
//             <div className="text-gray-400 px-3 py-2 hover:text-white cursor-pointer">Analytics</div>
//             <div className="text-gray-400 px-3 py-2 hover:text-white cursor-pointer">Settings</div>
//         </nav>
//     </div>
// );

// const FAILED_SECTION_DATA = [
//     { title: "Initializing build environment", duration: "2s", status: "completed" },
//     { title: "Cloning git repository", duration: "2s", status: "completed" },
//     { title: "Building application", duration: "1m 6s", status: "failed", hasError: true },
//     { title: "Deploying to Cloudflare's global network", duration: "—", status: "skipped" },
// ];

// const SUCCESS_SECTION_DATA = [
//     { title: "Initializing build environment", duration: "2s", status: "completed" },
//     { title: "Cloning git repository", duration: "3s", status: "completed" },
//     { title: "Building application", duration: "1m 24s", status: "completed" },
//     { title: "Deploying to Cloudflare's global network", duration: "8s", status: "completed" },
//     { title: "Invalidating cache", duration: "2s", status: "completed" },
// ];

// const FAILED_BUILD_LOG_ENTRIES = [
//     { time: "20:14:16.625", message: "Checking for configuration in a Wrangler configuration file (BETA)", type: "info" },
//     { time: "20:14:17.146", message: "No wrangler.toml file found. Continuing.", type: "info" },
//     { time: "20:14:17.159", message: "Detected the following tools from environment: npm@10.5.2, node@22.16.0", type: "info" },
//     { time: "20:14:17.189", message: "Installing project dependencies: npm clean-install --progress=false", type: "info" },
//     { time: "20:14:21.304", message: "npm warn deprecated react-tsparticles@2.12.2", type: "warning" },
//     { time: "20:14:26.543", message: "npm warn deprecated tsparticles-engine@2.12.0", type: "warning" },
//     { time: "20:14:39.167", message: "added 558 packages, and audited 559 packages in 16s", type: "info" },
//     { time: "20:14:39.167", message: "165 packages are looking for funding", type: "info" },
//     { time: "20:14:39.167", message: "run `npm fund` for details", type: "info" },
//     { time: "20:14:39.168", message: "found 0 vulnerabilities", type: "info" },
//     { time: "20:14:34.169", message: "npm warn exec The following package was not found and will be installed: @cloudflare/next-on-pages@1.19.12", type: "warning" },
//     { time: "20:14:39.140", message: "Executing user command: npm @cloudflare/next-on-pages@1", type: "info" },
//     { time: "20:15:45.234", message: "Error: Build failed with exit code 1", type: "error" },
//     { time: "20:15:45.235", message: "Module not found: Can't resolve './components/missing-component'", type: "error" },
// ];

// const SUCCESS_BUILD_LOG_ENTRIES = [
//     { time: "19:32:10.123", message: "Checking for configuration in a Wrangler configuration file (BETA)", type: "info" },
//     { time: "19:32:10.456", message: "No wrangler.toml file found. Continuing.", type: "info" },
//     { time: "19:32:10.578", message: "Detected the following tools from environment: npm@10.5.2, node@22.16.0", type: "info" },
//     { time: "19:32:10.689", message: "Installing project dependencies: npm clean-install --progress=false", type: "info" },
//     { time: "19:32:25.234", message: "added 558 packages, and audited 559 packages in 14s", type: "info" },
//     { time: "19:32:25.235", message: "found 0 vulnerabilities", type: "info" },
//     { time: "19:32:25.456", message: "Building production bundle...", type: "info" },
//     { time: "19:33:48.789", message: "Build completed successfully", type: "success" },
//     { time: "19:33:49.012", message: "Optimizing static assets...", type: "info" },
//     { time: "19:33:51.345", message: "Deploying to Cloudflare Workers...", type: "info" },
//     { time: "19:33:59.678", message: "Deployment completed successfully", type: "success" },
//     { time: "19:34:01.234", message: "Cache invalidated across all edge locations", type: "info" },
// ];

// export default function CloudflareDeploymentDashboard() {
//     const [activeTab, setActiveTab] = useState("Build log");
//     const [deploymentStatus, setDeploymentStatus] = useState("failed"); // "success" or "failed"
//     const [expandedSections, setExpandedSections] = useState({
//         "Initializing build environment": true,
//         "Cloning git repository": true,
//         "Building application": true,
//         "Deploying to Cloudflare's global network": false,
//         "Invalidating cache": false,
//     });

//     const isSuccess = deploymentStatus === "success";
//     const sectionData = isSuccess ? SUCCESS_SECTION_DATA : FAILED_SECTION_DATA;
//     const buildLogEntries = isSuccess ? SUCCESS_BUILD_LOG_ENTRIES : FAILED_BUILD_LOG_ENTRIES;

//     const toggleSection = (title) =>
//         setExpandedSections((prev) => ({
//             ...prev,
//             [title]: !prev[title],
//         }));

//     const getStatusIcon = (status) => {
//         switch (status) {
//             case "completed":
//                 return <CheckCircle className="w-4 h-4 mr-2 text-green-500" />;
//             case "failed":
//                 return <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />;
//             case "skipped":
//                 return <Clock className="w-4 h-4 mr-2 text-gray-500" />;
//             default:
//                 return null;
//         }
//     };

//     const getLogMessageColor = (type) => {
//         switch (type) {
//             case "error":
//                 return "text-red-400";
//             case "warning":
//                 return "text-yellow-400";
//             case "success":
//                 return "text-green-400";
//             default:
//                 return "text-gray-300";
//         }
//     };

//     const renderBuildLog = () => (
//         <div className="bg-[#18181b] rounded-lg">
//             <div className="p-4 border-b border-gray-700">
//                 <div className="flex items-center justify-between">
//                     <h3 className="text-lg font-semibold">Build log</h3>
//                     <div className="flex items-center space-x-2">
//                         <button
//                             onClick={() => setDeploymentStatus("success")}
//                             className={`px-3 py-1 rounded text-sm ${
//                                 isSuccess ? "bg-green-600 text-white" : "bg-gray-700 text-gray-300"
//                             }`}
//                         >
//                             Success
//                         </button>
//                         <button
//                             onClick={() => setDeploymentStatus("failed")}
//                             className={`px-3 py-1 rounded text-sm ${
//                                 !isSuccess ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300"
//                             }`}
//                         >
//                             Failed
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <div className="p-4 space-y-2">
//                 {sectionData.map(({ title, duration, status, hasError }) => {
//                     const isOpen = expandedSections[title];
//                     return (
//                         <div key={title}>
//                             <div
//                                 className="flex items-center cursor-pointer hover:bg-gray-700 p-2 rounded"
//                                 onClick={() => toggleSection(title)}
//                             >
//                                 {isOpen ? (
//                                     <ChevronDown className="w-4 h-4 mr-2" />
//                                 ) : (
//                                     <ChevronRight className="w-4 h-4 mr-2" />
//                                 )}
//                                 {getStatusIcon(status)}
//                                 <span className="flex-1">{title}</span>
//                                 <span className="text-gray-400">{duration}</span>
//                             </div>

//                             {isOpen && (title === "Building application" || (isSuccess && title === "Deploying to Cloudflare's global network")) && (
//                                 <div className="bg-[#27272a] rounded-lg p-4 mt-2 font-mono text-sm overflow-auto max-h-64 border border-gray-700">
//                                     {buildLogEntries.map((entry, i) => (
//                                         <div key={i} className="flex">
//                                             <span className="text-gray-500 mr-4 whitespace-nowrap">{entry.time}</span>
//                                             <span className={getLogMessageColor(entry.type)}>{entry.message}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     );
//                 })}
//                 <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-700">
//                     <button className="flex items-center text-gray-400 hover:text-white text-sm">
//                         <Download className="w-4 h-4 mr-1" />
//                         Download log
//                     </button>
//                     <button className="flex items-center text-gray-400 hover:text-white text-sm">
//                         <Copy className="w-4 h-4 mr-1" />
//                         Copy log
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );

//     const renderEmptyState = (label) => (
//         <div className="bg-gray-800 rounded-lg p-6">
//             <h3 className="text-lg font-semibold mb-4">{label}</h3>
//             <p className="text-gray-400">No {label.toLowerCase()} configured for this project.</p>
//         </div>
//     );

//     const getDeploymentStatusBadge = () => {
//         if (isSuccess) {
//             return (
//                 <div className="flex items-center space-x-2">
//                     <CheckCircle className="w-4 h-4 text-green-500" />
//                     <span className="text-green-500">Success</span>
//                     <span className="text-gray-400 ml-2">7:32 PM July 13, 2025</span>
//                 </div>
//             );
//         } else {
//             return (
//                 <div className="flex items-center space-x-2">
//                     <AlertTriangle className="w-4 h-4 text-red-500" />
//                     <span className="text-red-500">Failed</span>
//                     <span className="text-gray-400 ml-2">8:15 PM July 13, 2025</span>
//                 </div>
//             );
//         }
//     };

//     return (
//         <div className="bg-black text-white min-h-screen p-6">
//             <div className="max-w-7xl mx-auto flex">
//                 <Sidebar />

//                 <div className="flex-1 ml-64">
//                     {/* Header */}
//                     <div className="text-sm text-gray-400 flex items-center space-x-2 mx-6 mb-8">
//                         <span><a href="/pages/hostingpage" className="hover:text-white">Pages</a></span>
//                         <span>›</span>
//                         <span>Services</span>
//                     </div>

//                     {/* Deployment Details */}
//                     <div className="bg-[#18181b] rounded-lg border border-gray-700 p-6 mb-6">
//                         <div className="flex justify-between items-start mb-4">
//                             <h2 className="text-xl font-semibold">Deployment details</h2>
//                             <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm flex items-center">
//                                 Manage deployment
//                                 <ChevronDown className="w-4 h-4 ml-1" />
//                             </button>
//                         </div>

//                         <div className="inline-block bg-blue-600 px-3 py-1 rounded-full text-xs font-medium mb-4">
//                             Production
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="space-y-3">
//                                 <div className="flex items-center">
//                                     <span className="text-gray-400 w-20">Repository:</span>
//                                     <span>Vijayvik/Cloudpulse.hosting</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <span className="text-gray-400 w-20">Branch:</span>
//                                     <GitBranch className="w-4 h-4 mr-2" />
//                                     <span className="font-mono">main</span>
//                                     <span className="text-blue-400 ml-2 font-mono">4c23783</span>
//                                 </div>
//                                 {isSuccess && (
//                                     <div className="flex items-center">
//                                         <span className="text-gray-400 w-20">Domain:</span>
//                                         <Globe className="w-4 h-4 mr-2" />
//                                         <span className="text-blue-400">cloudpulse.dev</span>
//                                     </div>
//                                 )}
//                             </div>
//                             <div className="space-y-3">
//                                 <div className="flex items-center">
//                                     <span className="text-gray-400 w-20">Status:</span>
//                                     {getDeploymentStatusBadge()}
//                                 </div>
//                                 <div className="flex items-center">
//                                     <span className="text-gray-400 w-20">Duration:</span>
//                                     <span>{isSuccess ? "1m 52s" : "1m 9s"}</span>
//                                 </div>
//                                 {isSuccess && (
//                                     <div className="flex items-center">
//                                         <span className="text-gray-400 w-20">Performance:</span>
//                                         <Activity className="w-4 h-4 mr-2 text-green-500" />
//                                         <span className="text-green-500">Excellent</span>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="mt-4 space-x-4 flex items-center">
//                             <button className="flex items-center text-gray-400 hover:text-white">
//                                 <Settings className="w-4 h-4 mr-1" />
//                                 Build settings
//                             </button>

//                             {isSuccess && (
//                                 <a
//                                     href="https://cloudpulse.dev"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="flex items-center text-blue-500 hover:underline"
//                                 >
//                                     View live site
//                                     <ExternalLink className="w-4 h-4 ml-1" />
//                                 </a>
//                             )}

//                             {!isSuccess && (
//                                 <a
//                                     href="https://cloudpulse.dev/preview"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="flex items-center text-blue-500 hover:underline"
//                                 >
//                                     View preview
//                                     <ExternalLink className="w-4 h-4 ml-1" />
//                                 </a>
//                             )}

//                             {isSuccess && (
//                                 <button className="flex items-center text-gray-400 hover:text-white">
//                                     <Copy className="w-4 h-4 mr-1" />
//                                     Copy URL
//                                 </button>
//                             )}
//                         </div>
//                     </div>

//                     {/* Tabs */}
//                     <div className="flex space-x-6 mb-6 border-b border-gray-700">
//                         {TABS.map((tab) => (
//                             <button
//                                 key={tab}
//                                 onClick={() => setActiveTab(tab)}
//                                 className={`pb-3 px-1 text-sm font-medium ${
//                                     activeTab === tab
//                                         ? "text-blue-400 border-b-2 border-blue-400"
//                                         : "text-gray-400 hover:text-white"
//                                 }`}
//                             >
//                                 {tab}
//                             </button>
//                         ))}
//                     </div>

//                     {/* Tab Content */}
//                     {activeTab === "Build log" && renderBuildLog()}
//                     {activeTab !== "Build log" && renderEmptyState(activeTab)}
//                 </div>
//             </div>
//         </div>
//     );
// }


// "use client";
// import React, { useState } from "react";
// import {
//     ChevronDown,
//     ChevronRight,
//     Download,
//     Copy,
//     AlertTriangle,
//     GitBranch,
//     ExternalLink,
//     CheckCircle,
//     Clock,
//     Globe,
//     Activity,
//     Settings,
//     RefreshCw,
// } from "lucide-react";
// import Sidebar from "@/app/components/sidebar"; // Assuming you have a Sidebar component

// const TABS = ["Build log", "Functions", "Redirects", "Headers"];



// export default function CloudflareDeploymentDashboard() {
//     const [activeTab, setActiveTab] = useState("Build log");
//     const [deploymentStatus, setDeploymentStatus] = useState("idle"); // idle | building | success | failed
//     const [logMessages, setLogMessages] = useState([]);
//     const [duration, setDuration] = useState("—");

//     const triggerBuild = async () => {
//         setDeploymentStatus("building");
//         setLogMessages([]);
//         const start = Date.now();

//         try {
//             const res = await fetch("http://localhost:4000/api/build-and-serve", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ projectName: "vijay_protfolio" }),
//             });

//             const data = await res.json();
//             const timeTaken = ((Date.now() - start) / 1000).toFixed(2) + "s";

//             if (res.ok) {
//                 setDeploymentStatus("success");
//                 setDuration(timeTaken);
//                 setLogMessages([
//                     { type: "success", time: new Date().toLocaleTimeString(), message: "Build and deployment completed." },
//                 ]);
//             } else {
//                 setDeploymentStatus("failed");
//                 setDuration(timeTaken);
//                 setLogMessages([
//                     { type: "error", time: new Date().toLocaleTimeString(), message: data.error || "Build failed." },
//                 ]);
//             }
//         } catch (err) {
//             setDeploymentStatus("failed");
//             setDuration("—");
//             setLogMessages([
//                 { type: "error", time: new Date().toLocaleTimeString(), message: err.message },
//             ]);
//         }
//     };

//     const getStatusBadge = () => {
//         const common = "flex items-center space-x-2";
//         switch (deploymentStatus) {
//             case "success":
//                 return (
//                     <div className={common}>
//                         <CheckCircle className="w-4 h-4 text-green-500" />
//                         <span className="text-green-500">Success</span>
//                     </div>
//                 );
//             case "failed":
//                 return (
//                     <div className={common}>
//                         <AlertTriangle className="w-4 h-4 text-red-500" />
//                         <span className="text-red-500">Failed</span>
//                     </div>
//                 );
//             case "building":
//                 return (
//                     <div className={common}>
//                         <Clock className="w-4 h-4 text-yellow-400 animate-spin" />
//                         <span className="text-yellow-400">Building...</span>
//                     </div>
//                 );
//             default:
//                 return <span className="text-gray-400">Idle</span>;
//         }
//     };

//     const getLogColor = (type) => {
//         switch (type) {
//             case "success":
//                 return "text-green-400";
//             case "error":
//                 return "text-red-400";
//             case "warning":
//                 return "text-yellow-400";
//             default:
//                 return "text-gray-300";
//         }
//     };

//     return (
//         <div className="bg-black text-white min-h-screen p-6">
//             <div className="max-w-7xl mx-auto flex">
//                 <Sidebar />

//                 <div className="flex-1 ml-64">
//                     {/* Header */}
//                     <div className="text-sm text-gray-400 flex items-center space-x-2 mx-6 mb-8">
//                         <span><a href="/pages/hostingpage" className="hover:text-white">Pages</a></span>
//                         <span>›</span>
//                         <span>Services</span>
//                     </div>

//                     {/* Deployment Info Card */}
//                     <div className="bg-[#18181b] rounded-lg border border-gray-700 p-6 mb-6">
//                         <div className="flex justify-between items-start mb-4">
//                             <h2 className="text-xl font-semibold">Deployment details</h2>
//                             <button
//                                 onClick={triggerBuild}
//                                 className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm flex items-center"
//                             >
//                                 <RefreshCw className="w-4 h-4 mr-2" />
//                                 Trigger Deployment
//                             </button>
//                         </div>

//                         <div className="inline-block bg-blue-600 px-3 py-1 rounded-full text-xs font-medium mb-4">
//                             Production
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="space-y-3">
//                                 <div className="flex items-center">
//                                     <span className="text-gray-400 w-20">Repository:</span>
//                                     <span>vijaypvk/vijay_protfolio</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <span className="text-gray-400 w-20">Branch:</span>
//                                     <GitBranch className="w-4 h-4 mr-2" />
//                                     <span className="font-mono">main</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <span className="text-gray-400 w-20">Domain:</span>
//                                     <Globe className="w-4 h-4 mr-2" />
//                                     <a href="http://localhost:4000/hosted/vijay_protfolio/" target="_blank" className="text-blue-400 underline">
//                                         preview 
//                                     </a>
//                                 </div>
//                             </div>
//                             <div className="space-y-3">
//                                 <div className="flex items-center">
//                                     <span className="text-gray-400 w-20">Status:</span>
//                                     {getStatusBadge()}
//                                 </div>
//                                 <div className="flex items-center">
//                                     <span className="text-gray-400 w-20">Duration:</span>
//                                     <span>{duration}</span>
//                                 </div>
//                                 {deploymentStatus === "success" && (
//                                     <div className="flex items-center">
//                                         <span className="text-gray-400 w-20">Performance:</span>
//                                         <Activity className="w-4 h-4 mr-2 text-green-500" />
//                                         <span className="text-green-500">Excellent</span>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Tabs */}
//                     <div className="flex space-x-6 mb-6 border-b border-gray-700">
//                         {TABS.map((tab) => (
//                             <button
//                                 key={tab}
//                                 onClick={() => setActiveTab(tab)}
//                                 className={`pb-3 px-1 text-sm font-medium ${
//                                     activeTab === tab
//                                         ? "text-blue-400 border-b-2 border-blue-400"
//                                         : "text-gray-400 hover:text-white"
//                                 }`}
//                             >
//                                 {tab}
//                             </button>
//                         ))}
//                     </div>

//                     {/* Tab content */}
//                     {activeTab === "Build log" ? (
//                         <div className="bg-[#18181b] rounded-lg p-4 space-y-2 border border-gray-700 font-mono text-sm">
//                             {logMessages.length === 0 ? (
//                                 <p className="text-gray-400">No logs yet. Click "Trigger Deployment" to start a build.</p>
//                             ) : (
//                                 logMessages.map((log, i) => (
//                                     <div key={i} className="flex">
//                                         <span className="text-gray-500 mr-4">{log.time}</span>
//                                         <span className={getLogColor(log.type)}>{log.message}</span>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     ) : (
//                         <div className="bg-gray-800 rounded-lg p-6">
//                             <h3 className="text-lg font-semibold mb-4">{activeTab}</h3>
//                             <p className="text-gray-400">No {activeTab.toLowerCase()} configured for this project.</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// "use client";
// import React, { useState, useEffect } from "react";
// import {
//     ChevronDown,
//     ChevronRight,
//     Download,
//     Copy,
//     AlertTriangle,
//     GitBranch,
//     ExternalLink,
//     CheckCircle,
//     Clock,
//     Globe,
//     Activity,
//     Settings,
//     RefreshCw,
// } from "lucide-react";
// import Sidebar from "@/app/components/sidebar";
// import { useSearchParams } from "next/navigation";

// const TABS = ["Build log", "Functions", "Redirects", "Headers"];

// export default function CloudflareDeploymentDashboard() {
//     const searchParams = useSearchParams();
//     const projectName = searchParams.get("projectName");

//     const [activeTab, setActiveTab] = useState("Build log");
//     const [deploymentStatus, setDeploymentStatus] = useState("idle");
//     const [logMessages, setLogMessages] = useState([]);
//     const [duration, setDuration] = useState("—");
//     const [projectConfig, setProjectConfig] = useState(null);

//     useEffect(() => {
//         if (!projectName) return;

//         fetch(`http://localhost:4000/api/get-deploy-config?projectName=${projectName}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log("✅ Config loaded:", data);
//                 setProjectConfig(data);
//             })
//             .catch((err) => {
//                 console.error("❌ Failed to load config:", err);
//             });
//     }, [projectName]);

//     const triggerBuild = async () => {
//         if (!projectConfig?.projectName) return;

//         setDeploymentStatus("building");
//         setLogMessages([]);
//         const start = Date.now();

//         try {
//             const res = await fetch("http://localhost:4000/api/build-and-serve", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ projectName: projectConfig.projectName }),
//             });

//             const data = await res.json();
//             const timeTaken = ((Date.now() - start) / 1000).toFixed(2) + "s";

//             if (res.ok) {
//                 setDeploymentStatus("success");
//                 setDuration(timeTaken);
//                 setLogMessages([
//                     {
//                         type: "success",
//                         time: new Date().toLocaleTimeString(),
//                         message: "Build and deployment completed.",
//                     },
//                 ]);
//             } else {
//                 setDeploymentStatus("failed");
//                 setDuration(timeTaken);
//                 setLogMessages([
//                     {
//                         type: "error",
//                         time: new Date().toLocaleTimeString(),
//                         message: data.error || "Build failed.",
//                     },
//                 ]);
//             }
//         } catch (err) {
//             setDeploymentStatus("failed");
//             setDuration("—");
//             setLogMessages([
//                 {
//                     type: "error",
//                     time: new Date().toLocaleTimeString(),
//                     message: err.message,
//                 },
//             ]);
//         }
//     };

//     const getStatusBadge = () => {
//         const common = "flex items-center space-x-2";
//         switch (deploymentStatus) {
//             case "success":
//                 return (
//                     <div className={common}>
//                         <CheckCircle className="w-4 h-4 text-green-500" />
//                         <span className="text-green-500">Success</span>
//                     </div>
//                 );
//             case "failed":
//                 return (
//                     <div className={common}>
//                         <AlertTriangle className="w-4 h-4 text-red-500" />
//                         <span className="text-red-500">Failed</span>
//                     </div>
//                 );
//             case "building":
//                 return (
//                     <div className={common}>
//                         <Clock className="w-4 h-4 text-yellow-400 animate-spin" />
//                         <span className="text-yellow-400">Building...</span>
//                     </div>
//                 );
//             default:
//                 return <span className="text-gray-400">Idle</span>;
//         }
//     };

//     const getLogColor = (type) => {
//         switch (type) {
//             case "success":
//                 return "text-green-400";
//             case "error":
//                 return "text-red-400";
//             case "warning":
//                 return "text-yellow-400";
//             default:
//                 return "text-gray-300";
//         }
//     };

//     return (
//         <div className="bg-black text-white min-h-screen p-6">
//             <div className="max-w-7xl mx-auto flex">
//                 <Sidebar />

//                 <div className="flex-1 ml-64">
//                     {/* Header */}
//                     <div className="text-sm text-gray-400 flex items-center space-x-2 mx-6 mb-8">
//                         <span><a href="/pages/hostingpage" className="hover:text-white">Pages</a></span>
//                         <span>›</span>
//                         <span>Services</span>
//                     </div>

//                     {/* Deployment Info Card */}
//                     <div className="bg-[#18181b] rounded-lg border border-gray-700 p-6 mb-6">
//                         <div className="flex justify-between items-start mb-4">
//                             <h2 className="text-xl font-semibold">Deployment details</h2>
//                             <button
//                                 onClick={triggerBuild}
//                                 className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm flex items-center"
//                             >
//                                 <RefreshCw className="w-4 h-4 mr-2" />
//                                 Trigger Deployment
//                             </button>
//                         </div>

//                         <div className="inline-block bg-blue-600 px-3 py-1 rounded-full text-xs font-medium mb-4">
//                             Production
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="space-y-3">
//                                 <div className="flex items-center">
//                                     <span className="text-gray-400 w-20">Repository:</span>
//                                     <span>{projectConfig?.repo || "Loading..."}</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <span className="text-gray-400 w-20">Branch:</span>
//                                     <GitBranch className="w-4 h-4 mr-2" />
//                                     <span className="font-mono">{projectConfig?.productionBranch || "main"}</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <span className="text-gray-400 w-20">Domain:</span>
//                                     <Globe className="w-4 h-4 mr-2" />
//                                     <a
//                                         href={`http://localhost:4000/hosted/${projectConfig?.projectName}/`}
//                                         target="_blank"
//                                         className="text-blue-400 underline"
//                                     >
//                                         preview
//                                     </a>
//                                 </div>
//                             </div>
//                             <div className="space-y-3">
//                                 <div className="flex items-center">
//                                     <span className="text-gray-400 w-20">Status:</span>
//                                     {getStatusBadge()}
//                                 </div>
//                                 <div className="flex items-center">
//                                     <span className="text-gray-400 w-20">Duration:</span>
//                                     <span>{duration}</span>
//                                 </div>
//                                 {deploymentStatus === "success" && (
//                                     <div className="flex items-center">
//                                         <span className="text-gray-400 w-20">Performance:</span>
//                                         <Activity className="w-4 h-4 mr-2 text-green-500" />
//                                         <span className="text-green-500">Excellent</span>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Tabs */}
//                     <div className="flex space-x-6 mb-6 border-b border-gray-700">
//                         {TABS.map((tab) => (
//                             <button
//                                 key={tab}
//                                 onClick={() => setActiveTab(tab)}
//                                 className={`pb-3 px-1 text-sm font-medium ${activeTab === tab
//                                     ? "text-blue-400 border-b-2 border-blue-400"
//                                     : "text-gray-400 hover:text-white"
//                                     }`}
//                             >
//                                 {tab}
//                             </button>
//                         ))}
//                     </div>

//                     {/* Tab content */}
//                     {activeTab === "Build log" ? (
//                         <div className="bg-[#18181b] rounded-lg p-4 space-y-2 border border-gray-700 font-mono text-sm">
//                             {logMessages.length === 0 ? (
//                                 <p className="text-gray-400">No logs yet. Click "Trigger Deployment" to start a build.</p>
//                             ) : (
//                                 logMessages.map((log, i) => (
//                                     <div key={i} className="flex">
//                                         <span className="text-gray-500 mr-4">{log.time}</span>
//                                         <span className={getLogColor(log.type)}>{log.message}</span>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     ) : (
//                         <div className="bg-gray-800 rounded-lg p-6">
//                             <h3 className="text-lg font-semibold mb-4">{activeTab}</h3>
//                             <p className="text-gray-400">No {activeTab.toLowerCase()} configured for this project.</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
// "use client";
// import React, { useState, useEffect } from "react";
// import {
//     ChevronDown,
//     ChevronRight,
//     Download,
//     Copy,
//     AlertTriangle,
//     GitBranch,
//     ExternalLink,
//     CheckCircle,
//     Clock,
//     Globe,
//     Activity,
//     Settings,
//     RefreshCw,
// } from "lucide-react";
// import Sidebar from "@/app/components/sidebar";
// import { useSearchParams } from "next/navigation";

// const TABS = ["Build log", "Functions", "Redirects", "Headers"];

// export default function CloudflareDeploymentDashboard() {
//     const searchParams = useSearchParams();
//     const projectName = searchParams.get("projectName");

//     const [activeTab, setActiveTab] = useState("Build log");
//     const [deploymentStatus, setDeploymentStatus] = useState("idle");
//     const [duration, setDuration] = useState("—");
//     const [projectConfig, setProjectConfig] = useState(null);

//     useEffect(() => {
//         if (!projectName) return;

//         fetch(`http://localhost:4000/api/get-deploy-config?projectName=${projectName}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log("✅ Config loaded:", data);
//                 setProjectConfig(data);
//             })
//             .catch((err) => {
//                 console.error("❌ Failed to load config:", err);
//             });
//     }, [projectName]);

//     const triggerBuild = async () => {
//         if (!projectConfig?.projectName) return;

//         setDeploymentStatus("building");
//         const start = Date.now();

//         try {
//             const res = await fetch("http://localhost:4000/api/build-and-serve", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ projectName: projectConfig.projectName }),
//             });

//             const data = await res.json();
//             const timeTaken = ((Date.now() - start) / 1000).toFixed(2) + "s";

//             if (res.ok) {
//                 setDeploymentStatus("success");
//                 setDuration(timeTaken);
//             } else {
//                 setDeploymentStatus("failed");
//                 setDuration(timeTaken);
//             }
//         } catch (err) {
//             setDeploymentStatus("failed");
//             setDuration("—");
//         }
//     };

//     const getStatusBadge = () => {
//         const common = "flex items-center space-x-2";
//         switch (deploymentStatus) {
//             case "success":
//                 return (
//                     <div className={common}>
//                         <CheckCircle className="w-4 h-4 text-green-500" />
//                         <span className="text-green-500">Success</span>
//                     </div>
//                 );
//             case "failed":
//                 return (
//                     <div className={common}>
//                         <AlertTriangle className="w-4 h-4 text-red-500" />
//                         <span className="text-red-500">Failed</span>
//                     </div>
//                 );
//             case "building":
//                 return (
//                     <div className={common}>
//                         <Clock className="w-4 h-4 text-yellow-400 animate-spin" />
//                         <span className="text-yellow-400">Building...</span>
//                     </div>
//                 );
//             default:
//                 return <span className="text-gray-400">Idle</span>;
//         }
//     };

//     const buildPhases = [
//         {
//             title: "Initializing build environment",
//             icon: <CheckCircle className="text-green-500 w-4 h-4" />,
//             duration: "2s",
//             logs: ["Setting up environment", "Environment ready."],
//         },
//         {
//             title: "Cloning git repository",
//             icon: <CheckCircle className="text-green-500 w-4 h-4" />,
//             duration: "2s",
//             logs: ["Cloning repo...", "Success: Finished cloning repository files."],
//         },
//         {
//             title: "Building application",
//             icon: <AlertTriangle className="text-yellow-400 w-4 h-4" />,
//             duration: "1m 6s",
//             logs: [
//                 "Installing dependencies...",
//                 "npm WARN deprecated react-tsparticles@2.12.2...",
//                 "npm WARN deprecated tsparticles-engine@2.12.0...",
//                 "Build executed: npx @cloudflare/next-on-pages@1.13.12",
//                 "Build finished with warnings.",
//             ],
//         },
//         {
//             title: "Deploying to Cloudflare's global network",
//             icon: <Clock className="text-gray-400 w-4 h-4 animate-pulse" />,
//             duration: "—",
//             logs: ["Deployment in progress..."],
//         },
//     ];

//     return (
//         <div className="bg-black text-white min-h-screen p-6">
//             <div className="max-w-7xl mx-auto flex">
//                 <Sidebar />

//                 <div className="flex-1 ml-64">
//                     {/* Breadcrumb */}
//                     <div className="text-sm text-gray-400 flex items-center space-x-2 mx-6 mb-8">
//                         <span><a href="/pages/hostingpage" className="hover:text-white">Pages</a></span>
//                         <span>›</span>
//                         <span>Services</span>
//                     </div>

//                     {/* Deployment Info */}
//                     <div className="bg-[#18181b] rounded-lg border border-gray-700 p-6 mb-6">
//                         <div className="flex justify-between items-start mb-4">
//                             <h2 className="text-xl font-semibold">Deployment details</h2>
//                             <button
//                                 onClick={triggerBuild}
//                                 className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm flex items-center"
//                             >
//                                 <RefreshCw className="w-4 h-4 mr-2" />
//                                 Trigger Deployment
//                             </button>
//                         </div>

//                         <div className="inline-block bg-blue-600 px-3 py-1 rounded-full text-xs font-medium mb-4">
//                             Production
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="space-y-3">
//                                 <div className="flex items-center">
//                                     <span className="text-gray-400 w-20">Repository:</span>
//                                     <span>{projectConfig?.repo || "Loading..."}</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <span className="text-gray-400 w-20">Branch:</span>
//                                     <GitBranch className="w-4 h-4 mr-2" />
//                                     <span className="font-mono">{projectConfig?.productionBranch || "main"}</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <span className="text-gray-400 w-20">Domain:</span>
//                                     <Globe className="w-4 h-4 mr-2" />
//                                     <a
//                                         href={`http://localhost:4000/hosted/${projectConfig?.projectName}/`}
//                                         target="_blank"
//                                         className="text-blue-400 underline"
//                                     >
//                                         preview
//                                     </a>
//                                 </div>
//                             </div>
//                             <div className="space-y-3">
//                                 <div className="flex items-center">
//                                     <span className="text-gray-400 w-20">Status:</span>
//                                     {getStatusBadge()}
//                                 </div>
//                                 <div className="flex items-center">
//                                     <span className="text-gray-400 w-20">Duration:</span>
//                                     <span>{duration}</span>
//                                 </div>
//                                 {deploymentStatus === "success" && (
//                                     <div className="flex items-center">
//                                         <span className="text-gray-400 w-20">Performance:</span>
//                                         <Activity className="w-4 h-4 mr-2 text-green-500" />
//                                         <span className="text-green-500">Excellent</span>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Tabs */}
//                     <div className="flex space-x-6 mb-6 border-b border-gray-700">
//                         {TABS.map((tab) => (
//                             <button
//                                 key={tab}
//                                 onClick={() => setActiveTab(tab)}
//                                 className={`pb-3 px-1 text-sm font-medium ${activeTab === tab
//                                     ? "text-blue-400 border-b-2 border-blue-400"
//                                     : "text-gray-400 hover:text-white"
//                                     }`}
//                             >
//                                 {tab}
//                             </button>
//                         ))}
//                     </div>

//                     {/* Build log with collapsible UI */}
//                     {activeTab === "Build log" ? (
//                         <div className="bg-[#18181b] rounded-lg p-4 border border-gray-700 font-mono text-sm space-y-4">
//                             {buildPhases.map((section, idx) => (
//                                 <div key={idx} className="bg-[#111113] rounded-md border border-gray-800">
//                                     <details open className="group">
//                                         <summary className="flex items-center justify-between p-3 cursor-pointer hover:bg-[#1f1f23]">
//                                             <div className="flex items-center gap-2">
//                                                 {section.icon}
//                                                 <span>{section.title}</span>
//                                             </div>
//                                             <span className="text-gray-400">{section.duration}</span>
//                                         </summary>
//                                         <div className="p-3 border-t border-gray-800 space-y-1">
//                                             {section.logs.map((log, i) => (
//                                                 <div key={i} className="text-gray-400">{log}</div>
//                                             ))}
//                                         </div>
//                                     </details>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="bg-gray-800 rounded-lg p-6">
//                             <h3 className="text-lg font-semibold mb-4">{activeTab}</h3>
//                             <p className="text-gray-400">No {activeTab.toLowerCase()} configured for this project.</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";
import React, { useState, useEffect } from "react";
import {
    ChevronDown,
    ChevronRight,
    Download,
    Copy,
    AlertTriangle,
    GitBranch,
    ExternalLink,
    CheckCircle,
    Clock,
    Globe,
    Activity,
    Settings,
    RefreshCw,
    Terminal,
    Code,
    Zap,
    Shield,
    BarChart3,
    Eye,
    TrendingUp,
} from "lucide-react";
import Sidebar from "@/app/components/sidebar";
import { useSearchParams } from "next/navigation";

const TABS = ["Build log", "Functions", "Redirects", "Headers"];

export default function CloudflareDeploymentDashboard() {
    // const searchParams = useSearchParams();
    // const projectName = searchParams.get("projectName");

    // const [activeTab, setActiveTab] = useState("Build log");
    // const [deploymentStatus, setDeploymentStatus] = useState("idle");
    // const [duration, setDuration] = useState("—");
    // const [projectConfig, setProjectConfig] = useState(null);
    // const [isBuilding, setIsBuilding] = useState(false);
    // const [buildProgress, setBuildProgress] = useState(0);
    // const [expandedPhases, setExpandedPhases] = useState({});

    // useEffect(() => {
    //     if (!projectName) return;

    //     fetch(`http://localhost:4000/api/get-deploy-config?projectName=${projectName}`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log("✅ Config loaded:", data);
    //             setProjectConfig(data);
    //         })
    //         .catch((err) => {
    //             console.error("❌ Failed to load config:", err);
    //         });
    // }, [projectName]);

    // const triggerBuild = async () => {
    //     if (!projectConfig?.projectName) return;

    //     setDeploymentStatus("building");
    //     setIsBuilding(true);
    //     setBuildProgress(0);
        
    //     // Simulate build progress
    //     const progressInterval = setInterval(() => {
    //         setBuildProgress(prev => {
    //             if (prev >= 90) {
    //                 clearInterval(progressInterval);
    //                 return 90;
    //             }
    //             return prev + Math.random() * 20;
    //         });
    //     }, 500);

    //     const start = Date.now();

    //     try {
    //         const res = await fetch("http://localhost:4000/api/build-and-serve", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ projectName: projectConfig.projectName }),
    //         });

    //         const data = await res.json();
    //         const timeTaken = ((Date.now() - start) / 1000).toFixed(2) + "s";

    //         clearInterval(progressInterval);
    //         setBuildProgress(100);

    //         if (res.ok) {
    //             setDeploymentStatus("success");
    //             setDuration(timeTaken);
    //         } else {
    //             setDeploymentStatus("failed");
    //             setDuration(timeTaken);
    //         }
    //     } catch (err) {
    //         clearInterval(progressInterval);
    //         setBuildProgress(0);
    //         setDeploymentStatus("failed");
    //         setDuration("—");
    //     } finally {
    //         setIsBuilding(false);
    //     }
    // };
        const searchParams = useSearchParams();
    const projectName = searchParams.get("projectName");

    const [activeTab, setActiveTab] = useState("Build log");
    const [deploymentStatus, setDeploymentStatus] = useState("idle");
    const [duration, setDuration] = useState("—");
    const [projectConfig, setProjectConfig] = useState(null);
    const [isBuilding, setIsBuilding] = useState(false);
    const [buildProgress, setBuildProgress] = useState(0);
    const [expandedPhases, setExpandedPhases] = useState({});
    const [hasAutoBuilt, setHasAutoBuilt] = useState(false); // ✅

    // ✅ Auto-trigger build on first load
    useEffect(() => {
        if (!projectName || hasAutoBuilt) return;

        fetch(`http://localhost:4000/api/get-deploy-config?projectName=${projectName}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("✅ Config loaded:", data);
                setProjectConfig(data);
                triggerBuild(data); // auto-build
                setHasAutoBuilt(true);
            })
            .catch((err) => {
                console.error("❌ Failed to load config:", err);
            });
    }, [projectName, hasAutoBuilt]);

    // ✅ Trigger build with optional param fallback
   const triggerBuild = async (configParam) => {
        const config = configParam || projectConfig;
        if (!config?.projectName) return;

        setDeploymentStatus("building");
        setIsBuilding(true);
        setBuildProgress(0);

        const progressInterval = setInterval(() => {
            setBuildProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return 90;
                }
                return prev + Math.random() * 20;
            });
        }, 500);

        const start = Date.now();

        try {
            const res = await fetch("http://localhost:4000/api/build-and-serve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ projectName: config.projectName }),
            });

            const data = await res.json();
            const timeTaken = ((Date.now() - start) / 1000).toFixed(2) + "s";

            clearInterval(progressInterval);
            setBuildProgress(100);

            if (res.ok) {
                setDeploymentStatus("success");
                setDuration(timeTaken);
            } else {
                setDeploymentStatus("failed");
                setDuration(timeTaken);
            }
        } catch (err) {
            clearInterval(progressInterval);
            setBuildProgress(0);
            setDeploymentStatus("failed");
            setDuration("—");
        } finally {
            setIsBuilding(false);
        }
    };

    const getStatusBadge = () => {
        const common = "flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300";
        switch (deploymentStatus) {
            case "success":
                return (
                    <div className={`${common} bg-green-500/20 text-green-400 border border-green-500/30`}>
                        <CheckCircle className="w-4 h-4" />
                        <span>Success</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-1"></div>
                    </div>
                );
            case "failed":
                return (
                    <div className={`${common} bg-red-500/20 text-red-400 border border-red-500/30`}>
                        <AlertTriangle className="w-4 h-4" />
                        <span>Failed</span>
                        <div className="w-2 h-2 bg-red-400 rounded-full ml-1"></div>
                    </div>
                );
            case "building":
                return (
                    <div className={`${common} bg-yellow-500/20 text-yellow-400 border border-yellow-500/30`}>
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>Building...</span>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse ml-1"></div>
                    </div>
                );
            default:
                return (
                    <div className={`${common} bg-gray-500/20 text-gray-400 border border-gray-500/30`}>
                        <Clock className="w-4 h-4" />
                        <span>Idle</span>
                    </div>
                );
        }
    };

    const getBuildPhases = () => {
        const basePhases = [
            {
                title: "Initializing build environment",
                icon: <Settings className="text-blue-500 w-5 h-5" />,
                duration: "2s",
                status: "completed",
                logs: [
                    "🔧 Setting up Node.js environment...",
                    "📦 Installing build tools...",
                    "✅ Environment ready and configured",
                ],
            },
            {
                title: "Cloning git repository",
                icon: <Code className="text-green-500 w-5 h-5" />,
                duration: "3s",
                status: "completed",
                logs: [
                    "📥 Cloning repository from GitHub...",
                    "🔍 Verifying repository integrity...",
                    "✅ Repository cloned successfully",
                ],
            },
            {
                title: "Installing dependencies",
                icon: deploymentStatus === "building" ? 
                    <Clock className="text-yellow-400 w-5 h-5 animate-spin" /> : 
                    <CheckCircle className="text-green-500 w-5 h-5" />,
                duration: "45s",
                status: deploymentStatus === "building" ? "running" : "completed",
                logs: [
                    "📦 Running npm install...",
                    "⚠️  npm WARN deprecated react-tsparticles@2.12.2",
                    "⚠️  npm WARN deprecated tsparticles-engine@2.12.0",
                    "✅ Dependencies installed successfully",
                ],
            },
            {
                title: "Building application",
                icon: deploymentStatus === "building" && buildProgress > 50 ? 
                    <Clock className="text-yellow-400 w-5 h-5 animate-spin" /> : 
                    deploymentStatus === "success" ? 
                    <CheckCircle className="text-green-500 w-5 h-5" /> :
                    deploymentStatus === "failed" ?
                    <AlertTriangle className="text-red-500 w-5 h-5" /> :
                    <Clock className="text-gray-400 w-5 h-5" />,
                duration: deploymentStatus === "success" ? "1m 24s" : deploymentStatus === "failed" ? "1m 6s" : "—",
                status: deploymentStatus === "building" && buildProgress > 50 ? "running" : 
                         deploymentStatus === "success" ? "completed" :
                         deploymentStatus === "failed" ? "failed" : "pending",
                logs: [
                    "🏗️  Starting build process...",
                    "⚡ Optimizing assets...",
                    "🎯 Generating static files...",
                    deploymentStatus === "success" ? "✅ Build completed successfully" :
                    deploymentStatus === "failed" ? "❌ Build failed with errors" : "🔄 Build in progress...",
                ],
            },
            {
                title: "Deploying to global network",
                icon: deploymentStatus === "building" && buildProgress > 80 ? 
                    <Clock className="text-yellow-400 w-5 h-5 animate-spin" /> : 
                    deploymentStatus === "success" ? 
                    <Zap className="text-green-500 w-5 h-5" /> :
                    <Clock className="text-gray-400 w-5 h-5" />,
                duration: deploymentStatus === "success" ? "8s" : "—",
                status: deploymentStatus === "building" && buildProgress > 80 ? "running" : 
                         deploymentStatus === "success" ? "completed" : "pending",
                logs: [
                    "🌍 Deploying to edge locations...",
                    "🚀 Configuring CDN...",
                    deploymentStatus === "success" ? "✅ Deployment completed" : "⏳ Waiting for build...",
                ],
            },
        ];

        if (deploymentStatus === "success") {
            basePhases.push({
                title: "Cache invalidation",
                icon: <Shield className="text-green-500 w-5 h-5" />,
                duration: "2s",
                status: "completed",
                logs: [
                    "🔄 Invalidating edge cache...",
                    "✅ Cache cleared across all regions",
                ],
            });
        }

        return basePhases;
    };

    const buildPhases = getBuildPhases();

    return (
        <div className="bg-black to-black text-white min-h-screen">
            <div className="max-w-7xl mx-auto flex">
                <Sidebar />

                <div className="flex-1 ml-64 p-6">
                    {/* Header with enhanced breadcrumb */}
                    <div className="mb-8">
                        <div className="text-sm text-gray-400 flex items-center space-x-2 mb-4">
                            <span><a href="/pages/hostingpage" className="hover:text-blue-400 transition-colors">Pages</a></span>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white font-medium">Services</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white bg-clip-text ">
                            Deployment Dashboard
                        </h3>

                    </div>

                    {/* Enhanced Deployment Info Card */}
                    <div className="bg-[#18181b] rounded-xl border border-gray-700/50 p-6 mb-6 shadow-2xl backdrop-blur-sm">
                        {/* Progress Bar for Building State */}
                        {isBuilding && (
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-400">Build Progress</span>
                                    <span className="text-sm text-yellow-400">{Math.round(buildProgress)}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${buildProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Deployment Details</h2>
                                <div className="flex items-center space-x-3">
                                    <div className="inline-flex items-center bg-blue-600/20 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-medium">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                                        Production
                                    </div>
                                    {deploymentStatus === "success" && (
                                        <div className="inline-flex items-center bg-green-600/20 border border-green-500/30 px-3 py-1 rounded-full text-xs font-medium">
                                            <TrendingUp className="w-3 h-3 mr-1" />
                                            Live
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={triggerBuild}
                                disabled={isBuilding}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 px-6 py-3 rounded-lg text-sm font-medium flex items-center transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
                            >
                                <RefreshCw className={`w-4 h-4 mr-2 ${isBuilding ? 'animate-spin' : ''}`} />
                                {isBuilding ? 'Building...' : 'Trigger Deployment'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="bg-[#27272a] rounded-lg p-4 border border-gray-700/50">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-gray-400 text-sm font-medium">Repository</span>
                                        <Code className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <span className="text-white font-mono">{projectConfig?.repo || "Loading..."}</span>
                                </div>

                                <div className="bg-[#27272a] rounded-lg p-4 border border-gray-700/50">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-gray-400 text-sm font-medium">Branch</span>
                                        <GitBranch className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <span className="text-white font-mono">{projectConfig?.productionBranch || "main"}</span>
                                </div>

                                <div className="bg-[#27272a] rounded-lg p-4 border border-gray-700/50">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-gray-400 text-sm font-medium">Domain</span>
                                        <Globe className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <a
                                        href={`http://localhost:4000/hosted/${projectConfig?.projectName}/`}
                                        target="_blank"
                                        className="text-blue-400 hover:text-blue-300 underline transition-colors flex items-center"
                                    >
                                        <Eye className="w-4 h-4 mr-1" />
                                        View Preview
                                        <ExternalLink className="w-3 h-3 ml-1" />
                                    </a>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="bg-[#27272a] rounded-lg p-4 border border-gray-700/50">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-gray-400 text-sm font-medium">Status</span>
                                        <Activity className="w-4 h-4 text-gray-500" />
                                    </div>
                                    {getStatusBadge()}
                                </div>

                                <div className="bg-[#27272a] rounded-lg p-4 border border-gray-700/50">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-gray-400 text-sm font-medium">Duration</span>
                                        <Clock className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <span className="text-white font-mono">{duration}</span>
                                </div>
                                
                                {deploymentStatus === "success" && (
                                    <div className="bg-[#27272a] rounded-lg p-4 border border-gray-700/50">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-gray-400 text-sm font-medium">Performance</span>
                                            <BarChart3 className="w-4 h-4 text-gray-500" />
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                                <span className="text-green-400 font-medium">Excellent</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Tabs */}
                    <div className="flex space-x-1 mb-6 bg-gray-800/30 rounded-lg p-1 backdrop-blur-sm border border-gray-700/50">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200 flex-1 ${activeTab === tab
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                                    }`}
                            >
                                {tab === "Build log" && <Terminal className="w-4 h-4 mr-2 inline" />}
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Enhanced Build log with collapsible phases */}
                    {activeTab === "Build log" ? (
                        <div className="bg-gradient-to-br from-[#18181b] to-[#1f1f23] rounded-xl border border-gray-700/50 shadow-2xl">
                            <div className="p-6 border-b border-gray-700/50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Terminal className="w-5 h-5 text-blue-400" />
                                        <h3 className="text-lg font-semibold">Build Pipeline</h3>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <button className="flex items-center text-gray-400 hover:text-white text-sm transition-colors">
                                            <Download className="w-4 h-4 mr-1" />
                                            Download log
                                        </button>
                                        <button className="flex items-center text-gray-400 hover:text-white text-sm transition-colors">
                                            <Copy className="w-4 h-4 mr-1" />
                                            Copy log
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6 space-y-4">
                                {buildPhases.map((phase, idx) => {
                                    const isExpanded = expandedPhases[idx] !== false; // Default to expanded
                                    const phaseKey = `phase-${idx}`;
                                    
                                    return (
                                        <div key={idx} className="group">
                                            <div 
                                                className={`bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border transition-all duration-300 hover:shadow-lg ${
                                                    phase.status === 'completed' ? 'border-green-500/30' :
                                                    phase.status === 'running' ? 'border-yellow-500/30 shadow-yellow-500/10' :
                                                    phase.status === 'failed' ? 'border-red-500/30' :
                                                    'border-gray-700/50'
                                                }`}
                                            >
                                                <div 
                                                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700/30 transition-colors rounded-lg"
                                                    onClick={() => setExpandedPhases(prev => ({ ...prev, [idx]: !isExpanded }))}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <div className="flex items-center space-x-2">
                                                            {isExpanded ? 
                                                                <ChevronDown className="w-4 h-4 text-gray-400" /> : 
                                                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                                            }
                                                            {phase.icon}
                                                        </div>
                                                        <span className="font-medium">{phase.title}</span>
                                                        {phase.status === 'running' && (
                                                            <div className="flex space-x-1">
                                                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                                                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <span className={`text-sm px-2 py-1 rounded-full font-medium ${
                                                            phase.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                                            phase.status === 'running' ? 'bg-yellow-500/20 text-yellow-400' :
                                                            phase.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                                                            'bg-gray-500/20 text-gray-400'
                                                        }`}>
                                                            {phase.status}
                                                        </span>
                                                        <span className="text-gray-400 text-sm font-mono">{phase.duration}</span>
                                                    </div>
                                                </div>

                                                {isExpanded && (
                                                    <div className="border-t border-gray-700/50 bg-gray-900/50">
                                                        <div className="p-4 font-mono text-sm space-y-2">
                                                            {phase.logs.map((log, logIdx) => (
                                                                <div key={logIdx} className="flex items-start space-x-3">
                                                                    <span className="text-gray-500 text-xs mt-0.5 w-16 flex-shrink-0">
                                                                        {new Date().toLocaleTimeString()}
                                                                    </span>
                                                                    <span className={`${
                                                                        log.includes('✅') ? 'text-green-400' :
                                                                        log.includes('❌') ? 'text-red-400' :
                                                                        log.includes('⚠️') ? 'text-yellow-400' :
                                                                        log.includes('🔄') ? 'text-blue-400' :
                                                                        'text-gray-300'
                                                                    }`}>
                                                                        {log}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 p-8 text-center backdrop-blur-sm">
                            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Settings className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{activeTab}</h3>
                            <p className="text-gray-400 mb-4">No {activeTab.toLowerCase()} configured for this project.</p>
                            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                Configure {activeTab}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
