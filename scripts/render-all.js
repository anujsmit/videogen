import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { devices } from "../data/device.js";

const outDir = path.resolve("out");
const tempDir = path.resolve("temp-props");

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

devices.forEach((device) => {
  const safeName = device.model
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  console.log(`🎬 Rendering: ${device.model}`);

  // 1️⃣ Write temp props file
  const propsPath = path.join(tempDir, `${safeName}.json`);
  fs.writeFileSync(
    propsPath,
    JSON.stringify({ device }, null, 2),
    "utf-8"
  );

  // 2️⃣ Render using props FILE (not inline JSON)
  execSync(
    `npx remotion render src/index.ts TechVideo ${outDir}/${safeName}.mp4 ` +
      `--props=${propsPath} --codec=h264`,
    { stdio: "inherit" }
  );
});
