/* New file: modal.js - handles the modals for saving and clearing designs */

/* Updated showSaveModal() to reference inputs via container.querySelector so that the modal’s state reflects the user’s selections, and to ensure the modal closes properly immediately after saving. */
function showSaveModal() {
  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  
  const container = document.createElement('div');
  container.className = 'modal-container';
  container.innerHTML = `
    <h2>Save Your Design</h2>
    <label>File Name:
      <input type="text" id="saveFileName" placeholder="my_design.png" />
    </label>
    <label>
      <input type="checkbox" id="includeImages" checked /> Include Imported Images
    </label>
    <label>
      <input type="checkbox" id="includeGrid" checked /> Include Grid & Rulers
    </label>
    <div class="modal-buttons">
      <button id="saveConfirmBtn">Save</button>
      <button id="saveCancelBtn">Cancel</button>
    </div>
  `;
  overlay.appendChild(container);
  document.body.appendChild(overlay);
  
  // Cancel: remove the modal immediately.
  container.querySelector('#saveCancelBtn').addEventListener('click', () => {
    document.body.removeChild(overlay);
  });
  
  // Confirm: read the inputs strictly from the current modal instance, then remove the overlay.
  container.querySelector('#saveConfirmBtn').addEventListener('click', async () => {
    const fileNameInput = container.querySelector('#saveFileName').value || "my_design.png";
    const includeImages = container.querySelector('#includeImages').checked;
    const includeGrid = container.querySelector('#includeGrid').checked;
    
    try {
      // Generate the combined image based on the options provided.
      const dataUrl = await generateCombinedImage({ includeImages, includeGrid });
      // Trigger file download.
      const link = document.createElement('a');
      link.download = fileNameInput;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generating image:", err);
      alert("Failed to generate image.");
    }
    
    // Remove the modal immediately after the save action.
    document.body.removeChild(overlay);
  });
}

// Function to show the clear confirmation modal
function showClearModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  
  const container = document.createElement('div');
  container.className = 'modal-container';
  container.innerHTML = `
    <h2>Clear Design</h2>
    <p>Are you sure you want to clear all drawings? This will also remove all imported images.</p>
    <div class="modal-buttons">
      <button id="clearConfirmBtn">Clear</button>
      <button id="clearCancelBtn">Cancel</button>
    </div>
  `;
  overlay.appendChild(container);
  document.body.appendChild(overlay);
  
  container.querySelector('#clearCancelBtn').addEventListener('click', () => {
    document.body.removeChild(overlay);
  });
  
  container.querySelector('#clearConfirmBtn').addEventListener('click', () => {
    // Clear the drawing canvas
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Remove all imported images
    const images = document.querySelectorAll('.interactive-image');
    images.forEach(img => img.parentNode.removeChild(img));
    
    document.body.removeChild(overlay);
  });
}

// Helper function: converts an SVG element to an Image (returns a Promise)
function svgElementToImage(svgElement) {
  return new Promise((resolve, reject) => {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = function() {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = function(e) {
      reject(e);
    };
    img.src = url;
  });
}

// Function to create a combined image based on the current design and save options.
// Returns a Promise that resolves with a PNG data URL.
async function generateCombinedImage(options) {
  const { includeImages, includeGrid } = options;
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  // Create an offscreen canvas.
  const offCanvas = document.createElement('canvas');
  offCanvas.width = width;
  offCanvas.height = height;
  const offCtx = offCanvas.getContext('2d');
  
  // If grid & rulers are to be included, draw the grid canvas first (background).
  if (includeGrid) {
    const gridCanvas = document.getElementById('gridCanvas');
    if (gridCanvas) {
      offCtx.drawImage(gridCanvas, 0, 0, width, height);
    }
  }
  
  // If imported images are to be included, draw each interactive image (assuming they are meant to be in the background).
  if (includeImages) {
    const imageElements = document.querySelectorAll('.interactive-image');
    imageElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const imgEl = el.querySelector('img');
      if (!imgEl) return;
      const rotation = parseFloat(el.dataset.rotate) || 0;
      const radians = rotation * Math.PI / 180;
      offCtx.save();
      // Translate to the center of the element.
      offCtx.translate(rect.left + rect.width / 2, rect.top + rect.height / 2);
      offCtx.rotate(radians);
      offCtx.drawImage(imgEl, -rect.width / 2, -rect.height / 2, rect.width, rect.height);
      offCtx.restore();
    });
  }
  
  // Draw the main drawing canvas on top.
  const drawingCanvas = document.getElementById('drawingCanvas');
  if (drawingCanvas) {
    offCtx.drawImage(drawingCanvas, 0, 0, width, height);
  }
  
  // If grid & rulers are to be included, overlay the ruler SVG images.
  if (includeGrid) {
    // Horizontal ruler (positioned at left:20px, top:0)
    const rulerHContainer = document.getElementById('rulerHorizontal');
    if (rulerHContainer && rulerHContainer.firstElementChild instanceof SVGElement) {
      try {
        const imgH = await svgElementToImage(rulerHContainer.firstElementChild);
        offCtx.drawImage(imgH, 20, 0);
      } catch (err) {
        console.error("Failed to render horizontal ruler", err);
      }
    }
    // Vertical ruler (positioned at left:0, top:20px)
    const rulerVContainer = document.getElementById('rulerVertical');
    if (rulerVContainer && rulerVContainer.firstElementChild instanceof SVGElement) {
      try {
        const imgV = await svgElementToImage(rulerVContainer.firstElementChild);
        offCtx.drawImage(imgV, 0, 20);
      } catch (err) {
        console.error("Failed to render vertical ruler", err);
      }
    }
  }
  
  return offCanvas.toDataURL("image/png");
}

// Add event listener for the Info button once the DOM is ready.
document.addEventListener('DOMContentLoaded', () => {
  const infoBtn = document.getElementById('infoBtn');
  if (infoBtn) {
    // Import the new showInfoModal function from infoModal.js
    import('./infoModal.js').then(module => {
      infoBtn.addEventListener('click', module.showInfoModal);
    });
  }
});