"use client"

import { useEffect, useState } from "react"
import {
  Github,
  Gitlab,
  Star,
  Clock,
  Search,
  Filter,
  X,
  GitFork,
  Eye,
  Lock,
  Globe,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Users,
  Zap,
} from "lucide-react"
import Sidebar from "@/app/components/sidebar"

const languageColors = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-500",
  Shell: "bg-green-500",
  React: "bg-cyan-500",
  HTML: "bg-orange-500",
  Python: "bg-blue-600",
  Go: "bg-teal-500",
  Markdown: "bg-gray-500",
  CSS: "bg-purple-500",
  Vue: "bg-green-400",
  Svelte: "bg-red-500",
}

export default function DeployPage() {
  const [selectedTab, setSelectedTab] = useState("GitHub")
  const [githubAccount, setGithubAccount] = useState("")
  const [repositories, setRepositories] = useState([])
  const [selectedRepo, setSelectedRepo] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showBanner, setShowBanner] = useState(true)
  const [filterPrivate, setFilterPrivate] = useState("all")
  const [sortBy, setSortBy] = useState("updated")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    // Fetch GitHub user
    fetch("/api/github/user")
      .then((res) => res.json())
      .then((data) => {
        setGithubAccount(data.login);
      })
      .catch((err) => console.error("User fetch error", err));

    // Fetch GitHub repositories
  fetch("/api/github/repos")
    .then((res) => res.json())
    .then((data) => {
      const formatted = data.map((repo) => ({
        name: repo.name,
        description: repo.description || "No description available",
        stars: Math.floor(Math.random() * 200), // mock only if needed
        forks: Math.floor(Math.random() * 50),   // mock only if needed
        size: "N/A",                             // placeholder
        defaultBranch: "main",                   // hardcoded fallback
        language: repo.language || "Markdown",
        updated: new Date(repo.updated_at).toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
        }),
        private: repo.private,
      }));
      setRepositories(formatted);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Repo fetch error", err);
      setError("Could not load repositories.");
      setLoading(false);
    });
}, []);

  const filteredRepos = repositories
    .filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrivacy =
        filterPrivate === "all" ||
        (filterPrivate === "public" && !repo.private) ||
        (filterPrivate === "private" && repo.private)
      return matchesSearch && matchesPrivacy
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "stars":
          return b.stars - a.stars
        case "updated":
        default:
          return new Date(b.updated) - new Date(a.updated)
      }
    })

  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage)
  const paginatedRepos = filteredRepos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const RepositoryCard = ({ repo }) => (
    <div
      onClick={() => setSelectedRepo(repo.name)}
      className={`group relative bg-gradient-to-br from-[#1a1a1d] to-[#18181b] p-4 sm:p-6 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20 ${
        selectedRepo === repo.name
          ? "border-blue-500 bg-gradient-to-br from-blue-500/10 to-blue-600/5 shadow-lg shadow-blue-500/20"
          : "border-gray-700 hover:border-gray-600"
      }`}
    >
      {selectedRepo === repo.name && (
        <div className="absolute -top-2 -right-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <div
            className={`w-3 h-3 rounded-full transition-colors ${
              selectedRepo === repo.name ? "bg-blue-500" : "bg-gray-600 group-hover:bg-blue-500"
            }`}
          />
          <h3 className="font-semibold text-white truncate group-hover:text-blue-400 transition-colors text-sm sm:text-base">
            {repo.name}
          </h3>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          {repo.private ? (
            <div className="flex items-center space-x-1 bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
              <Lock className="w-3 h-3" />
              <span className="text-xs font-medium hidden sm:inline">Private</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              <Globe className="w-3 h-3" />
              <span className="text-xs font-medium hidden sm:inline">Public</span>
            </div>
          )}
        </div>
      </div>

      <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
        {repo.description || "No description available"}
      </p>

      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex items-center space-x-1 text-gray-400">
            <Star className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">{repo.stars}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <GitFork className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">{repo.forks}</span>
          </div>
        </div>
        <span className="text-xs text-gray-500">{repo.size}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${languageColors[repo.language] || "bg-gray-500"}`} />
          <span className="text-xs sm:text-sm text-gray-400">{repo.language}</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-500">
          <Clock className="w-3 h-3" />
          <span className="text-xs">{repo.updated}</span>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Branch: {repo.defaultBranch}</span>
          <div className="flex items-center space-x-2">
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              <Eye className="w-3 h-3" />
            </button>
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              <GitFork className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-[#1a1a1d] p-4 sm:p-6 rounded-xl border border-gray-700 animate-pulse">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-gray-600 rounded-full" />
            <div className="h-4 bg-gray-600 rounded w-32" />
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-gray-600 rounded w-full" />
            <div className="h-3 bg-gray-600 rounded w-3/4" />
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-3 bg-gray-600 rounded w-12" />
            <div className="h-3 bg-gray-600 rounded w-12" />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-3 bg-gray-600 rounded w-20" />
            <div className="h-3 bg-gray-600 rounded w-16" />
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="bg-black min-h-screen">
      <Sidebar />

      {/* Main Content */}
      <div className="md:ml-64">
        <main className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pt-16 md:pt-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6 sm:mb-8 overflow-x-auto">
            <a href="/pages/hostingpage" className="hover:text-white transition-colors whitespace-nowrap">
              Pages
            </a>
            <span>›</span>
            <span className="whitespace-nowrap">Services</span>
            <span>›</span>
            <span className="text-white whitespace-nowrap">Deploy</span>
          </div>

          {/* Info Banner */}
          {showBanner && (
            <div className="relative bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/20 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 backdrop-blur-sm">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Pro Tip</h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    We recommend using{" "}
                    <a href="#" className="text-blue-400 hover:text-blue-300 underline font-medium">
                      Cloudflare Workers
                    </a>{" "}
                    for new projects. See how Workers compares to Pages in our{" "}
                    <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                      compatibility matrix
                    </a>
                    .
                  </p>
                </div>
                <button
                  onClick={() => setShowBanner(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1 flex-shrink-0"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Progress Stepper */}
          <div className="flex items-center justify-center mb-8 sm:mb-12 overflow-x-auto">
            <div className="flex items-center space-x-4 sm:space-x-8 min-w-max px-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs sm:text-sm font-bold">1</span>
                </div>
                <div>
                  <p className="text-blue-400 font-semibold text-xs sm:text-sm">Select repository</p>
                  <p className="text-xs text-gray-500 hidden sm:block">Choose your Git repo</p>
                </div>
              </div>
              <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-blue-500 to-gray-600"></div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-600 bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-400 text-xs sm:text-sm font-bold">2</span>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold text-xs sm:text-sm">Setup build</p>
                  <p className="text-xs text-gray-500 hidden sm:block">Configure deployment</p>
                </div>
              </div>
              <div className="w-8 sm:w-16 h-px bg-gray-600"></div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-600 bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-400 text-xs sm:text-sm font-bold">3</span>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold text-xs sm:text-sm">Deploy site</p>
                  <p className="text-xs text-gray-500 hidden sm:block">Go live</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-gradient-to-br from-[#18181b] to-[#1a1a1d] backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-2xl max-w-7xl mx-auto border border-gray-700/50">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Connect your repository
              </h2>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                Select a Git repository to link with your site. We'll automatically deploy on every push to your main
                branch.
              </p>
            </div>

            {/* Provider Tabs */}
            <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 p-1 bg-black/50 rounded-xl w-full sm:w-fit overflow-x-auto">
              {["GitHub", "GitLab"].map((provider) => (
                <button
                  key={provider}
                  onClick={() => setSelectedTab(provider)}
                  className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all font-medium whitespace-nowrap flex-1 sm:flex-none ${
                    selectedTab === provider
                      ? "bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  {provider === "GitHub" ? (
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Gitlab className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                  <span className="text-sm sm:text-base">{provider}</span>
                </button>
              ))}
            </div>

            {/* Account Section */}
            <div className="mb-6 sm:mb-8">
              <label className="block text-sm font-medium text-gray-300 mb-3">Connected account</label>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-3 bg-[#27272a] rounded-lg px-4 py-3 flex-1 sm:max-w-xs">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-gray-300" />
                  </div>
                  <span className="text-white font-medium text-sm sm:text-base">{githubAccount || "Loading..."}</span>
                </div>
                <button className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 px-4 py-2 rounded-lg transition-all font-medium text-sm sm:text-base">
                  + Add another account
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 mb-6 sm:mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search repositories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#27272a] border border-gray-600 text-white rounded-xl pl-10 sm:pl-12 pr-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <select
                    value={filterPrivate}
                    onChange={(e) => setFilterPrivate(e.target.value)}
                    className="bg-[#27272a] border border-gray-600 text-white rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base flex-1 sm:flex-none"
                  >
                    <option value="all">All repositories</option>
                    <option value="public">Public only</option>
                    <option value="private">Private only</option>
                  </select>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#27272a] border border-gray-600 text-white rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
                >
                  <option value="updated">Recently updated</option>
                  <option value="name">Name</option>
                  <option value="stars">Most stars</option>
                </select>
                <button
                  onClick={() => window.location.reload()}
                  className="p-2 sm:p-3 bg-[#27272a] border border-gray-600 rounded-xl hover:bg-gray-700 transition-all"
                >
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Repository Grid */}
            {loading ? (
              <LoadingSkeleton />
            ) : error ? (
              <div className="text-center py-8 sm:py-12">
                <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Failed to load repositories</h3>
                <p className="text-gray-400 mb-4 text-sm sm:text-base">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all text-sm sm:text-base"
                >
                  Try again
                </button>
              </div>
            ) : filteredRepos.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">No repositories found</h3>
                <p className="text-gray-400 mb-4 text-sm sm:text-base">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setFilterPrivate("all")
                  }}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all text-sm sm:text-base"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {paginatedRepos.map((repo, idx) => (
                  <RepositoryCard key={idx} repo={repo} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && filteredRepos.length > 0 && totalPages > 1 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 sm:py-6 border-t border-gray-700 space-y-4 sm:space-y-0">
                <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
                  Showing{" "}
                  <span className="text-white font-medium">
                    {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredRepos.length)}
                  </span>{" "}
                  of <span className="text-white font-medium">{filteredRepos.length}</span> repositories
                </div>
                <div className="flex items-center justify-center sm:justify-end space-x-4">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center space-x-2 px-4 sm:px-6 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm sm:text-base"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                    <span>Page</span>
                    <span className="text-white font-medium">{currentPage}</span>
                    <span>of</span>
                    <span className="text-white font-medium">{totalPages}</span>
                  </div>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center space-x-2 px-4 sm:px-6 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm sm:text-base"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 sm:pt-6 border-t border-gray-700 space-y-4 sm:space-y-0">
              <a
                href="/pages/hostingstart"
                className="text-gray-400 hover:text-white transition-colors font-medium text-sm sm:text-base text-center sm:text-left"
              >
                ← Back to deployment options
              </a>
              <a href={`/pages/buildfromgit?repo=${selectedRepo}`}>
                <button
                  disabled={!selectedRepo}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-medium flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <span>Begin setup</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
