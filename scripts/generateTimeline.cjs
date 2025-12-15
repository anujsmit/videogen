const fs = require("fs");
const path = require("path");
const { devices } = require("../data/device.js");

const OUT_DIR = path.join(process.cwd(), "data", "timelines");
fs.mkdirSync(OUT_DIR, { recursive: true });

// Tunable timing
const WORD_DURATION = 0.38;       // seconds per word (intro)
const WORDS_PER_SECOND = 2.6;     // narration speed for specs
const PAUSE_AFTER_INTRO = 0.6;    // small cinematic pause

function buildIntroTimeline(script) {
  const words = script.split(/\s+/);
  let time = 0;

  return words.map((word) => {
    const entry = {
      type: "intro-word",
      text: word,
      start: Number(time.toFixed(2)),
      end: Number((time + WORD_DURATION).toFixed(2)),
    };
    time += WORD_DURATION;
    return entry;
  });
}

function buildSpecTimeline(sentences, startTime) {
  let time = startTime;
  const timeline = [];

  for (const sentence of sentences) {
    const words = sentence.split(" ").length;
    const duration = Math.max(0.9, words / WORDS_PER_SECOND);

    timeline.push({
      type: "spec",
      text: sentence,
      start: Number(time.toFixed(2)),
      end: Number((time + duration).toFixed(2)),
    });

    time += duration;
  }

  return timeline;
}

devices.forEach((device) => {
  const safeName = device.model
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  // 1️⃣ Intro (word-by-word)
  const introTimeline = buildIntroTimeline(device.videoScript);

  const introEnd =
    introTimeline.length > 0
      ? introTimeline[introTimeline.length - 1].end
      : 0;

  // 2️⃣ Specs (sentences)
  const specSentences = device.specs.map(
    (s) => `${s.label}. ${s.description || s.value}`
  );

  const specTimeline = buildSpecTimeline(
    specSentences,
    introEnd + PAUSE_AFTER_INTRO
  );

  const fullTimeline = [...introTimeline, ...specTimeline];

  fs.writeFileSync(
    path.join(OUT_DIR, `${safeName}.json`),
    JSON.stringify(
      {
        model: device.model,
        audio: `audio/${safeName}.mp3`,
        timeline: fullTimeline,
      },
      null,
      2
    )
  );

  console.log(`✅ Timeline created: ${safeName}.json`);
});
