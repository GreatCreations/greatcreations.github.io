document.addEventListener('DOMContentLoaded', () => {
    initializeOS();
});

function initializeOS() {
    updateClock();
    setInterval(updateClock, 1000);
    generatePanels();
    setupEventListeners();
    setupShade();
    initializeApps();
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = (hours % 12) || 12; // Convert to 12-hour format
    
    // Format date as Month Day, Year
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options);
    
    document.querySelector('.status-time').innerHTML = `${hours12}:${minutes} ${ampm}<br>${dateStr}`;
}

function generatePanels() {
    const panelGrid = document.getElementById('panel-grid');
    const panelContents = [
        { title: 'Sketch', icon: 'fas fa-paint-brush', app: 'sketchpad' },
        { title: 'Notes', icon: 'fas fa-sticky-note', app: 'notes' },
        { title: 'Calendar', icon: 'fas fa-calendar-alt', app: 'calendar' }
    ];
    
    panelContents.forEach(panel => {
        const panelElement = document.createElement('div');
        panelElement.className = 'panel';
        panelElement.dataset.app = panel.app;
        
        panelElement.innerHTML = `
            <div class="panel-header">
                <div class="panel-title">${panel.title}</div>
            </div>
            <div class="panel-content">
                <div>
                    <div class="panel-icon"><i class="${panel.icon}"></i></div>
                </div>
            </div>
        `;
        
        panelGrid.appendChild(panelElement);
    });
}

function setupEventListeners() {
    // Add click event to status-time to open calendar
    document.querySelector('.status-time').addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling to status-bar
        openApp('calendar');
    });
    
    // Borderless mode button
    document.getElementById('borderless-mode')?.addEventListener('click', () => {
        launchBorderlessMode();
    });
    
    // Dock icons
    document.querySelectorAll('.dock-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            const appName = icon.dataset.app;
            openApp(appName);
        });
    });
    
    // Panel clicks
    document.querySelectorAll('.panel').forEach(panel => {
        panel.addEventListener('click', () => {
            const appName = panel.dataset.app;
            if (appName) {
                openApp(appName);
            }
        });
    });
    
    // Window controls
    document.querySelectorAll('.window-close').forEach(button => {
        button.addEventListener('click', (e) => {
            const appWindow = e.target.closest('.app-window');
            closeApp(appWindow);
        });
    });
    
    document.querySelectorAll('.window-minimize').forEach(button => {
        button.addEventListener('click', (e) => {
            const appWindow = e.target.closest('.app-window');
            minimizeApp(appWindow);
        });
    });
    
    document.querySelectorAll('.window-fullscreen').forEach(button => {
        button.addEventListener('click', (e) => {
            const appWindow = e.target.closest('.app-window');
            toggleFullscreen(appWindow);
        });
    });
    
    // Browser navigation
    setupBrowserControls();
    
    // App store cards
    document.querySelectorAll('.app-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking the uninstall icon
            if (e.target.closest('.uninstall-icon')) return;
            
            const appName = card.dataset.app;
            const isInstalled = card.closest('.installed-apps') !== null;
            
            if (isInstalled) {
                openApp(appName);
                closeApp(document.getElementById('appstore-app'));
            } else {
                installApp(card);
            }
        });
    });
    
    // Uninstall buttons
    document.querySelectorAll('.uninstall-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            const appCard = e.target.closest('.app-card');
            showUninstallConfirmation(appCard);
        });
    });
    
    // Make windows draggable
    makeDraggable();
    
    // Add shade event listeners
    document.getElementById('status-bar').addEventListener('click', toggleShade);
    
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            const scheme = option.dataset.scheme;
            changeColorScheme(scheme);
        });
    });
}

function launchBorderlessMode() {
    // Open the current page in a new borderless window
    const features = 'menubar=no,toolbar=no,status=no,titlebar=no,location=no,fullscreen=yes';
    const newWindow = window.open(window.location.href, '_blank', features);
    
    // Focus the new window
    if (newWindow) {
        newWindow.focus();
    } else {
        alert('Pop-up blocker may have prevented opening the borderless window. Please allow pop-ups for this site.');
    }
}

