// Global variables and canvas setup
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
window.currentColor = '#FFA500'; // Default color: orange
window.brushSize = window.brushSize || 2; // ensure a default if not already set
let lastX = 0, lastY = 0;
const undoStack = [];

let eraserMode = false;
let currentTool = "freehand"; // Tools: freehand, line, rectangle, circle, select
let shapeStartX = 0, shapeStartY = 0;
let savedImageData = null;
let snapMode = false; // Snap to grid toggle

const baseWidth = window.innerWidth;
const baseHeight = window.innerHeight;
let currentScale = 1;
let currentOffsetX = 0;
let currentOffsetY = 0;

// Resize canvases (drawing and grid) and update rulers
function resizeCanvas() {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  
  // Save the current drawing as an image
  const data = canvas.toDataURL();
  const dpr = window.devicePixelRatio || 1;
  
  // Compute a uniform scale factor to preserve aspect ratio based on the initial artboard size
  const scale = Math.min(newWidth / baseWidth, newHeight / baseHeight);
  const offsetX = (newWidth - baseWidth * scale) / 2;
  const offsetY = (newHeight - baseHeight * scale) / 2;
  
  currentScale = scale;
  currentOffsetX = offsetX;
  currentOffsetY = offsetY;
  
  // Resize and clear the drawing canvas
  canvas.width = newWidth * dpr;
  canvas.height = newHeight * dpr;
  canvas.style.width = newWidth + 'px';
  canvas.style.height = newHeight + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  
  // Redraw the previous drawing with uniform scaling and centering
  const img = new Image();
  img.onload = function() {
    ctx.clearRect(0, 0, newWidth, newHeight);
    ctx.drawImage(img, 0, 0, baseWidth, baseHeight, offsetX, offsetY, baseWidth * scale, baseHeight * scale);
  };
  img.src = data;
  
  // Resize grid canvas similarly
  const gridCanvas = document.getElementById('gridCanvas');
  const gridCtx = gridCanvas.getContext('2d');
  gridCanvas.width = newWidth * dpr;
  gridCanvas.height = newHeight * dpr;
  gridCanvas.style.width = newWidth + 'px';
  gridCanvas.style.height = newHeight + 'px';
  gridCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  
  // Redraw grid lines and rulers (which use the base artboard dimensions)
  drawGrid();
  updateRulers();
  
  // Adjust positions and sizes of imported interactive images
  document.querySelectorAll('.interactive-image').forEach((imgDiv) => {
    const baseX = parseFloat(imgDiv.dataset.x) || 0;
    const baseY = parseFloat(imgDiv.dataset.y) || 0;
    const newX = offsetX + baseX * scale;
    const newY = offsetY + baseY * scale;
    imgDiv.style.left = newX + "px";
    imgDiv.style.top = newY + "px";
    if (imgDiv.dataset.originalWidth) {
      const origW = parseFloat(imgDiv.dataset.originalWidth);
      const origH = parseFloat(imgDiv.dataset.originalHeight);
      imgDiv.style.width = (origW * scale) + "px";
      imgDiv.style.height = (origH * scale) + "px";
    }
  });
}

window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();

// Updated drawGrid() to cover the entire background and line up with the rulers.
function drawGrid() {
  const gridCanvas = document.getElementById('gridCanvas');
  const gridCtx = gridCanvas.getContext('2d');
  gridCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  const gridSpacing = 20; // spacing in artboard units
  const spacingPhysical = gridSpacing * currentScale;
  
  const xStartIndex = Math.floor(-currentOffsetX / spacingPhysical);
  const xEndIndex = Math.ceil((window.innerWidth - currentOffsetX) / spacingPhysical);
  gridCtx.strokeStyle = 'rgba(255,255,255,0.1)';
  gridCtx.lineWidth = 1;
  for (let i = xStartIndex; i <= xEndIndex; i++) {
    const xPos = currentOffsetX + i * spacingPhysical;
    gridCtx.beginPath();
    gridCtx.moveTo(xPos, 0);
    gridCtx.lineTo(xPos, window.innerHeight);
    gridCtx.stroke();
  }
  
  const yStartIndex = Math.floor(-currentOffsetY / spacingPhysical);
  const yEndIndex = Math.ceil((window.innerHeight - currentOffsetY) / spacingPhysical);
  for (let i = yStartIndex; i <= yEndIndex; i++) {
    const yPos = currentOffsetY + i * spacingPhysical;
    gridCtx.beginPath();
    gridCtx.moveTo(0, yPos);
    gridCtx.lineTo(window.innerWidth, yPos);
    gridCtx.stroke();
  }
}

