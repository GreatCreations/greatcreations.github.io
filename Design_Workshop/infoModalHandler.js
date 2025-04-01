/* New file: infoModalHandler.js – attaches the info modal event listener.
   This module imports the showInfoModal function from infoModal.js and binds it to the info button.
*/
import { showInfoModal } from './infoModal.js';

document.addEventListener('DOMContentLoaded', () => {
  const infoBtn = document.getElementById('infoBtn');
  if (infoBtn) {
    infoBtn.addEventListener('click', showInfoModal);
  }
});