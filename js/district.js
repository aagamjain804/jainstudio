const glow = document.getElementById("glow");
const hotspots = document.querySelectorAll(".hotspot");

function clearGlow(){
  document.body.classList.remove("is-hovering");
  if (!glow) return; 
  glow.style.opacity = "0";
  glow.style.background = "transparent";
}

hotspots.forEach(h => {
  h.addEventListener("mouseenter", () => {
    const tone = h.dataset.tone || "cool";
    document.body.classList.add("is-hovering");

    // Get hotspot box in % space
    const r = h.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    // Convert to percentage (for responsive glow positioning)
    const x = (cx / window.innerWidth) * 100;
    const y = (cy / window.innerHeight) * 100;

    const color = tone === "warm"
      ? "rgba(255,186,110,.60)"
      : "rgba(120,255,255,.55)";

    if (!glow) return;
    glow.style.opacity = "1";
    glow.style.background =
      `radial-gradient(520px 420px at ${x}% ${y}%, ${color}, rgba(0,0,0,0) 70%)`;
  });

  h.addEventListener("mouseleave", clearGlow);

  // Mobile preview glow on touch
  h.addEventListener("touchstart", () => {
    const tone = h.dataset.tone || "cool";
    document.body.classList.add("is-hovering");

    const r = h.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    const x = (cx / window.innerWidth) * 100;
    const y = (cy / window.innerHeight) * 100;

    const color = tone === "warm"
      ? "rgba(255,186,110,.60)"
      : "rgba(120,255,255,.55)";

    if (!glow) return;
    glow.style.opacity = "1";
    glow.style.background =
      `radial-gradient(520px 420px at ${x}% ${y}%, ${color}, rgba(0,0,0,0) 70%)`;
  }, { passive:true });
});

document.addEventListener("touchstart", (e) => {
  if (!e.target.closest(".hotspot")) clearGlow();
}, { passive:true });

window.addEventListener("resize", clearGlow);

/* ============================= */
/* Mobile Tap System */
/* ============================= */

if(window.innerWidth <= 768){

  const hotspots = document.querySelectorAll(".hotspot");

  hotspots.forEach(spot => {

    let tapped = false;

    spot.addEventListener("click", e => {

      if(!tapped){

        e.preventDefault();

        // Reset others
        hotspots.forEach(h => h.classList.remove("tap-active"));

        // Activate this
        spot.classList.add("tap-active");

        tapped = true;

        // Reset after 1.5s
        setTimeout(()=>{
          tapped = false;
          spot.classList.remove("tap-active");
        },1500);

      }

    });

  });

}

/* Mobile Scroll Buttons Logic */

if(window.innerWidth <= 768){

  const district = document.querySelector(".district");

  const leftBtn = document.getElementById("scrollLeftBtn");
  const rightBtn = document.getElementById("scrollRightBtn");

  if(district && leftBtn && rightBtn){

    leftBtn.addEventListener("click", ()=>{

      district.scrollBy({
        left:-window.innerWidth,
        behavior:"smooth"
      });

    });


    rightBtn.addEventListener("click", ()=>{

      district.scrollBy({
        left:window.innerWidth,
        behavior:"smooth"
      });

    });

  }

}


/* Center view on mobile load */

if(window.innerWidth <= 768){

  window.addEventListener("load", ()=>{

    const district = document.querySelector(".district");

    if(district){

      const center =
        (district.scrollWidth - district.clientWidth) / 2;

      district.scrollLeft = center;
    }

  });

}
