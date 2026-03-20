// Combined JavaScript for WisdomLayers


// Modal functions — delegate to projects.js
function openModal(projectId) {
    if (typeof openProjectModal === 'function') { openProjectModal(projectId); return; }
    const project = projectData[projectId];
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');

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

        ${project.desktopVideo || project.mobileVideo ? `
            <!-- Tabbed Media Section -->
            <div class="mb-8">
                <!-- Tab Buttons -->
                <div class="tab-buttons-container border-b border-gray-200 mb-6">
                    ${project.desktopVideo ? `
                        <button onclick="switchTab('desktop-${projectId}')" class="tab-button ${!project.mobileVideo || window.innerWidth >= 768 ? 'active' : ''} px-4 py-3 font-semibold text-teal-600 border-b-2 border-teal-600 transition-colors" data-tab="desktop-${projectId}">
                            <span class="hidden sm:inline">Desktop Demo</span>
                            <span class="sm:hidden">Desktop</span>
                        </button>
                    ` : ''}
                    ${project.mobileVideo ? `
                        <button onclick="switchTab('mobile-${projectId}')" class="tab-button ${!project.desktopVideo || window.innerWidth < 768 ? 'active' : ''} px-4 py-3 font-semibold text-gray-600 hover:text-teal-600 border-b-2 border-transparent transition-colors" data-tab="mobile-${projectId}">
                            <span class="hidden sm:inline">Mobile Demo</span>
                            <span class="sm:hidden">Mobile</span>
                        </button>
                    ` : ''}
                </div>

                <!-- Tab Content -->
                <div class="tab-content-container">
                    ${project.desktopVideo ? `
                        <!-- Desktop Screenshot Tab -->
                        <div id="desktop-${projectId}" class="tab-content ${!project.mobileVideo || window.innerWidth >= 768 ? 'active' : ''}" ${!project.mobileVideo || window.innerWidth >= 768 ? '' : 'style="display: none;"'}>
                            <div class="screenshot-with-nav bg-gray-100 rounded-xl overflow-hidden shadow-2xl">
                                <div class="screenshot-main-container">
                                    <img src="${project.desktopVideo.replace('pj-desktop-demo.webm', 'pj-home-desktop.webp').replace('m2w-desktop-demo.webm', 'm2w-home-desktop.webp')}" alt="Desktop Screenshot" class="screenshot-image clickable-screenshot" id="desktop-screenshot-${projectId}" onclick="window.open('${project.link}', '_blank')">
                                </div>
                                <div class="screenshot-nav">
                                    <div class="nav-section" onclick="switchDesktopImage('desktop-screenshot-${projectId}', '${project.desktopVideo.replace('pj-desktop-demo.webm', 'pj-home-desktop.webp').replace('m2w-desktop-demo.webm', 'm2w-home-desktop.webp')}')">
                                        <img src="${project.desktopVideo.replace('pj-desktop-demo.webm', 'pj-home-desktop.webp').replace('m2w-desktop-demo.webm', 'm2w-home-desktop.webp').replace('desktop-demo.webm', 'home-desktop.webp')}" alt="Home Section" class="nav-thumbnail">
                                        <span class="nav-label">Home</span>
                                    </div>
                                    <div class="nav-section" onclick="switchDesktopImage('desktop-screenshot-${projectId}', '${project.desktopVideo.replace('pj-desktop-demo.webm', 'pj-areas-desktop.webp').replace('m2w-desktop-demo.webm', 'm2w-booking-desktop.webp')}')">
                                        <img src="${project.desktopVideo.replace('pj-desktop-demo.webm', 'pj-areas-desktop.webp').replace('m2w-desktop-demo.webm', 'm2w-booking-desktop.webp').replace('desktop-demo.webm', 'booking-desktop.webp')}" alt="${projectId === 'pjpressure' ? 'Service Areas Section' : 'Booking Section'}" class="nav-thumbnail">
                                        <span class="nav-label">${projectId === 'pjpressure' ? 'Areas' : 'Booking'}</span>
                                    </div>
                                    <div class="nav-section" onclick="switchDesktopImage('desktop-screenshot-${projectId}', '${project.desktopVideo.replace('pj-desktop-demo.webm', 'pj-about-desktop.webp').replace('m2w-desktop-demo.webm', 'm2w-team-desktop.webp')}')">
                                        <img src="${project.desktopVideo.replace('pj-desktop-demo.webm', 'pj-about-desktop.webp').replace('m2w-desktop-demo.webm', 'm2w-team-desktop.webp').replace('desktop-demo.webm', 'team-desktop.webp')}" alt="${projectId === 'pjpressure' ? 'About Section' : 'Team Section'}" class="nav-thumbnail">
                                        <span class="nav-label">${projectId === 'pjpressure' ? 'About' : 'Team'}</span>
                                    </div>
                                    <div class="nav-section" onclick="switchDesktopImage('desktop-screenshot-${projectId}', '${project.desktopVideo.replace('pj-desktop-demo.webm', 'pj-gallery-desktop.webp').replace('m2w-desktop-demo.webm', 'm2w-services-desktop.webp')}')">
                                        <img src="${project.desktopVideo.replace('pj-desktop-demo.webm', 'pj-gallery-desktop.webp').replace('m2w-desktop-demo.webm', 'm2w-services-desktop.webp').replace('desktop-demo.webm', 'services-desktop.webp')}" alt="${projectId === 'pjpressure' ? 'Gallery Section' : 'Services Section'}" class="nav-thumbnail">
                                        <span class="nav-label">${projectId === 'pjpressure' ? 'Gallery' : 'Services'}</span>
                                    </div>
                                </div>
                            </div>
                            <p class="text-sm text-gray-500 mt-3 text-center">Desktop experience • 1920x1080 • Click screenshot to visit live site • Use side navigation to jump to sections</p>
                        </div>
                    ` : ''}
                    
                    ${project.mobileVideo ? `
                        <!-- Mobile Screenshot Tab -->
                        <div id="mobile-${projectId}" class="tab-content ${!project.desktopVideo || window.innerWidth < 768 ? 'active' : ''}" ${!project.desktopVideo || window.innerWidth < 768 ? '' : 'style="display: none;"'}>
                            <div class="flex justify-center items-center gap-4 md:gap-6">
                                <!-- Phone Frame with Scrolling -->
                                <div class="relative phone-frame-container">
                                    <!-- Phone Frame -->
                                    <div class="bg-gray-900 rounded-[2rem] md:rounded-[3rem] p-2 md:p-3 shadow-2xl">
                                        <div class="bg-black rounded-[1.5rem] md:rounded-[2.5rem] overflow-y-auto overflow-x-hidden phone-screen">
                                            <img src="${project.mobileVideo.replace('pj-mobile-demo.webm', 'pj-home-mobile.webp').replace('m2w-mobile-demo.webm', 'm2w-home-mobile.webp')}" alt="Mobile Screenshot" class="w-full clickable-screenshot" id="mobile-screenshot-${projectId}" onclick="window.open('${project.link}', '_blank')">
                                        </div>
                                    </div>
                                </div>

                                <!-- Navigation Thumbnails (Right Side) -->
                                <div class="mobile-nav-sidebar">
                                    <div class="nav-section-mobile" onclick="switchMobileImage('mobile-screenshot-${projectId}', '${project.mobileVideo.replace('pj-mobile-demo.webm', 'pj-home-mobile.webp').replace('m2w-mobile-demo.webm', 'm2w-home-mobile.webp')}')">
                                        <img src="${project.mobileVideo.replace('pj-mobile-demo.webm', 'pj-home-mobile.webp').replace('m2w-mobile-demo.webm', 'm2w-home-mobile.webp').replace('mobile-demo.webm', 'home-mobile.webp')}" alt="Home Section" class="nav-thumbnail-mobile">
                                        <span class="nav-label-mobile">Home</span>
                                    </div>
                                    <div class="nav-section-mobile" onclick="switchMobileImage('mobile-screenshot-${projectId}', '${project.mobileVideo.replace('pj-mobile-demo.webm', 'pj-areas-mobile.webp').replace('m2w-mobile-demo.webm', 'm2w-booking-mobile.webp')}')">
                                        <img src="${project.mobileVideo.replace('pj-mobile-demo.webm', 'pj-areas-mobile.webp').replace('m2w-mobile-demo.webm', 'm2w-booking-mobile.webp').replace('mobile-demo.webm', 'booking-mobile.webp')}" alt="${projectId === 'pjpressure' ? 'Service Areas Section' : 'Booking Section'}" class="nav-thumbnail-mobile">
                                        <span class="nav-label-mobile">${projectId === 'pjpressure' ? 'Areas' : 'Booking'}</span>
                                    </div>
                                    <div class="nav-section-mobile" onclick="switchMobileImage('mobile-screenshot-${projectId}', '${project.mobileVideo.replace('pj-mobile-demo.webm', 'pj-about-mobile.webp').replace('m2w-mobile-demo.webm', 'm2w-team-mobile.webp')}')">
                                        <img src="${project.mobileVideo.replace('pj-mobile-demo.webm', 'pj-about-mobile.webp').replace('m2w-mobile-demo.webm', 'm2w-team-mobile.webp').replace('mobile-demo.webm', 'team-mobile.webp')}" alt="${projectId === 'pjpressure' ? 'About Section' : 'Team Section'}" class="nav-thumbnail-mobile">
                                        <span class="nav-label-mobile">${projectId === 'pjpressure' ? 'About' : 'Team'}</span>
                                    </div>
                                    <div class="nav-section-mobile" onclick="switchMobileImage('mobile-screenshot-${projectId}', '${project.mobileVideo.replace('pj-mobile-demo.webm', 'pj-gallery-mobile.webp').replace('m2w-mobile-demo.webm', 'm2w-services-mobile.webp')}')">
                                        <img src="${project.mobileVideo.replace('pj-mobile-demo.webm', 'pj-gallery-mobile.webp').replace('m2w-mobile-demo.webm', 'm2w-services-mobile.webp').replace('mobile-demo.webm', 'services-mobile.webp')}" alt="${projectId === 'pjpressure' ? 'Gallery Section' : 'Services Section'}" class="nav-thumbnail-mobile">
                                        <span class="nav-label-mobile">${projectId === 'pjpressure' ? 'Gallery' : 'Services'}</span>
                                    </div>
                                </div>
                            </div>
                            <p class="text-sm text-gray-500 mt-3 text-center">Mobile experience • 375x812 • Click screenshot to visit live site • Use side navigation to jump to sections</p>
                        </div>
                    ` : ''}
                    
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
        tab.classList.remove('active', 'text-teal-600', 'border-teal-600');
        tab.classList.add('text-gray-600', 'border-transparent');
    });
    
    allContent.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
    });
    
    // Add active class to clicked tab
    const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeTab) {
        activeTab.classList.add('active', 'text-teal-600', 'border-teal-600');
        activeTab.classList.remove('text-gray-600', 'border-transparent');
    }
    
    // Show selected content
    const activeContent = document.getElementById(tabId);
    if (activeContent) {
        activeContent.style.display = 'block';
        activeContent.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function scrollToSection(imageId, scrollRatio) {
    const image = document.getElementById(imageId);
    if (image) {
        // Check if it's a mobile screenshot in a phone screen
        const phoneScreen = image.closest('.phone-screen');
        if (phoneScreen) {
            // For mobile phone screenshots, scroll the phone screen container
            const scrollHeight = image.offsetHeight - phoneScreen.offsetHeight;
            const scrollTop = scrollHeight * scrollRatio;
            phoneScreen.scrollTop = scrollTop;
        } else {
            // For desktop screenshots, scroll the screenshot-main-container
            const container = image.parentElement;
            const scrollHeight = image.offsetHeight - container.offsetHeight;
            const scrollTop = scrollHeight * scrollRatio;
            container.scrollTop = scrollTop;
        }
    }
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

// ===== MOBILE MENU =====
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;
    const icon = btn.querySelector('.mobile-menu-icon');

    function open() {
        menu.classList.add('active');
        if (icon) icon.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function close() {
        menu.classList.remove('active');
        if (icon) icon.classList.remove('active');
        document.body.style.overflow = '';
    }

    btn.addEventListener('click', () => menu.classList.contains('active') ? close() : open());
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}

document.addEventListener('DOMContentLoaded', function() {

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
    const carouselWrapper = document.querySelector('.pricing-carousel-wrapper');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');

    if (carousel && carouselWrapper && prevBtn && nextBtn) {
        const CARD_COUNT = carousel.querySelectorAll('.pricing-card').length;
        let realIndex = 1; // Start on Professional (Most Popular)

        function getVisibleCount() {
            return window.innerWidth < 768 ? 1 : 3;
        }

        function getCardWidth() {
            return carouselWrapper.offsetWidth / getVisibleCount();
        }

        function setAllCardWidths() {
            const cardWidth = getCardWidth();
            carousel.querySelectorAll('.pricing-card').forEach(card => {
                card.style.width = cardWidth + 'px';
                card.style.flex = `0 0 ${cardWidth}px`;
            });
        }

        function updateActiveCard() {
            carousel.querySelectorAll('.pricing-card').forEach((card, i) => {
                card.classList.toggle('active', i === realIndex);
            });
        }

        function updateDots() {
            dots.forEach((dot, i) => {
                const isActive = i === realIndex;
                dot.classList.toggle('active', isActive);
                dot.classList.toggle('bg-teal-600', isActive);
                dot.classList.toggle('bg-gray-300', !isActive);
                dot.style.width = isActive ? '1rem' : '0.5rem';
            });
        }

        function updateArrows() {
            prevBtn.style.opacity = realIndex === 0 ? '0.3' : '1';
            prevBtn.style.pointerEvents = realIndex === 0 ? 'none' : 'auto';
            nextBtn.style.opacity = realIndex === CARD_COUNT - 1 ? '0.3' : '1';
            nextBtn.style.pointerEvents = realIndex === CARD_COUNT - 1 ? 'none' : 'auto';
        }

        function getTranslateX(index) {
            const visibleCount = getVisibleCount();
            const cardWidth = getCardWidth();
            const offset = visibleCount === 1 ? 0 : 1;
            const raw = (index - offset) * cardWidth;
            const max = (CARD_COUNT - visibleCount) * cardWidth;
            return Math.max(0, Math.min(raw, max));
        }

        function goTo(index) {
            realIndex = Math.max(0, Math.min(CARD_COUNT - 1, index));
            carousel.classList.remove('no-transition');
            carousel.style.transform = `translateX(-${getTranslateX(realIndex)}px)`;
            updateActiveCard();
            updateDots();
            updateArrows();
        }

        function snapTo(index) {
            realIndex = Math.max(0, Math.min(CARD_COUNT - 1, index));
            carousel.classList.add('no-transition');
            carousel.style.transform = `translateX(-${getTranslateX(realIndex)}px)`;
            updateActiveCard();
            updateDots();
            updateArrows();
        }

        [prevBtn, nextBtn].forEach(btn => {
            btn.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
            btn.addEventListener('touchend', e => e.stopPropagation(), { passive: true });
            btn.addEventListener('mousedown', e => e.stopPropagation());
        });

        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            goTo(realIndex - 1);
        });

        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            goTo(realIndex + 1);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                goTo(index);
            });
        });

        let touchStartX = 0;
        carousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', function(e) {
            const delta = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(delta) > 50) {
                if (delta > 0) goTo(realIndex + 1);
                else goTo(realIndex - 1);
            }
        }, { passive: true });

        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                setAllCardWidths();
                snapTo(realIndex);
            }, 250);
        });

        // Initialize
        setAllCardWidths();
        snapTo(1); // Start on Professional
    }
    
    // ===== FAQ ACCORDION =====
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.classList.contains('open');

            // Close all
            document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
            document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
            document.querySelectorAll('.faq-item-active').forEach(el => el.classList.remove('faq-item-active'));

            // Open this one if it wasn't already open
            if (!isOpen) {
                answer.classList.add('open');
                this.classList.add('active');
                this.parentElement.classList.add('faq-item-active');
            }
        });
    });
    
    // Add click listeners to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            if (projectId) {
                openModal(projectId);
            }
        });
    });

    // Close modal when clicking outside
    document.getElementById('projectModal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});