function openApp(appName) {
    const appWindow = document.getElementById(`${appName}-app`);
    if (!appWindow) return;
    
    // Generate z-index for the window (higher = in front)
    const highestZIndex = getHighestZIndex();
    appWindow.style.zIndex = highestZIndex + 1;
    
    // Display without minimizing other windows
    appWindow.style.display = 'flex';
    appWindow.classList.remove('minimized');
    
    // If it's a browser app and the URL is empty, focus on the URL bar
    if (appName === 'browser') {
        const urlBar = appWindow.querySelector('.browser-url');
        if (urlBar.value === '') {
            setTimeout(() => urlBar.focus(), 300);
        }
    }
}

function getHighestZIndex() {
    const windows = document.querySelectorAll('.app-window');
    let highest = 1000; // Starting z-index
    
    windows.forEach(window => {
        const zIndex = parseInt(window.style.zIndex || 1000);
        if (zIndex > highest) highest = zIndex;
    });
    
    return highest;
}

function closeApp(appWindow) {
    if (!appWindow) return;
    
    // Reset position and size when closed
    appWindow.style.width = '';
    appWindow.style.height = '';
    appWindow.style.left = '';
    appWindow.style.top = '';
    appWindow.style.transform = '';
    
    // Remove all state classes
    appWindow.classList.remove('fullscreen');
    appWindow.classList.remove('minimized');
    
    // Clear any stored state data
    appWindow.dataset.wasFullscreen = '';
    appWindow.dataset.originalWidth = '';
    appWindow.dataset.originalHeight = '';
    appWindow.dataset.originalLeft = '';
    appWindow.dataset.originalTop = '';
    appWindow.dataset.originalTransform = '';
    
    // Reset fullscreen button icon
    const fullscreenBtn = appWindow.querySelector('.window-fullscreen i');
    if (fullscreenBtn) {
        fullscreenBtn.className = 'fas fa-expand';
    }
    
    appWindow.style.display = 'none';
}

function minimizeApp(appWindow) {
    if (!appWindow) return;
    
    // Store current state and position before minimizing
    appWindow.dataset.wasFullscreen = appWindow.classList.contains('fullscreen');
    appWindow.dataset.originalWidth = appWindow.style.width || '90vw';
    appWindow.dataset.originalHeight = appWindow.style.height || '80vh';
    appWindow.dataset.originalLeft = appWindow.style.left || '50%';
    appWindow.dataset.originalTop = appWindow.style.top || '50%';
    appWindow.dataset.originalTransform = appWindow.style.transform || 'translate(-50%, -50%)';
    
    // Remove fullscreen if active
    appWindow.classList.remove('fullscreen');
    
    // Get app name to determine position
    const appName = appWindow.id.replace('-app', '');
    
    // Find the corresponding panel for this app
    const panel = document.querySelector(`.panel[data-app="${appName}"]`);
    
    if (panel) {
        // Get panel position and dimensions
        const panelRect = panel.getBoundingClientRect();
        
        // Position the minimized window directly over its panel
        appWindow.style.left = `${panelRect.left + (panelRect.width / 2)}px`;
        appWindow.style.top = `${panelRect.top + (panelRect.height / 2)}px`;
        appWindow.style.transform = 'translate(-50%, -50%)';
    } else {
        // Fallback if panel not found - use dock icon if available
        const dockIcon = document.querySelector(`.dock-icon[data-app="${appName}"]`);
        if (dockIcon) {
            const iconRect = dockIcon.getBoundingClientRect();
            appWindow.style.left = `${iconRect.left + (iconRect.width / 2)}px`;
            appWindow.style.top = `${iconRect.top - 60}px`;
            appWindow.style.transform = 'translate(-50%, -50%)';
        } else {
            // Last resort fallback - use app index to stagger positions
            const apps = ['browser', 'appstore', 'settings', 'sketchpad', 'notes', 'calendar', 'mindfield'];
            const index = apps.indexOf(appName);
            const row = Math.floor(index / 3);
            const col = index % 3;
            
            appWindow.style.left = `${20 + (col * 130)}px`;
            appWindow.style.top = `${60 + (row * 130)}px`;
            appWindow.style.transform = 'translate(0, 0)';
        }
    }
    
    // Apply minimized class
    appWindow.classList.add('minimized');
    appWindow.style.display = 'flex';
    
    // Add click event for restore (but only to the window header to prevent accidental restores)
    const header = appWindow.querySelector('.window-header');
    header.addEventListener('click', function restoreHandler(e) {
        // Only trigger if clicking on header but not on the controls
        if (!e.target.closest('.window-controls')) {
            restoreMinimizedWindow(appWindow);
            header.removeEventListener('click', restoreHandler);
        }
    });
}

