/* New file: toolsizeDial.js – creates an interactive white dial to control the brush size.
   This dial replaces the previous range slider control. It uses an SVG circle and pointer events.
*/
(function() {
  const dialContainer = document.getElementById('brushSizeDial');
  const svgNS = "http://www.w3.org/2000/svg";
  const width = 60, height = 60;
  
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  
  // Create the dial circle.
  const circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("cx", width/2);
  circle.setAttribute("cy", height/2);
  circle.setAttribute("r", 25);
  circle.setAttribute("fill", "none");
  circle.setAttribute("stroke", "white");
  circle.setAttribute("stroke-width", "4");
  svg.appendChild(circle);
  
  // Create the dial pointer.
  const pointer = document.createElementNS(svgNS, "line");
  pointer.setAttribute("x1", width/2);
  pointer.setAttribute("y1", height/2);

  // Define explicit minimum and maximum brush sizes
  const MIN_BRUSH_SIZE = 1;
  const MAX_BRUSH_SIZE = 10;

  function brushSizeToAngle(size) {
    // Map brush size (MIN_BRUSH_SIZE to MAX_BRUSH_SIZE) linearly to an angle from -150° to 150°.
    return ((size - MIN_BRUSH_SIZE) / (MAX_BRUSH_SIZE - MIN_BRUSH_SIZE)) * 300 - 150;
  }

  let currentBrushSize = 2;
  window.brushSize = currentBrushSize; // Set initial global brush size

  let angle = brushSizeToAngle(currentBrushSize);
  function setPointer(angle) {
    const rad = angle * Math.PI / 180;
    const cx = width / 2, cy = height / 2;
    const r = 25;
    const x2 = cx + r * Math.cos(rad);
    const y2 = cy + r * Math.sin(rad);
    pointer.setAttribute("x2", x2);
    pointer.setAttribute("y2", y2);
  }
  setPointer(angle);  // Initialize pointer position
  pointer.setAttribute("stroke", "white");
  pointer.setAttribute("stroke-width", "3");
  svg.appendChild(pointer);

  // Updated zero indicator: position on the left side and inside the dial circle
  const zeroIndicator = document.createElementNS(svgNS, "line");
  zeroIndicator.setAttribute("x1", (width / 2) - 25 + 3); 
  zeroIndicator.setAttribute("y1", height / 2);
  zeroIndicator.setAttribute("x2", (width / 2) - 25 + 6); 
  zeroIndicator.setAttribute("y2", height / 2);
  zeroIndicator.setAttribute("stroke", "white");
  zeroIndicator.setAttribute("stroke-width", "2");
  zeroIndicator.setAttribute("stroke-dasharray", "2,2");
  svg.appendChild(zeroIndicator);

  dialContainer.appendChild(svg);
  
  // Set up pointer events for interaction.
  let dragging = false;
  svg.addEventListener('pointerdown', (e) => {
    dragging = true;
    updateDial(e);
    svg.setPointerCapture(e.pointerId);
  });
  svg.addEventListener('pointermove', (e) => {
    if (dragging) {
      updateDial(e);
    }
  });
  svg.addEventListener('pointerup', (e) => {
    dragging = false;
    svg.releasePointerCapture(e.pointerId);
  });
  svg.addEventListener('pointercancel', (e) => {
    dragging = false;
  });

  function updateDial(e) {
    const rect = svg.getBoundingClientRect();
    const cx = rect.left + width / 2;
    const cy = rect.top + height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    let newAngle = Math.atan2(dy, dx) * 180 / Math.PI;
    // Clamp the angle between -150° and 150°.
    if (newAngle < -150) newAngle = -150;
    if (newAngle > 150) newAngle = 150;
    setPointer(newAngle);
    // Map the angle back to a brush size (MIN_BRUSH_SIZE to MAX_BRUSH_SIZE)
    const newSize = MIN_BRUSH_SIZE + ((newAngle + 150) / 300) * (MAX_BRUSH_SIZE - MIN_BRUSH_SIZE);
    currentBrushSize = Math.round(newSize);
    window.brushSize = currentBrushSize; // Update the global brush size used in main.js.
  }
})();