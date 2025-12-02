import fs from "fs/promises";
import path from "path";

export async function cleanUnusedFonts(fontConfigs: Array<any>): Promise<void> {
  const fontsDirectory = path.join(process.cwd(), "public", "fonts");
  const excludedFiles = new Set(["fonts.json"]); // Files to exclude from deletion

  try {
    // Get all files currently in the public/fonts directory
    const existingFiles = await fs.readdir(fontsDirectory);

    // Extract all font file names from the provided fontConfigs array
    const allowedFonts = new Set(
      fontConfigs.flatMap((config) =>
        config.src.map((font: any) => path.basename(font.path)),
      ),
    );

    // Combine allowed fonts and excluded files into a single set
    const allowedFiles = new Set([...allowedFonts, ...excludedFiles]);

    // Delete files not in the allowed list
    const deletionPromises = existingFiles.map(async (file) => {
      if (!allowedFiles.has(file)) {
        const filePath = path.join(fontsDirectory, file);
        await fs.unlink(filePath);
        // console.log(`[font] ▶ Deleted unused file: ${filePath}`);
      }
    });

    await Promise.all(deletionPromises);
    // console.log("[font] ▶ Clean-up complete.");
  } catch (error) {
    console.error("[font] ▶ Error during clean-up:", error);
  }
}

// // Usage example
// const fontConfigs = [
//   {
//     src: [
//       { path: "./public/fonts/font1.woff2" },
//       { path: "./public/fonts/font2.woff2" },
//     ],
//   },
//   {
//     src: [
//       { path: "./public/fonts/font3.woff2" },
//       { path: "./public/fonts/font4.woff2" },
//     ],
//   },
// ];
// await cleanUnusedFonts(fontConfigs);
