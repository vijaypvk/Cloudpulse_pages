const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

// GitHub webhook secret
const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

// Use raw body for signature verification
router.use(bodyParser.raw({ type: "*/*" }));

// Verify HMAC SHA256 Signature
function verifySignature(req) {
  const signature = req.headers["x-hub-signature-256"];
  const payload = req.body;
  const hmac = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(payload)
    .digest("hex");
  return `sha256=${hmac}` === signature;
}

router.post("/", async (req, res) => {
  if (!verifySignature(req)) {
    return res.status(401).send("❌ Invalid signature");
  }

  const payload = JSON.parse(req.body.toString());

  if (payload.ref !== "refs/heads/main") {
    return res.status(200).send("📦 Ignored: not main branch");
  }

  const repoName = payload.repository.name;
  const cloneUrl = payload.repository.clone_url;
  const commit = payload.after;

  console.log(`📦 Received push on ${repoName}@${commit}`);

  // TODO: enqueue build job
  // e.g., enqueue to Redis:
  // await buildQueue.add("build", { repoName, cloneUrl, commit });

  res.status(200).send("✅ Webhook received and build enqueued");
});

module.exports = router;
