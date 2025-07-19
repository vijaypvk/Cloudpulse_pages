const express = require("express");
const { Client } = require("minio");
const mime = require("mime-types");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;
const BUCKET = "cloudpulse-hosted";

const minioClient = new Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "admin",
  secretKey: "password123",
});

// ✅ GET route must be placed BEFORE app.listen
app.get("/hosted/:projectName/*", async (req, res) => {
  const projectName = req.params.projectName;
  const filePath = req.params[0] || "index.html";
  const objectKey = path.posix.join(projectName, filePath);

  try {
    const stream = await minioClient.getObject(BUCKET, objectKey);
    const contentType = mime.lookup(filePath) || "application/octet-stream";
    res.setHeader("Content-Type", contentType);
    stream.pipe(res);
  } catch (err) {
    console.error(`❌ Error fetching ${objectKey}:`, err.message || err);
    res.status(404).send("File not found");
  }
});


app.listen(PORT, async () => {
  console.log(`🚀 Server running: http://localhost:${PORT}`);

  try {
    const exists = await minioClient.bucketExists(BUCKET);
    if (!exists) {
      await minioClient.makeBucket(BUCKET, "");
      console.log(`🪣 Bucket '${BUCKET}' created`);
    }

    if (fs.existsSync("./test.html")) {
      await minioClient.fPutObject(
        BUCKET,
        "portfolio/test.html",
        "./test.html",
        { "Content-Type": "text/html" }
      );
      console.log("📤 Uploaded test.html to MinIO");
    } else {
      console.warn("⚠️ test.html not found");
    }
  } catch (err) {
    console.error("❌ Error during bucket setup:", err.message || err);
  }
});
