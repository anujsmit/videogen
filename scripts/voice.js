import fs from "fs";
import gtts from "gtts";

const data = JSON.parse(fs.readFileSync("data/device.json", "utf8"));

function cleanText(text) {
  return text
    .replace(/5G/g, "five G")
    .replace(/120Hz/g, "120 hertz")
    .replace(/mAh/g, "milliamp battery")
    .replace(/\s+/g, " ")
    .trim();
}

// Build cinematic script
const script = data.slides
  .map(slide => cleanText(slide.text))
  .join(".\n\n"); // double newline = pause

console.log("🎙️ Generating improved gTTS voice...\n");
console.log(script);

const tts = new gtts(script, "en", {
  slow: true, // KEY improvement
});

tts.save("public/voice.mp3", (err) => {
  if (err) {
    console.error("❌ Voice generation failed", err);
    return;
  }
  console.log("✅ Improved gTTS voice generated → public/voice.mp3");
});