function restoreMinimizedWindow(appWindow) {
    appWindow.classList.remove('minimized');
    
    // Check if window was fullscreen before minimizing
    if (appWindow.dataset.wasFullscreen === 'true') {
        appWindow.classList.add('fullscreen');
        appWindow.querySelector('.window-fullscreen i').className = 'fas fa-compress';
    } else {
        // Restore to original dimensions
        appWindow.style.width = appWindow.dataset.originalWidth;
        appWindow.style.height = appWindow.dataset.originalHeight;
        appWindow.style.left = appWindow.dataset.originalLeft;
        appWindow.style.top = appWindow.dataset.originalTop;
        appWindow.style.transform = appWindow.dataset.originalTransform;
    }
    
    // Bring to front
    const highestZIndex = getHighestZIndex();
    appWindow.style.zIndex = highestZIndex + 1;
}

function setupBrowserControls() {
    const urlBar = document.querySelector('.browser-url');
    const goButton = document.querySelector('.browser-go');
    const backButton = document.querySelector('.browser-back');
    const forwardButton = document.querySelector('.browser-forward');
    const refreshButton = document.querySelector('.browser-refresh');
    const browserFrame = document.getElementById('browser-frame');
    
    const loadUrl = () => {
        let url = urlBar.value.trim();
        if (!url) return;
        
        // Add https:// if it doesn't have a protocol
        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
        }
        
        browserFrame.src = url;
        urlBar.value = url;
    };
    
    goButton.addEventListener('click', loadUrl);
    urlBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') loadUrl();
    });
    
    backButton.addEventListener('click', () => {
        browserFrame.contentWindow.history.back();
    });
    
    forwardButton.addEventListener('click', () => {
        browserFrame.contentWindow.history.forward();
    });
    
    refreshButton.addEventListener('click', () => {
        browserFrame.contentWindow.location.reload();
    });
    
    // Update URL bar when iframe src changes
    browserFrame.addEventListener('load', () => {
        try {
            urlBar.value = browserFrame.contentWindow.location.href;
        } catch (e) {
            // Handle cross-origin issues
            console.log('Cannot access frame URL due to same-origin policy');
        }
    });
}

function changeColorScheme(scheme) {
    const root = document.documentElement;
    
    switch(scheme) {
        case 'dark':
            root.style.setProperty('--primary-color', '#E74C3C');
            root.style.setProperty('--secondary-color', '#4ECDC4');
            root.style.setProperty('--accent-color', '#3498DB');
            root.style.setProperty('--dark-color', '#2C3E50');
            break;
        case 'pastel':
            root.style.setProperty('--primary-color', '#FDCB6E');
            root.style.setProperty('--secondary-color', '#55EAFF');
            root.style.setProperty('--accent-color', '#FF79C6');
            root.style.setProperty('--dark-color', '#2E3440');
            break;
        default: // vibrant default
            root.style.setProperty('--primary-color', '#FF6B6B');
            root.style.setProperty('--secondary-color', '#4ECDC4');
            root.style.setProperty('--accent-color', '#FFA8D2');
            root.style.setProperty('--dark-color', '#292F36');
            break;
    }
}

