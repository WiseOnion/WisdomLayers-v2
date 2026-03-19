// Project cards and modal functionality

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeProjectCards();
});

function initializeProjectCards() {
    // Get all project cards
    const projectCards = document.querySelectorAll('.project-card');

    // Add click event listeners to each project card
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectKey = this.getAttribute('data-project');
            openProjectModal(projectKey);
        });
    });

    // Add modal close functionality
    setupModalClose();
}


function generateModalContent(project) {
    // Handle placeholder projects
    if (!project.title || project.title === 'Coming Soon') {
        return `
            <button class="modal-close" onclick="closeProjectModal()">×</button>
            <div class="modal-details">
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <p>Check back soon for updates!</p>
            </div>
        `;
    }

    // Generate screenshot browser with Desktop / Mobile tabs
    let screenshotsHtml = '';
    if (project.screenshots && project.screenshots.length > 0) {
        const first = project.screenshots[0];

        const desktopNavItems = project.screenshots.map((s, i) => `
            <div class="sshot-nav-item ${i === 0 ? 'active' : ''}" onclick="changeModalScreenshot(${i}, 'desktop')">
                <img src="${s.thumb || s.desktop}" alt="${s.title}" class="sshot-nav-thumb">
                <span class="sshot-nav-label">${s.title}</span>
            </div>
        `).join('');

        const mobileNavItems = project.screenshots.map((s, i) => `
            <div class="sshot-nav-item ${i === 0 ? 'active' : ''}" onclick="changeModalScreenshot(${i}, 'mobile')">
                <img src="${s.thumb || s.mobile}" alt="${s.title}" class="sshot-nav-thumb">
                <span class="sshot-nav-label">${s.title}</span>
            </div>
        `).join('');

        screenshotsHtml = `
            <div class="sshot-view-tabs">
                <button class="sshot-view-tab active" onclick="switchViewTab('desktop')" id="viewTabDesktop">Desktop View</button>
                <button class="sshot-view-tab" onclick="switchViewTab('mobile')" id="viewTabMobile">Mobile View</button>
            </div>

            <div class="sshot-browser">

                <!-- Desktop panel -->
                <div class="sshot-panel" id="sshotPanelDesktop">
                    <div class="sshot-panel-inner">
                        <div class="sshot-sidenav">${desktopNavItems}</div>
                        <div class="sshot-panel-main">
                            <div class="sshot-desktop-frame">
                                <div class="sshot-desktop-bar"><span></span><span></span><span></span></div>
                                <div class="sshot-desktop-screen" id="sshotDesktopScreen">
                                    <img id="sshotDesktopImg" src="${first.desktop}" alt="${first.title} desktop" onclick="window.open('${project.link}', '_blank')">
                                </div>
                            </div>
                            <p class="sshot-caption">Desktop experience · 1920×1080 · <a href="${project.link}" target="_blank" rel="noopener noreferrer">Click screenshot to visit live site</a></p>
                        </div>
                    </div>
                </div>

                <!-- Mobile panel -->
                <div class="sshot-panel sshot-panel--hidden" id="sshotPanelMobile">
                    <div class="sshot-panel-inner">
                        <div class="sshot-sidenav">${mobileNavItems}</div>
                        <div class="sshot-panel-main sshot-panel-main--centered">
                            <button class="sshot-scroll-btn" aria-label="Scroll up"
                                onmousedown="startScrollHold('sshotPhoneScreen', -8)" onmouseup="stopScrollHold()" onmouseleave="stopScrollHold()"
                                ontouchstart="startScrollHold('sshotPhoneScreen', -8)" ontouchend="stopScrollHold()">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                            </button>
                            <div class="sshot-phone">
                                <div class="sshot-phone-notch"></div>
                                <div class="sshot-phone-screen" id="sshotPhoneScreen">
                                    <img id="sshotMobileImg" src="${first.mobile}" alt="${first.title} mobile" onclick="window.open('${project.link}', '_blank')">
                                </div>
                                <div class="sshot-phone-home"></div>
                            </div>
                            <button class="sshot-scroll-btn" aria-label="Scroll down"
                                onmousedown="startScrollHold('sshotPhoneScreen', 8)" onmouseup="stopScrollHold()" onmouseleave="stopScrollHold()"
                                ontouchstart="startScrollHold('sshotPhoneScreen', 8)" ontouchend="stopScrollHold()">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                            </button>
                            <p class="sshot-caption">Mobile experience · 375×812 · <a href="${project.link}" target="_blank" rel="noopener noreferrer">Click screenshot to visit live site</a></p>
                        </div>
                    </div>
                </div>

            </div>
        `;
    }

    return `
        <button class="modal-close" onclick="closeProjectModal()">&times;</button>

        <div style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 2rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem;">${project.title}</h2>
            <p style="font-size: 1.25rem; color: #4b5563; margin-bottom: 1rem;">${project.tagline}</p>
            ${project.link && project.link !== '#' ? `
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; color: #0d9488; font-weight: 600; text-decoration: none; font-size: 1rem;">
                    Visit Live Site
                    <svg style="width:1.25rem;height:1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
            ` : ''}
        </div>

        ${screenshotsHtml}

        <div style="display: flex; flex-direction: column; gap: 2rem; margin-top: 2rem;">

            <div>
                <h3 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 1rem;">About This Project</h3>
                <p style="color: #4b5563; line-height: 1.7; margin-bottom: 1.5rem;">${project.description}</p>

                ${project.problem ? `
                <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 1.5rem; margin-bottom: 1rem; border-radius: 0 0.5rem 0.5rem 0;">
                    <p style="font-weight: 600; color: #7f1d1d; margin-bottom: 0.5rem;">The Challenge</p>
                    <p style="color: #991b1b;">${project.problem}</p>
                </div>
                ` : ''}

                ${project.solution ? `
                <div style="background: #f0fdfa; border-left: 4px solid #0d9488; padding: 1.5rem; border-radius: 0 0.5rem 0.5rem 0;">
                    <p style="font-weight: 600; color: #134e4a; margin-bottom: 0.5rem;">The Solution</p>
                    <p style="color: #0f766e;">${project.solution}</p>
                </div>
                ` : ''}
            </div>

            ${project.features ? `
            <div>
                <h3 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 1rem;">Key Features</h3>
                <ul style="display: flex; flex-direction: column; gap: 0.75rem;">
                    ${project.features.map(f => `
                        <li style="display: flex; align-items: flex-start; gap: 0.75rem; color: #4b5563;">
                            <svg style="width:1.5rem;height:1.5rem;color:#0d9488;flex-shrink:0;margin-top:0.125rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            <span>${f}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            ` : ''}

            ${project.results ? `
            <div>
                <h3 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 1rem;">Results &amp; Impact</h3>
                <ul style="display: flex; flex-direction: column; gap: 0.75rem;">
                    ${project.results.map(r => `
                        <li style="display: flex; align-items: flex-start; gap: 0.75rem; color: #4b5563;">
                            <svg style="width:1.5rem;height:1.5rem;color:#0d9488;flex-shrink:0;margin-top:0.125rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>${r}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            ` : ''}

            ${project.testimonial ? `
            <div style="background: linear-gradient(135deg, #f0fdfa, #ccfbf1); border-radius: 0.75rem; padding: 2rem; border: 1px solid #99f6e4;">
                <svg style="width:2.5rem;height:2.5rem;color:#0d9488;margin-bottom:1rem;" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                <p style="color: #1f2937; font-size: 1.125rem; font-style: italic; margin-bottom: 1rem; line-height: 1.7;">"${project.testimonial.text}"</p>
                <p style="color: #4b5563; font-weight: 600;">— ${project.testimonial.author}</p>
            </div>
            ` : ''}

            ${project.tech ? `
            <div>
                <h3 style="font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 1rem;">Technologies Used</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${project.tech.map(t => `<span style="padding: 0.5rem 1rem; background: #f3f4f6; color: #374151; border-radius: 9999px; font-size: 0.875rem; font-weight: 500;">${t}</span>`).join('')}
                </div>
            </div>
            ` : ''}

            <div style="display: flex; justify-content: flex-end; padding-top: 1.5rem; border-top: 1px solid #e5e7eb;">
                <a href="/#contact" style="padding: 0.75rem 2rem; background: #0d9488; color: white; border-radius: 0.5rem; text-decoration: none; font-weight: 600; font-size: 1.125rem;">
                    Start Your Project
                </a>
            </div>

        </div>
    `;
}

function scrollScreen(id, amount) {
    const el = document.getElementById(id);
    if (el) el.scrollBy({ top: amount, behavior: 'smooth' });
}

let _scrollHoldInterval = null;
function startScrollHold(id, step) {
    stopScrollHold();
    const el = document.getElementById(id);
    if (!el) return;
    // Immediate first scroll on click
    el.scrollBy({ top: step * 20, behavior: 'smooth' });
    // Then continuous scroll while held
    _scrollHoldInterval = setInterval(() => {
        el.scrollBy({ top: step, behavior: 'auto' });
    }, 16);
}
function stopScrollHold() {
    if (_scrollHoldInterval) {
        clearInterval(_scrollHoldInterval);
        _scrollHoldInterval = null;
    }
}

function switchViewTab(view) {
    const desktopPanel = document.getElementById('sshotPanelDesktop');
    const mobilePanel  = document.getElementById('sshotPanelMobile');
    const desktopTab   = document.getElementById('viewTabDesktop');
    const mobileTab    = document.getElementById('viewTabMobile');
    if (!desktopPanel) return;

    if (view === 'desktop') {
        desktopPanel.classList.remove('sshot-panel--hidden');
        mobilePanel.classList.add('sshot-panel--hidden');
        desktopTab.classList.add('active');
        mobileTab.classList.remove('active');
    } else {
        mobilePanel.classList.remove('sshot-panel--hidden');
        desktopPanel.classList.add('sshot-panel--hidden');
        mobileTab.classList.add('active');
        desktopTab.classList.remove('active');
    }
}

function changeModalScreenshot(index, view) {
    const projectKey = getCurrentProjectKey();
    const project = projectData[projectKey];
    const screenshot = project.screenshots[index];

    if (view === 'desktop') {
        const img = document.getElementById('sshotDesktopImg');
        if (img) { img.src = screenshot.desktop; img.alt = screenshot.title + ' desktop'; }
        const screen = document.getElementById('sshotDesktopScreen');
        if (screen) screen.scrollTop = 0;
    } else {
        const img = document.getElementById('sshotMobileImg');
        if (img) { img.src = screenshot.mobile; img.alt = screenshot.title + ' mobile'; }
        const screen = document.getElementById('sshotPhoneScreen');
        if (screen) screen.scrollTop = 0;
    }

    // Update active state only within the matching panel
    const panelId = view === 'desktop' ? 'sshotPanelDesktop' : 'sshotPanelMobile';
    const panel = document.getElementById(panelId);
    if (panel) {
        panel.querySelectorAll('.sshot-nav-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }
}

function getCurrentProjectKey() {
    // This is a bit hacky, but we need to determine which project is currently open
    // We can do this by checking which modal content is currently displayed
    // For now, let's add a data attribute to the modal when opening
    const modal = document.getElementById('projectModal');
    return modal.getAttribute('data-current-project');
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');

    // Hide modal
    modal.classList.remove('active');

    // Restore body scroll
    document.body.style.overflow = '';
}

function setupModalClose() {
    // Close modal when clicking outside
    const modal = document.getElementById('projectModal');
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeProjectModal();
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (modal.classList.contains('active')) {
                closeProjectModal();
            }
        }
    });
}

// Update the openProjectModal function to set the current project key
function openProjectModal(projectKey) {
    // Check if project data exists
    if (!projectData[projectKey]) {
        console.error('Project data not found for:', projectKey);
        return;
    }

    const project = projectData[projectKey];
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');

    // Set current project key for screenshot navigation
    modal.setAttribute('data-current-project', projectKey);

    // Generate modal content
    const content = generateModalContent(project);

    // Set modal content
    modalContent.innerHTML = content;

    // Show modal
    modal.classList.add('active');

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}
