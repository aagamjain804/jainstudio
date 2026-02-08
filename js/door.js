// script.js (debug + working)
// Click ENTER -> plays video (embedded audio) -> on end flash -> show street
// Click logo -> reset back to portal
console.log("script loaded ✅");

const video = document.getElementById("doorVideo");
const enterBtn = document.getElementById("enterBtn");
const flash = document.getElementById("flash");
const stage1 = document.getElementById("stage1");
const stage2 = document.getElementById("stage2");
const brandLogo = document.getElementById("brandLogo");

if (!video) console.error("Missing element: #doorVideo");
if (!enterBtn) console.error("Missing element: #enterBtn");
if (!flash) console.error("Missing element: #flash");
if (!stage1) console.error("Missing element: #stage1");
if (!stage2) console.error("Missing element: #stage2");
if (!brandLogo) console.error("Missing element: #brandLogo");

let started = false;

// Stage defaults
stage1?.classList.add("visible");
stage2?.classList.add("hidden");
stage2?.setAttribute("aria-hidden", "true");

// Pause at first frame when ready
video?.addEventListener("loadedmetadata", () => {
  console.log("video metadata loaded ✅ duration:", video.duration);
  try { video.pause(); } catch {}
  try { video.currentTime = 0; } catch {}
});

// Reset function
function resetToStage1() {
  stage2?.classList.remove("visible");
  stage2?.classList.add("hidden");
  stage2?.setAttribute("aria-hidden", "true");

  stage1?.classList.remove("hidden");
  stage1?.classList.add("visible");

  try {
    video.pause();
    video.currentTime = 0;
  } catch {}

  started = false;
  if (enterBtn) {
    enterBtn.disabled = false;
    enterBtn.textContent = "ENTER STUDIO";
  }

  // Keep muted until next click (safe default)
  if (video) {
    video.muted = true;
    video.volume = 1;
    video.loop = false;
  }
}

// Logo click => reset
brandLogo?.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("logo clicked ✅ reset");
  resetToStage1();
});

// ENTER click => play video with embedded audio
enterBtn?.addEventListener("click", async () => {
  console.log("ENTER clicked ✅");

  if (!video) return;
  if (started) return;
  started = true;

  enterBtn.disabled = true;
  enterBtn.textContent = "OPENING...";

  // Start from beginning, play once
  video.loop = false;
  video.muted = false; // embedded audio ON (allowed because user gesture)
  video.volume = 1;

  try { video.currentTime = 0; } catch {}

  try {
    await video.play();
    console.log("video playing ✅");
  } catch (e) {
    console.error("video.play() failed ❌", e);
    started = false;
    enterBtn.disabled = false;
    enterBtn.textContent = "ENTER STUDIO";
    video.muted = true;
  }
});

// Video end => flash => show video then street
const swoosh = document.getElementById("swooshSound");
video.addEventListener("ended", () => {

  // Try playing swoosh safely
  if (swoosh) {
    try {
      swoosh.currentTime = 0;
      swoosh.play();
    } catch (e) {
      console.log("Swoosh blocked");
    }
  }

  // Flash transition
  flash.classList.add("on");

  // Redirect (always happens)
  setTimeout(() => {
    window.location.href = "./journey.html";
  }, 350);

});





