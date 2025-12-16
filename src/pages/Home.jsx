import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const featuredProperties = [
        {
            id: 1,
            title: "Paton Tower",
            address: "Kandivali East, lokhandwala",
            image: "https://patonconstructions.in/patontowers/images/img2.jpg"
        },
        {
            id: 2,
            title: "Godrej Nest Tower",
            address: "Kandivali East, lokhandwala",
            image: "https://cdn.blox.xyz/projects-2x/godrej-properties-godrej-nest-1746534958.jpg"
        },
        {
            id: 3,
            title: "UK Tower",
            address: "Kandivali East, hanuman nagar",
            image: "https://www.ukrealty.in/project/luxecity-kandivali/img/about-us.jpg"
        },
        {
            id: 4,
            title: "Mahindra Vista",
            address: "Kandivali East, damungar",
            image: "https://projectvista-kandivali.in/public/admin/images/1708101584.jpg"
        },
        {
            id: 5,
            title: "Aarambh Tower",
            address: "Gandhi Nagar, Malad East, Mumbai, 400097",
            image: "https://www.jllhomes.co.in/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fjll-global-gdim%2Fimage%2Fupload%2FIN%2FHorizon%2FResi%2FProd%2FJLL_Mum_Aarambh_273_EXT_primary.jpg&w=3840&q=75"
        },
        {
            id: 6,
            title: "Lodha Wood",
            address: "Akurli Road, dhamunagar, kandivali east",
            image: "https://wealthcreatorsheights.com/uploads/file-manager/lodha-wood.webp"
        }
    ];

<<<<<<< Updated upstream
    const services = [
        {
            icon: "🏠",
            title: "Home Sales",
            description: "Luxury residential and commercial properties",
            link: "/properties",
            linkText: "Contact Agent"
        },
        {
            icon: "💰",
            title: "Home Buy",
            description: "Prime real estate investment opportunities",
            link: "/properties",
            linkText: "View Properties"
        },
        {
            icon: "👨‍💼",
            title: "Home Rent",
            description: "Expert real estate advisory services",
            link: "/contactagent",
            linkText: "Contact Agent"
        },
    ];
