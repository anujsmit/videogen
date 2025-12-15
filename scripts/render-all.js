import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { devices } from "../data/device.js";

const root = process.cwd();
const outDir = path.join(root, "out");
const tempDir = path.join(root, "temp-props");

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(tempDir, { recursive: true });

try {
  devices.forEach((device) => {
    const safeName = device.model
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

    console.log(`\n🎬 Rendering: ${device.model}`);

    const propsPath = path.join(tempDir, `${safeName}.json`);
    fs.writeFileSync(propsPath, JSON.stringify({ device }, null, 2));

    execSync(
      `npx remotion render src/index.ts TechVideo out/${safeName}.mp4 --props=${propsPath} --codec=h264`,
      { stdio: "inherit" }
    );

    console.log(`✅ Exported: ${safeName}.mp4`);
  });
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