function makeDraggable() {
    document.querySelectorAll('.app-window').forEach(appWindow => {
        const header = appWindow.querySelector('.window-header');
        let isDragging = false;
        let offsetX, offsetY;
        
        // Ensure window has a z-index to start with
        if (!appWindow.style.zIndex) {
            appWindow.style.zIndex = 1000;
        }
        
        // Add a resize handle if not already present
        if (!appWindow.querySelector('.resize-handle')) {
            const resizeHandle = document.createElement('div');
            resizeHandle.className = 'resize-handle';
            appWindow.appendChild(resizeHandle);
        }
        
        // Setup window select behavior to bring to front
        appWindow.addEventListener('mousedown', bringToFront);
        appWindow.addEventListener('touchstart', bringToFront);
        
        function bringToFront() {
            const highestZIndex = getHighestZIndex();
            appWindow.style.zIndex = highestZIndex + 1;
        }
        
        header.addEventListener('mousedown', startDrag);
        header.addEventListener('touchstart', startDrag);
        
        function startDrag(e) {
            // Don't drag when fullscreen
            if (appWindow.classList.contains('fullscreen') || appWindow.classList.contains('minimized')) {
                return;
            }
            
            e.preventDefault();
            isDragging = true;
            
            if (e.type === 'mousedown') {
                offsetX = e.clientX - appWindow.getBoundingClientRect().left;
                offsetY = e.clientY - appWindow.getBoundingClientRect().top;
                document.addEventListener('mousemove', drag);
                document.addEventListener('mouseup', stopDrag);
            } else {
                offsetX = e.touches[0].clientX - appWindow.getBoundingClientRect().left;
                offsetY = e.touches[0].clientY - appWindow.getBoundingClientRect().top;
                document.addEventListener('touchmove', drag);
                document.addEventListener('touchend', stopDrag);
            }
            
            // Bring window to front when starting to drag
            bringToFront();
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            let clientX, clientY;
            if (e.type === 'mousemove') {
                clientX = e.clientX;
                clientY = e.clientY;
            } else {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            }
            
            const windowRect = appWindow.getBoundingClientRect();
            const parentRect = appWindow.parentElement.getBoundingClientRect();
            
            // Calculate new position
            let newLeft = clientX - offsetX;
            let newTop = clientY - offsetY;
            
            // Constrain to parent window
            newLeft = Math.max(0, Math.min(newLeft, parentRect.width - windowRect.width));
            newTop = Math.max(0, Math.min(newTop, parentRect.height - windowRect.height));
            
            // Update position
            appWindow.style.transform = 'none';
            appWindow.style.left = newLeft + 'px';
            appWindow.style.top = newTop + 'px';
        }
        
        function stopDrag() {
            isDragging = false;
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('touchend', stopDrag);
        }
    });
}

function setupShade() {
    // Create shade element
    const shade = document.createElement('div');
    shade.id = 'shade';
    document.getElementById('os-container').appendChild(shade);
    
    // Set up simple click toggle for shade
    const statusBar = document.getElementById('status-bar');
    statusBar.addEventListener('click', toggleShade);
}

function toggleShade() {
    const shade = document.getElementById('shade');
    shade.style.transition = 'top 0.3s ease';
    shade.classList.toggle('active');
}

function initializeApps() {
    // Track installed apps
    if (!localStorage.getItem('installedApps')) {
        // Default installed apps
        localStorage.setItem('installedApps', JSON.stringify(['sketchpad', 'notes', 'calendar']));
    }
    
    updateAppRepository();
    
    // Verify all installed apps have proper UI elements
    verifyInstalledAppsIntegrity();
}

function verifyInstalledAppsIntegrity() {
    const installedApps = JSON.parse(localStorage.getItem('installedApps')) || [];
    
    // Verify all apps in localStorage have corresponding panels
    installedApps.forEach(appName => {
        // Make sure app panel exists
        const panelExists = document.querySelector(`.panel[data-app="${appName}"]`);
        if (!panelExists) {
            addAppPanel(appName);
        }
        
        // Make sure app window exists
        if (!document.getElementById(`${appName}-app`)) {
            createAppWindowIfNeeded(appName);
        }
    });
    
    // Remove any desktop panels for apps that aren't installed
    document.querySelectorAll('.panel').forEach(panel => {
        const appName = panel.dataset.app;
        if (appName && !installedApps.includes(appName) && appName !== 'sketchpad' && appName !== 'notes' && appName !== 'calendar') {
            panel.remove();
        }
    });
}

