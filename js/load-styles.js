/**
 * The Yard Cafe - Style Loader
 * This script ensures all required stylesheets are loaded on every page for consistent UI
 * and guarantees styles are applied before the mobile menu is initialized.
 */

// Create a global namespace for The Yard Cafe scripts
window.YardCafe = window.YardCafe || {};

// Flag to track if styles have been loaded
window.YardCafe.stylesLoaded = false;

// Function to trigger an event when styles are loaded
function triggerStylesLoaded() {
    window.YardCafe.stylesLoaded = true;
    
    // Dispatch a custom event that other scripts can listen for
    const event = new CustomEvent('yardcafe:styles_loaded');
    document.dispatchEvent(event);
    
    console.log('YardCafe: Styles loaded successfully');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('YardCafe: DOM loaded, initializing styles');
    
    // Add newsletter styles
    const newsletterStyles = document.createElement('link');
    newsletterStyles.rel = 'stylesheet';
    newsletterStyles.type = 'text/css';
    newsletterStyles.href = 'css/newsletter.css';
    document.head.appendChild(newsletterStyles);

    // Use a more reliable approach for base path that works across all pages
    // This uses the document's base URL or calculates from the current script
    const getBasePath = () => {
        // First try: Use any <base> tag if present
        const baseTag = document.querySelector('base');
        if (baseTag && baseTag.href) {
            return new URL('./', baseTag.href).pathname;
        }
        
        // Second try: Find this script's path and use its directory
        const scripts = document.querySelectorAll('script');
        for (let i = 0; i < scripts.length; i++) {
            const src = scripts[i].src;
            if (src && src.includes('load-styles.js')) {
                return new URL('./', src).pathname;
            }
        }
        
        // Fallback: Use absolute path from root
        return '/';
    };
    
    const basePath = getBasePath();
    console.log('YardCafe: Using base path:', basePath);
    
    // Essential stylesheets that should be on every page
    // Using relative paths to ensure consistency across all pages
    const essentialStylesheets = [
        { href: 'css/mobile-menu.css', id: 'mobile-menu-css' },
        { href: 'css/animated-elements.css', id: 'animated-elements-css' },
        { href: 'css/gallery.css', id: 'gallery-css' },
        { href: 'css/custom-background.css', id: 'custom-background-css' },
        // Add any other essential stylesheets here
    ];
    
    // Load Roboto font if not already loaded
    if (typeof WebFont !== 'undefined') {
        WebFont.load({
            google: {
                families: ['Roboto:100,300,400']
            },
            active: function() {
                console.log('Roboto font loaded successfully');
            }
        });
    }
    
    // Adjust paths based on environment if needed
    essentialStylesheets.forEach(sheet => {
        // Keep paths as relative to ensure they work in all environments
        if (sheet.href.startsWith('/')) {
            // Remove leading slash if present for consistency
            sheet.href = sheet.href.substring(1);
        }
    });

    // Get current stylesheets
    const currentStylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        .map(link => link.getAttribute('href'));
    
    // Track how many stylesheets we need to load
    let stylesheetsToLoad = 0;
    let stylesheetsLoaded = 0;
    
    // Add missing stylesheets
    essentialStylesheets.forEach(sheet => {
        if (!currentStylesheets.includes(sheet.href)) {
            stylesheetsToLoad++;
            
            const stylesheet = document.createElement('link');
            stylesheet.rel = 'stylesheet';
            stylesheet.id = sheet.id;
            stylesheet.type = 'text/css';
            stylesheet.href = sheet.href;
            
            // Listen for load event
            stylesheet.onload = function() {
                console.log(`${sheet.href} loaded successfully`);
                stylesheetsLoaded++;
                
                // If all stylesheets are loaded, trigger the event
                if (stylesheetsLoaded >= stylesheetsToLoad) {
                    triggerStylesLoaded();
                }
            };
            
            // Handle errors
            stylesheet.onerror = function() {
                console.error(`Failed to load ${sheet.href}`);
                stylesheetsLoaded++;
                
                // Continue even if there's an error
                if (stylesheetsLoaded >= stylesheetsToLoad) {
                    triggerStylesLoaded();
                }
            };
            
            document.head.appendChild(stylesheet);
            console.log(`${sheet.href} stylesheet dynamically added`);
        }
    });
    
    // Fix for background image on mobile menu in IE11
    const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    if (isIE11) {
        const style = document.createElement('style');
        style.textContent = '@media screen and (max-width: 991px) { .nav-menu { background-color: rgba(0, 0, 0, 0.95) !important; } }';
        document.head.appendChild(style);
    }
    
    // If no stylesheets needed to be added, trigger the event immediately
    if (stylesheetsToLoad === 0) {
        triggerStylesLoaded();
    }
    
    // Add emergency timeout - ensure styles are marked as loaded after 2 seconds
    // even if something goes wrong with the load events
    setTimeout(function() {
        if (!window.YardCafe.stylesLoaded) {
            console.warn('YardCafe: Style loading timed out, continuing anyway');
            triggerStylesLoaded();
            
            // Add emergency CSS inline to ensure mobile menu works even if CSS file failed to load
            const emergencyStyle = document.createElement('style');
            emergencyStyle.id = 'emergency-mobile-menu-css';
            emergencyStyle.textContent = `
                @media screen and (max-width: 991px) {
                    .nav-menu { 
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: rgba(0, 0, 0, 0.95);
                        z-index: 1000;
                        display: none;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    .nav-menu.show { 
                        display: flex;
                        height: 100vh;
                    }
                    .mobile-nav-trigger {
                        display: block !important;
                        z-index: 2001;
                    }
                }`;
            document.head.appendChild(emergencyStyle);
            console.log('YardCafe: Emergency mobile menu styles added');
        }
    }, 2000);
});
