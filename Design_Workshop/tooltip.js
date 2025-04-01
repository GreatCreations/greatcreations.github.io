/* New file: tooltip.js – displays tooltips above the cursor for any element with a title attribute */
(function() {
  const tooltipDiv = document.createElement('div');
  tooltipDiv.id = 'customTooltip';
  tooltipDiv.style.position = 'fixed';
  tooltipDiv.style.padding = '4px 8px';
  tooltipDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  tooltipDiv.style.color = '#FFF';
  tooltipDiv.style.borderRadius = '4px';
  tooltipDiv.style.pointerEvents = 'none';
  tooltipDiv.style.fontSize = '10px';
  tooltipDiv.style.zIndex = '10000';
  tooltipDiv.style.display = 'none';
  document.body.appendChild(tooltipDiv);
  
  document.addEventListener('pointerover', function(e) {
    const target = e.target.closest('[title]');
    if (target) {
      const titleText = target.getAttribute('title');
      if (titleText) {
        tooltipDiv.textContent = titleText;
        tooltipDiv.style.display = 'block';
      }
    }
  });
  
  document.addEventListener('pointermove', function(e) {
    if (tooltipDiv.style.display === 'block') {
      // Position the tooltip 10px above the cursor.
      tooltipDiv.style.left = (e.clientX + 10) + 'px';
      tooltipDiv.style.top = (e.clientY - tooltipDiv.offsetHeight - 10) + 'px';
    }
  });
  
  document.addEventListener('pointerout', function(e) {
    tooltipDiv.style.display = 'none';
  });
})();