function updateAppRepository() {
    const installedApps = JSON.parse(localStorage.getItem('installedApps')) || [];
    
    // Check if any desktop panels need to be added for newly installed apps
    const panelGrid = document.getElementById('panel-grid');
    const existingPanels = Array.from(panelGrid.querySelectorAll('.panel')).map(panel => panel.dataset.app);
    
    // Add panels for any installed apps that don't already have one
    installedApps.forEach(appName => {
        if (!existingPanels.includes(appName)) {
            addAppPanel(appName);
        }
    });
    
    // Remove panels for uninstalled apps
    existingPanels.forEach(appName => {
        if (!installedApps.includes(appName) && !['sketchpad', 'notes', 'calendar'].includes(appName)) {
            const panel = panelGrid.querySelector(`.panel[data-app="${appName}"]`);
            if (panel) panel.remove();
        }
    });
    
    // Update app repository display
    updateAppStoreDisplay(installedApps);
}

function updateAppStoreDisplay(installedApps) {
    const availableSection = document.querySelector('.available-apps .app-grid');
    const installedSection = document.querySelector('.installed-apps .app-grid');
    
    if (!availableSection || !installedSection) return;
    
    // Store all app data to ensure consistency
    const defaultApps = ['sketchpad', 'notes', 'calendar'];
    const allApps = [...defaultApps, 'mindfield', 'tasks', 'resources'];
    
    // First, make sure all apps exist in either section
    allApps.forEach(appName => {
        const appInfo = getAppInfo(appName);
        if (!appInfo) return;
        
        const isInstalled = installedApps.includes(appName);
        const targetSection = isInstalled ? installedSection : availableSection;
        
        // Check if app already exists in the correct section
        if (!targetSection.querySelector(`.app-card[data-app="${appName}"]`)) {
            // Check if it exists in the wrong section
            const wrongSection = isInstalled ? availableSection : installedSection;
            let existingCard = wrongSection.querySelector(`.app-card[data-app="${appName}"]`);
            
            if (existingCard) {
                // Move the card to the correct section
                existingCard.remove();
            }
            
            // Create a new app card
            const newCard = document.createElement('div');
            newCard.className = 'app-card';
            newCard.dataset.app = appName;
            newCard.innerHTML = `
                <div class="app-icon"><i class="${appInfo.icon}"></i></div>
                <div class="app-name">${appInfo.title}</div>
                ${isInstalled ? '<div class="uninstall-icon"><i class="fas fa-times"></i></div>' : ''}
            `;
            
            // Add appropriate event listeners
            if (isInstalled) {
                newCard.addEventListener('click', (e) => {
                    if (!e.target.closest('.uninstall-icon')) {
                        openApp(appName);
                        closeApp(document.getElementById('appstore-app'));
                    }
                });
                
                const uninstallIcon = newCard.querySelector('.uninstall-icon');
                if (uninstallIcon) {
                    uninstallIcon.addEventListener('click', (e) => {
                        e.stopPropagation();
                        showUninstallConfirmation(newCard);
                    });
                }
            } else {
                newCard.addEventListener('click', () => {
                    installApp(newCard);
                });
            }
            
            targetSection.appendChild(newCard);
        }
    });
    
    // Now hide/show cards based on install status
    allApps.forEach(appName => {
        const isInstalled = installedApps.includes(appName);
        
        // Handle available section cards
        const availableCard = availableSection.querySelector(`.app-card[data-app="${appName}"]`);
        if (availableCard) {
            availableCard.style.display = isInstalled ? 'none' : 'flex';
        }
        
        // Handle installed section cards
        const installedCard = installedSection.querySelector(`.app-card[data-app="${appName}"]`);
        if (installedCard) {
            installedCard.style.display = isInstalled ? 'flex' : 'none';
        }
    });
}

function addAppPanel(appName) {
    const panelGrid = document.getElementById('panel-grid');
    
    // Create app panel based on app type
    const appInfo = getAppInfo(appName);
    if (!appInfo) return;
    
    const panelElement = document.createElement('div');
    panelElement.className = 'panel';
    panelElement.dataset.app = appName;
    
    panelElement.innerHTML = `
        <div class="panel-header">
            <div class="panel-title">${appInfo.title}</div>
        </div>
        <div class="panel-content">
            <div>
                <div class="panel-icon"><i class="${appInfo.icon}"></i></div>
            </div>
        </div>
    `;
    
    panelGrid.appendChild(panelElement);
    
    // Add event listener to the new panel
    panelElement.addEventListener('click', () => {
        openApp(appName);
    });
}

