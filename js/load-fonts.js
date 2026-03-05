// Script to ensure Roboto fonts are loaded on all pages
document.addEventListener('DOMContentLoaded', function() {
  // Check if WebFont is already loaded
  if (typeof WebFont !== 'undefined') {
    // Add Roboto font if not already included
    if (!document.querySelector('style[data-roboto="loaded"]')) {
      WebFont.load({
        google: {
          families: ['Roboto:100,300,400']
        },
        active: function() {
          // Mark as loaded
          const style = document.createElement('style');
          style.setAttribute('data-roboto', 'loaded');
          document.head.appendChild(style);
          console.log('Roboto font loaded successfully');
        }
      });
    }
  } else {
    console.error('WebFont not loaded. Cannot load Roboto font.');
  }
});
