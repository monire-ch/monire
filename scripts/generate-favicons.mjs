import fs from "fs";
import path from "path";
import {
  getNodeImageAdapter,
  loadAndConvertToSvg,
} from "@realfavicongenerator/image-adapter-node";
import faviconGenerator from "@realfavicongenerator/generate-favicon";
import config from "../.astro/config.generated.json" assert { type: "json" };

// Constants
const FAVICON_DIR = "./public/images/favicons/";
const DEFAULT_TITLE = "Website";
const DEFAULT_FAVICON_IMAGE = "/images/default-favicon.png"; // Fallback image

// Helper: Create Directory if Not Exists
function ensureDirectoryExists(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
    console.log(`Created directory: ${directoryPath}`);
  }
}

// Main: Generate Favicons
async function generateFavicons() {
  try {
  // Parse configuration
    const title = config?.site?.title || DEFAULT_TITLE;
    const faviconImage = config?.site?.favicon?.image || DEFAULT_FAVICON_IMAGE;

    const faviconImagePath = faviconImage.startsWith("/")
      ? path.join("./src/assets", faviconImage)
      : path.join("./src/assets/", faviconImage);

    // Ensure favicon directory exists
    ensureDirectoryExists(FAVICON_DIR);

    // Load and convert the master icon
    const imageAdapter = await getNodeImageAdapter();
    const masterIcon = {
      icon: await loadAndConvertToSvg(faviconImagePath),
    };

    const faviconSettings = {
      icon: {
        desktop: {
          regularIconTransformation: {
            type: faviconGenerator.IconTransformationType.None,
          },
          darkIconType: "regular",
          darkIconTransformation: {
            type: faviconGenerator.IconTransformationType.None,
          },
        },
        touch: {
          transformation: {
            type: faviconGenerator.IconTransformationType.Background,
            backgroundColor: "#ffffff",
            backgroundRadius: 0,
            imageScale: 0.7,
          },
          appTitle: title,
        },
        webAppManifest: {
          transformation: {
            type: faviconGenerator.IconTransformationType.Background,
            backgroundColor: "#ffffff",
            backgroundRadius: 0,
            imageScale: 0.8,
          },
          backgroundColor: "#ffffff",
          themeColor: "#ffffff",
          name: title,
          shortName: title,
        },
      },
      path: "/images/favicons/",
    };

    // Generate favicon files
    const files = await faviconGenerator.generateFaviconFiles(
      masterIcon,
      faviconSettings,
      imageAdapter,
    );

    // Save files to the favicon directory
    Object.entries(files).forEach(([fileName, fileContents]) => {
      const filePath = path.join(FAVICON_DIR, fileName);
      fs.writeFileSync(filePath, fileContents);
      console.log(`Saved: ${filePath}`);
    });

    console.log("Favicons generated successfully.");
  } catch (error) {
    console.error("Error generating favicons:", error);
  }
}

// Run
generateFavicons();
