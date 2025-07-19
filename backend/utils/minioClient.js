// minioClient.js
const { Client } = require("minio");
require("dotenv").config();

const minioClient = new Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ROOT_USER,
  secretKey: process.env.MINIO_ROOT_PASSWORD,
  region: "us-east-1" // ✅ Add this line
});

module.exports = minioClient;
