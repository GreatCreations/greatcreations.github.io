(function() {
  const swatches = document.querySelectorAll('.toolbar-colors .color-btn');
  swatches.forEach(swatch => {
    // Click event: set currentColor using the swatch's current background.
    swatch.addEventListener('click', () => {
      const computedColor = window.getComputedStyle(swatch).backgroundColor;
      window.currentColor = computedColor;
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      document.getElementById('eraserBtn').classList.remove("active");
    });

    // Double-click event: display a themed color picker above the swatch.
    swatch.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      e.preventDefault();

      // Remove any existing color picker.
      const existingPicker = document.getElementById('swatchColorPicker');
      if (existingPicker) {
        existingPicker.remove();
      }

      // Create the color picker container.
      const picker = document.createElement('div');
      picker.id = 'swatchColorPicker';
      picker.className = 'color-picker';

      // Create an input element of type color.
      const input = document.createElement('input');
      input.type = 'color';

      // Helper function to convert rgb(...) to hex.
      function rgbToHex(rgb) {
        const result = rgb.match(/\d+/g);
        if (result && result.length >= 3) {
          return (
            "#" +
            result
              .slice(0, 3)
              .map(x => ("0" + parseInt(x).toString(16)).slice(-2))
              .join("")
          );
        }
        return rgb;
      }
      input.value = rgbToHex(window.getComputedStyle(swatch).backgroundColor);

      picker.appendChild(input);
      document.body.appendChild(picker);

      // Position the picker above the swatch.
      const rect = swatch.getBoundingClientRect();
      picker.style.width = '100px';
      picker.style.height = '30px';
      // Center picker above the swatch.
      picker.style.left = (rect.left + rect.width / 2 - 50) + 'px';
      picker.style.top = (rect.top - 35) + 'px';

      // When the user picks a new color, update the swatch.
      input.addEventListener('input', () => {
        swatch.style.backgroundColor = input.value;
      });

      // On change, update currentColor and mark swatch as active regardless of its previous state, then remove the picker.
      input.addEventListener('change', () => {
        window.currentColor = input.value;
        document.querySelectorAll('.toolbar-colors .color-btn').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        picker.remove();
      });

      // Remove the picker if the user clicks outside it.
      document.addEventListener('click', function handler(evt) {
        if (!picker.contains(evt.target) && evt.target !== swatch) {
          picker.remove();
          document.removeEventListener('click', handler);
        }
      });
    });
  });
})();