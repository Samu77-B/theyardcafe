document.addEventListener('DOMContentLoaded', function() {
    // Add active class to current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('w--current');
        }
    });
}); 