// Update rulers using inline SVG
function updateRulers() {
  // Horizontal ruler
  const horizontal = document.getElementById('rulerHorizontal');
  let svgH = `<svg width="${window.innerWidth - 20}" height="20">`;
  const spacingBase = 20;
  for (let x = 0; x < baseWidth; x += spacingBase) {
    const physicalX = currentOffsetX + x * currentScale;
    let tickHeight = (x % 100 === 0) ? 10 : 5;
    svgH += `<line x1="${physicalX}" y1="20" x2="${physicalX}" y2="${20 - tickHeight}" stroke="white" stroke-width="1"></line>`;
    if (x % 100 === 0) {
      svgH += `<text x="${physicalX + 2}" y="10" fill="white" font-size="10">${x}</text>`;
    }
  }
  svgH += `</svg>`;
  horizontal.innerHTML = svgH;
  
  // Vertical ruler
  const vertical = document.getElementById('rulerVertical');
  let svgV = `<svg width="20" height="${window.innerHeight - 20}">`;
  for (let y = 0; y < baseHeight; y += spacingBase) {
    const physicalY = currentOffsetY + y * currentScale;
    let tickWidth = (y % 100 === 0) ? 10 : 5;
    svgV += `<line x1="20" y1="${physicalY}" x2="${20 - tickWidth}" y2="${physicalY}" stroke="white" stroke-width="1"></line>`;
    if (y % 100 === 0 && y > 0) {
      svgV += `<text x="2" y="${physicalY - 2}" fill="white" font-size="10">${y}</text>`;
    }
  }
  svgV += `</svg>`;
  vertical.innerHTML = svgV;
}

// Pointer events handling based on the current tool
canvas.addEventListener('pointerdown', (e) => {
  if(currentTool === "freehand"){
    drawing = true;
    undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    ctx.beginPath();
    lastX = e.clientX;
    lastY = e.clientY;
    if(snapMode) {
      const gridSpacing = 20;
      lastX = Math.round(lastX / gridSpacing) * gridSpacing;
      lastY = Math.round(lastY / gridSpacing) * gridSpacing;
    }
    ctx.moveTo(lastX, lastY);
  } else if(currentTool === "line" || currentTool === "rectangle" || currentTool === "circle"){
    drawing = true;
    undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    shapeStartX = e.clientX;
    shapeStartY = e.clientY;
    if(snapMode) {
      const gridSpacing = 20;
      shapeStartX = Math.round(shapeStartX / gridSpacing) * gridSpacing;
      shapeStartY = Math.round(shapeStartY / gridSpacing) * gridSpacing;
    }
    savedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }
});

