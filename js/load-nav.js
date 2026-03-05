// Create a global namespace for The Yard Cafe scripts if it doesn't exist
window.YardCafe = window.YardCafe || {};

// Add a flag to track menu initialization
window.YardCafe.menuInitialized = false;

document.addEventListener('DOMContentLoaded', function() {
    console.log('YardCafe: DOM loaded - initializing navigation');
    // Load the navigation component
    fetch('includes/nav.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Insert the nav HTML
            const navContainer = document.getElementById('nav-container');
            if (navContainer) {
                navContainer.innerHTML = data;
                console.log('YardCafe: Navigation HTML inserted');
                
                // Set the active page
                setActivePage();
                
                // Check if styles are already loaded
                if (window.YardCafe.stylesLoaded) {
                    console.log('YardCafe: Styles already loaded, initializing mobile menu');
                    initMobileMenu();
                } else {
                    // Wait for styles to be loaded before initializing mobile menu
                    console.log('YardCafe: Waiting for styles before initializing mobile menu');
                    document.addEventListener('yardcafe:styles_loaded', function() {
                        console.log('YardCafe: Styles loaded event received, initializing mobile menu');
                        initMobileMenu();
                    });
                    
                    // Backup plan: Try initializing after a short delay even if styles event doesn't fire
                    setTimeout(function() {
                        if (!window.YardCafe.menuInitialized) {
                            console.warn('YardCafe: Forcing mobile menu initialization after delay');
                            initMobileMenu();
                        }
                    }, 1500);
                }
                
                // Log navigation has loaded
                console.log('YardCafe: Navigation loaded successfully');
            } else {
                console.error('YardCafe: Nav container not found!');
            }
        })
        .catch(error => {
            console.error('YardCafe: Error loading navigation:', error);
        });
        
    // Global fallback to ensure mobile menu is eventually initialized
    // This works even if the navigation component failed to load properly
    setTimeout(function() {
        if (document.querySelector('.mobile-nav-trigger') && 
            !document.querySelector('.mobile-nav-trigger').hasAttribute('data-initialized')) {
            console.warn('YardCafe: Mobile menu initialization fallback triggered');
            initMobileMenu();
        } else if (!document.querySelector('.mobile-nav-trigger')) {
            // Emergency recovery if the nav trigger is missing entirely
            console.error('YardCafe: Navigation component failed to load properly, attempting recovery');
            
            // Check if we need to reload the navigation
            const navContainer = document.getElementById('nav-container');
            if (navContainer && (!navContainer.innerHTML || navContainer.innerHTML.trim() === '')) {
                console.warn('YardCafe: Empty nav container detected, reloading navigation');
                fetch('includes/nav.html')
                    .then(response => response.text())
                    .then(data => {
                        navContainer.innerHTML = data;
                        console.log('YardCafe: Navigation HTML reloaded');
                        initMobileMenu();
                    })
                    .catch(error => console.error('YardCafe: Error reloading navigation:', error));
            }
        }
    }, 2500);
        
    // Set active class on current page link
    function setActivePage() {
        let currentPage = window.location.pathname.split('/').pop() || 'index.html';
        // Handle root URL or empty path - treat as index.html
        if (currentPage === '' || currentPage === '/') {
            currentPage = 'index.html';
        }
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Match if href equals current page, or if both are index pages (index.php/index.html)
            if (href === currentPage || 
                (href === 'index.html' && (currentPage === 'index.html' || currentPage === 'index.php' || currentPage === '')) ||
                (href === 'index.php' && (currentPage === 'index.html' || currentPage === 'index.php' || currentPage === ''))) {
                link.classList.add('w--current');
            }
        });
    }
    
    // Enhanced mobile menu toggle with additional body class
    function initMobileMenu() {
        console.log('YardCafe: Initializing mobile menu');
        const menuButton = document.querySelector('.mobile-nav-trigger');
        const navMenu = document.querySelector('.nav-menu');
        
        // Set the global flag to prevent duplicate initialization
        window.YardCafe.menuInitialized = true;
        
        // Don't initialize if missing elements
        if (!menuButton || !navMenu) {
            console.error('YardCafe: Cannot initialize mobile menu - missing elements');
            
            // Try to create mobile trigger if it's missing but menu exists
            if (!menuButton && navMenu) {
                console.warn('YardCafe: Creating missing mobile nav trigger');
                const newTrigger = document.createElement('button');
                newTrigger.className = 'mobile-nav-trigger';
                newTrigger.setAttribute('aria-label', 'Open Menu');
                
                // Add the three spans for the hamburger icon
                for (let i = 0; i < 3; i++) {
                    const span = document.createElement('span');
                    newTrigger.appendChild(span);
                }
                
                // Add to document body
                document.body.appendChild(newTrigger);
                
                // Try initialization again with the new button
                setTimeout(() => initMobileMenu(), 100);
                return;
            }
            return;
        }
        
        // Don't initialize more than once
        if (menuButton.hasAttribute('data-initialized')) {
            console.log('YardCafe: Mobile menu already initialized, skipping');
            return;
        }
        
        // Ensure mobile-menu.css is loaded
        if (!document.getElementById('mobile-menu-css') && !document.getElementById('emergency-mobile-menu-css')) {
            console.warn('YardCafe: Mobile menu CSS not found, adding emergency styles');
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
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        z-index: 2001;
                        background: transparent;
                        border: none;
                        width: 40px;
                        height: 40px;
                        cursor: pointer;
                        display: block !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                    }
                    .mobile-nav-trigger span {
                        display: block;
                        height: 2px;
                        width: 100%;
                        background: #fff;
                        position: absolute;
                        left: 0;
                        transition: .3s;
                    }
                    .mobile-nav-trigger span:nth-child(1) { top: 10px; }
                    .mobile-nav-trigger span:nth-child(2) { top: 20px; }
                    .mobile-nav-trigger span:nth-child(3) { top: 30px; }
                    .mobile-nav-trigger.w--open span:nth-child(1) {
                        transform: rotate(45deg);
                        top: 20px;
                    }
                    .mobile-nav-trigger.w--open span:nth-child(2) {
                        opacity: 0;
                    }
                    .mobile-nav-trigger.w--open span:nth-child(3) {
                        transform: rotate(-45deg);
                        top: 20px;
                    }
                }`;
            document.head.appendChild(emergencyStyle);
        }
        
        console.log('YardCafe: Menu components found, setting up mobile menu');
        
        // Set initial ARIA attributes
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-controls', 'nav-menu');
        menuButton.setAttribute('data-initialized', 'true');
        
        // Add click event to toggle menu
        menuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('YardCafe: Menu button clicked');
            
            // Toggle nav menu visibility
            navMenu.classList.toggle('show');
            
            // Toggle menu button appearance
            this.classList.toggle('w--open');
            
            // Toggle body class to prevent scrolling when menu is open
            document.body.classList.toggle('nav-open');
            
            // Toggle ARIA expanded state
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            console.log('YardCafe: Menu toggled, show class: ' + navMenu.classList.contains('show'));
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            // If menu is open and click is outside menu and menu button
            if (navMenu.classList.contains('show') && 
                !navMenu.contains(e.target) && 
                !menuButton.contains(e.target)) {
                
                console.log('YardCafe: Closing menu via outside click');
                navMenu.classList.remove('show');
                menuButton.classList.remove('w--open');
                document.body.classList.remove('nav-open');
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
        
        console.log('YardCafe: Mobile menu initialized successfully');
    }
});
