const express = require("express");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const minioClient = require("../utils/minioClient");
const router = express.Router();

const buildLocks = new Set(); // ✅ For avoiding duplicate builds

// ✅ Fully await all recursive uploads using Promise.all
async function uploadDirToMinIO(localDir, bucketName, prefix) {
  const files = fs.readdirSync(localDir, { withFileTypes: true });

  const uploadTasks = [];

  for (const file of files) {
    if (file.name.startsWith(".")) continue; // Skip hidden files/folders

    const localPath = path.join(localDir, file.name);
    const objectKey = `${prefix}/${file.name}`;

    if (file.isDirectory()) {
      uploadTasks.push(uploadDirToMinIO(localPath, bucketName, objectKey));
    } else {
      const task = minioClient.fPutObject(bucketName, objectKey, localPath)
        .then(() => console.log(`✅ Uploaded: ${objectKey}`))
        .catch((err) => {
          console.error(`❌ Failed to upload ${objectKey}:`, err.message);
          throw err;
        });
      uploadTasks.push(task);
    }
  }

  await Promise.all(uploadTasks);
}

router.post("/build-and-serve", async (req, res) => {
  const unsafeProjectName = req.body.projectName;

  // ✅ Validate project name
  const isValid = /^[a-zA-Z0-9_-]+$/.test(unsafeProjectName);
  if (!isValid) {
    return res.status(400).json({ error: "Invalid project name" });
  }

  // ✅ Prevent duplicate builds
  if (buildLocks.has(unsafeProjectName)) {
    return res.status(429).json({ error: "Build already in progress for this project" });
  }
  buildLocks.add(unsafeProjectName);

  const configPath = path.join(__dirname, "../configs", `${unsafeProjectName}.json`);
  const baseProjectsDir = path.resolve(__dirname, "../projects");
  const clonePath = path.resolve(baseProjectsDir, unsafeProjectName);

  // ✅ Prevent unsafe path traversal
  if (!clonePath.startsWith(baseProjectsDir)) {
    buildLocks.delete(unsafeProjectName);
    return res.status(400).json({ error: "Unsafe project path" });
  }

  if (!fs.existsSync(configPath)) {
    buildLocks.delete(unsafeProjectName);
    return res.status(404).json({ error: "Config not found" });
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  const githubToken = process.env.GITHUB_TOKEN;

  try {
    // Clone or pull latest repo
    if (!fs.existsSync(clonePath)) {
      execSync(`git clone https://${githubToken}@github.com/${config.repo} ${clonePath}`, { stdio: "inherit" });
    } else {
      execSync(`cd ${clonePath} && git pull`, { stdio: "inherit" });
    }

    const isSPA = fs.existsSync(path.join(clonePath, "package.json"));

    if (isSPA) {
      console.log("📦 Running SPA build locally...");

      if (!config.buildCommand || config.buildCommand.trim() === "") {
        throw new Error("🚫 buildCommand is missing or empty in config file");
      }

      // ✅ Run npm install & build locally (no Docker)
      execSync("npm install", { cwd: clonePath, stdio: "inherit" });
      execSync(config.buildCommand, { cwd: clonePath, stdio: "inherit" });

    } else {
      console.log("📦 Detected static HTML project, no build needed.");
    }

    const outputDir = config.outputDir || (isSPA ? "dist" : ".");
    const fullOutputPath = path.join(clonePath, outputDir);

    if (!fs.existsSync(fullOutputPath)) {
      return res.status(400).json({ error: "Output folder not found after build" });
    }

    try {
      await uploadDirToMinIO(fullOutputPath, process.env.MINIO_BUCKET, unsafeProjectName);
    } finally {
      try {
        // ✅ Safe forced deletion of project folder
        execSync(`rm -rf "${clonePath}"`);
        console.log(`🧹 Safely deleted local clone: ${clonePath}`);
      } catch (cleanupErr) {
        console.warn(`⚠️ Failed to delete project: ${cleanupErr.message}`);
      }
    }

    return res.json({
      message: "✅ Project built and hosted",
      url: `http://localhost:4000/hosted/${unsafeProjectName}/`
    });

  } catch (err) {
    console.error("❌ Build error:", err);
    return res.status(500).json({ error: "Build or deploy failed", detail: err.message });
  } finally {
    buildLocks.delete(unsafeProjectName); // ✅ Always unlock
  }
});

module.exports = router;
