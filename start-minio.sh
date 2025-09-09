#!/bin/bash

# Create data directory if it doesn't exist
mkdir -p ~/minio-data

# Run MinIO container
docker run -p 9000:9000 -p 9001:9001 \
  -e MINIO_ROOT_USER=admin \
  -e MINIO_ROOT_PASSWORD=password123 \
  -v ~/minio-data:/data \
  -d minio/minio server /data --console-address ":9001"
