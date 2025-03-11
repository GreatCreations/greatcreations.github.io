document.addEventListener('DOMContentLoaded', function() {
    const panels = document.querySelectorAll('.panel');
    const iframes = document.querySelectorAll('.panel iframe');

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
                    
                    const contentWidth = doc.body.scrollWidth;
                    const contentHeight = doc.body.scrollHeight;
                    const containerWidth = iframe.offsetWidth;
                    const containerHeight = iframe.offsetHeight;
                    
                    const scaleX = containerWidth / contentWidth;
                    const scaleY = containerHeight / contentHeight;
                    
                    let scale = scaleX; // Always scale to fit width
                    
                    iframe.style.transform = `scale(${scale}) translate(-50%, -50%)`;
                } catch (e) {
                    console.log('Same-origin policy prevented content measurement');
                }
            };
        });
    }
    
    resizeIframes();
    window.addEventListener('resize', resizeIframes);
    
    panels.forEach((panel, index) => {
        panel.addEventListener('click', () => {
            console.log(`Panel ${index + 1} clicked`);
        });
    });
});