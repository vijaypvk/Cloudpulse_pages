// const express = require("express");
// const { execSync } = require("child_process");
// const fs = require("fs");
// const path = require("path");

// const router = express.Router();

// router.post("/build-and-serve", async (req, res) => {
//   const { projectName } = req.body;

//   const configPath = path.join(__dirname, "../configs", `${projectName}.json`);
//   const clonePath = path.join(__dirname, "../projects", projectName);
//   const hostedPath = path.join(__dirname, "../hosted", projectName);

//   if (!fs.existsSync(configPath)) {
//     return res.status(404).json({ error: "Config not found" });
//   }

//   const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

//   try {
//     if (!fs.existsSync(clonePath)) {
//       execSync(`git clone https://github.com/${config.repo} ${clonePath}`);
//     } else {
//       execSync(`cd ${clonePath} && git pull`);
//     }

//     const isSPA = fs.existsSync(path.join(clonePath, "package.json"));

//     if (isSPA) {
//       console.log("📦 Running build inside Docker...");
// const normalizedClonePath = clonePath.replace(/\\/g, "/"); // convert \ to /
// const dockerCmd = `docker run --rm -v "${normalizedClonePath}:/app" -w /app node:20 sh -c "npm install && ${config.buildCommand}"`;

// console.log("🚀 Running Docker Command:\n", dockerCmd);

// execSync(dockerCmd, { stdio: "inherit" });


//     } else {
//       console.log("🧾 Detected Static HTML, no build needed");
//     }

//     const outputDir = config.outputDir || (isSPA ? "dist" : ".");
//     const fullOutputPath = path.join(clonePath, outputDir);

//     if (!fs.existsSync(fullOutputPath)) {
//       return res.status(400).json({ error: "Output folder not found after build" });
//     }

//     fs.rmSync(hostedPath, { recursive: true, force: true });
//     fs.mkdirSync(hostedPath, { recursive: true });
//     fs.cpSync(fullOutputPath, hostedPath, { recursive: true });

//     return res.json({
//       message: "✅ Project built and hosted",
//       url: `http://localhost:4000/hosted/${projectName}/`
//     });
//   } catch (err) {
//     console.error("❌ Build error:", err);
//     return res.status(500).json({ error: "Build or deploy failed", detail: err.message });
//   }
// });

// module.exports = router;
const express = require("express");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const minioClient = require("../utils/minioClient");
const router = express.Router();

// ✅ Skip dotfiles/folders like .git, .env, etc.
async function uploadDirToMinIO(localDir, bucketName, prefix) {
  const files = fs.readdirSync(localDir, { withFileTypes: true });

  for (const file of files) {
    // ❌ Skip hidden files/folders
    if (file.name.startsWith(".")) continue;

    const localPath = path.join(localDir, file.name);
    const objectKey = `${prefix}/${file.name}`;

    if (file.isDirectory()) {
      await uploadDirToMinIO(localPath, bucketName, objectKey);
    } else {
      await minioClient.fPutObject(bucketName, objectKey, localPath);
      console.log(`✅ Uploaded: ${objectKey}`);
    }
  }
}

router.post("/build-and-serve", async (req, res) => {
  const { projectName } = req.body;
  const configPath = path.join(__dirname, "../configs", `${projectName}.json`);
  const clonePath = path.join(__dirname, "../projects", projectName);

  if (!fs.existsSync(configPath)) {
    return res.status(404).json({ error: "Config not found" });
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

  try {
    if (!fs.existsSync(clonePath)) {
      execSync(`git clone https://github.com/${config.repo} ${clonePath}`);
    } else {
      execSync(`cd ${clonePath} && git pull`);
    }

    const isSPA = fs.existsSync(path.join(clonePath, "package.json"));
    if (isSPA) {
      console.log("📦 Running build inside Docker...");
      const normalizedClonePath = clonePath.replace(/\\/g, "/");
      const dockerCmd = `docker run --rm -v "${normalizedClonePath}:/app" -w /app node:20 sh -c "npm install && ${config.buildCommand}"`;
      console.log("🚀 Running Docker Command:\n", dockerCmd);
      execSync(dockerCmd, { stdio: "inherit" });
    } else {
      console.log("🧾 Detected Static HTML, no build needed");
    }

    const outputDir = config.outputDir || (isSPA ? "dist" : ".");
    const fullOutputPath = path.join(clonePath, outputDir);

    if (!fs.existsSync(fullOutputPath)) {
      return res.status(400).json({ error: "Output folder not found after build" });
    }

    await uploadDirToMinIO(fullOutputPath, process.env.MINIO_BUCKET, projectName);

    return res.json({
      message: "✅ Project built and hosted",
      url: `http://localhost:4000/hosted/${projectName}/`
    });
  } catch (err) {
    console.error("❌ Build error:", err);
    return res.status(500).json({ error: "Build or deploy failed", detail: err.message });
  }
});

module.exports = router;
