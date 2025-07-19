
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const fs = require("fs");
// const path = require("path");
// const buildRoutes = require("./build/buildAndServe"); // ⬅️ Router for build/deploy


// dotenv.config();

// const app = express();
// const PORT = 4000;

// // 🔧 Middleware
// app.use(cors());
// app.use(express.json());

// // 📦 Use build route
// app.use("/api", buildRoutes);

// // 🔐 GitHub token setup
// const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
// const headers = {
//   Authorization: `token ${GITHUB_TOKEN}`,
//   Accept: "application/vnd.github+json",
// };

// // 🧑 Get GitHub user details
// app.get("/api/github/user", async (req, res) => {
//   try {
//     const userRes = await axios.get("https://api.github.com/user", { headers });
//     res.json(userRes.data);
//   } catch (err) {
//     console.error("❌ GitHub user error:", err.message);
//     res.status(500).json({ error: "Failed to fetch GitHub user" });
//   }
// });

// // 📚 Get GitHub repos
// app.get("/api/github/repos", async (req, res) => {
//   try {
//     const repoRes = await axios.get("https://api.github.com/user/repos?per_page=100", { headers });
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
//     console.error("❌ GitHub repo error:", err.message);
//     res.status(500).json({ error: "Failed to fetch GitHub repos" });
//   }
// });

// // 💾 Save deploy config
// app.post("/api/deploy-config", async (req, res) => {
//   try {
//     const {
//       repo,
//       projectName,
//       buildCommand,
//       outputDir,
//       productionBranch,
//       envVars,
//       framework
//     } = req.body;

//     if (!repo || !projectName) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const configDir = path.join(__dirname, "configs");
//     if (!fs.existsSync(configDir)) {
//       fs.mkdirSync(configDir);
//     }

//     const filePath = path.join(configDir, `${projectName}.json`);
//     fs.writeFileSync(
//       filePath,
//       JSON.stringify({
//         repo,
//         projectName,
//         buildCommand,
//         outputDir,
//         productionBranch,
//         envVars,
//         framework,
//         savedAt: new Date().toISOString()
//       }, null, 2)
//     );

//     console.log(`📁 Saved deploy config for ${projectName}`);
//     res.json({ message: "Configuration saved successfully", path: filePath });

//     // 🔔 (Optional) Set up webhook (disabled by default)
//     /*
//     const [owner, repoName] = repo.split("/");
//     try {
//       const webhookRes = await axios.post(
//         `https://api.github.com/repos/${owner}/${repoName}/hooks`,
//         {
//           name: "web",
//           active: true,
//           events: ["push"],
//           config: {
//             url: "http://your-server.com/api/webhook/github", // TODO: Replace with your server's public URL
//             content_type: "json",
//             secret: process.env.GITHUB_WEBHOOK_SECRET,
//             insecure_ssl: "0"
//           }
//         },
//         { headers }
//       );
//       console.log(`✅ Webhook created for ${repo}`);
//     } catch (err) {
//       if (err.response && err.response.status === 422) {
//         console.log(`⚠️ Webhook already exists for ${repo}`);
//       } else {
//         console.error("❌ Error creating webhook:", err.message);
//       }
//     }
//     */

//   } catch (err) {
//     console.error("❌ Error saving config:", err.message);
//     res.status(500).json({ error: "Failed to save deploy configuration" });
//   }
// });

// // 🌐 Serve built static websites
// app.use("/hosted", express.static(path.join(__dirname, "hosted")));

// app.use("/hosted/:projectName", (req, res, next) => {
//   const { projectName } = req.params;
//   const indexPath = path.join(__dirname, "hosted", projectName, "index.html");

//   if (fs.existsSync(indexPath)) {
//     res.sendFile(indexPath);
//   } else {
//     res.status(404).send("SPA not found");
//   }
// });

// // ✅ Add this below your POST /api/deploy-config
// app.get("/api/get-deploy-config", (req, res) => {
//   const { projectName } = req.query;

//   if (!projectName) {
//     return res.status(400).json({ error: "Missing projectName in query" });
//   }

//   const configPath = path.join(__dirname, "configs", `${projectName}.json`);

