// WisdomLayers Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: contactForm.querySelector('input[type="text"]').value,
                email: contactForm.querySelector('input[type="email"]').value,
                budget: contactForm.querySelector('select').value,
                message: contactForm.querySelector('textarea').value
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.budget || !formData.message) {
                showMessage('error', '✗ Please fill out all fields.');
                return;
            }
            
            // Get submit button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            submitButton.style.opacity = '0.7';
            submitButton.style.cursor = 'not-allowed';
            
            try {
                // Your Google Apps Script URL
                const scriptURL = 'https://script.google.com/macros/s/AKfycbz8NLgGhNU2c9S0Svf8ecFT2WZAGZ0Osywr7EupOy_vbl38WGqeuI4OWLqMD5W9Hb36Bg/exec';
                
                const response = await fetch(scriptURL, {
                    method: 'POST',
                    mode: 'no-cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                // Show success message
                showMessage('success', '✓ Message sent successfully! I\'ll get back to you within 24 hours.');
                
                // Reset form
                contactForm.reset();
                
            } catch (error) {
                console.error('Error:', error);
                showMessage('error', '✗ Something went wrong. Please email me directly at contact@wisdomlayers.com');
            } finally {
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                submitButton.style.opacity = '1';
                submitButton.style.cursor = 'pointer';
            }
        });
    }
    
    function showMessage(type, message) {
        // Remove any existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        messageDiv.textContent = message;
        
        // Style based on type
        if (type === 'success') {
            messageDiv.style.backgroundColor = '#d1fae5';
            messageDiv.style.color = '#065f46';
            messageDiv.style.border = '2px solid #10b981';
        } else {
            messageDiv.style.backgroundColor = '#fee2e2';
            messageDiv.style.color = '#991b1b';
            messageDiv.style.border = '2px solid #ef4444';
        }
        
        messageDiv.style.padding = '1rem';
        messageDiv.style.borderRadius = '0.5rem';
        messageDiv.style.marginTop = '1rem';
        messageDiv.style.marginBottom = '1.5rem';
        messageDiv.style.fontWeight = '500';
        messageDiv.style.fontSize = '1rem';
        messageDiv.style.transition = 'opacity 0.3s';
        
        // Insert message after form
        contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300);
        }, 8000);
    }
});