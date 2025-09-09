"use client"

import { useState } from "react"
import {
  UploadCloud,
  GitBranch,
  X,
  Globe,
  Rocket,
  Code,
  FileText,
  Github,
  Gitlab,
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
  Sparkles,
} from "lucide-react"
import Sidebar from "@/app/components/sidebar"

export default function HostingStart() {
  const [showRecommendation, setShowRecommendation] = useState(true)
  const [selectedTab, setSelectedTab] = useState("pages")

  const deploymentOptions = [
    {
      id: "git",
      title: "Import an existing Git repository",
      description: "Connect your GitHub, GitLab, or Bitbucket repository for automatic deployments",
      icon: <GitBranch className="w-6 h-6" />,
      color: "blue",
      recommended: true,
      features: ["Automatic deployments", "Branch previews", "Rollback support"],
      href: "/pages/gitconnect2",
      providers: [
        { name: "GitHub", icon: <Github className="w-4 h-4" /> },
        { name: "GitLab", icon: <Gitlab className="w-4 h-4" /> },
        { name: "Bitbucket", icon: <Code className="w-4 h-4" /> },
      ],
    },
    {
      id: "upload",
      title: "Direct file upload",
      description: "Upload your static files directly from your computer",
      icon: <UploadCloud className="w-6 h-6" />,
      color: "green",
      recommended: false,
      features: ["Drag & drop support", "Instant deployment", "No Git required"],
      href: "#",
      formats: ["HTML", "CSS", "JS", "Images"],
    },
    {
      id: "template",
      title: "Start from a template",
      description: "Choose from our collection of pre-built templates and frameworks",
      icon: <FileText className="w-6 h-6" />,
      color: "purple",
      recommended: false,
      features: ["Ready-to-use templates", "Framework integration", "Quick setup"],
      href: "#",
      templates: ["React", "Vue", "Next.js", "Nuxt"],
    },
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        icon: "text-blue-400",
        border: "border-blue-500/20 hover:border-blue-500/40",
        button: "border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white",
        gradient: "from-blue-500/10 to-blue-600/5",
      },
      green: {
        icon: "text-green-400",
        border: "border-green-500/20 hover:border-green-500/40",
        button: "border-green-500 text-green-400 hover:bg-green-500 hover:text-white",
        gradient: "from-green-500/10 to-green-600/5",
      },
      purple: {
        icon: "text-purple-400",
        border: "border-purple-500/20 hover:border-purple-500/40",
        button: "border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white",
        gradient: "from-purple-500/10 to-purple-600/5",
      },
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="bg-black min-h-screen">
      <Sidebar />

      {/* Main Content */}
      <div className="md:ml-64">
        <main className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pt-16 md:pt-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6 sm:mb-8">
            <a href="/pages/hostingpage" className="hover:text-white transition-colors">
              Pages
            </a>
            <span>›</span>
            <span className="text-white">Get Started</span>
          </div>

          {/* Header Section */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Get started
                </h1>
                <p className="text-gray-400 text-base sm:text-lg mt-1">
                  Deploy your first site with ease. Choose how you want to begin.
                </p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
              {/* Step 1 */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white text-sm font-medium">1</span>
                </div>
                <span className="text-white font-medium text-sm sm:text-base">Choose Method</span>
              </div>

              {/* Connector */}
              <div className="hidden sm:block w-8 lg:w-12 h-px bg-gray-700"></div>
              <div className="sm:hidden w-px h-6 bg-gray-700 ml-4"></div>

              {/* Step 2 */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-400 text-sm font-medium">2</span>
                </div>
                <span className="text-gray-400 text-sm sm:text-base">Configure</span>
              </div>

              {/* Connector */}
              <div className="hidden sm:block w-8 lg:w-12 h-px bg-gray-700"></div>
              <div className="sm:hidden w-px h-6 bg-gray-700 ml-4"></div>

              {/* Step 3 */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-400 text-sm font-medium">3</span>
                </div>
                <span className="text-gray-400 text-sm sm:text-base">Deploy</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-[#1a1a1a] p-1 rounded-lg mb-6 sm:mb-8 w-full sm:w-fit overflow-x-auto border border-gray-800">
            <button
              onClick={() => setSelectedTab("pages")}
              className={`py-2 px-4 sm:px-6 rounded-md transition-all font-medium whitespace-nowrap flex-1 sm:flex-none ${
                selectedTab === "pages"
                  ? "bg-white text-black shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              Pages
            </button>
            <button
              onClick={() => setSelectedTab("workers")}
              className={`py-2 px-4 sm:px-6 rounded-md transition-all font-medium whitespace-nowrap flex-1 sm:flex-none ${
                selectedTab === "workers"
                  ? "bg-white text-black shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              Workers
            </button>
          </div>

          {/* Recommendation Banner */}
          {showRecommendation && (
            <div className="relative bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/20 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 backdrop-blur-sm shadow-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Recommended for you</h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    We recommend using{" "}
                    <a href="#" className="text-blue-400 hover:text-blue-300 underline font-medium">
                      CloudPulse Workers
                    </a>{" "}
                    for new projects. Compare Pages and Workers in our{" "}
                    <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                      compatibility matrix
                    </a>
                    .
                  </p>
                </div>
                <button
                  onClick={() => setShowRecommendation(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1 flex-shrink-0 hover:bg-gray-800/50 rounded"
                  aria-label="Close recommendation"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Deployment Options */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Choose your deployment method</h2>

            {deploymentOptions.map((option) => {
              const colorClasses = getColorClasses(option.color)
              return (
                <div
                  key={option.id}
                  className={`group relative bg-gradient-to-r ${colorClasses.gradient} border ${colorClasses.border} rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 sm:hover:scale-[1.02] backdrop-blur-sm`}
                >
                  {option.recommended && (
                    <div className="absolute -top-2 sm:-top-3 left-4 sm:left-6">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 sm:px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                        <Star className="w-3 h-3" />
                        <span>RECOMMENDED</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 bg-gray-800/50 rounded-xl flex items-center justify-center ${colorClasses.icon} flex-shrink-0 shadow-lg`}
                      >
                        {option.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-base sm:text-lg mb-2 group-hover:text-blue-400 transition-colors">
                          {option.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 leading-relaxed">{option.description}</p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {option.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-1 bg-gray-800/50 px-2 py-1 rounded-md border border-gray-700/50"
                            >
                              <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                              <span className="text-xs text-gray-300">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Additional Info */}
                        {option.providers && (
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                            <span className="text-xs text-gray-500 flex-shrink-0">Supports:</span>
                            <div className="flex flex-wrap items-center gap-2">
                              {option.providers.map((provider, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-1 text-xs text-gray-400 bg-gray-800/30 px-2 py-1 rounded border border-gray-700/30"
                                >
                                  {provider.icon}
                                  <span>{provider.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {option.formats && (
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                            <span className="text-xs text-gray-500 flex-shrink-0">Supports:</span>
                            <div className="flex flex-wrap items-center gap-2">
                              {option.formats.map((format, index) => (
                                <span
                                  key={index}
                                  className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded border border-gray-700/30"
                                >
                                  {format}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {option.templates && (
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                            <span className="text-xs text-gray-500 flex-shrink-0">Popular:</span>
                            <div className="flex flex-wrap items-center gap-2">
                              {option.templates.map((template, index) => (
                                <span
                                  key={index}
                                  className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded border border-gray-700/30"
                                >
                                  {template}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-0 lg:space-y-3">
                      <a href={option.href} className="w-full sm:w-auto">
                        <button
                          className={`w-full sm:w-auto border ${colorClasses.button} px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 group-hover:scale-105 text-sm sm:text-base shadow-lg hover:shadow-xl`}
                        >
                          <span>Get started</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </a>
                      {option.recommended && (
                        <div className="flex items-center space-x-1 text-xs text-green-400">
                          <Clock className="w-3 h-3" />
                          <span>~2 min setup</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Help Section */}
          <div className="mt-8 sm:mt-12 bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-700 rounded-xl p-4 sm:p-6 backdrop-blur-sm shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Need help choosing?</h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-4 leading-relaxed">
                  Not sure which deployment method is right for you? Check out our documentation or contact support.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-medium underline transition-colors"
                  >
                    View Documentation
                  </a>
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-medium underline transition-colors"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
