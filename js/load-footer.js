document.addEventListener('DOMContentLoaded', function() {
  function loadFooter() {
    fetch('includes/footer.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        // Target the footer element with id="footer"
        const footerContainer = document.getElementById('footer');
        if (footerContainer) {
          footerContainer.innerHTML = data;
          // Set the copyright year
          const copyrightYearElement = document.getElementById('copyright-year');
          if (copyrightYearElement) {
            copyrightYearElement.textContent = new Date().getFullYear();
          }
          
          // Dispatch a custom event to notify other scripts that footer is loaded
          const footerLoadedEvent = new CustomEvent('footer-loaded');
          document.dispatchEvent(footerLoadedEvent);
          console.log('Footer loaded and event dispatched');
          
          // Initialize mailchimp form if the function exists
          if (typeof initMailchimpForm === 'function') {
            console.log('Calling initMailchimpForm() directly');
            initMailchimpForm();
          }
        } else {
          console.error('Footer container not found, make sure the page has a footer element with id="footer"');
        }
      })
      .catch(error => {
        console.error('Error loading footer:', error);
      });
  }
  
  loadFooter();
});
