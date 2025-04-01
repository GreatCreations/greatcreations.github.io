/* Refactored welcome modal content – removed old innerHTML and formatted text so each sentence is on its own line with spacing */
(function() {
  // Wait for the DOM to be fully loaded before showing the modal.
  document.addEventListener('DOMContentLoaded', () => {
    showWelcomeModal();
  });
  
  function showWelcomeModal() {
    // Create overlay using existing modal styles.
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay welcome-overlay';
    
    // Create a container for the welcome content.
    const container = document.createElement('div');
    container.className = 'modal-container welcome-modal';
    // Updated innerHTML: every sentence is on a separate line with blank line spacing.
    container.innerHTML = `
      <h2>Welcome to the Design Workshop!</h2>
      <p>Here you can create designs using freehand drawing, shapes, and image imports.</p>
      <p>Get creative with our tools and explore all the possibilities to envision your idea.</p>
      <p>&nbsp;</p>
      <p>Try these features: Freehand Tool – Let your creativity flow.</p>
      <p>Snap to Grid – Achieve perfect alignment.</p>
      <p>Import – Combine your designs with external images (double-tap an imported image with the pointer tool to resize or rotate it).</p>
      <p>Undo – Revert any drawing mistakes with a single tap.</p>
      <p>&nbsp;</p>
      <p>Enjoy your creative journey!</p>
      <button id="welcomeDismissBtn">Get Started</button>
      <div class="welcome-image-container">
        <img src="https://via.placeholder.com/300x100.png?text=Welcome" alt="Welcome Image">
      </div>
    `;
    
    overlay.appendChild(container);
    document.body.appendChild(overlay);
    
    // Dismiss the modal when clicking the button or outside the container.
    container.querySelector('#welcomeDismissBtn').addEventListener('click', dismissModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        dismissModal();
      }
    });
    
    function dismissModal() {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }
  }
})();