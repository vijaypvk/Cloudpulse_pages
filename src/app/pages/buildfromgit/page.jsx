
"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronRight, ChevronLeft, Settings, Globe, Code, Zap, Info, CheckCircle, AlertCircle } from "lucide-react";
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
  const [projectName, setProjectName] = useState("vijay-portfolio");
  const [productionBranch, setProductionBranch] = useState("main");
  const [envVars, setEnvVars] = useState([{ key: "", value: "" }]);
  const [isValidating, setIsValidating] = useState(false);

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
      repo,
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
        window.location.href = `/pages/deploy?project=${projectName}`;
      } else {
        console.error("❌ Failed to send deploy config");
      }
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  return (
    <div>
      <Sidebar />
      <main className="min-h-screen bg-black text-white p-8 relative  ml-64">
        {/* Back Link */}
        <div className="text-sm text-gray-400 flex items-center space-x-2 mx-6 mb-8 ">
          <span><a href="/pages/hostingpage">Pages</a></span>
          <span>›</span>
          <span>Services</span>
        </div>
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-10">
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 rounded-full border-2 border-gray-600 flex items-center justify-center bg-gray-700 text-xs">
              <CheckCircle size={14} className="text-green-400" />
            </div>
            Select repository
          </div>
          <div className="h-0.5 w-12 bg-gray-500"></div>
          <div className="flex items-center gap-2 text-blue-400 font-medium">
            <div className="w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold shadow-lg">
              2
            </div>
            Set up builds and deployments
          </div>
          <div className="h-0.5 w-12 bg-gray-600"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-gray-500 flex items-center justify-center text-xs bg-gray-800">
              3
            </div>
            Deploy site
          </div>
        </div>

        {/* Setup Card */}
        <div className="max-w-4xl  bg-[#18181b] backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700/50">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Set up builds and deployments
            </h2>
            <p className="text-gray-400">
              Configure automatic builds and deployments for{" "}

            </p>
          </div>

          <div className="space-y-8">
            {/* Project Configuration Section */}
            <div className="bg-[#27272a] p-6 rounded-xl border border-gray-700/50">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="text-blue-400" size={20} />
                <h3 className="text-xl font-semibold">Project Configuration</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project name</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-[#18181b] border border-gray-600 px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#27272a] focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <Globe size={12} />
                    Deploy to: <span className="text-blue-400">{projectName}.pages.dev</span>
                  </p>
                </div>

                {/* Production Branch */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Production branch</label>
                  <select
                    value={productionBranch}
                    onChange={(e) => setProductionBranch(e.target.value)}
                    className="w-full bg-[#18181b] border border-gray-600 px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#27272a] focus:border-transparent transition-all"
                  >
                    {branches.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Build Settings Section */}
            <div className="bg-[#27272a] p-6 rounded-xl border border-gray-700/50">
              <div className="flex items-center gap-2 mb-4">
                <Code className="text-purple-400" size={20} />
                <h3 className="text-xl font-semibold">Build Settings</h3>
                <span className="bg-gradient-to-r from-purple-600 to-purple-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Configuring builds
                </span>
              </div>

              <div className="bg-[#1d1d23] border border-[#27272b] rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2">
                  <Info className="text-blue-400 mt-0.5" size={16} />
                  <div>
                    <p className="text-sm text-blue-300 font-medium">Build Configuration</p>
                    <p className="text-xs text-blue-200/80 mt-1">
                      Configure your build settings. Framework presets will auto-populate common configurations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Framework Preset */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Framework preset</label>
                  <select
                    value={framework}
                    onChange={(e) => handleFrameworkChange(e.target.value)}
                    className="w-full bg-[#18181b] border border-gray-600 px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#27272a] focus:border-transparent transition-all"
                  >
                    {Object.entries(frameworkPresets).map(([name, preset]) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                  {framework !== "None" && (
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      <Zap size={12} />
                      {frameworkPresets[framework].description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Build Command */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Build command</label>
                    <input
                      type="text"
                      value={buildCommand}
                      onChange={(e) => setBuildCommand(e.target.value)}
                      placeholder="npm run build"
                      className="w-full bg-[#18181b] border border-gray-600 px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#27272a] focus:border-transparent transition-all font-mono text-sm"
                    />
                  </div>

                  {/* Output Directory */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Build output directory</label>
                    <input
                      type="text"
                      value={outputDir}
                      onChange={(e) => setOutputDir(e.target.value)}
                      placeholder="dist"
                      className="w-full bg-[#18181b] border border-gray-600 px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#27272a] focus:border-transparent transition-all font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-[#27272a] p-6 rounded-xl border border-gray-700/50">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Settings className="text-orange-400" size={20} />
                Advanced Settings
              </h3>

              <div className="space-y-4">
                {/* Root Directory */}
                <div>
                  <button
                    onClick={() => setShowRoot(!showRoot)}
                    className="text-blue-400 text-sm font-medium flex items-center gap-2 hover:text-blue-300 transition-colors"
                  >
                    {showRoot ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    Root directory (advanced)
                  </button>
                  {showRoot && (
                    <div className="mt-3 ml-6">
                      <input
                        type="text"
                        placeholder="e.g. /apps/site"
                        className="w-full bg-gray-800 border border-gray-600 px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-sm"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Specify if your app is in a subdirectory of your repository
                      </p>
                    </div>
                  )}
                </div>

                {/* Environment Variables */}
                <div>
                  <button
                    onClick={() => setShowEnv(!showEnv)}
                    className="text-blue-400 text-sm font-medium flex items-center gap-2 hover:text-blue-300 transition-colors"
                  >
                    {showEnv ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    Environment variables (advanced)
                  </button>
                  {showEnv && (
                    <div className="mt-3 ml-6 space-y-3">
                      {envVars.map((env, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            placeholder="KEY"
                            value={env.key}
                            onChange={(e) => updateEnvVar(index, 'key', e.target.value)}
                            className="flex-1 bg-gray-800 border border-gray-600 px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-sm"
                          />
                          <input
                            type="text"
                            placeholder="value"
                            value={env.value}
                            onChange={(e) => updateEnvVar(index, 'value', e.target.value)}
                            className="flex-1 bg-gray-800 border border-gray-600 px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-sm"
                          />
                          {envVars.length > 1 && (
                            <button
                              onClick={() => removeEnvVar(index)}
                              className="px-3 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={addEnvVar}
                        className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
                      >
                        + Add environment variable
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Validation Section */}
            {isValidating && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-400 border-t-transparent"></div>
                  <p className="text-sm text-yellow-300">Validating build configuration...</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-700">
            <a href="/pages/gitconnect2" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
              <ChevronLeft size={16} />
              Change repository
            </a>
            <div className="flex gap-3">
              <button
                onClick={validateSetup}
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-all font-medium"
              >
                Validate Setup
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3 rounded-lg transition-all font-medium shadow-lg hover:shadow-xl">
                Save and Deploy
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}