function getAppInfo(appName) {
    const appInfoMap = {
        'sketchpad': { title: 'Sketch', icon: 'fas fa-paint-brush' },
        'notes': { title: 'Notes', icon: 'fas fa-sticky-note' },
        'calendar': { title: 'Calendar', icon: 'fas fa-calendar-alt' },
        'mindfield': { title: 'Mindfield', icon: 'fas fa-brain' },
        'tasks': { title: 'Tasks', icon: 'fas fa-tasks' },
        'resources': { title: 'Resources', icon: 'fas fa-address-book' }
    };
    
    return appInfoMap[appName];
}

function installApp(appCard) {
    const appName = appCard.dataset.app;
    const installedApps = JSON.parse(localStorage.getItem('installedApps')) || [];
    
    // Don't install if already installed
    if (installedApps.includes(appName)) {
        updateAppRepository(); // Ensure UI consistency
        return;
    }
    
    // Add animation
    appCard.classList.add('install-animation');
    
    setTimeout(() => {
        // Update localStorage first (data layer)
        installedApps.push(appName);
        localStorage.setItem('installedApps', JSON.stringify(installedApps));
        
        // Then update UI (view layer)
        updateAppRepository();
        
        // Create app window if it doesn't exist
        createAppWindowIfNeeded(appName);
    }, 500);
}

function uninstallApp(appCard) {
    const appName = appCard.dataset.app;
    const installedApps = JSON.parse(localStorage.getItem('installedApps')) || [];
    
    // Don't uninstall default apps
    if (['sketchpad', 'notes', 'calendar'].includes(appName)) {
        alert('Default apps cannot be uninstalled.');
        return;
    }
    
    // Add uninstall animation
    appCard.classList.add('uninstall-animation');
    
    setTimeout(() => {
        // Update localStorage first (data layer)
        const updatedApps = installedApps.filter(app => app !== appName);
        localStorage.setItem('installedApps', JSON.stringify(updatedApps));
        
        // Close the app window if it's open
        const appWindow = document.getElementById(`${appName}-app`);
        if (appWindow) {
            closeApp(appWindow);
        }
        
        // Remove the desktop panel for this app
        const panel = document.querySelector(`.panel[data-app="${appName}"]`);
        if (panel) {
            panel.remove();
        }
        
        // Then update UI (view layer)
        updateAppRepository();
    }, 500);
}

function createAppWindowIfNeeded(appName) {
    // Check if app window already exists
    if (document.getElementById(`${appName}-app`)) return;
    
    // Create new app window based on app type
    const appInfo = getAppInfo(appName);
    if (!appInfo) return;
    
    const appWindow = document.createElement('div');
    appWindow.className = 'app-window';
    appWindow.id = `${appName}-app`;
    
    let appUrl = '';
    
    // Set app-specific URL
    if (appName === 'mindfield') {
        appUrl = 'https://greatcreations.github.io/Mindfield.html';
    } else if (appName === 'tasks') {
        appUrl = 'https://greatcreations.github.io/Tasks.html';
    } else if (appName === 'resources') {
        appUrl = 'https://greatcreations.github.io/Resources.html';
    }
    
    appWindow.innerHTML = `
        <div class="window-header">
            <div class="window-title">${appInfo.title}</div>
            <div class="window-controls">
                <button class="window-minimize"><i class="fas fa-minus"></i></button>
                <button class="window-fullscreen"><i class="fas fa-expand"></i></button>
                <button class="window-close"><i class="fas fa-times"></i></button>
            </div>
        </div>
        <div class="window-content">
            <iframe id="${appName}-frame" src="${appUrl}"></iframe>
        </div>
    `;
    
    document.body.appendChild(appWindow);
    
    // Add event listeners to window controls
    const closeBtn = appWindow.querySelector('.window-close');
    closeBtn.addEventListener('click', () => closeApp(appWindow));
    
    const minBtn = appWindow.querySelector('.window-minimize');
    minBtn.addEventListener('click', () => minimizeApp(appWindow));
    
    const fullscreenBtn = appWindow.querySelector('.window-fullscreen');
    fullscreenBtn.addEventListener('click', () => toggleFullscreen(appWindow));
    
    // Make window draggable
    const header = appWindow.querySelector('.window-header');
    let isDragging = false;
    let offsetX, offsetY;
    
    header.addEventListener('mousedown', startDrag);
    header.addEventListener('touchstart', startDrag);
    
    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        
        if (e.type === 'mousedown') {
            offsetX = e.clientX - appWindow.getBoundingClientRect().left;
            offsetY = e.clientY - appWindow.getBoundingClientRect().top;
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
        } else {
            offsetX = e.touches[0].clientX - appWindow.getBoundingClientRect().left;
            offsetY = e.touches[0].clientY - appWindow.getBoundingClientRect().top;
            document.addEventListener('touchmove', drag);
            document.addEventListener('touchend', stopDrag);
        }
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        let clientX, clientY;
        if (e.type === 'mousemove') {
            clientX = e.clientX;
            clientY = e.clientY;
        } else {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        
        const windowRect = appWindow.getBoundingClientRect();
        const parentRect = appWindow.parentElement.getBoundingClientRect();
        
        // Calculate new position
        let newLeft = clientX - offsetX;
        let newTop = clientY - offsetY;
        
        // Constrain to parent window
        newLeft = Math.max(0, Math.min(newLeft, parentRect.width - windowRect.width));
        newTop = Math.max(0, Math.min(newTop, parentRect.height - windowRect.height));
        
        // Update position
        appWindow.style.transform = 'none';
        appWindow.style.left = newLeft + 'px';
        appWindow.style.top = newTop + 'px';
    }
    
    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('touchend', stopDrag);
    }
}