canvas.addEventListener('pointermove', (e) => {
  if (!drawing) return;
  let x = e.clientX;
  let y = e.clientY;
  if(snapMode) {
    const gridSpacing = 20;
    x = Math.round(x / gridSpacing) * gridSpacing;
    y = Math.round(y / gridSpacing) * gridSpacing;
  }
  
  if(currentTool === "freehand"){
    ctx.strokeStyle = eraserMode ? '#1d0020' : window.currentColor;
    ctx.lineWidth = window.brushSize || 2; 
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastX = x;
    lastY = y;
  } else if(currentTool === "line"){
    ctx.putImageData(savedImageData, 0, 0);
    ctx.strokeStyle = window.currentColor;
    ctx.lineWidth = window.brushSize || 2; 
    ctx.beginPath();
    ctx.moveTo(shapeStartX, shapeStartY);
    ctx.lineTo(x, y);
    ctx.stroke();
  } else if(currentTool === "rectangle"){
    ctx.putImageData(savedImageData, 0, 0);
    ctx.strokeStyle = window.currentColor;
    ctx.lineWidth = window.brushSize || 2; 
    let rectWidth = x - shapeStartX;
    let rectHeight = y - shapeStartY;
    ctx.strokeRect(shapeStartX, shapeStartY, rectWidth, rectHeight);
  } else if(currentTool === "circle"){
    ctx.putImageData(savedImageData, 0, 0);
    ctx.strokeStyle = window.currentColor;
    ctx.lineWidth = window.brushSize || 2; 
    let radius = Math.sqrt(Math.pow(x - shapeStartX, 2) + Math.pow(y - shapeStartY, 2));
    ctx.beginPath();
    ctx.arc(shapeStartX, shapeStartY, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
});

canvas.addEventListener('pointerup', () => {
  drawing = false;
  savedImageData = null;
});
canvas.addEventListener('pointerleave', () => {
  drawing = false;
  savedImageData = null;
});

// Add new function to update canvas and grid pointer events based on the current tool:
function updateCanvasPointerEvents() {
  const drawingCanvas = document.getElementById('drawingCanvas');
  const gridCanvas = document.getElementById('gridCanvas');
  if (currentTool === "select") {
    // In select mode, disable pointer events on the canvases so that taps hit imported images
    drawingCanvas.style.pointerEvents = "none";
    gridCanvas.style.pointerEvents = "none";
  } else {
    drawingCanvas.style.pointerEvents = "auto";
    gridCanvas.style.pointerEvents = "auto";
  }
}

// Toolbar: New tool selection buttons event handlers
document.getElementById('selectBtn').addEventListener('click', () => {
  currentTool = "select";
  eraserMode = false;
  updateActiveToolButton('selectBtn');
  canvas.style.cursor = "default"; // Use the default cursor for selection
  updateCanvasPointerEvents();
});

document.getElementById('freehandBtn').addEventListener('click', () => {
  currentTool = "freehand";
  eraserMode = false;
  updateActiveToolButton('freehandBtn');
  canvas.style.cursor = "crosshair";
  updateCanvasPointerEvents();
});

document.getElementById('lineBtn').addEventListener('click', () => {
  currentTool = "line";
  eraserMode = false;
  updateActiveToolButton('lineBtn');
  canvas.style.cursor = "crosshair";
  updateCanvasPointerEvents();
});

document.getElementById('rectBtn').addEventListener('click', () => {
  currentTool = "rectangle";
  eraserMode = false;
  updateActiveToolButton('rectBtn');
  canvas.style.cursor = "crosshair";
  updateCanvasPointerEvents();
});

document.getElementById('circleBtn').addEventListener('click', () => {
  currentTool = "circle";
  eraserMode = false;
  updateActiveToolButton('circleBtn');
  canvas.style.cursor = "crosshair";
  updateCanvasPointerEvents();
});

document.getElementById('snapBtn').addEventListener('click', () => {
  snapMode = !snapMode;
  document.getElementById('snapBtn').classList.toggle("active", snapMode);
});
document.getElementById('importBtn').addEventListener('click', () => {
  document.getElementById('importFileInput').click();
});

document.getElementById('importFileInput').addEventListener('change', (e) => {
  // Process all selected files
  Array.from(e.target.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function(event) {
      addInteractiveImage(event.target.result);
    };
    reader.readAsDataURL(file);
  });
  // Reset the input value to allow the same file(s) to be selected again if needed.
  e.target.value = "";
});

function updateActiveToolButton(activeId) {
  const toolButtons = ['selectBtn', 'freehandBtn', 'lineBtn', 'rectBtn', 'circleBtn'];
  toolButtons.forEach(id => {
    document.getElementById(id).classList.toggle('active', id === activeId);
  });
}

// Existing toolbar controls
document.getElementById('clearBtn').addEventListener('click', () => {
  showClearModal();
});

document.getElementById('undoBtn').addEventListener('click', () => {
  if (undoStack.length > 0) {
    const previousState = undoStack.pop();
    ctx.putImageData(previousState, 0, 0);
  }
});
document.getElementById('saveBtn').addEventListener('click', () => {
  showSaveModal();
});

// Eraser tool: toggles eraser mode (freehand with background color)
const eraserBtn = document.getElementById('eraserBtn');
eraserBtn.addEventListener('click', () => {
  eraserMode = !eraserMode;
  if(eraserMode) {
    currentTool = "freehand";
    updateActiveToolButton('freehandBtn');
  }
  eraserBtn.classList.toggle("active", eraserMode);
});

(function() {
  let container = document.getElementById('interactiveImages');
  if (!container) {
    container = document.createElement('div');
    container.id = 'interactiveImages';
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    document.body.insertBefore(container, document.body.firstChild);
  }
})();

// Dynamically load interact.js from CDN if not already available:
if (!window.interact) {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js";
  document.head.appendChild(script);
}

// Helper function: update the transform style using stored data attributes.
function updateTransform(el) {
  el.style.transform = `translate(${el.dataset.x}px, ${el.dataset.y}px) rotate(${el.dataset.rotate}deg)`;
}

// Listener for dragging movement.
function dragMoveListener(event) {
  const target = event.target;
  if (!target.classList.contains('editing')) return;
  let x = (parseFloat(target.dataset.x) || 0) + event.dx;
  let y = (parseFloat(target.dataset.y) || 0) + event.dy;
  target.dataset.x = x;
  target.dataset.y = y;
  updateTransform(target);
}

// Sets up the rotation handle behavior.
function makeRotateHandler(el) {
  const handle = el.querySelector('.rotate-handle');
  let startAngle = 0;
  let center = {x: 0, y: 0};
  let initialRotation = 0;
  
  handle.addEventListener('pointerdown', function(e) {
    if (!el.classList.contains('editing')) return;
    e.stopPropagation();
    e.preventDefault();
    const rect = el.getBoundingClientRect();
    center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    initialRotation = parseFloat(el.dataset.rotate) || 0;
    const dx = e.clientX - center.x;
    const dy = e.clientY - center.y;
    startAngle = Math.atan2(dy, dx) * 180 / Math.PI;

    function onPointerMove(ev) {
      const dx = ev.clientX - center.x;
      const dy = ev.clientY - center.y;
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      const rotation = initialRotation + (angle - startAngle);
      el.dataset.rotate = rotation;
      updateTransform(el);
    }
    function onPointerUp() {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    }
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  });
}

// Utility: Wait until interact.js is loaded before initializing interactions.
function loadInteract(callback) {
  if (window.interact) {
    callback();
  } else {
    let interval = setInterval(() => {
      if (window.interact) {
        clearInterval(interval);
        callback();
      }
    }, 50);
  }
}

// Main function to add an interactive image.
function addInteractiveImage(src) {
  const imgDiv = document.createElement('div');
  imgDiv.className = 'interactive-image';
  imgDiv.dataset.x = 100;
  imgDiv.dataset.y = 100;
  imgDiv.dataset.rotate = 0;
  imgDiv.style.position = 'absolute';
  imgDiv.style.width = '150px';
  imgDiv.style.height = '150px';
  imgDiv.style.zIndex = "0";
  updateTransform(imgDiv);
  
  // Create the image element.
  const imgEl = document.createElement('img');
  imgEl.src = src;
  imgEl.style.width = '100%';
  imgEl.style.height = '100%';
  imgEl.style.userSelect = 'none';
  imgEl.style.pointerEvents = 'none';
  imgEl.onload = function() {
    let width = imgEl.naturalWidth;
    let height = imgEl.naturalHeight;
    const maxWidth = 150;
    if (width > maxWidth) {
      const ratio = maxWidth / width;
      width = maxWidth;
      height = height * ratio;
    }
    imgDiv.style.width = width + "px";
    imgDiv.style.height = height + "px";
    // Store the original (base artboard) dimensions for later scaling
    imgDiv.dataset.originalWidth = width;
    imgDiv.dataset.originalHeight = height;
  }
  imgDiv.appendChild(imgEl);
  
  // Create a rotate handle.
  const rotateHandle = document.createElement('div');
  rotateHandle.className = 'rotate-handle';
  imgDiv.appendChild(rotateHandle);
  
  // Create a resize handle.
  const resizeHandle = document.createElement('div');
  resizeHandle.className = 'resize-handle';
  imgDiv.appendChild(resizeHandle);
  
  imgDiv.addEventListener('pointerdown', function(e) {
    const currentTime = Date.now();
    const lastTap = parseInt(imgDiv.dataset.lastTap || "0");
    if (currentTime - lastTap < 300) {
      toggleEditing(imgDiv);
    }
    imgDiv.dataset.lastTap = currentTime;
  });
  
  document.getElementById('interactiveImages').appendChild(imgDiv);
  
  makeRotateHandler(imgDiv);
  
  loadInteract(function() {
    interact(imgDiv)
      .draggable({
        listeners: { move: dragMoveListener },
        inertia: true
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true }
      })
      .on('resizemove', function(event) {
        const target = event.target;
        if (!target.classList.contains('editing')) return;
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';
        target.dataset.x = parseFloat(target.dataset.x) + event.deltaRect.left;
        target.dataset.y = parseFloat(target.dataset.y) + event.deltaRect.top;
        updateTransform(target);
      });
  });
}

function toggleEditing(el) {
  if (el.classList.contains('editing')) {
    el.classList.remove('editing');
    el.style.zIndex = "0"; 
  } else {
    el.classList.add('editing');
    el.style.zIndex = "5"; 
  }
}