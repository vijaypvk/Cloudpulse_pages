// // server.js
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();

// const app = express();
// const PORT = 4000;

// app.use(cors());
// app.use(express.json());

// const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
// const headers = {
//   Authorization: `token ${GITHUB_TOKEN}`,
//   Accept: "application/vnd.github+json",
// };

// // 🧑 Get GitHub user details
// app.get("/api/github/user", async (req, res) => {
//   try {
//     const userRes = await axios.get("https://api.github.com/user", {
//       headers,
//     });
//     res.json(userRes.data);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: "Failed to fetch GitHub user" });
//   }
// });

// // 📦 Get all repositories
// app.get("/api/github/repos", async (req, res) => {
//   try {
//     const repoRes = await axios.get("https://api.github.com/user/repos?per_page=100", {
//       headers,
//     });

//     const repoList = repoRes.data.map((repo) => ({
//       name: repo.name,
//       full_name: repo.full_name,
//       private: repo.private,
//       html_url: repo.html_url,
//       description: repo.description,
//       language: repo.language,
//       updated_at: repo.updated_at,
//     }));

//     res.json(repoList);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: "Failed to fetch GitHub repos" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });
// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
};

// 🧑 Get GitHub user details
app.get("/api/github/user", async (req, res) => {
  try {
    const userRes = await axios.get("https://api.github.com/user", {
      headers,
    });
    res.json(userRes.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch GitHub user" });
  }
});

// 📦 Get all repositories
app.get("/api/github/repos", async (req, res) => {
  try {
    const repoRes = await axios.get("https://api.github.com/user/repos?per_page=100", {
      headers,
    });

    const repoList = repoRes.data.map((repo) => ({
      name: repo.name,
      full_name: repo.full_name,
      private: repo.private,
      html_url: repo.html_url,
      description: repo.description,
      language: repo.language,
      updated_at: repo.updated_at,
    }));

    res.json(repoList);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch GitHub repos" });
  }
});

// 🚀 Save deploy configuration
app.post("/api/deploy-config", async (req, res) => {
  try {
    const {
      repo,
      projectName,
      buildCommand,
      outputDir,
      productionBranch,
      envVars,
      framework
    } = req.body;

    if (!repo || !projectName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Save configuration to local file (you can change this to DB later)
    const configDir = path.join(__dirname, "configs");
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir);
    }

    const filePath = path.join(configDir, `${projectName}.json`);
    fs.writeFileSync(
      filePath,
      JSON.stringify({
        repo,
        projectName,
        buildCommand,
        outputDir,
        productionBranch,
        envVars,
        framework,
        savedAt: new Date().toISOString()
      }, null, 2)
    );

    console.log(`📁 Saved deploy config for ${projectName}`);
    res.json({ message: "Configuration saved successfully", path: filePath });

  } catch (err) {
    console.error("❌ Error saving config:", err.message);
    res.status(500).json({ error: "Failed to save deploy configuration" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