//   if (!fs.existsSync(configPath)) {
//     return res.status(404).json({ error: "Configuration not found" });
//   }

//   try {
//     const configData = fs.readFileSync(configPath, "utf-8");
//     const config = JSON.parse(configData);
//     res.json(config);
//   } catch (err) {
//     console.error("❌ Error reading config:", err.message);
//     res.status(500).json({ error: "Failed to read configuration" });
//   }
// });


// // 🚀 Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });
// 📁 server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const buildRoutes = require("./buildandserve/buildAndServe");
const minioClient = require("./utils/minioClient");

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/api", buildRoutes);

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
};

app.get("/api/github/user", async (req, res) => {
  try {
    const userRes = await axios.get("https://api.github.com/user", { headers });
    res.json(userRes.data);
  } catch (err) {
    console.error("❌ GitHub user error:", err.message);
    res.status(500).json({ error: "Failed to fetch GitHub user" });
  }
});

app.get("/api/github/repos", async (req, res) => {
  try {
    const repoRes = await axios.get("https://api.github.com/user/repos?per_page=100", { headers });
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
    console.error("❌ GitHub repo error:", err.message);
    res.status(500).json({ error: "Failed to fetch GitHub repos" });
  }
});

app.post("/api/deploy-config", async (req, res) => {
  try {
    const {
      repo,
      projectName,
      buildCommand,
      outputDir,
      productionBranch,
      envVars,
      framework,
    } = req.body;

    if (!repo || !projectName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const configDir = path.join(__dirname, "configs");
    if (!fs.existsSync(configDir)) fs.mkdirSync(configDir);

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
        savedAt: new Date().toISOString(),
      }, null, 2)
    );

    console.log(`📁 Saved deploy config for ${projectName}`);
    res.json({ message: "Configuration saved successfully", path: filePath });
  } catch (err) {
    console.error("❌ Error saving config:", err.message);
    res.status(500).json({ error: "Failed to save deploy configuration" });
  }
});
// Serve `index.html` for root project URL
app.get("/hosted/:projectName", async (req, res) => {
  const { projectName } = req.params;
  const indexKey = `${projectName}/index.html`;

  try {
    const stream = await minioClient.getObject(process.env.MINIO_BUCKET, indexKey);
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "no-cache");
    stream.pipe(res);
  } catch (err) {
    console.error("❌ Index fallback error:", err.message);
    res.status(404).send("Project not found");
  }
});

// Serve files and handle SPA routes (fallback to index.html)
app.get("/hosted/:projectName/*", async (req, res) => {
  const { projectName } = req.params;
  const filePath = req.params[0];
  const objectKey = `${projectName}/${filePath}`;

  try {
    await minioClient.statObject(process.env.MINIO_BUCKET, objectKey); // Check if file exists
    const stream = await minioClient.getObject(process.env.MINIO_BUCKET, objectKey);
    const contentType = mime.lookup(filePath) || "application/octet-stream";

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=3600");
    stream.pipe(res);
  } catch (err) {
    // SPA Fallback for paths without file extensions
    if (!filePath.includes(".")) {
      try {
        const indexStream = await minioClient.getObject(
          process.env.MINIO_BUCKET,
          `${projectName}/index.html`
        );
        res.setHeader("Content-Type", "text/html");
        indexStream.pipe(res);
      } catch (indexErr) {
        res.status(404).send("File not found");
      }
    } else {
      console.error(`❌ MinIO getObject error for ${objectKey}:`, err.message);
      res.status(404).send("File not found");
    }
  }
});



app.get("/api/get-deploy-config", (req, res) => {
  const { projectName } = req.query;

  if (!projectName) {
    return res.status(400).json({ error: "Missing projectName in query" });
  }

  const configPath = path.join(__dirname, "configs", `${projectName}.json`);
  if (!fs.existsSync(configPath)) {
    return res.status(404).json({ error: "Configuration not found" });
  }

  try {
    const configData = fs.readFileSync(configPath, "utf-8");
    res.json(JSON.parse(configData));
  } catch (err) {
    console.error("❌ Error reading config:", err.message);
    res.status(500).json({ error: "Failed to read configuration" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
