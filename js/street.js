const leftZone = document.querySelector(".zone--left");
const rightZone = document.querySelector(".zone--right");

const zones = [leftZone, rightZone];

let activeZone = null;
let isTransitioning = false;

const overlay = document.getElementById("pageTransition");


/* Transition System */

function startTransition(direction, link){

  if(isTransitioning) return;
  isTransitioning = true;

  document.body.classList.add("transitioning");

  if(direction === "left"){
    document.body.classList.add("enter-left");
  }

  if(direction === "right"){
    document.body.classList.add("enter-right");
  }

  if(overlay){
    overlay.style.opacity = "1";
  }

  setTimeout(()=>{
    window.location.href = link;
  },600);

}


/* Clear states */

function clearHover(){
  document.body.classList.remove("hover-left", "hover-right");
  zones.forEach(z=>z.classList.remove("active"));
  activeZone = null;
}


/* DESKTOP HOVER */

leftZone.addEventListener("mouseenter", () => {
  document.body.classList.add("hover-left");
  document.body.classList.remove("hover-right");
});

rightZone.addEventListener("mouseenter", () => {
  document.body.classList.add("hover-right");
  document.body.classList.remove("hover-left");
});

leftZone.addEventListener("mouseleave", clearHover);
rightZone.addEventListener("mouseleave", clearHover);


/* CLICK / MOBILE TAP */

zones.forEach(zone=>{

  zone.addEventListener("click",(e)=>{

    const dir = zone.classList.contains("zone--left")
      ? "left"
      : "right";


    /* Desktop */
    if(window.innerWidth > 700){
      startTransition(dir, zone.dataset.link);
      return;
    }


    /* Mobile: First tap */
    if(activeZone !== zone){

      e.preventDefault();

      clearHover();

      zone.classList.add("active");

      if(zone === leftZone){
        document.body.classList.add("hover-left");
      }else{
        document.body.classList.add("hover-right");
      }

      activeZone = zone;

    }

    /* Mobile: Second tap */
    else{
      startTransition(dir, zone.dataset.link);
    }

  });

});


/* Tap outside reset */

document.addEventListener("touchstart",(e)=>{

  if(!e.target.closest(".zone")){
    clearHover();
  }

},{passive:true});
