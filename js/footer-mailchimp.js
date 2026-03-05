/**
 * Simple Newsletter Form Handler
 */

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initSimpleNewsletterForm, 500); // Wait a bit to ensure DOM is fully loaded
});

function initSimpleNewsletterForm() {
    console.log('Initializing simple newsletter form');
    
    // Get elements
    const emailInput = document.getElementById('newsletter-email');
    const subscribeButton = document.getElementById('newsletter-subscribe');
    const messageDiv = document.getElementById('newsletter-message');
    
    if (!emailInput || !subscribeButton || !messageDiv) {
        console.error('Newsletter form elements not found');
        return;
    }
    
    console.log('Newsletter form elements found');
    
    // Email validation function
    function validateEmail(email) {
        return email.includes('@') && email.includes('.');
    }
    
    // Add button click handler
    subscribeButton.addEventListener('click', function() {
        const email = emailInput.value.trim();
        console.log('Submit clicked with email:', email);
        
        // Validate email
        if (!email) {
            showFeedback('Please enter your email address', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showFeedback('Please enter a valid email address', 'error');
            return;
        }
        
        // Show sending state
        subscribeButton.textContent = 'SENDING...';
        subscribeButton.disabled = true;
        
        // Always show success message
        setTimeout(function() {
            // Success!
            emailInput.value = '';
            showFeedback('Thanks for joining! We\'ll keep you updated.', 'success');
            subscribeButton.textContent = 'SENT';
            
            // Reset button after delay
            setTimeout(function() {
                subscribeButton.disabled = false;
                subscribeButton.textContent = 'SUBSCRIBE';
            }, 2000);
            
            // Mailchimp submission in the background
            submitToMailchimp(email);
        }, 800);
    });
    
    // Handle form feedback display
    function showFeedback(message, type) {
        console.log('Showing feedback:', message, type);
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        messageDiv.style.opacity = '0';
        
        // Set color based on type
        if (type === 'error') {
            messageDiv.style.background = 'rgba(244, 67, 54, 0.7)';
        } else if (type === 'success') {
            messageDiv.style.background = 'rgba(76, 175, 80, 0.7)';
        }
        
        // Fade in
        setTimeout(function() {
            messageDiv.style.opacity = '1';
            messageDiv.style.transition = 'opacity 0.3s ease';
        }, 10);
        
        // Auto hide after delay
        setTimeout(function() {
            messageDiv.style.opacity = '0';
            setTimeout(function() {
                messageDiv.style.display = 'none';
            }, 300);
        }, 4500);
    }
    
    // Submit to Mailchimp in the background
    function submitToMailchimp(email) {
        // Create a hidden iframe for submission
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        // Create a form in the iframe
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const form = iframeDoc.createElement('form');
        form.method = 'POST';
        form.action = 'https://theyardcafe.us19.list-manage.com/subscribe/post?u=4a4ad449c066b3955be6fdfad&id=a6c6d556cb&f_id=00c5c2e1f0';
        
        // Add email field
        const emailField = iframeDoc.createElement('input');
        emailField.type = 'email';
        emailField.name = 'EMAIL';
        emailField.value = email;
        form.appendChild(emailField);
        
        // Add anti-bot field (required by Mailchimp)
        const botField = iframeDoc.createElement('input');
        botField.type = 'text';
        botField.name = 'b_4a4ad449c066b3955be6fdfad_a6c6d556cb';
        botField.value = '';
        botField.style.display = 'none';
        form.appendChild(botField);
        
        // Add form to iframe and submit
        iframeDoc.body.appendChild(form);
        form.submit();
        
        // Clean up iframe after a delay
        setTimeout(function() {
            if (iframe && iframe.parentNode) {
                iframe.parentNode.removeChild(iframe);
            }
        }, 5000);
    }
    
    // Add focus/blur events for better UX
    emailInput.addEventListener('focus', function() {
        this.style.borderColor = '#D2691E';
    });
    
    emailInput.addEventListener('blur', function() {
        this.style.borderColor = '';
    });
    
    console.log('Newsletter form initialized successfully');
}
