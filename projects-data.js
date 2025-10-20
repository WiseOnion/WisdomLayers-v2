// Project data
const projectData = {
    miles2wisdom: {
        title: "Miles2Wisdom",
        tagline: "Family & Marriage Therapy Practice",
        description: "A comprehensive therapy practice website built to streamline client onboarding and present a professional, calming presence. Miles2Wisdom is a family and marriage therapy practice that helps couples and families through counseling and therapeutic services. Before this site, everything was scattered and manual—clients had to call or message to schedule, intake forms were handled by email, and the practice lacked a single professional place that clearly communicated their services and approach.",
        problem: "Manual scheduling, scattered intake processes, and no unified professional online presence made client onboarding difficult and time-consuming.",
        solution: "A clean, trustworthy website with self-service booking, streamlined intake forms, and therapist profiles that build trust and professionalism from the first visit.",
        features: [
            "Self-service booking system for therapy sessions",
            "Integrated intake and application forms",
            "Meet the Team page with therapist bios and credentials",
            "Clean, minimal, responsive design",
            "Professional and calming aesthetic",
            "Scalable architecture for future growth"
        ],
        results: [
            "Scheduling is now self-serve and significantly faster",
            "Intake and applications captured in one place",
            "Positive client feedback about trust and ease of use",
            "Strong portfolio piece for mental health providers"
        ],
        testimonial: {
            text: "The website represents our practice perfectly. It is calm, professional, and easy to use. Scheduling and intake are way smoother now.",
            author: "Miles2Wisdom Team"
        },
        tech: ["HTML/CSS", "JavaScript", "Booking Integration", "Form Handling", "Payment Setup"],
        link: "https://miles2wisdom.com",
        cardImage: "images/miles2wisdom/card.png",
        desktopVideo: "images/miles2wisdom/desktop-demo.webm",
        mobileVideo: "images/miles2wisdom/mobile-demo.webm",
        screenshots: [
            {
                title: "Booking System",
                image: "images/miles2wisdom/booking.png",
                description: "Self-service appointment scheduling"
            },
            {
                title: "Meet the Team",
                image: "images/miles2wisdom/teams.png",
                description: "Therapist profiles and credentials"
            },
            {
                title: "Services Page",
                image: "images/miles2wisdom/services.png",
                description: "Detailed service offerings"
            }
        ]
    },
    placeholder1: {
        title: "Coming Soon",
        tagline: "Exciting Project in Development",
        description: "This project slot is reserved for an upcoming client. Check back soon to see what we're building!",
        problem: null,
        solution: null,
        features: [
            "Project details will be added once development begins",
            "Stay tuned for updates"
        ],
        results: null,
        testimonial: null,
        tech: ["TBD"],
        link: null,
        cardImage: null,
        desktopVideo: null,
        mobileVideo: null,
        screenshots: null
    },
    placeholder2: {
        title: "Coming Soon",
        tagline: "Exciting Project in Development",
        description: "This project slot is reserved for an upcoming client. Check back soon to see what we're building!",
        problem: null,
        solution: null,
        features: [
            "Project details will be added once development begins",
            "Stay tuned for updates"
        ],
        results: null,
        testimonial: null,
        tech: ["TBD"],
        link: null,
        cardImage: null,
        desktopVideo: null,
        mobileVideo: null,
        screenshots: null
    },
    placeholder3: {
        title: "Coming Soon",
        tagline: "Exciting Project in Development",
        description: "This project slot is reserved for an upcoming client. Check back soon to see what we're building!",
        problem: null,
        solution: null,
        features: [
            "Project details will be added once development begins",
            "Stay tuned for updates"
        ],
        results: null,
        testimonial: null,
        tech: ["TBD"],
        link: null,
        cardImage: null,
        desktopVideo: null,
        mobileVideo: null,
        screenshots: null
    },
    placeholder4: {
        title: "Coming Soon",
        tagline: "Exciting Project in Development",
        description: "This project slot is reserved for an upcoming client. Check back soon to see what we're building!",
        problem: null,
        solution: null,
        features: [
            "Project details will be added once development begins",
            "Stay tuned for updates"
        ],
        results: null,
        testimonial: null,
        tech: ["TBD"],
        link: null,
        cardImage: null,
        desktopVideo: null,
        mobileVideo: null,
        screenshots: null
    },
    placeholder5: {
        title: "Coming Soon",
        tagline: "Exciting Project in Development",
        description: "This project slot is reserved for an upcoming client. Check back soon to see what we're building!",
        problem: null,
        solution: null,
        features: [
            "Project details will be added once development begins",
            "Stay tuned for updates"
        ],
        results: null,
        testimonial: null,
        tech: ["TBD"],
        link: null,
        cardImage: null,
        desktopVideo: null,
        mobileVideo: null,
        screenshots: null
    }
};

