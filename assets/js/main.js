// Combined JavaScript for WisdomLayers

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Toggle icons
            if (menuIcon && closeIcon) {
                menuIcon.classList.toggle('hidden');
                closeIcon.classList.toggle('hidden');
            }
        });
        
        // Close menu when clicking on a link
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                if (menuIcon && closeIcon) {
                    menuIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnButton = mobileMenuBtn.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnButton && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                if (menuIcon && closeIcon) {
                    menuIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                }
            }
        });
    }
}

// Modal functions
function openModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');

    // Determine default tab based on screen size
    const isMobile = window.innerWidth < 768;
    let defaultTab = isMobile ? 'mobile' : 'desktop';

    let modalHTML = `
        <button class="modal-close" onclick="closeModal()">&times;</button>
        <div class="mb-6">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">${project.title}</h2>
            <p class="text-xl text-gray-600 mb-4">${project.tagline}</p>
            ${project.link ? `
                <a href="${project.link}" target="_blank" class="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold transition-colors">
                    Visit Live Site
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                </a>
            ` : ''}
        </div>

        ${(project.screenshots || project.cardImage) ? `
            <!-- Tabbed Media Section -->
            <div class="mb-8">
                <!-- Tab Buttons -->
                <div class="tab-buttons-container">
                    <button onclick="switchTab('desktop-${projectId}')" class="tab-button ${defaultTab === 'desktop' ? 'active' : ''}" data-tab="desktop-${projectId}">
                        Desktop View
                    </button>
                    <button onclick="switchTab('mobile-${projectId}')" class="tab-button ${defaultTab === 'mobile' ? 'active' : ''}" data-tab="mobile-${projectId}">
                        Mobile View
                    </button>
                </div>

                <!-- Tab Content -->
                <div class="tab-content-container">
                    <!-- Desktop Screenshot Tab -->
                    <div id="desktop-${projectId}" class="tab-content" style="display: ${defaultTab === 'desktop' ? 'block' : 'none'};">
                        <div class="screenshot-with-nav">
                            <div class="screenshot-main-container">
                                <img src="${project.screenshots ? project.screenshots[0].image : project.cardImage}" alt="Desktop Screenshot" class="screenshot-image clickable-screenshot" id="desktop-screenshot-${projectId}" onclick="window.open('${project.link}', '_blank')">
                            </div>
                            <div class="screenshot-nav">
                                ${project.screenshots ? project.screenshots.map((screenshot, index) => `
                                    <div class="nav-section" onclick="switchDesktopImage('desktop-screenshot-${projectId}', '${screenshot.image}')">
                                        <img src="${screenshot.image}" alt="${screenshot.title}" class="nav-thumbnail">
                                        <span class="nav-label">${screenshot.title}</span>
                                    </div>
                                `).join('') : `
                                    <div class="nav-section" onclick="switchDesktopImage('desktop-screenshot-${projectId}', '${project.cardImage}')">
                                        <img src="${project.cardImage}" alt="Project Image" class="nav-thumbnail">
                                        <span class="nav-label">Project</span>
                                    </div>
                                `}
                            </div>
                        </div>
                        <p class="text-sm text-gray-500 mt-3 text-center">Desktop experience • 1920x1080 • Click screenshot to visit live site</p>
                    </div>

                    <!-- Mobile Screenshot Tab -->
                    <div id="mobile-${projectId}" class="tab-content" style="display: ${defaultTab === 'mobile' ? 'block' : 'none'};">
                        <div class="flex flex-col md:flex-row justify-center items-start gap-4 md:gap-6">
                            <!-- Phone Frame with Scrolling -->
                            <div class="phone-frame-container">
                                <div class="bg-gray-900 rounded-[2rem] md:rounded-[3rem] p-2 md:p-3 shadow-2xl">
                                    <div class="bg-black rounded-[1.5rem] md:rounded-[2.5rem] overflow-y-auto overflow-x-hidden phone-screen">
                                        <img src="${project.screenshots ? project.screenshots[0].image.replace('-card.png', '-mobile-view.png').replace('-desktop-view.png', '-mobile-view.png') : project.cardImage}" alt="Mobile Screenshot" class="w-full clickable-screenshot" id="mobile-screenshot-${projectId}" onclick="window.open('${project.link}', '_blank')">
                                    </div>
                                </div>
                            </div>

                            <!-- Navigation Thumbnails -->
                            <div class="mobile-nav-sidebar w-full md:w-auto">
                                ${project.screenshots ? project.screenshots.map((screenshot, index) => `
                                    <div class="nav-section-mobile" onclick="switchMobileImage('mobile-screenshot-${projectId}', '${screenshot.image.replace('-card.png', '-mobile-view.png').replace('-desktop-view.png', '-mobile-view.png')}')">
                                        <img src="${screenshot.image}" alt="${screenshot.title}" class="nav-thumbnail-mobile">
                                        <span class="nav-label-mobile">${screenshot.title}</span>
                                    </div>
                                `).join('') : `
                                    <div class="nav-section-mobile" onclick="switchMobileImage('mobile-screenshot-${projectId}', '${project.cardImage}')">
                                        <img src="${project.cardImage}" alt="Project Image" class="nav-thumbnail-mobile">
                                        <span class="nav-label-mobile">Project</span>
                                    </div>
                                `}
                            </div>
                        </div>
                        <p class="text-sm text-gray-500 mt-3 text-center">Mobile experience • 375x812 • Click screenshot to visit live site</p>
                    </div>
                </div>
            </div>
        ` : `
            <div class="w-full aspect-video bg-gradient-to-br from-teal-100 to-teal-50 rounded-xl flex items-center justify-center mb-8">
                <div class="text-center text-gray-400">
                    <svg class="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p class="text-sm">Project media coming soon</p>
                </div>
            </div>
        `}

        <div class="space-y-8">
            <div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4">About This Project</h3>
                <p class="text-gray-600 leading-relaxed mb-6">${project.description}</p>
                
                ${project.problem ? `
                    <div class="bg-red-50 border-l-4 border-red-500 p-6 mb-4 rounded-r-lg">
                        <p class="font-semibold text-red-900 mb-2">The Challenge</p>
                        <p class="text-red-800">${project.problem}</p>
                    </div>
                ` : ''}
                
                ${project.solution ? `
                    <div class="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg">
                        <p class="font-semibold text-teal-900 mb-2">The Solution</p>
                        <p class="text-teal-800">${project.solution}</p>
                    </div>
                ` : ''}
            </div>

            <div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
                <ul class="space-y-3">
                    ${project.features.map(feature => `
                        <li class="flex items-start text-gray-600">
                            <svg class="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>${feature}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            ${project.results ? `
                <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Results & Impact</h3>
                    <ul class="space-y-3">
                        ${project.results.map(result => `
                            <li class="flex items-start text-gray-600">
                                <svg class="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>${result}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}

            ${project.testimonial ? `
                <div class="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-8 border border-teal-200">
                    <svg class="w-10 h-10 text-teal-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                    <p class="text-gray-800 text-lg italic mb-4">"${project.testimonial.text}"</p>
                    <p class="text-gray-600 font-semibold">— ${project.testimonial.author}</p>
                </div>
            ` : ''}

            <div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Technologies Used</h3>
                <div class="flex flex-wrap gap-2">
                    ${project.tech.map(tech => `
                        <span class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">${tech}</span>
                    `).join('')}
                </div>
            </div>

            <div class="flex justify-end pt-6 border-t border-gray-200">
                <a href="#contact" class="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-lg">
                    Start Your Project
                </a>
            </div>
        </div>
    `;

    modalContent.innerHTML = modalHTML;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function switchTab(tabId) {
    // Get all tabs and content
    const allTabs = document.querySelectorAll('.tab-button');
    const allContent = document.querySelectorAll('.tab-content');
    
    // Remove active class from all
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    allContent.forEach(content => {
        content.style.display = 'none';
    });
    
    // Add active class to clicked tab
    const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Show selected content
    const activeContent = document.getElementById(tabId);
    if (activeContent) {
        activeContent.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function switchMobileImage(imageId, newImageSrc) {
    const image = document.getElementById(imageId);
    if (image) {
        image.src = newImageSrc;
        // Reset scroll position to top when switching images
        const phoneScreen = image.closest('.phone-screen');
        if (phoneScreen) {
            phoneScreen.scrollTop = 0;
        }
    }
}

function switchDesktopImage(imageId, newImageSrc) {
    const image = document.getElementById(imageId);
    if (image) {
        image.src = newImageSrc;
        // Reset scroll position to top when switching images
        const container = image.parentElement;
        if (container) {
            container.scrollTop = 0;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize mobile menu
    initMobileMenu();
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===== PROJECT CARD CLICK HANDLERS =====
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            if (projectId && projectData[projectId]) {
                openModal(projectId);
            }
        });
    });

    // ===== CONTACT FORM HANDLER =====
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
    
    // ===== PRICING CAROUSEL =====
    const carousel = document.querySelector('.pricing-carousel');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (carousel && prevBtn && nextBtn) {
        let currentIndex = 0;
        const totalCards = 4; // Starter, Professional, Premium, Custom
        const isMobile = window.innerWidth < 768;
        const maxIndex = isMobile ? totalCards - 1 : 1; // Desktop shows 3 at a time, so only 2 positions
        
        function updateCarousel() {
            const isMobile = window.innerWidth < 768;
            const cardWidth = isMobile ? 100 : 100 / 3; // 100% on mobile, 33.33% on desktop
            const translateX = -(currentIndex * cardWidth);
            carousel.style.transform = `translateX(${translateX}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                    dot.classList.remove('bg-gray-300');
                    dot.classList.add('bg-teal-600');
                    dot.style.width = '1rem';
                } else {
                    dot.classList.remove('active');
                    dot.classList.add('bg-gray-300');
                    dot.classList.remove('bg-teal-600');
                    dot.style.width = '0.5rem';
                }
            });
        }
        
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        nextBtn.addEventListener('click', function() {
            const isMobile = window.innerWidth < 768;
            const maxIdx = isMobile ? totalCards - 1 : 1;
            if (currentIndex < maxIdx) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateCarousel();
            });
        });
        
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                currentIndex = 0; // Reset to first slide on resize
                updateCarousel();
            }, 250);
        });
        
        // Touch swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        carousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const isMobile = window.innerWidth < 768;
            if (!isMobile) return;
            
            if (touchEndX < touchStartX - 50) {
                // Swipe left
                if (currentIndex < totalCards - 1) {
                    currentIndex++;
                    updateCarousel();
                }
            }
            
            if (touchEndX > touchStartX + 50) {
                // Swipe right
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            }
        }
        
        // Initialize
        updateCarousel();
    }
    
    // ===== FAQ ACCORDION =====
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = !answer.classList.contains('hidden');
            
            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(a => {
                a.classList.add('hidden');
            });
            
            document.querySelectorAll('.faq-question').forEach(q => {
                const icon = q.querySelector('.faq-icon');
                if (icon) {
                    icon.classList.remove('rotate-180');
                }
            });
            
            // Toggle current answer
            if (isOpen) {
                answer.classList.remove('hidden');
                const icon = this.querySelector('.faq-icon');
                if (icon) {
                    icon.classList.add('rotate-180');
                }
            } else {
                answer.classList.add('hidden');
                const icon = this.querySelector('.faq-icon');
                if (icon) {
                    icon.classList.remove('rotate-180');
                }
            }
        });
    });
});