import path from "path";
import fs from "fs/promises";
import languages from "../src/config/language.json" with { type: "json" };

const CONTENT_DIR = "src/content";
const CONFIG_DIR = "src/config";
const I18N_DIR = "src/i18n";
const LANGUAGE_FILE = path.join(CONFIG_DIR, "language.json");

// The target language we want to add
const TARGET_LANG = {
  languageName: "Fr",
  languageCode: "fr",
  contentDir: "french", // folder name for content
  weight: 2, // folder name for content
};

// ---------------- Colors ----------------
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
};
const log = (msg, color = "reset") => {
  console.log(`${colors[color]}${msg}${colors.reset}`);
};

// ---------------- Helpers ----------------
const copyDir = async (src, dest) => {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
};

// ---------------- Main Tasks ----------------
const cloneContent = async () => {
  log(`Cloning English content → ${TARGET_LANG.languageCode}...`, "cyan");

  // Recursive finder for "english" dirs
  const findEnglishDirs = async (baseDir) => {
    const result = [];
    const entries = await fs.readdir(baseDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(baseDir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name.toLowerCase() === "english") {
          result.push(fullPath);
        } else {
          result.push(...(await findEnglishDirs(fullPath)));
        }
      }
    }
    return result;
  };

  try {
    const englishDirs = await findEnglishDirs(CONTENT_DIR);

    if (englishDirs.length === 0) {
      log("⚠️ No english folders found inside content.", "yellow");
      return;
    }

    let completed = 0;
    const total = englishDirs.length;

    for (const enDir of englishDirs) {
      const parentDir = path.dirname(enDir); // e.g. src/content/blog
      const newDir = path.join(parentDir, TARGET_LANG.contentDir);

      await copyDir(enDir, newDir);
      completed++;

      // Progress indicator
      const percent = Math.round((completed / total) * 100);
      log(
        `📂 Cloned ${enDir} → ${newDir} [${completed}/${total}] (${percent}%)`,
        "green"
      );
    }

    log(`✅ Finished cloning all content (${total} sections).`, "cyan");
  } catch (err) {
    log(`⚠️ Error cloning content: ${err.message}`, "yellow");
  }
};

const cloneMenu = async () => {
  const enMenu = path.join(CONFIG_DIR, "menu.en.json");
  const frMenu = path.join(CONFIG_DIR, `menu.${TARGET_LANG.languageCode}.json`);

  try {
    await fs.copyFile(enMenu, frMenu);
    log(`✅ Created menu file: ${frMenu}`, "green");
  } catch (err) {
    log(`⚠️ Error cloning menu: ${err.message}`, "yellow");
  }
};

const cloneI18n = async () => {
  const enFile = path.join(I18N_DIR, "en.json");
  const frFile = path.join(I18N_DIR, `${TARGET_LANG.languageCode}.json`);

  try {
    await fs.copyFile(enFile, frFile);
    log(`✅ Created i18n file: ${frFile}`, "green");
  } catch (err) {
    log(`⚠️ Error cloning i18n: ${err.message}`, "yellow");
  }
};

const updateLanguageConfig = async () => {
  try {
    const exists = languages.some(
      (lang) => lang.languageCode === TARGET_LANG.languageCode,
    );
    if (!exists) {
      const updated = [...languages, TARGET_LANG];
      await fs.writeFile(LANGUAGE_FILE, JSON.stringify(updated, null, 2));
      log(`✅ Added ${TARGET_LANG.languageCode} to language.json`, "green");
    } else {
      log(`ℹ️ ${TARGET_LANG.languageCode} already exists in language.json`, "yellow");
    }
  } catch (err) {
    log(`⚠️ Error updating language.json: ${err.message}`, "yellow");
  }
};

// ---------------- Runner ----------------
const run = async () => {
  log("🚀 Starting language generation...", "cyan");
  await cloneContent();
  await cloneMenu();
  await cloneI18n();
  await updateLanguageConfig();
  log("🎉 Language generation completed.", "green");
};

run();