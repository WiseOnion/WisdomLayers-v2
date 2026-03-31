// Project data for WisdomLayers portfolio
// Dynamic path resolution based on current page location

// Detect if we're on the root page or in a subdirectory
const isSubdirectory = window.location.pathname.includes('/html/');
const assetsPath = isSubdirectory ? '../assets' : 'assets';

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
        cardImage: `${assetsPath}/images/miles2wisdom/m2w-home-card.webp`,
        desktopVideo: `${assetsPath}/images/miles2wisdom/m2w-desktop-demo.webm`,
        mobileVideo: `${assetsPath}/images/miles2wisdom/m2w-mobile-demo.webm`,
        screenshots: [
            {
                title: "Home",
                thumb: `${assetsPath}/images/miles2wisdom/m2w-home-card.webp`,
                desktop: `${assetsPath}/images/miles2wisdom/m2w-home-desktop.webp`,
                mobile: `${assetsPath}/images/miles2wisdom/m2w-home-mobile.webp`
            },
            {
                title: "Booking System",
                thumb: `${assetsPath}/images/miles2wisdom/m2w-booking-card.webp`,
                desktop: `${assetsPath}/images/miles2wisdom/m2w-booking-desktop.webp`,
                mobile: `${assetsPath}/images/miles2wisdom/m2w-booking-mobile.webp`
            },
            {
                title: "Meet the Team",
                thumb: `${assetsPath}/images/miles2wisdom/m2w-team-card.webp`,
                desktop: `${assetsPath}/images/miles2wisdom/m2w-team-desktop.webp`,
                mobile: `${assetsPath}/images/miles2wisdom/m2w-team-mobile.webp`
            },
            {
                title: "Services Page",
                thumb: `${assetsPath}/images/miles2wisdom/m2w-services-card.webp`,
                desktop: `${assetsPath}/images/miles2wisdom/m2w-services-desktop.webp`,
                mobile: `${assetsPath}/images/miles2wisdom/m2w-services-mobile.webp`
            }
        ]
    },
    pjpressure: {
        title: "PJ Pressure",
        tagline: "Professional Pressure Washing Services",
        description: "A professional website for PJ Pressure Washing, serving residential and commercial clients in Fayetteville, NC, and surrounding areas. Before this site, PJ Pressure had a website that contained all the right information but looked outdated, unprofessional, and wasn't mobile-friendly. The owner felt embarrassed to show it to potential clients because it didn't reflect the quality of the work. Customers had to call or text to request services, and there was no centralized, trustworthy online presence.",
        problem: "The old website didn't inspire confidence or professionalism. It was hard to navigate on mobile devices, and it didn't allow PJ Pressure to showcase the quality of their work visually. Without a polished online presence, potential clients were missing the chance to see why PJ Pressure was the best choice.",
        solution: "A modern, mobile-responsive website featuring: Full service showcase, Interactive before/after slider gallery to demonstrate the dramatic results of completed projects, Online quote request system, Clear service area coverage map, Customer testimonials to build trust. The site allows PJ Pressure to confidently present the business, generate leads online, and showcase work in a professional, visual way.",
        features: [
            "Modern service showcase with descriptions and pricing",
            "Before/after slider gallery that lets users slide between 'before' and 'after' images to see the transformation",
            "Online quote system for easy lead capture",
            "Service area map for local clarity",
            "Customer testimonial section to establish trust",
            "Click-to-call integration and contact forms",
            "Fully responsive design for mobile and desktop",
            "SEO-friendly structure for better local search visibility"
        ],
        results: [
            "Significant increase in weekly quote requests after website launch",
            "Stronger, more professional brand image",
            "Easier customer engagement and smoother booking process",
            "Confidently showcase the business publicly",
            "Competitive advantage over other local pressure washing companies in the area"
        ],
        testimonial: {
            text: "Before the new website, I felt embarrassed to show people our old site. Now, it truly reflects the professionalism of our business. The before/after gallery is amazing—customers can see our work in action, and we're getting calls we never would have before.",
            author: "PJ Pressure Owner"
        },
        tech: ["HTML/CSS", "JavaScript", "Interactive before/after slider", "Fully responsive design", "Online quote forms and contact integration", "Local SEO optimization"],
        link: "https://pjpressurewash.com",
        cardImage: `${assetsPath}/images/pjpressure/pj-home-card.webp`,
        desktopVideo: `${assetsPath}/images/pjpressure/pj-desktop-demo.webm`,
        mobileVideo: `${assetsPath}/images/pjpressure/pj-mobile-demo.webm`,
        screenshots: [
            {
                title: "Home",
                desktop: `${assetsPath}/images/pjpressure/pj-home-desktop.webp`,
                mobile: `${assetsPath}/images/pjpressure/pj-home-mobile.webp`
            },
            {
                title: "Service Areas",
                desktop: `${assetsPath}/images/pjpressure/pj-areas-desktop.webp`,
                mobile: `${assetsPath}/images/pjpressure/pj-areas-mobile.webp`
            },
            {
                title: "About",
                desktop: `${assetsPath}/images/pjpressure/pj-about-desktop.webp`,
                mobile: `${assetsPath}/images/pjpressure/pj-about-mobile.webp`
            },
            {
                title: "Gallery",
                desktop: `${assetsPath}/images/pjpressure/pj-gallery-desktop.webp`,
                mobile: `${assetsPath}/images/pjpressure/pj-gallery-mobile.webp`
            }
        ]
    },
    triplenickle: {
        title: "Triple Nickle",
        tagline: "Honoring America's First Black Paratroopers",
        description: "A full multi-page website for the Samuel Council Chapter 555th of the Parachute Infantry Association — a historical and community organization based in Fayetteville, NC dedicated to honoring the legacy of America's first Black paratroopers. The site brings their story, events, scholarship programs, and membership together in one dignified, professional online presence.",
        problem: "The organization had no central website to share their history, promote events, accept donations, or manage membership — making it hard to grow their community and honor their mission digitally.",
        solution: "A full multi-page site with a rich historical timeline, event listings, scholarship and donation pages, membership sign-up, and a blog — built with a gold and navy color palette that reflects the dignity and legacy of the organization.",
        features: [
            "Full historical timeline with photos and animations",
            "Events page with upcoming extravaganza listings",
            "Scholarship program page",
            "Online donation page",
            "Membership sign-up page",
            "Blog for news and updates",
            "Fully responsive design"
        ],
        results: null,
        testimonial: null,
        tech: ["HTML/CSS", "JavaScript", "Responsive Design", "Animation System"],
        link: null,
        cardImage: `${assetsPath}/images/triplenickle/tn-home-card.webp`,
        desktopVideo: null,
        mobileVideo: null,
        screenshots: [
            {
                title: "Home",
                thumb: `${assetsPath}/images/triplenickle/tn-home-card.webp`,
                desktop: `${assetsPath}/images/triplenickle/tn-home-desktop.webp`,
                mobile: `${assetsPath}/images/triplenickle/tn-home-mobile.webp`
            },
            {
                title: "About",
                thumb: `${assetsPath}/images/triplenickle/tn-about-card.webp`,
                desktop: `${assetsPath}/images/triplenickle/tn-about-desktop.webp`,
                mobile: `${assetsPath}/images/triplenickle/tn-about-mobile.webp`
            },
            {
                title: "Events",
                thumb: `${assetsPath}/images/triplenickle/tn-events-card.webp`,
                desktop: `${assetsPath}/images/triplenickle/tn-events-desktop.webp`,
                mobile: `${assetsPath}/images/triplenickle/tn-events-mobile.webp`
            },
            {
                title: "Membership",
                thumb: `${assetsPath}/images/triplenickle/tn-membership-card.webp`,
                desktop: `${assetsPath}/images/triplenickle/tn-membership-desktop.webp`,
                mobile: `${assetsPath}/images/triplenickle/tn-membership-mobile.webp`
            }
        ]
    },
    ncrmpa1: {
        title: "NC Retired Military Police",
        tagline: "Chapter One — Service, Honor & Brotherhood",
        description: "A professional multi-page website for the Retired Military Police Association Chapter One, based in Fayetteville, NC. The site unites retired military police in a shared online home — covering membership, events, and the organization's mission of continued service and brotherhood after active duty.",
        problem: "The chapter had no dedicated website to represent their organization, communicate with members, or attract new ones — leaving a gap between the professionalism of the members and their digital presence.",
        solution: "A full multi-page site with a strong military aesthetic — navy, gold, and clean typography — featuring membership sign-up, events listings, an about page, and a professional header system with dropdown navigation.",
        features: [
            "Full hero section with Ken Burns animation",
            "Dropdown navigation with mobile hamburger menu",
            "Membership sign-up page",
            "Events page",
            "About page",
            "Fully responsive design"
        ],
        results: null,
        testimonial: null,
        tech: ["HTML/CSS", "JavaScript", "Responsive Design", "Animation System"],
        link: null,
        cardImage: `${assetsPath}/images/ncrmpa1/ncrmpa-home-card.webp`,
        desktopVideo: null,
        mobileVideo: null,
        screenshots: [
            {
                title: "Home",
                thumb: `${assetsPath}/images/ncrmpa1/ncrmpa-home-card.webp`,
                desktop: `${assetsPath}/images/ncrmpa1/ncrmpa-home-desktop.webp`,
                mobile: `${assetsPath}/images/ncrmpa1/ncrmpa-home-mobile.webp`
            },
            {
                title: "About",
                thumb: `${assetsPath}/images/ncrmpa1/ncrmpa-about-card.webp`,
                desktop: `${assetsPath}/images/ncrmpa1/ncrmpa-about-desktop.webp`,
                mobile: `${assetsPath}/images/ncrmpa1/ncrmpa-about-mobile.webp`
            },
            {
                title: "Events",
                thumb: `${assetsPath}/images/ncrmpa1/ncrmpa-events-card.webp`,
                desktop: `${assetsPath}/images/ncrmpa1/ncrmpa-events-desktop.webp`,
                mobile: `${assetsPath}/images/ncrmpa1/ncrmpa-events-mobile.webp`
            },
            {
                title: "Membership",
                thumb: `${assetsPath}/images/ncrmpa1/ncrmpa-membership-card.webp`,
                desktop: `${assetsPath}/images/ncrmpa1/ncrmpa-membership-desktop.webp`,
                mobile: `${assetsPath}/images/ncrmpa1/ncrmpa-membership-mobile.webp`
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