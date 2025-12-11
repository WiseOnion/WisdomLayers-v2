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
        cardImage: `${assetsPath}/images/miles2wisdom/m2w-card.png`,
        desktopVideo: `${assetsPath}/images/miles2wisdom/m2w-desktop-demo.webm`,
        mobileVideo: `${assetsPath}/images/miles2wisdom/m2w-mobile-demo.webm`,
        screenshots: [
            {
                title: "Booking System",
                image: `${assetsPath}/images/miles2wisdom/m2w-booking.png`,
                description: "Self-service appointment scheduling"
            },
            {
                title: "Meet the Team",
                image: `${assetsPath}/images/miles2wisdom/m2w-teams.png`,
                description: "Therapist profiles and credentials"
            },
            {
                title: "Services Page",
                image: `${assetsPath}/images/miles2wisdom/m2w-services.png`,
                description: "Detailed service offerings"
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
        link: "#",
        cardImage: `${assetsPath}/images/pjpressure/pj-card.png`,
        desktopVideo: `${assetsPath}/images/pjpressure/pj-desktop-demo.webm`,
        mobileVideo: `${assetsPath}/images/pjpressure/pj-mobile-demo.webm`,
        screenshots: [
            {
                title: "Service Areas",
                image: `${assetsPath}/images/pjpressure/pj-areas.png`,
                description: "Service area coverage map"
            },
            {
                title: "About",
                image: `${assetsPath}/images/pjpressure/pj-about.png`,
                description: "About PJ Pressure"
            },
            {
                title: "Gallery",
                image: `${assetsPath}/images/pjpressure/pj-gallery.png`,
                description: "Before/after gallery"
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