function showUninstallConfirmation(appCard) {
    const appName = appCard.dataset.app;
    const appInfo = getAppInfo(appName);
    
    // Create confirmation modal if it doesn't exist
    let confirmationModal = document.getElementById('confirmation-modal');
    if (!confirmationModal) {
        confirmationModal = document.createElement('div');
        confirmationModal.id = 'confirmation-modal';
        confirmationModal.className = 'confirmation-modal';
        document.body.appendChild(confirmationModal);
    }
    
    confirmationModal.innerHTML = `
        <h3>Uninstall ${appInfo.title}?</h3>
        <p>Are you sure you want to uninstall this app?</p>
        <div class="confirmation-buttons">
            <button class="confirm-btn">Uninstall</button>
            <button class="cancel-btn">Cancel</button>
        </div>
    `;
    
    confirmationModal.style.display = 'block';
    
    // Add event listeners to buttons
    const confirmBtn = confirmationModal.querySelector('.confirm-btn');
    const cancelBtn = confirmationModal.querySelector('.cancel-btn');
    
    confirmBtn.addEventListener('click', () => {
        uninstallApp(appCard);
        confirmationModal.style.display = 'none';
    });
    
    cancelBtn.addEventListener('click', () => {
        confirmationModal.style.display = 'none';
    });
}

function toggleFullscreen(appWindow) {
    if (!appWindow) return;
    
    if (appWindow.classList.contains('fullscreen')) {
        // Exit fullscreen
        appWindow.classList.remove('fullscreen');
        appWindow.querySelector('.window-fullscreen i').className = 'fas fa-expand';
        
        // Restore original dimensions if available
        if (appWindow.dataset.originalWidth && appWindow.dataset.originalHeight) {
            appWindow.style.width = appWindow.dataset.originalWidth;
            appWindow.style.height = appWindow.dataset.originalHeight;
        }
    } else {
        // Store original dimensions before going fullscreen
        if (!appWindow.classList.contains('minimized')) {
            appWindow.dataset.originalWidth = appWindow.style.width || '90vw';
            appWindow.dataset.originalHeight = appWindow.style.height || '80vh';
        }
        
        // Enter fullscreen
        appWindow.classList.add('fullscreen');
        appWindow.querySelector('.window-fullscreen i').className = 'fas fa-compress';
    }
}

// Added CSS rule
const style = document.createElement('style');
style.innerHTML = `
.app-window.minimized {
    width: 120px !important;
    height: 120px !important;
    opacity: 0.9;
    pointer-events: auto;
    border-radius: 0px;
    z-index: 900 !important;
    min-width: auto !important;
    min-height: auto !important;
}
`;
document.head.appendChild(style);