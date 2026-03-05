// Load Mailchimp connected site script
document.addEventListener('DOMContentLoaded', function() {
    // Detect if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    // Function to ensure email field and form are visible on Mailchimp embedded forms (popup disabled)
    function fixMailchimpEmailField() {
        if (isMobile) {
            console.log('Attempting to fix Mailchimp email field...');
            
            // Direct approach to fix the email input field
            const emailFields = document.querySelectorAll('input[type="email"], input.email, input[name="EMAIL"]');
            if (emailFields.length) {
                console.log('Found ' + emailFields.length + ' email fields');
                emailFields.forEach(function(field) {
                    // Force display properties
                    field.setAttribute('style', 'display: block !important; visibility: visible !important; opacity: 1 !important; height: 44px !important; width: 100% !important; padding: 8px !important; margin: 10px 0 !important; font-size: 16px !important; border: 1px solid #ccc !important; box-sizing: border-box !important; position: static !important;');
                });
            } else {
                console.log('No email fields found yet. Will retry.');
            }
            
            // Also ensure the container is visible
            const containers = document.querySelectorAll('.mc-field-group, .field-group, .mc_embed_signup, #mc_embed_signup');
            containers.forEach(function(container) {
                container.setAttribute('style', 'display: block !important; visibility: visible !important; opacity: 1 !important; width: 100% !important; margin: 0 0 15px 0 !important;');
            });
            
            // Make form labels visible
            const labels = document.querySelectorAll('label, .mc-label');
            labels.forEach(function(label) {
                label.setAttribute('style', 'display: block !important; visibility: visible !important; opacity: 1 !important; margin-bottom: 5px !important;');
            });
        }
    }
    
    // Run the fix initially and then periodically to ensure it's applied
    setTimeout(fixMailchimpEmailField, 1000);
    setTimeout(fixMailchimpEmailField, 2000);
    setTimeout(fixMailchimpEmailField, 3000);
    
    // Detection for embedded Mailchimp forms (popup feature disabled)
    const bodyObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes && mutation.addedNodes.length) {
                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    const node = mutation.addedNodes[i];
                    if (node.classList && 
                        (node.classList.contains('mc-modal') || 
                         node.classList.contains('mc-banner') || 
                         node.id === 'mc_embed_signup')) {
                        console.log('Mailchimp popup detected!');
                        // Run fixes after popup is detected
                        setTimeout(fixMailchimpEmailField, 100);
                        setTimeout(fixMailchimpEmailField, 500);
                    }
                }
            }
        });
    });
    
    bodyObserver.observe(document.body, { childList: true, subtree: true });
    // Save the original body overflow value to restore it later
    const originalBodyOverflow = document.body.style.overflow;
    
    // Store original z-index values for important elements
    const saveOriginalStyles = () => {
        const elementsToStore = [
            document.querySelector('.section.homebanner'),
            document.getElementById('nav-container'),
            document.querySelector('.container-3')            
        ].filter(el => el); // filter out any null elements
        
        elementsToStore.forEach(el => {
            if (el) {
                el.dataset.originalZIndex = el.style.zIndex || '';
                el.dataset.originalDisplay = el.style.display || '';
                el.dataset.originalVisibility = el.style.visibility || '';
            }
        });
    };
    
    // Restore original styles to elements
    const restoreOriginalStyles = () => {
        console.log('Restoring page after Mailchimp popup');
        // Restore body overflow
        document.body.style.overflow = originalBodyOverflow;
        document.body.style.position = '';
        
        // Restore all elements with stored original styles
        document.querySelectorAll('[data-original-z-index], [data-original-display], [data-original-visibility]').forEach(el => {
            if (el.dataset.originalZIndex !== undefined) el.style.zIndex = el.dataset.originalZIndex;
            if (el.dataset.originalDisplay !== undefined) el.style.display = el.dataset.originalDisplay;
            if (el.dataset.originalVisibility !== undefined) el.style.visibility = el.dataset.originalVisibility;
        });
        
        // Remove all Mailchimp-added fixed position elements that could be blocking content
        document.querySelectorAll('.mc-layout__modalContent, .mc-modal, .mc-banner, .mc-layout__modalContainer, .mc-layout__modalBackdrop').forEach(el => {
            if (el && el.parentNode) {
                try {
                    el.style.display = 'none';
                    el.style.visibility = 'hidden';
                    el.style.opacity = '0';
                    el.style.position = 'absolute';
                    el.style.zIndex = '-1';
                } catch(e) { console.error('Error hiding Mailchimp element:', e); }
            }
        });
        
        // Ensure the main banner section is properly styled
        const homebanner = document.querySelector('.section.homebanner');
        if (homebanner) {
            homebanner.style.display = 'block';
            homebanner.style.visibility = 'visible';
            homebanner.style.opacity = '1';
            homebanner.style.height = '';
            homebanner.style.zIndex = '1';
            homebanner.style.position = 'relative';
        }
        
        // Force reload and redisplay navigation
        const navContainer = document.getElementById('nav-container');
        // For reliability, always reload the navigation
        if (navContainer) {
            console.log('Reloading navigation components');
            fetch('includes/nav.html')
                .then(response => response.text())
                .then(data => {
                    navContainer.innerHTML = data;
                    navContainer.style.display = 'block';
                    navContainer.style.visibility = 'visible';
                    navContainer.style.opacity = '1';
                    
                    // Re-initialize mobile menu functionality
                    const menuTrigger = document.querySelector('.mobile-nav-trigger');
                    const navMenu = document.querySelector('.nav-menu');
                    
                    if (menuTrigger && navMenu) {
                        menuTrigger.addEventListener('click', function() {
                            navMenu.classList.toggle('show');
                            menuTrigger.classList.toggle('open');
                        });
                    }
                    
                    // Set active page links
                    const currentPath = window.location.pathname;
                    const pageFilename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
                    
                    document.querySelectorAll('.nav-link-2, .nav-link-3, .nav-link-4').forEach(link => {
                        const href = link.getAttribute('href');
                        if ((pageFilename === '' || pageFilename === '/' || pageFilename === 'index.html') && 
                            (href === 'index.html' || href === '/' || href === '')) {
                            link.classList.add('w--current');
                        } else if (href === pageFilename) {
                            link.classList.add('w--current');
                        }
                    });
                })
                .catch(error => console.error('Failed to reload navigation:', error));
        }
        
        // Ensure main page elements are visible
        const essentialElements = [
            '.container-3',
            '.footer',
            '.brand',
            '.w-nav-brand',
            '.outlinebutton'
        ];
        
        essentialElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.display = '';
                el.style.visibility = 'visible';
                el.style.opacity = '1';
            });
        });
        
        // Ensure the logo is visible
        const logo = document.querySelector('.brand img, .w-nav-brand img, .brand, .w-nav-brand');
        if (logo) {
            logo.style.display = '';
            logo.style.visibility = 'visible';
            logo.style.opacity = '1';
        }
        
        console.log('Page restoration complete');
    };
    
    // POPUP DISABLED: The Mailchimp popup functionality has been disabled as requested
    // The automatic popup script is not loaded, but embedded forms will still work
    
    // We're not loading the connected site script that triggers popups
    // If you need to restore popup functionality in the future, uncomment the code below:
    /*
    if (!document.getElementById('mcjs')) {
        const script = document.createElement('script');
        script.id = 'mcjs';
        script.innerHTML = "!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,\"script\",\"https://chimpstatic.com/mcjs-connected/js/users/4a4ad449c066b3955be6fdfad/f124fa1a984c2d29d867b7fcf.js\")";
        document.head.appendChild(script);
        
        // Store original styles once Mailchimp script is loaded
        setTimeout(saveOriginalStyles, 1000);
    }
    */
    
    // Create a MutationObserver to detect when Mailchimp messages appear/disappear
    const observer = new MutationObserver(function(mutations) {
        // Simple targeted fix for mobile devices
        if (isMobile) {
            // Look for Mailchimp forms and input fields
            const mcForms = document.querySelectorAll('form[action*="list-manage.com"], .mc_embed_signup form');
            const emailInputs = document.querySelectorAll('input[name="EMAIL"], input.email, .mc-field-group input[type="email"]');
            const submitButtons = document.querySelectorAll('input[type="submit"], button[type="submit"], .mc-embedded-subscribe');
            
            // Fix form display
            mcForms.forEach(form => {
                if (form) form.style.display = 'block';
            });
            
            // Fix email input display
            emailInputs.forEach(input => {
                if (input) {
                    input.style.display = 'block';
                    input.style.height = '44px';
                    input.style.width = '100%';
                    input.style.fontSize = '16px';
                    input.style.marginBottom = '10px';
                    input.style.boxSizing = 'border-box';
                }
            });
            
            // Fix submit button display
            submitButtons.forEach(button => {
                if (button) {
                    button.style.display = 'block';
                    button.style.width = '100%';
                    button.style.padding = '10px';
                    button.style.marginTop = '10px';
                }
            });
            
            // Position popup in the center of the screen
            const popupContainers = document.querySelectorAll('.mc-layout__modalContainer, .mc-modal');
            popupContainers.forEach(container => {
                if (container) {
                    container.style.top = '50%';
                    container.style.left = '50%';
                    container.style.transform = 'translate(-50%, -50%)';
                    container.style.margin = '0';
                    container.style.width = '90%';
                    container.style.maxWidth = '90%';
                }
            });
        }

        mutations.forEach(function(mutation) {
            // Check for any Mailchimp elements
            const mcElements = document.querySelectorAll('[class*="mc-"], [id*="mc-"]');
            const mcBackdrop = document.querySelector('.mc-layout__modalBackdrop');
            
            // Check for success/thank you message elements after form submission
            const successMessages = document.querySelectorAll('.mc-layout__modalContent, .mc-banner-content');
            let isSuccessMessage = false;
            
            successMessages.forEach(message => {
                // Look for text indicating success/thank you message
                if (message && message.textContent) {
                    const text = message.textContent.toLowerCase();
                    if (text.includes('thank you') || text.includes('thanks') || 
                        text.includes('subscribed') || text.includes('subscription confirmed') || 
                        text.includes('check your email')) {
                        isSuccessMessage = true;
                    }
                }
            });
            
            // Handle backdrop click for closing modal
            if (mcBackdrop) {
                mcBackdrop.onclick = function() {
                    setTimeout(restoreOriginalStyles, 100);
                };
            }
            
            // Only auto-close if this is a success message (not the initial form)
            if (isSuccessMessage) {
                console.log('Mailchimp success message detected - will auto-close in 4 seconds');
                
                // Close the success message after 4 seconds
                setTimeout(function() {
                    // Try different methods to close the message
                    const closeButtons = document.querySelectorAll(
                        '.mc-modal-close, .mc-closeModal, .mc-banner-close, .mc-closeButton'
                    );
                    
                    if (closeButtons.length > 0) {
                        closeButtons.forEach(button => button.click());
                    } else {
                        // If no buttons found, try to hide modals with success messages
                        successMessages.forEach(message => {
                            const parent = message.closest('.mc-modal, .mc-banner');
                            if (parent) parent.style.display = 'none';
                        });
                    }
                    
                    // Restore the original page state
                    setTimeout(restoreOriginalStyles, 100);
                    console.log('Mailchimp success message closed and page restored');
                }, 4000); // 4 seconds
            }
            
            // Add click handlers to all Mailchimp close buttons to ensure page is restored
            document.querySelectorAll('.mc-modal-close, .mc-closeModal, .mc-banner-close, .mc-closeButton').forEach(btn => {
                if (!btn.hasAttribute('data-restore-handler')) {
                    btn.setAttribute('data-restore-handler', 'true');
                    btn.addEventListener('click', function() {
                        setTimeout(restoreOriginalStyles, 100);
                    });
                }
            });
        });
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { 
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class', 'display', 'visibility']
    });
    
    // Add additional listener for Escape key to close popups and restore page
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const mcModals = document.querySelectorAll('.mc-modal, .mc-banner');
            if (mcModals.length > 0) {
                mcModals.forEach(modal => modal.style.display = 'none');
                setTimeout(restoreOriginalStyles, 100);
            }
        }
    });
});
