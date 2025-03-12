document.addEventListener('DOMContentLoaded', function() {
    const panels = document.querySelectorAll('.panel');
    const overlays = document.querySelectorAll('.panel-overlay');
    const iframes = document.querySelectorAll('.panel iframe');
    const isMobileDevice = window.innerWidth <= 768;

    iframes.forEach(iframe => {
        const originalSrc = iframe.src;
        const separator = originalSrc.includes('?') ? '&' : '?';
        iframe.src = originalSrc + separator + 'ts=' + Date.now();
    });

    function resizeIframes() {
        iframes.forEach(iframe => {
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.setAttribute('scrolling', 'no');
            
            iframe.onload = function() {
                try {
                    const doc = iframe.contentWindow.document;
                    doc.documentElement.style.height = '100%';
                    doc.body.style.width = '100%';
                    doc.body.style.height = '100%';
                    doc.body.style.margin = '0';
                    doc.body.style.overflow = 'hidden';
                    
                    // Attempt to force desktop viewport for mobile
                    const viewportMeta = doc.createElement('meta');
                    viewportMeta.name = 'viewport';
                    viewportMeta.content = 'width=1200, initial-scale=1';
                    doc.head.appendChild(viewportMeta);

                    const panel = iframe.closest('.panel');
                    const containerWidth = panel.offsetWidth;
                    const containerHeight = panel.offsetHeight;
                    
                    // Mobile-first scaling approach
                    const isMobile = window.innerWidth <= 768;
                    const desktopWidth = 470; // Match hosted page's desktop layout width
                    
                    // Calculate scale based on panel width only (not height) for mobile expanded panels
                    const isExpanded = panel.classList.contains('expanded');
                    const scale = isMobile ? 
                        (isExpanded ? containerWidth / desktopWidth : containerWidth / desktopWidth) : 
                        1;

                    // Apply scaling transformation
                    iframe.style.transform = `translate(-50%, -50%) scale(${scale})`;
                    iframe.style.minWidth = isMobile ? `${desktopWidth}px` : 'none';

                } catch (e) {
                    // Fallback scaling for cross-origin content
                    const panel = iframe.closest('.panel');
                    const isMobile = window.innerWidth <= 768;
                    const desktopWidth = 470;
                    const isExpanded = panel.classList.contains('expanded');
                    
                    if (isMobile) {
                        const scale = panel.offsetWidth / desktopWidth;
                        iframe.style.transform = `translate(-50%, -50%) scale(${scale})`;
                        iframe.style.minWidth = `${desktopWidth}px`;
                    }
                }
            };
        });
    }
    
    resizeIframes();
    window.addEventListener('resize', resizeIframes);
    
    overlays.forEach((overlay, index) => {
        overlay.addEventListener('click', () => {
            const panel = overlay.closest('.panel');
            console.log(`Panel ${index + 1} clicked`);
            
            // Mobile panel expansion functionality
            if (isMobileDevice) {
                const isExpanded = panel.classList.contains('expanded');
                
                // Toggle between expanded and normal view
                if (isExpanded) {
                    // Restore all panels
                    panels.forEach(p => {
                        p.classList.remove('expanded');
                        p.classList.remove('hidden');
                    });
                    document.querySelector('.comic-strip').style.position = 'static';
                } else {
                    // Position the comic strip so we can position panels absolutely
                    document.querySelector('.comic-strip').style.position = 'relative';
                    
                    // Expand clicked panel, hide others
                    panels.forEach(p => {
                        if (p === panel) {
                            p.classList.add('expanded');
                            // For expanded panel, use desktop-like display for iframe content
                            const iframe = p.querySelector('iframe');
                            if (iframe) {
                                iframe.style.transform = 'translate(-50%, -50%) scale(1)';
                                iframe.style.minWidth = 'none';
                            }
                        } else {
                            p.classList.add('hidden');
                        }
                    });
                }
                
                // Resize iframes after animation completes
                setTimeout(resizeIframes, 300);
            }
        });
    });
    
    // Update mobile detection on resize
    window.addEventListener('resize', function() {
        const wasMobile = isMobileDevice;
        const isMobileNow = window.innerWidth <= 768;
        
        // If device size changed between mobile and desktop
        if (wasMobile !== isMobileNow) {
            // Reset any expanded/hidden panels when switching between mobile/desktop
            panels.forEach(panel => {
                panel.classList.remove('expanded');
                panel.classList.remove('hidden');
            });
            resizeIframes();
        }
    });
});
