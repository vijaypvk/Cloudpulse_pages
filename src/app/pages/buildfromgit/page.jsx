
"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, ChevronLeft, Settings, Globe, Code, Zap, Info, CheckCircle, AlertCircle, GitBranch, Terminal, Sparkles, ExternalLink } from "lucide-react";
import Sidebar from "@/app/components/sidebar";
import { useSearchParams } from "next/navigation";
const frameworkPresets = {
  "None": { buildCommand: "", outputDir: "", description: "No framework detected" },
  "Next.js": { buildCommand: "npm run build", outputDir: "out", description: "React framework with SSR support" },
  "Nuxt": { buildCommand: "npm run generate", outputDir: "dist", description: "Vue.js framework" },
  "React": { buildCommand: "npm run build", outputDir: "build", description: "React single-page application" },
  "Vite": { buildCommand: "npm run build", outputDir: "dist", description: "Fast build tool for modern web apps" },
  "Svelte": { buildCommand: "npm run build", outputDir: "public", description: "Compile-time optimized framework" },
  "Angular": { buildCommand: "npm run build", outputDir: "dist", description: "Full-featured framework by Google" }
};

const branches = ["main", "master", "develop", "staging"];

export default function SetupDeployPage() {
  const searchParams = useSearchParams();
  const repo = searchParams.get("repo");
  const [framework, setFramework] = useState("None");
  const [showRoot, setShowRoot] = useState(false);
  const [showEnv, setShowEnv] = useState(false);
  const [buildCommand, setBuildCommand] = useState("");
  const [outputDir, setOutputDir] = useState("");
  const [projectName, setProjectName] = useState(null);
  const [productionBranch, setProductionBranch] = useState("main");
  const [envVars, setEnvVars] = useState([{ key: "", value: "" }]);
  const [isValidating, setIsValidating] = useState(false);
  const [repoDetails, setRepoDetails] = useState(null);

  useEffect(() => {
    const repoName = searchParams.get("repo");
    if (!repoName) return;

    fetch("http://localhost:4000/api/github/repos")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((r) => r.name === repoName);
        if (found) {
          setRepoDetails(found);
          setProjectName(found.name); // optionally set project name from repo
          console.log("✅ Found repo details:", found);
        } else {
          console.error("❌ Repo not found");
        }
      })
      .catch((err) => console.error("❌ Repo fetch error", err));
  }, []);


  const handleFrameworkChange = (selectedFramework) => {
    setFramework(selectedFramework);
    const preset = frameworkPresets[selectedFramework];
    setBuildCommand(preset.buildCommand);
    setOutputDir(preset.outputDir);
  };

  const addEnvVar = () => {
    setEnvVars([...envVars, { key: "", value: "" }]);
  };

  const removeEnvVar = (index) => {
    setEnvVars(envVars.filter((_, i) => i !== index));
  };

  const updateEnvVar = (index, field, value) => {
    const updated = envVars.map((env, i) =>
      i === index ? { ...env, [field]: value } : env
    );
    setEnvVars(updated);
  };

  const validateSetup = async () => {
    setIsValidating(true);
    // Simulate validation
    setTimeout(() => {
      setIsValidating(false);
    }, 2000);
  };
  const handleSaveAndDeploy = async () => {
    const payload = {
      projectName,
      repo: repoDetails?.full_name || repo,
      buildCommand,
      outputDir,
      productionBranch,
      envVars,
      framework
    };

    try {
      const res = await fetch("http://localhost:4000/api/deploy-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        window.location.href = `/pages/deployment?projectName=${encodeURIComponent(projectName)}`;
      } else {
        console.error("❌ Failed to send deploy config");
      }
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };
  const handleBuildAndServe = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/build-and-serve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectName })
      });

      if (res.ok) {
        const data = await res.json();
        console.log("✅ Deploy successful:", data);
        // Open the hosted site in a new tab or navigate to it
        window.open(data.url, "_blank");
      } else {
        const err = await res.json();
        console.error("❌ Deploy failed:", err.error || "Unknown error");
      }
    } catch (err) {
      console.error("❌ Error during build & deploy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      <main className="min-h-screen text-white p-8 relative ml-64">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Back Link */}
        <div className="text-sm text-gray-400 flex items-center space-x-2 mx-6 mb-8 relative z-10">
          <span><a href="/pages/hostingpage" className="hover:text-blue-400 transition-colors">Pages</a></span>
          <span>›</span>
          <span className="text-gray-300">Services</span>
        </div>

        {/* Enhanced Step Indicator */}
        <div className="flex items-center justify-center gap-6 text-sm mb-12 relative z-10">
          <div className="flex items-center gap-3 text-green-400">
            <div className="w-10 h-10 rounded-full border-2 border-green-500 flex items-center justify-center bg-green-500/20 backdrop-blur-sm">
              <CheckCircle size={18} className="text-green-400" />
            </div>
            <span className="font-medium">Select repository</span>
          </div>
          <div className="h-0.5 w-16 bg-gradient-to-r from-green-400 to-blue-400"></div>
          <div className="flex items-center gap-3 text-blue-400 font-medium">
            <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold shadow-xl animate-pulse">
              2
            </div>
            <span>Set up builds and deployments</span>
          </div>
          <div className="h-0.5 w-16 bg-gray-600"></div>
          <div className="flex items-center gap-3 text-gray-400">
            <div className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm">
              3
            </div>
            <span>Deploy site</span>
          </div>
        </div>

        {/* Main Setup Card */}
        <div className="max-w-5xl mx-auto bg-[#1e1e20] backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-700/50 relative z-10 hover:shadow-3xl transition-all duration-300">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-[#18181b] rounded-3xl blur-xl"></div>
          
          <div className="relative z-10">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="text-blue-400" size={28} />
                <h2 className="text-4xl font-bold bg-white bg-clip-text text-transparent">
                  Set up builds and deployments
                </h2>
              </div>
              {repoDetails ? (
                <div className="bg-[#27272a] backdrop-blur-sm p-6 rounded-2xl border border-gray-700/30">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <Code className="text-white" size={18} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-blue-400">{repoDetails.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {repoDetails.private && (
                              <span className="text-yellow-400 text-xs bg-yellow-500/20 px-2 py-1 rounded-full border border-yellow-500/30">
                                Private
                              </span>
                            )}
                            <span className="text-gray-400 text-xs">
                              {repoDetails.language || "Unknown"} 
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Last updated: {new Date(repoDetails.updated_at).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">Will deploy to</div>
                      <div className="flex items-center gap-2 text-blue-400 font-mono text-sm">
                        <Globe size={14} />
                        {projectName || repoDetails.name}.pages.dev
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#27272a]/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/30 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-700"></div>
                    <div>
                      <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-8">
              {/* Project Configuration Section */}
              <div className="bg-gradient-to-br from-[#2a2a30] to-[#27272a] p-8 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Settings className="text-white" size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Project Configuration</h3>
                    <p className="text-gray-400 text-sm">Basic settings for your deployment</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Project name */}
                  <div className="group">
                    <label className=" text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                      <span>Project name</span>
                      <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full bg-[#1a1a1f] border border-gray-600 px-4 py-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-gray-500"
                        placeholder="Enter project name"
                      />
                    </div>
                    <div className="mt-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <p className="text-xs text-blue-300 flex items-center gap-2">
                        <Globe size={14} />
                        Deploy URL: <span className="font-mono text-blue-400">{projectName || 'your-project'}.pages.dev</span>
                        <ExternalLink size={12} className="opacity-50" />
                      </p>
                    </div>
                  </div>

                  {/* Production Branch */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                      <GitBranch size={16} />
                      <span>Production branch</span>
                    </label>
                    <select
                      value={productionBranch}
                      onChange={(e) => setProductionBranch(e.target.value)}
                      className="w-full bg-[#1a1a1f] border border-gray-600 px-4 py-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-gray-500"
                    >
                      {branches.map(branch => (
                        <option key={branch} value={branch}>{branch}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Build Settings Section */}
              <div className="bg-gradient-to-br from-[#2a2a30] to-[#27272a] p-8 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Terminal className="text-white" size={22} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Build Settings</h3>
                      <p className="text-gray-400 text-sm">Configure your build process</p>
                    </div>
                  </div>
                  <span className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 border border-purple-500/30 text-purple-300 text-xs px-4 py-2 rounded-full font-medium">
                    Auto-detected
                  </span>
                </div>

                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Info className="text-purple-400 mt-0.5" size={18} />
                    <div>
                      <p className="text-sm text-purple-300 font-medium">Smart Build Detection</p>
                      <p className="text-xs text-purple-200/80 mt-1">
                        We'll automatically detect your framework and suggest optimal build settings. You can customize them below.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Framework Preset */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                      <Zap size={16} />
                      Framework preset
                    </label>
                    <select
                      value={framework}
                      onChange={(e) => handleFrameworkChange(e.target.value)}
                      className="w-full bg-[#1a1a1f] border border-gray-600 px-4 py-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    >
                      {Object.entries(frameworkPresets).map(([name, preset]) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                    {framework !== "None" && (
                      <div className="mt-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <p className="text-xs text-green-300 flex items-center gap-2">
                          <CheckCircle size={14} />
                          {frameworkPresets[framework].description}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Build Command */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                        <Terminal size={16} />
                        Build command
                      </label>
                      <input
                        type="text"
                        value={buildCommand}
                        onChange={(e) => setBuildCommand(e.target.value)}
                        placeholder="npm run build"
                        className="w-full bg-[#1a1a1f] border border-gray-600 px-4 py-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all font-mono text-sm"
                      />
                    </div>

                    {/* Output Directory */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                        <Code size={16} />
                        Build output directory
                      </label>
                      <input
                        type="text"
                        value={outputDir}
                        onChange={(e) => setOutputDir(e.target.value)}
                        placeholder="dist"
                        className="w-full bg-[#1a1a1f] border border-gray-600 px-4 py-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="bg-gradient-to-br from-[#2a2a30] to-[#27272a] p-8 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Settings className="text-white" size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Advanced Settings</h3>
                    <p className="text-gray-400 text-sm">Optional configuration for complex setups</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Root Directory */}
                  <div className="border border-gray-700/50 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setShowRoot(!showRoot)}
                      className="w-full text-left p-4 bg-[#1a1a1f] hover:bg-[#1f1f24] transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        {showRoot ? <ChevronDown size={18} className="text-orange-400" /> : <ChevronRight size={18} className="text-orange-400" />}
                        <span className="text-orange-400 font-medium">Root directory</span>
                        <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded">Advanced</span>
                      </div>
                    </button>
                    {showRoot && (
                      <div className="p-6 bg-[#18181b] border-t border-gray-700/50">
                        <input
                          type="text"
                          placeholder="e.g. /apps/site"
                          className="w-full bg-[#1a1a1f] border border-gray-600 px-4 py-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all font-mono text-sm"
                        />
                        <p className="text-xs text-gray-400 mt-3 p-3 bg-gray-800/50 rounded-lg">
                          Specify if your app is in a subdirectory of your repository
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Environment Variables */}
                  <div className="border border-gray-700/50 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setShowEnv(!showEnv)}
                      className="w-full text-left p-4 bg-[#1a1a1f] hover:bg-[#1f1f24] transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        {showEnv ? <ChevronDown size={18} className="text-orange-400" /> : <ChevronRight size={18} className="text-orange-400" />}
                        <span className="text-orange-400 font-medium">Environment variables</span>
                        <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded">Advanced</span>
                      </div>
                      {envVars.some(env => env.key) && (
                        <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
                          {envVars.filter(env => env.key).length} configured
                        </span>
                      )}
                    </button>
                    {showEnv && (
                      <div className="p-6 bg-[#18181b] border-t border-gray-700/50 space-y-4">
                        {envVars.map((env, index) => (
                          <div key={index} className="flex gap-3">
                            <input
                              type="text"
                              placeholder="KEY"
                              value={env.key}
                              onChange={(e) => updateEnvVar(index, 'key', e.target.value)}
                              className="flex-1 bg-[#1a1a1f] border border-gray-600 px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all font-mono text-sm"
                            />
                            <input
                              type="text"
                              placeholder="value"
                              value={env.value}
                              onChange={(e) => updateEnvVar(index, 'value', e.target.value)}
                              className="flex-1 bg-[#1a1a1f] border border-gray-600 px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all font-mono text-sm"
                            />
                            {envVars.length > 1 && (
                              <button
                                onClick={() => removeEnvVar(index)}
                                className="px-4 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors border border-red-500/30"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          onClick={addEnvVar}
                          className="text-orange-400 text-sm hover:text-orange-300 transition-colors flex items-center gap-2 mt-4 p-3 border border-orange-500/30 rounded-xl hover:bg-orange-500/10"
                        >
                          <span className="text-lg">+</span>
                          Add environment variable
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Validation Section */}
              {isValidating && (
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-6 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-yellow-400 border-t-transparent"></div>
                    <div>
                      <p className="text-yellow-300 font-medium">Validating build configuration...</p>
                      <p className="text-yellow-200/70 text-sm">This may take a few moments</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Footer */}
            <div className="mt-12 flex justify-between items-center pt-8 border-t border-gray-700/50">
              <a href="/pages/gitconnect2" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 p-3 rounded-xl hover:bg-gray-800/50">
                <ChevronLeft size={18} />
                <span>Change repository</span>
              </a>
              <div className="flex gap-4">
                <button
                  onClick={validateSetup}
                  className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white px-8 py-4 rounded-xl transition-all font-medium border border-gray-600/50 hover:border-gray-500/50"
                >
                  Validate Setup
                </button>
                <button
                  onClick={() => {
                    handleSaveAndDeploy();
                    // handleBuildAndServe();
                  }}
                  className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-700 hover:via-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-xl transition-all font-medium shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center gap-2"
                >
                  <Sparkles size={18} />
                  Save and Deploy
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}