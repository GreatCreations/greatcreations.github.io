/* New file: resizeManager.js - handles orientation change events to trigger a full redraw of the canvas and reposition imported images.
   This file listens for orientation changes (e.g. portrait <-> landscape) and, after a short delay,
   calls the global resizeCanvas() function defined in main.js to properly redraw the drawing and update the positions.
*/
window.addEventListener("orientationchange", () => {
  // Allow a short delay for the layout to stabilize after orientation change
  setTimeout(() => {
    if (typeof resizeCanvas === "function") {
      resizeCanvas();
    }
  }, 300);
});