import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  reactStrictMode: true,

  // If you want smaller Docker image:
  output: "standalone",
};



export default nextConfig;
