/**
 * The Yard Cafe - Scroll-Activated Animations
 * This script triggers animations when elements come into view during scrolling
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('YardCafe: Initializing scroll-activated animations');
    
    // Function to check if browser supports Intersection Observer
    function supportsIntersectionObserver() {
        return ('IntersectionObserver' in window &&
                'IntersectionObserverEntry' in window &&
                'intersectionRatio' in window.IntersectionObserverEntry.prototype);
    }
    
    // Elements to animate
    const animatedElements = document.querySelectorAll('.mainpageheading, .menuheading, .menuheading-small');
    
    // If browser doesn't support Intersection Observer, add animation class to all elements immediately
    if (!supportsIntersectionObserver()) {
        console.warn('YardCafe: IntersectionObserver not supported, falling back to immediate animations');
        animatedElements.forEach(element => element.classList.add('animate'));
        return;
    }
    
    // Create the observer with options
    const observerOptions = {
        root: null, // Use viewport as root
        rootMargin: '0px', // No margin
        threshold: 0.25 // Trigger when at least 25% of the element is visible
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            // If element is intersecting (visible)
            if (entry.isIntersecting) {
                console.log('YardCafe: Element in view, activating animation', entry.target);
                
                // Add animate class to trigger CSS animation
                entry.target.classList.add('animate');
                
                // Stop observing this element after animating it
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Start observing all animated elements
    animatedElements.forEach(element => {
        // If element is already visible when page loads, animate immediately
        const rect = element.getBoundingClientRect();
        const isInViewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        
        if (isInViewport) {
            console.log('YardCafe: Element already in viewport, animating immediately', element);
            element.classList.add('animate');
        } else {
            // Otherwise observe for when it comes into view
            observer.observe(element);
        }
    });
    
    console.log('YardCafe: Scroll animations initialized for', animatedElements.length, 'elements');
});