// Modal functions
function openModal(projectId) {
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

        ${project.desktopVideo || project.mobileVideo || project.screenshots ? `
            <!-- Tabbed Media Section -->
            <div class="mb-8">
                <!-- Tab Buttons -->
                <div class="flex border-b border-gray-200 mb-6">
                    ${project.desktopVideo ? `
                        <button onclick="switchTab('desktop-${projectId}')" class="tab-button active px-6 py-3 font-semibold text-teal-600 border-b-2 border-teal-600 transition-colors" data-tab="desktop-${projectId}">
                            Desktop Demo
                        </button>
                    ` : ''}
                    ${project.mobileVideo ? `
                        <button onclick="switchTab('mobile-${projectId}')" class="tab-button px-6 py-3 font-semibold text-gray-600 hover:text-teal-600 border-b-2 border-transparent transition-colors" data-tab="mobile-${projectId}">
                            Mobile Demo
                        </button>
                    ` : ''}
                    ${project.screenshots ? `
                        <button onclick="switchTab('screenshots-${projectId}')" class="tab-button px-6 py-3 font-semibold text-gray-600 hover:text-teal-600 border-b-2 border-transparent transition-colors" data-tab="screenshots-${projectId}">
                            Screenshots
                        </button>
                    ` : ''}
                </div>

                <!-- Tab Content -->
                <div class="tab-content-container">
                    ${project.desktopVideo ? `
                        <!-- Desktop Video Tab -->
                        <div id="desktop-${projectId}" class="tab-content active">
                            <div class="w-full aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                                <video autoplay loop muted playsinline class="w-full h-full object-cover">
                                    <source src="${project.desktopVideo}" type="video/webm">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <p class="text-sm text-gray-500 mt-3 text-center">Full desktop experience • 1920x1080</p>
                        </div>
                    ` : ''}
                    
                    ${project.mobileVideo ? `
                        <!-- Mobile Video Tab -->
                        <div id="mobile-${projectId}" class="tab-content" style="display: none;">
                            <div class="flex justify-center">
                                <div class="relative" style="width: 375px;">
                                    <!-- Phone Frame -->
                                    <div class="bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                                        <div class="bg-black rounded-[2.5rem] overflow-hidden" style="aspect-ratio: 375/812;">
                                            <video autoplay loop muted playsinline class="w-full h-full object-cover">
                                                <source src="${project.mobileVideo}" type="video/webm">
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p class="text-sm text-gray-500 mt-3 text-center">Mobile experience • 375x812</p>
                        </div>
                    ` : ''}
                    
                    ${project.screenshots ? `
                        <!-- Screenshots Tab -->
                        <div id="screenshots-${projectId}" class="tab-content" style="display: none;">
                            <div class="grid md:grid-cols-2 gap-6">
                                ${project.screenshots.map(screenshot => `
                                    <div class="space-y-3">
                                        <div class="border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                            <img src="${screenshot.image}" alt="${screenshot.title}" class="w-full">
                                        </div>
                                        <div>
                                            <p class="font-semibold text-gray-900">${screenshot.title}</p>
                                            <p class="text-sm text-gray-600">${screenshot.description}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
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
                <a href="index.html#contact" class="px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-lg">
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

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
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