=======
const services = [
    {
        icon: "🏠",
        title: "Home Sales",
        description: "Luxury residential and commercial properties",
        link: "/contactagent",
        linkText: "Contact Agent"
    },
    {
        icon: "💰",
        title: "Home Buy",
        description: "Prime real estate investment opportunities",
        link: "/properties",
        linkText: "View Properties"
    },
    {
        icon: "👨‍💼",
        title: "Home Rent",
        description: "Expert real estate advisory services",
        link: "/contactagent",
        linkText: "Contact Agent"
    },
];
>>>>>>> Stashed changes

    const locations = [
        { name: "MUMBAI", properties: 124 }
       
    ];

    const interiorServices = [
        {
            icon: "🎨",
            title: "Interior Design",
            description: "Custom interior design solutions for residential and commercial spaces",
            image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400",
            link: "/interior",
            linkText: "View Projects"
        },
        {
            icon: "🛋️",
            title: "Furniture & Decor",
            description: "Premium furniture selection and decorative accessories",
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
            link: "/interior",
            linkText: "Explore Designs"
        },
        {
            icon: "🏗️",
            title: "Space Planning",
            description: "Optimize your space with expert layout and planning",
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400",
            link: "/interior",
            linkText: "Learn More"
        },
        {
            icon: "💡",
            title: "Lighting Design",
            description: "Custom lighting solutions to enhance your space",
            image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400",
            link: "/interior",
            linkText: "View Solutions"
        }
    ];

    const interiorProjects = [
        {
            id: 1,
            title: "Modern Apartment Redesign",
            type: "Residential",
            area: "2,400 sq. ft.",
            location: "New York, NY",
            image: "https://images.unsplash.com/photo-1615529162924-f8605388467e?w=400"
        },
        {
            id: 2,
            title: "Luxury Villa Interior",
            type: "Villa",
            area: "5,200 sq. ft.",
            location: "Miami, FL",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"
        },
        {
            id: 3,
            title: "Office Space Transformation",
            type: "Commercial",
            area: "8,000 sq. ft.",
            location: "Chicago, IL",
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400"
        },
        {
            id: 4,
            title: "Boutique Hotel Design",
            type: "Hospitality",
            area: "15,000 sq. ft.",
            location: "Los Angeles, CA",
            image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400"
        }
    ];

    const interiorBenefits = [
        {
            icon: "✓",
            title: "Custom Designs",
            description: "Tailored to your style and preferences"
        },
        {
            icon: "✓",
            title: "Expert Team",
            description: "Certified interior designers and architects"
        },
        {
            icon: "✓",
            title: "Quality Materials",
            description: "Premium materials and finishes"
        },
        {
            icon: "✓",
            title: "Timely Delivery",
            description: "Projects completed on schedule"
        }
    ];

    const interiorServices = [
        {
            icon: "🎨",
            title: "Interior Design",
            description: "Custom interior design solutions for residential and commercial spaces",
            image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400",
            link: "/interior",
            linkText: "View Projects"
        },
        {
            icon: "🛋️",
            title: "Furniture & Decor",
            description: "Premium furniture selection and decorative accessories",
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
            link: "/interior",
            linkText: "Explore Designs"
        },
        {
            icon: "🏗️",
            title: "Space Planning",
            description: "Optimize your space with expert layout and planning",
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400",
            link: "/interior",
            linkText: "Learn More"
        },
        {
            icon: "💡",
            title: "Lighting Design",
            description: "Custom lighting solutions to enhance your space",
            image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400",
            link: "/interior",
            linkText: "View Solutions"
        }
    ];

    const interiorProjects = [
        {
            id: 1,
            title: "Modern Apartment Redesign",
            type: "Residential",
            area: "2,400 sq. ft.",
            location: "New York, NY",
            image: "https://images.unsplash.com/photo-1615529162924-f8605388467e?w=400"
        },
        {
            id: 2,
            title: "Luxury Villa Interior",
            type: "Villa",
            area: "5,200 sq. ft.",
            location: "Miami, FL",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"
        },
        {
            id: 3,
            title: "Office Space Transformation",
            type: "Commercial",
            area: "8,000 sq. ft.",
            location: "Chicago, IL",
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400"
        },
        {
            id: 4,
            title: "Boutique Hotel Design",
            type: "Hospitality",
            area: "15,000 sq. ft.",
            location: "Los Angeles, CA",
            image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400"
        }
    ];

    const interiorBenefits = [
        {
            icon: "✓",
            title: "Custom Designs",
            description: "Tailored to your style and preferences"
        },
        {
            icon: "✓",
            title: "Expert Team",
            description: "Certified interior designers and architects"
        },
        {
            icon: "✓",
            title: "Quality Materials",
            description: "Premium materials and finishes"
        },
        {
            icon: "✓",
            title: "Timely Delivery",
            description: "Projects completed on schedule"
        }
    ];

    return (
        <div className="home-page">
            {/* Hero Section - Full Width */}
            <section className="home-hero-section home-full-width">
                {/* Background Images with Transition */}
<<<<<<< Updated upstream
                <div className="hero-background">
                    <div className="hero-slide active" style={{
=======
                <div className="home-hero-background">
                    <div className="home-hero-slide home-hero-slide-active" style={{
>>>>>>> Stashed changes
                        backgroundImage: `url('https://talatiandpartners.com/wp-content/uploads/2023/02/1980x870maison-de-weekend-Alibaug-copy-2new.webp')`
                    }}></div>
                    <div className="home-hero-slide" style={{
                        backgroundImage: `url('https://www.piramalmahalaxmi.com/wp-content/uploads/2023/02/this-luxury-apartment-is-truly-an-urban-oasis-in-mumbai.jpg')`
                    }}></div>
                    <div className="home-hero-slide" style={{
                        backgroundImage: `url('https://img.jamesedition.com/listing_images/2024/05/23/14/09/00/d21447e4-6342-4c8d-825f-fc0b63d46ab5/je/1100xxs.jpg')`
                    }}></div>
                    <div className="home-hero-slide" style={{
                        backgroundImage: `url('https://amazingarchitecture.com/storage/222/7030588_image9872.jpg')`
                    }}></div>
                    <div className="home-hero-slide" style={{
                        backgroundImage: `url('https://madscreations.in/wp-content/uploads/2024/03/Picture2.jpg')`
                    }}></div>
                    <div className="home-hero-slide" style={{
                        backgroundImage: `url('https://gos3.ibcdn.com/1ccb0092d79a11e9b9590242ac110003.png')`
                    }}></div>

                    {/* Gradient Overlay */}
                    <div className="home-hero-overlay"></div>

                    {/* Animated Shapes */}
                    <div className="home-hero-shapes">
                        <div className="home-hero-shape home-hero-shape-1"></div>
                        <div className="home-hero-shape home-hero-shape-2"></div>
                        <div className="home-hero-shape home-hero-shape-3"></div>
                        <div className="home-hero-shape home-hero-shape-4"></div>
                        <div className="home-hero-shape home-hero-shape-5"></div>
                        <div className="home-hero-shape home-hero-shape-6"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="home-hero-content">
                    <div className="home-hero-text-wrapper home-container">
                        {/* Animated Badge */}
                        <div className="home-hero-badge">
                            <span>LUXURY COLLECTION</span>
                        </div>

                        {/* Main Title with Animation */}
                        <h1 className="home-hero-title">
                            <span className="home-title-line">FIND YOUR</span>
                            <span className="home-title-line home-highlight">DREAM HOME</span>
                        </h1>

                        {/* Subtitle with Typewriter Effect */}
                        <p className="home-hero-subtitle">
                            Exceptional properties in the world's most desirable locations
                        </p>

                        {/* Buttons with Hover Effects */}
                        <div className="home-hero-buttons">
                            <Link to="/properties" className="home-btn home-btn-primary home-btn-glow">
                                <span className="home-btn-text">BROWSE PROPERTIES</span>
                                <div className="home-btn-hover-effect"></div>
                            </Link>
                            <Link to="/contactagent" className="home-btn home-btn-secondary home-btn-border">
                                <span className="home-btn-text">CONTACT AGENT</span>
                                <div className="home-btn-hover-effect"></div>
                            </Link>
                            <Link to="/interior" className="home-btn home-btn-tertiary">
                                <span className="home-btn-text">INTERIOR DESIGN</span>
                            </Link>
                            <Link to="/interior" className="btn btn-tertiary">
                                <span className="btn-text">INTERIOR DESIGN</span>
                            </Link>
                        </div>

                        {/* Quick Stats */}
                        <div className="home-hero-stats">
                            <div className="home-stat">
                                <span className="home-stat-number">500+</span>
                                <span className="home-stat-label">Properties</span>
                            </div>
<<<<<<< Updated upstream
                            <div className="stat">
                                <span className="stat-number">200+</span>
                                <span className="stat-label">Interior Projects</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Locations</span>
=======
                            <div className="home-stat">
                                <span className="home-stat-number">200+</span>
                                <span className="home-stat-label">Interior Projects</span>
>>>>>>> Stashed changes
                            </div>
                            <div className="home-stat">
                                <span className="home-stat-number">50+</span>
                                <span className="home-stat-label">Locations</span>
                            </div>
                            <div className="home-stat">
                                <span className="home-stat-number">15+</span>
                                <span className="home-stat-label">Years</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator with Animation */}
                <div className="home-hero-scroll-indicator">
                    <div className="home-scroll-arrow">
                        <div className="home-scroll-arrow-inner"></div>
                    </div>
                    <span>SCROLL TO EXPLORE</span>
                </div>
            </section>

            {/* Quick Navigation - Full Width */}
            <section className="home-quick-nav-section home-full-width">
                <div className="home-quick-nav-grid home-container">
                    <Link to="/properties" className="home-quick-nav-item">
                        <span className="home-quick-nav-number">250+</span>
                        <span className="home-quick-nav-label">OUR PROPERTIES</span>
                    </Link>
<<<<<<< Updated upstream
                    <Link to="/interior" className="quick-nav-item">
                        <span className="quick-nav-number">200+</span>
                        <span className="quick-nav-label">INTERIOR PROJECTS</span>
                    </Link>
                    <Link to="/buyers" className="quick-nav-item">
                        <span className="quick-nav-number">1,200+</span>
                        <span className="quick-nav-label">SATISFIED CLIENTS</span>
                    </Link>
                    <Link to="/sellers" className="quick-nav-item">
                        <span className="quick-nav-number">890+</span>
                        <span className="quick-nav-label">PARTNERS</span>
=======
                    <Link to="/interior" className="home-quick-nav-item">
                        <span className="home-quick-nav-number">200+</span>
                        <span className="home-quick-nav-label">INTERIOR PROJECTS</span>
                    </Link>
                    <Link to="/buyers" className="home-quick-nav-item">
                        <span className="home-quick-nav-number">1,200+</span>
                        <span className="home-quick-nav-label">SATISFIED CLIENTS</span>
>>>>>>> Stashed changes
                    </Link>
                    <Link to="/sellers" className="home-quick-nav-item">
                        <span className="home-quick-nav-number">890+</span>
                        <span className="home-quick-nav-label">PARTNERS</span>
                    </Link>
<<<<<<< Updated upstream
                    <Link to="/about" className="quick-nav-item">
                        <span className="quick-nav-number">25+</span>
                        <span className="quick-nav-label">DESIGN AWARDS</span>
                    </Link>
                    <Link to="/contactagent" className="quick-nav-item">
                        <span className="quick-nav-label">BOOK CONSULTATION</span>
                    </Link>
                    <div className="quick-nav-brand">
                        <span className="brand-name">DREAMPRO</span>
                        <span className="brand-tagline">REAL ESTATE & INTERIOR</span>
=======
                    <Link to="/property-types" className="home-quick-nav-item">
                        <span className="home-quick-nav-number">15+</span>
                        <span className="home-quick-nav-label">PROPERTY TYPES</span>
                    </Link>
                    <Link to="/about" className="home-quick-nav-item">
                        <span className="home-quick-nav-number">25+</span>
                        <span className="home-quick-nav-label">DESIGN AWARDS</span>
                    </Link>
                    <Link to="/Bookivisitt" className="home-quick-nav-item">
                        <span className="home-quick-nav-label">BOOK CONSULTATION</span>
                    </Link>
                    <div className="home-quick-nav-brand">
                        <span className="home-brand-name">DREAMPROSPACES</span>
                        <span className="home-brand-tagline">REAL ESTATE & INTERIOR</span>
>>>>>>> Stashed changes
                    </div>
                </div>
            </section>

            {/* Featured Properties - Regular Container */}
            <section className="home-section home-properties-section">
                <div className="home-container">
                    <div className="home-section-header">
                        <h2 className="home-section-title">FEATURED PROPERTIES</h2>
                        <p className="home-section-subtitle">
                            Handpicked selection of premium properties
                        </p>
                    </div>

                    <div className="home-properties-grid">
                        {featuredProperties.map(property => (
                            <div key={property.id} className="home-property-card">
                                <div className="home-property-image">
                                    <img src={property.image} alt={property.title} />
<<<<<<< Updated upstream
                                    <div className="property-overlay">
                                        <Link to={`/property/${property.id}`} className="btn-view-details">
=======
                                    <div className="home-property-overlay">
                                        <Link to={`/property/${property.id}`} className="home-btn-view-details">
>>>>>>> Stashed changes
                                            VIEW DETAILS
                                        </Link>
                                    </div>
                                </div>
<<<<<<< Updated upstream
                                <div className="property-content">
                                    <h3 className="property-title">{property.title}</h3>
                                    <p className="property-address">{property.address}</p>
                                    <Link to="/contactagent" className="property-consult-btn">
=======
                                <div className="home-property-content">
                                    <h3 className="home-property-title">{property.title}</h3>
                                    <p className="home-property-address">{property.address}</p>
                                    <Link to="/bookvisitt" className="home-property-consult-btn">
>>>>>>> Stashed changes
                                        BOOK CONSULTATION
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="home-section-footer">
                        <Link to="/properties" className="home-btn home-btn-outline">
                            VIEW ALL PROPERTIES
                        </Link>
                    </div>
                </div>
            </section>

            {/* Interior Work Section - Full Width */}
<<<<<<< Updated upstream
            <section className="interior-section full-width">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">INTERIOR DESIGN & RENOVATION</h2>
                        <p className="section-subtitle">
=======
            <section className="home-interior-section home-full-width">
                <div className="home-container">
                    <div className="home-section-header">
                        <h2 className="home-section-title">INTERIOR DESIGN & RENOVATION</h2>
                        <p className="home-section-subtitle">
>>>>>>> Stashed changes
                            Transform your space with our expert interior design services
                        </p>
                    </div>

<<<<<<< Updated upstream
                    <div className="interior-services-grid">
                        {interiorServices.map((service, index) => (
                            <div key={index} className="interior-service-card">
                                <div className="interior-service-image">
                                    <img src={service.image} alt={service.title} />
                                    <div className="service-icon-overlay">
                                        <span className="service-icon">{service.icon}</span>
                                    </div>
                                </div>
                                <div className="interior-service-content">
                                    <h3 className="interior-service-title">{service.title}</h3>
                                    <p className="interior-service-description">{service.description}</p>
                                    <Link to={service.link} className="interior-service-link">
=======
                    <div className="home-interior-services-grid">
                        {interiorServices.map((service, index) => (
                            <div key={index} className="home-interior-service-card">
                                <div className="home-interior-service-image">
                                    <img src={service.image} alt={service.title} />
                                    <div className="home-service-icon-overlay">
                                        <span className="home-service-icon">{service.icon}</span>
                                    </div>
                                </div>
                                <div className="home-interior-service-content">
                                    <h3 className="home-interior-service-title">{service.title}</h3>
                                    <p className="home-interior-service-description">{service.description}</p>
                                    <Link to={service.link} className="home-interior-service-link">
>>>>>>> Stashed changes
                                        {service.linkText} →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

<<<<<<< Updated upstream
                    <div className="interior-projects-showcase">
                        <div className="showcase-header">
                            <h3>RECENT INTERIOR PROJECTS</h3>
                            <Link to="/interior" className="view-all-link">
=======
                    <div className="home-interior-projects-showcase">
                        <div className="home-showcase-header">
                            <h3>RECENT INTERIOR PROJECTS</h3>
                            <Link to="/interior" className="home-view-all-link">
>>>>>>> Stashed changes
                                View All Projects →
                            </Link>
                        </div>
                        
<<<<<<< Updated upstream
                        <div className="projects-grid">
                            {interiorProjects.map(project => (
                                <div key={project.id} className="project-card">
                                    <div className="project-image">
                                        <img src={project.image} alt={project.title} />
                                        <div className="project-overlay">
                                            <span className="project-type">{project.type}</span>
                                            <span className="project-area">{project.area}</span>
                                        </div>
                                    </div>
                                    <div className="project-content">
                                        <h4 className="project-title">{project.title}</h4>
                                        <p className="project-location">{project.location}</p>
                                        <Link to={`/interior/project/${project.id}`} className="project-link">
=======
                        <div className="home-projects-grid">
                            {interiorProjects.map(project => (
                                <div key={project.id} className="home-project-card">
                                    <div className="home-project-image">
                                        <img src={project.image} alt={project.title} />
                                        <div className="home-project-overlay">
                                            <span className="home-project-type">{project.type}</span>
                                            <span className="home-project-area">{project.area}</span>
                                        </div>
                                    </div>
                                    <div className="home-project-content">
                                        <h4 className="home-project-title">{project.title}</h4>
                                        <p className="home-project-location">{project.location}</p>
                                        <Link to={`/interior/project/${project.id}`} className="home-project-link">
>>>>>>> Stashed changes
                                            View Project Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

<<<<<<< Updated upstream
                    <div className="interior-benefits">
                        <h3>Why Choose Our Interior Services?</h3>
                        <div className="benefits-grid">
                            {interiorBenefits.map((benefit, index) => (
                                <div key={index} className="benefit-item">
                                    <span className="benefit-icon">{benefit.icon}</span>
                                    <div className="benefit-content">
                                        <h4 className="benefit-title">{benefit.title}</h4>
                                        <p className="benefit-description">{benefit.description}</p>
=======
                    <div className="home-interior-benefits">
                        <h3>Why Choose Our Interior Services?</h3>
                        <div className="home-benefits-grid">
                            {interiorBenefits.map((benefit, index) => (
                                <div key={index} className="home-benefit-item">
                                    <span className="home-benefit-icon">{benefit.icon}</span>
                                    <div className="home-benefit-content">
                                        <h4 className="home-benefit-title">{benefit.title}</h4>
                                        <p className="home-benefit-description">{benefit.description}</p>
>>>>>>> Stashed changes
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

<<<<<<< Updated upstream
                    <div className="interior-cta">
                        <div className="cta-content">
                            <h3>Ready to Transform Your Space?</h3>
                            <p>Book a free consultation with our interior design experts</p>
                            <Link to="/contactagent" className="btn btn-primary">
=======
                    <div className="home-interior-cta">
                        <div className="home-cta-content">
                            <h3>Ready to Transform Your Space?</h3>
                            <p>Book a free consultation with our interior design experts</p>
                            <Link to="/bookvisitt" className="home-btn home-btn-primary">
>>>>>>> Stashed changes
                                BOOK FREE CONSULTATION
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Locations Section - Regular Container */}
            <section className="home-section home-locations-section">
                <div className="home-container">
                    <div className="home-section-header">
                        <h2 className="home-section-title">OUR MARKETS</h2>
                        <p className="home-section-subtitle">
                            Premier locations across the finest destinations
                        </p>
                    </div>

                    <div className="home-locations-grid">
                        {locations.map((location, index) => (
                            <div key={index} className="home-location-card">
                                <h3 className="home-location-name">{location.name}</h3>
                                <p className="home-location-count">{location.properties} Properties</p>
                                <Link to={`/properties?location=${location.name.toLowerCase()}`} className="home-location-link">
                                    EXPLORE →
                                </Link>
<<<<<<< Updated upstream
                                <Link to="/contactagent" className="location-consult-link">
=======
                                <Link to="/contactagent" className="home-location-consult-link">
>>>>>>> Stashed changes
                                    BOOK CONSULTATION
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section - Regular Container */}
            <section className="home-section home-services-section">
                <div className="home-container">
                    <div className="home-section-header">
                        <h2 className="home-section-title">OUR SERVICES</h2>
                        <p className="home-section-subtitle">
                            Comprehensive real estate solutions tailored to your needs
                        </p>
                    </div>

                    <div className="home-services-grid">
                        {services.map((service, index) => (
<<<<<<< Updated upstream
                            <div key={index} className="service-card">
                                <div className="service-icon">{service.icon}</div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                                <Link to={service.link} className="service-link">
=======
                            <div key={index} className="home-service-card">
                                <div className="home-service-icon">{service.icon}</div>
                                <h3 className="home-service-title">{service.title}</h3>
                                <p className="home-service-description">{service.description}</p>
                                <Link to={service.link} className="home-service-link">
>>>>>>> Stashed changes
                                    {service.linkText} →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section - Full Width */}
            <section className="home-stats-section home-full-width">
                <div className="home-stats-grid home-container">
                    <div className="home-stat-item">
                        <span className="home-stat-number">500+</span>
                        <span className="home-stat-label">Properties Sold</span>
                    </div>
<<<<<<< Updated upstream
                    <div className="stat-item">
                        <span className="stat-number">200+</span>
                        <span className="stat-label">Interior Projects</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">$2B+</span>
                        <span className="stat-label">In Sales</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">50+</span>
                        <span className="stat-label">Expert Team</span>
=======
                    <div className="home-stat-item">
                        <span className="home-stat-number">200+</span>
                        <span className="home-stat-label">Interior Projects</span>
                    </div>
                    <div className="home-stat-item">
                        <span className="home-stat-number">$2B+</span>
                        <span className="home-stat-label">In Sales</span>
>>>>>>> Stashed changes
                    </div>
                    <div className="home-stat-item">
                        <span className="home-stat-number">50+</span>
                        <span className="home-stat-label">Expert Team</span>
                    </div>
                    <div className="home-stat-item">
                        <span className="home-stat-number">15+</span>
                        <span className="home-stat-label">Years Experience</span>
                    </div>
                </div>
            </section>

            {/* Combined CTA Section - Full Width */}
<<<<<<< Updated upstream
            <section className="combined-cta-section full-width">
                <div className="container">
                    <div className="cta-grid">
                        <div className="real-estate-cta">
                            <h3 className="cta-title">FIND YOUR DREAM HOME</h3>
                            <p className="cta-subtitle">
                                Explore our premium property collection
                            </p>
                            <div className="cta-buttons">
                                <Link to="/properties" className="btn btn-primary">
                                    BROWSE PROPERTIES
                                </Link>
                                <Link to="/contactagent" className="btn btn-outline-light">
=======
            <section className="home-combined-cta-section home-full-width">
                <div className="home-container">
                    <div className="home-cta-grid">
                        <div className="home-real-estate-cta">
                            <h3 className="home-cta-title">FIND YOUR DREAM HOME</h3>
                            <p className="home-cta-subtitle">
                                Explore our premium property collection
                            </p>
                            <div className="home-cta-buttons">
                                <Link to="/properties" className="home-btn home-btn-primary">
                                    BROWSE PROPERTIES
                                </Link>
                                <Link to="/contactagent" className="home-btn home-btn-outline-light">
>>>>>>> Stashed changes
                                    BOOK CONSULTATION
                                </Link>
                            </div>
                        </div>
                        
<<<<<<< Updated upstream
                        <div className="interior-cta">
                            <h3 className="cta-title">TRANSFORM YOUR SPACE</h3>
                            <p className="cta-subtitle">
                                Professional interior design services
                            </p>
                            <div className="cta-buttons">
                                <Link to="/interior" className="btn btn-secondary">
                                    VIEW INTERIOR WORK
                                </Link>
                                <Link to="/contactagent" className="btn btn-outline-light">
=======
                        <div className="home-interior-cta">
                            <h3 className="home-cta-title">TRANSFORM YOUR SPACE</h3>
                            <p className="home-cta-subtitle">
                                Professional interior design services
                            </p>
                            <div className="home-cta-buttons">
                                <Link to="/interior" className="home-btn home-btn-secondary">
                                    VIEW INTERIOR WORK
                                </Link>
                                <Link to="/contactagent" className="home-btn home-btn-outline-light">
>>>>>>> Stashed changes
                                    BOOK CONSULTATION
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;