/* Refactored info modal content: removed the old legend and replaced it with an extended, detailed guide */
export function showInfoModal() {
  // New detailed Info Modal implementation with an extended legend.
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  
  const container = document.createElement('div');
  container.className = 'modal-container info-modal';
  
  container.innerHTML = `
    <h2>Design Workshop Guide</h2>
    <div class="info-content">
      <div class="info-item">
        <div class="info-icon">
          <!-- Updated Freehand Tool Icon -->
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M2 12c2-6 6-6 8 0s4 6 6 0" />
          </svg>
        </div>
        <div class="info-description">
          <h3>Freehand Tool</h3>
          <p>Draw freestyle curves and dynamic lines with a natural, hand-drawn feel.</p>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">
          <!-- Line Tool Icon -->
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <line x1="4" y1="20" x2="20" y2="4"></line>
          </svg>
        </div>
        <div class="info-description">
          <h3>Line Tool</h3>
          <p>Create straight lines by specifying start and end points.</p>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">
          <!-- Rectangle Tool Icon -->
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <rect x="4" y="4" width="16" height="16"></rect>
          </svg>
        </div>
        <div class="info-description">
          <h3>Rectangle Tool</h3>
          <p>Draw rectangles by dragging to adjust width and height.</p>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">
          <!-- Circle Tool Icon -->
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <circle cx="12" cy="12" r="8"></circle>
          </svg>
        </div>
        <div class="info-description">
          <h3>Circle Tool</h3>
          <p>Create circles or ovals by dragging from the center outward.</p>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">
          <!-- Eraser Icon -->
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M17 3l4 4L7 21H3v-4L17 3z"></path>
          </svg>
        </div>
        <div class="info-description">
          <h3>Eraser</h3>
          <p>Remove unwanted strokes or shapes from your canvas.</p>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">
          <!-- Color Swatches Icon showing three swatches -->
          <div style="display:flex; gap:3px;">
            <div style="width:12px; height:12px; background:#FFA500; border:1px solid white;"></div>
            <div style="width:12px; height:12px; background:#00FFFF; border:1px solid white;"></div>
            <div style="width:12px; height:12px; background:#FFC0CB; border:1px solid white;"></div>
          </div>
        </div>
        <div class="info-description">
          <h3>Color Swatches</h3>
          <p>Select your drawing color. Double-tap a swatch to open the color picker for customization.</p>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">
          <!-- Snap to Grid Icon -->
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <rect x="3" y="3" width="6" height="6"></rect>
            <rect x="15" y="3" width="6" height="6"></rect>
            <rect x="3" y="15" width="6" height="6"></rect>
            <rect x="15" y="15" width="6" height="6"></rect>
          </svg>
        </div>
        <div class="info-description">
          <h3>Snap to Grid</h3>
          <p>Automatically aligns Freehand, Line, Rectangle, and Circle drawings to precise grid intersections for accurate designs.</p>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">
          <!-- Clear Icon -->
          <svg viewBox="0 0 20 20" fill="none" stroke="white" stroke-width="2">
            <line x1="5" y1="5" x2="15" y2="15"></line>
            <line x1="15" y1="5" x2="5" y2="15"></line>
          </svg>
        </div>
        <div class="info-description">
          <h3>Clear</h3>
          <p>Erase all drawings and remove imported images from your canvas.</p>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">
          <!-- Save Icon -->
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
        </div>
        <div class="info-description">
          <h3>Save</h3>
          <p>Export your design with options to include or exclude imported images, grid, and rulers.</p>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">
          <!-- Import Icon -->
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M12 2v10"></path>
            <path d="M8 8h8"></path>
            <path d="M5 13h14"></path>
            <path d="M5 17h14"></path>
          </svg>
        </div>
        <div class="info-description">
          <h3>Import</h3>
          <p>Add external images to your design. These images can be moved and resized after enabling editing mode via the Pointer Tool.</p>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">
          <!-- Undo Icon -->
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <polyline points="9 11 4 6 9 1"></polyline>
            <path d="M4 6h12a4 4 0 0 1 0 8H9"></path>
          </svg>
        </div>
        <div class="info-description">
          <h3>Undo</h3>
          <p>Revert the last drawing action to correct mistakes quickly.</p>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">
          <!-- Pointer Tool Icon -->
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <polygon points="2,2 22,12 12,22 2,2"></polygon>
          </svg>
        </div>
        <div class="info-description">
          <h3>Pointer Tool</h3>
          <p>Select and move imported images. Double-tap an image to toggle editing mode for repositioning and resizing.</p>
        </div>
      </div>
    </div>
    <div class="modal-buttons">
      <button id="infoCloseBtn">Close</button>
    </div>
  `;
  
  overlay.appendChild(container);
  document.body.appendChild(overlay);
  
  container.querySelector('#infoCloseBtn').addEventListener('click', () => {
    document.body.removeChild(overlay);
  });
}