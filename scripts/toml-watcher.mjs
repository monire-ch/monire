import fs from "fs";
import path from "path";
import * as toml from "toml";

const configFilePath = path.resolve("./src/config/config.toml");
const outputDir = path.resolve("./.astro");
const outputFilePath = path.join(outputDir, "config.generated.json");

/**
 * Recursively remove empty keys
 */
function removeEmptyKeys(obj) {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    // Set empty strings and empty objects to null
    if (
      value === "" ||
      (value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        Object.keys(value).length === 0)
    ) {
      obj[key] = null;
    }
    // Recursively clean arrays
    else if (Array.isArray(value)) {
      obj[key] = value.map((item) =>
        typeof item === "object" && item !== null
          ? removeEmptyKeys(item)
          : item,
      );
    }
    // Recursively clean nested objects
    else if (typeof value === "object" && value !== null) {
      removeEmptyKeys(value);
    }
  });

  return obj;
}

/**
 * Convert TOML → JSON and write to `.astro`
 */
function convertTomlToJson() {
  try {
    const content = fs.readFileSync(configFilePath, "utf8");
    const parsed = toml.parse(content);
    const cleaned = removeEmptyKeys(parsed);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputFilePath, JSON.stringify(cleaned, null, 2), "utf8");
    // console.log(`[toml-watcher] ✅ Generated ${outputFilePath}`);
  } catch (err) {
    console.error("[toml-watcher] ❌ Error converting TOML:", err.message);
  }
}

/**
 * Run immediately if JSON is missing
 */
if (!fs.existsSync(outputFilePath)) {
  // console.log("[toml-watcher] JSON not found. Generating...");
  convertTomlToJson();
}

/**
 * Watch TOML file for changes
 */
fs.watch(configFilePath, (eventType) => {
  if (eventType === "change") {
    // console.log("[toml-watcher] TOML file changed. Regenerating...");
    convertTomlToJson();
  }
});
