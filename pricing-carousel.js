// Pricing Carousel & FAQ Functionality

document.addEventListener('DOMContentLoaded', function() {
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
                q.classList.remove('active');
            });
            
            // Toggle current answer
            if (!isOpen) {
                answer.classList.remove('hidden');
                this.classList.add('active');
            }
        });
    });
});