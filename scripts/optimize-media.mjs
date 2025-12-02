#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminSvgo from "imagemin-svgo";
import ffmpeg from "fluent-ffmpeg";

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directory = path.join(__dirname, "../", "public");

// Supported file types
const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];

// Recursively get all files
const getAllFiles = (dirPath, arrayOfFiles = []) => {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  }
  return arrayOfFiles;
};

// Optimize images
const optimizeImage = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const buffer = fs.readFileSync(filePath);

  try {
    if (ext === ".svg") {
      const optimized = await imagemin.buffer(buffer, {
        plugins: [imageminSvgo()],
      });
      fs.writeFileSync(filePath, optimized);
    } else if ([".png", ".jpg", ".jpeg"].includes(ext)) {
      const optimized = await imagemin.buffer(buffer, {
        plugins: [
          imageminMozjpeg({ quality: 100 }),
          imageminPngquant({ quality: [0.9, 1] }),
        ],
      });
      fs.writeFileSync(filePath, optimized);
    } else {
      const optimized = await sharp(filePath).toBuffer();
      fs.writeFileSync(filePath, optimized);
    }
    console.log(`✅ Optimized image: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error optimizing image ${filePath}:`, error);
  }
};

// Main function
const runOptimizer = async () => {
  const files = getAllFiles(directory);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (imageExtensions.includes(ext)) {
      await optimizeImage(file);
    }
  }
};

runOptimizer();
