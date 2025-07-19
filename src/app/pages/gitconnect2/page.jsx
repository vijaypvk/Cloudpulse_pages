
"use client";
import React, { useEffect, useState } from "react";
import {
  Github, Gitlab, ChevronLeft, Star, Clock,
  Search, Filter, X
} from "lucide-react";
import Sidebar from "@/app/components/sidebar";

const languageColors = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-500",
  Shell: "bg-green-500",
  React: "bg-cyan-500",
  HTML: "bg-orange-500",
  Python: "bg-blue-600",
  Go: "bg-teal-500",
  Markdown: "bg-gray-500"
};

export default function DeployPage() {
  const [selectedTab, setSelectedTab] = useState("GitHub");
  const [githubAccount, setGithubAccount] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBanner, setShowBanner] = useState(true);
  const [filterPrivate, setFilterPrivate] = useState("all");

  // ✅ Fetch GitHub user and repositories
  useEffect(() => {
    // Fetch GitHub user
    fetch("http://localhost:4000/api/github/user")
      .then((res) => res.json())
      .then((data) => {
        setGithubAccount(data.login);
      })
      .catch((err) => console.error("User fetch error", err));

    // Fetch GitHub repositories
    fetch("http://localhost:4000/api/github/repos")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((repo) => ({
          name: repo.name,
          stars: Math.floor(Math.random() * 200), // Mocked stars
          language: repo.language || "Markdown",
          updated: new Date(repo.updated_at).toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
          private: repo.private,
        }));
        setRepositories(formatted);
      })
      .catch((err) => console.error("Repo fetch error", err));
  }, []);

  const filteredRepos = repositories.filter((repo) => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrivacy =
      filterPrivate === "all" ||
      (filterPrivate === "public" && !repo.private) ||
      (filterPrivate === "private" && repo.private);
    return matchesSearch && matchesPrivacy;
  });

  return (
    <div>
      <Sidebar />
      <main className="min-h-screen bg-black text-white p-8 ml-64">
        {/* Back link */}
        {/* <a href="/pages/gitconnect" className="text-blue-400 flex items-center gap-2 mb-6 text-sm hover:text-blue-300 transition-colors group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Create an application
        </a> */}
        <div className="text-sm text-gray-400 flex items-center space-x-2 mx-6 mb-8 ">
        <span><a href="/pages/hostingpage">Pages</a></span>        
        <span>›</span>        
        <span>Services</span>        
      </div>

        {/* Info Banner */}
        {showBanner && (
          <div className="relative bg-gradient-to-r from-blue-900/90 to-blue-800/90 backdrop-blur-sm text-sm text-white p-4 rounded-xl mb-8 shadow-lg border border-blue-700/50">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent rounded-xl"></div>
            <div className="relative">
              We recommend using{" "}
              <a href="#" className="underline font-semibold hover:text-blue-300 transition-colors">
                Cloudflare Workers
              </a>{" "}
              for new projects. See how Workers compares to Pages in our{" "}
              <a href="#" className="underline hover:text-blue-300 transition-colors">
                compatibility matrix
              </a>.
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="absolute top-3 right-4 text-white/80 text-lg hover:text-red-400 hover:bg-red-500/20 rounded-full w-6 h-6 flex items-center justify-center transition-all"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Stepper */}
        <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-10">
          <div className="flex items-center gap-2 font-medium text-blue-400">
            <div className="w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold shadow-lg">1</div>
            Select repository
          </div>
          <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-gray-600"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-gray-500 flex items-center justify-center text-xs bg-gray-800">2</div>
            Setup build
          </div>
          <div className="h-0.5 w-12 bg-gray-600"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-gray-500 flex items-center justify-center text-xs bg-gray-800">3</div>
            Deploy site
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-[#18181b] backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-5xl mx-auto border border-gray-700/50">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Connect your repository
            </h2>
            <p className="text-gray-400 text-sm">
              Select a Git repository to link with your site. We'll auto-deploy on every push.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-black rounded-xl w-fit">
            <button
              onClick={() => setSelectedTab("GitHub")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all font-medium ${selectedTab === "GitHub"
                ? "bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
            >
              <Github size={18} /> GitHub
            </button>
            <button
              onClick={() => setSelectedTab("GitLab")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all font-medium ${selectedTab === "GitLab"
                ? "bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
            >
              <Gitlab size={18} /> GitLab
            </button>
          </div>

          {/* Account Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Connected account</label>
            <div className="flex items-center gap-4">
              <select className="bg-[#27272a] text-white rounded-lg px-4 py-3 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-[#333335] focus:border-transparent transition-all">
                <option>{githubAccount}</option>
              </select>
              <button className="text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 px-3 py-2 rounded-lg transition-all">
                + Add another account
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#27272a] border border-gray-600 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#18181b] focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={filterPrivate}
                onChange={(e) => setFilterPrivate(e.target.value)}
                className="bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">All repositories</option>
                <option value="public">Public only</option>
                <option value="private">Private only</option>
              </select>
            </div>
          </div>

          {/* Repository Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {filteredRepos.map((repo, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedRepo(repo.name)}
                className={`bg-[#27272a] p-4 rounded-xl border transition-all cursor-pointer hover:scale-105 hover:shadow-lg group ${selectedRepo === repo.name
                  ? "border-gray-700 bg-blue-500/5 shadow-lg shadow-gray-600/30"
                  : "border-gray-700 hover:border-gray-600"
                  }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-600 group-hover:bg-blue-500 transition-colors"></div>
                    <span className="text-sm font-medium truncate">{repo.name}</span>
                  </div>
                  {repo.private && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                      Private
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                  <div className="flex items-center gap-1">
                    <Star size={12} />
                    {repo.stars}
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${languageColors[repo.language] || "bg-gray-500"}`}></div>
                    {repo.language}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={12} />
                  Updated {repo.updated}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="text-sm text-gray-400 flex justify-between items-center mb-8">
            <div>
              Showing <span className="text-white font-medium">1–{filteredRepos.length}</span> of <span className="text-white font-medium">{repositories.length}</span> repositories
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50">
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50">
                Next
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-700">
            <a href="" className="text-sm text-gray-400 hover:text-white transition-colors">
              Cancel
            </a>
            
            <a href={`/pages/buildfromgit?repo=${selectedRepo}`}>
            
              <button
                disabled={!selectedRepo}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-medium"
              >
                Begin setup
              </button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
