const fs = require("fs");
const path = require("path");
const gtts = require("gtts");

// ---- CONFIG ----
const MODEL = "samsung-galaxy-s25-ultra";

const timelinePath = path.join(
  process.cwd(),
  "data",
  "timelines",
  `${MODEL}.json`
);

const audioDir = path.join(
  process.cwd(),
  "public",
  "audio"
);

const outAudio = path.join(
  audioDir,
  `${MODEL}.mp3`
);

// ---- ENSURE DIRECTORY EXISTS (FIX) ----
fs.mkdirSync(audioDir, { recursive: true });

// ---- LOAD TIMELINE ----
const data = JSON.parse(fs.readFileSync(timelinePath, "utf8"));

// Build narration text in correct order
const narration = data.timeline
  .map((item) => item.text)
  .join(" ");

console.log("\n🎙 Generating audio from timeline...\n");
console.log(narration);

// ---- SAVE AUDIO (ASYNC SAFE) ----
function saveAudio(text, outPath) {
  return new Promise((resolve, reject) => {
    const tts = new gtts(text, "en", { slow: true });
    tts.save(outPath, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

(async () => {
  try {
    await saveAudio(narration, outAudio);
    console.log("✅ Audio generated successfully:");
    console.log(outAudio);
  } catch (err) {
    console.error("❌ Audio generation failed", err);
  }
})();
