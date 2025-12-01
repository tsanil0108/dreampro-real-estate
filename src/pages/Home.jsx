import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const featuredProperties = [
        {
            id: 1,
            title: "Modern Downtown Apartment",
            price: 350000,
            address: "123 Main St, New York, NY",
            bedrooms: 2,
            bathrooms: 2,
            sqft: 1200,
            type: "Apartment",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"
        },
        {
            id: 2,
            title: "Luxury Beach Villa",
            price: 1250000,
            address: "456 Ocean Drive, Miami, FL",
            bedrooms: 4,
            bathrooms: 3,
            sqft: 3200,
            type: "Villa",
            image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400"
        },
        {
            id: 3,
            title: "Contemporary City Loft",
            price: 750000,
            address: "789 Downtown Ave, Chicago, IL",
            bedrooms: 3,
            bathrooms: 2,
            sqft: 1800,
            type: "Loft",
            image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400"
        },
        {
            id: 4,
            title: "Mountain Retreat",
            price: 950000,
            address: "321 Alpine Road, Aspen, CO",
            bedrooms: 5,
            bathrooms: 4,
            sqft: 4200,
            type: "House",
            image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400"
        },
        {
            id: 5,
            title: "Urban Penthouse",
            price: 2200000,
            address: "567 Skyline Blvd, San Francisco, CA",
            bedrooms: 3,
            bathrooms: 3,
            sqft: 2400,
            type: "Penthouse",
            image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400"
        },
        {
            id: 6,
            title: "Suburban Family Home",
            price: 650000,
            address: "890 Maple Street, Boston, MA",
            bedrooms: 4,
            bathrooms: 2,
            sqft: 2800,
            type: "House",
            image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400"
        }
    ];

    const services = [
        {
            icon: "🏠",
            title: "Property Sales",
            description: "Luxury residential and commercial properties"
        },
        {
            icon: "💰",
            title: "Investment",
            description: "Prime real estate investment opportunities"
        },
        {
            icon: "👨‍💼",
            title: "Consultation",
            description: "Expert real estate advisory services"
        },
        {
            icon: "🏢",
            title: "Property Management",
            description: "Comprehensive property management solutions"
        }
    ];

    const locations = [
        { name: "LOS ANGELES", properties: 124 },
        { name: "NEWPORT BEACH", properties: 89 },
        { name: "SAN DIEGO", properties: 76 },
        { name: "CALIFORNIA", properties: 45 }
    ];

    return (
        <div className="home-page">
            {/* Hero Section - Full Width */}
            <section className="hero-section full-width">
                {/* Background Images with Transition */}
                <div className="hero-background">
                    <div className="hero-slide active" style={{
                        backgroundImage: `url('https://talatiandpartners.com/wp-content/uploads/2023/02/1980x870maison-de-week-end-Alibaug-copy-2new.webp')`
                    }}></div>
                    <div className="hero-slide" style={{
                        backgroundImage: `url('https://www.piramalmahalaxmi.com/wp-content/uploads/2023/02/this-luxury-apartment-is-truly-an-urban-oasis-in-mumbai.jpg')`
                    }}></div>
                    <div className="hero-slide" style={{
                        backgroundImage: `url('https://img.jamesedition.com/listing_images/2024/05/23/14/09/00/d21447e4-6342-4c8d-825f-fc0b63d46ab5/je/1100xxs.jpg')`
                    }}></div>
                    <div className="hero-slide" style={{
                        backgroundImage: `url('https://amazingarchitecture.com/storage/222/7030588_image9872.jpg')`
                    }}></div>
                    <div className="hero-slide" style={{
                        backgroundImage: `url('https://madscreations.in/wp-content/uploads/2024/03/Picture2.jpg')`
                    }}></div>
                    <div className="hero-slide" style={{
                        backgroundImage: `url('https://gos3.ibcdn.com/1ccb0092d79a11e9b9590242ac110003.png')`
                    }}></div>

                    {/* Gradient Overlay */}
                    <div className="hero-overlay"></div>

                    {/* Animated Shapes */}
                    <div className="hero-shapes">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-3"></div>
                        <div className="shape shape-4"></div>
                        <div className="shape shape-5"></div>
                        <div className="shape shape-6"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="hero-content">
                    <div className="hero-text-wrapper container">
                        {/* Animated Badge */}
                        <div className="hero-badge">
                            <span>LUXURY COLLECTION</span>
                        </div>

                        {/* Main Title with Animation */}
                        <h1 className="hero-title">
                            <span className="title-line">FIND YOUR</span>
                            <span className="title-line highlight">DREAM HOME</span>
                        </h1>

                        {/* Subtitle with Typewriter Effect */}
                        <p className="hero-subtitle">
                            Exceptional properties in the world's most desirable locations
                        </p>

                        {/* Buttons with Hover Effects */}
                        <div className="hero-buttons">
                            <Link to="/properties" className="btn btn-primary btn-glow">
                                <span className="btn-text">BROWSE PROPERTIES</span>
                                <div className="btn-hover-effect"></div>
                            </Link>
                            <Link to="/contactagent" className="btn btn-secondary btn-border">
                                <span className="btn-text">CONTACT AGENT</span>
                                <div className="btn-hover-effect"></div>
                            </Link>
                        </div>

                        {/* Quick Stats */}
                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-number">500+</span>
                                <span className="stat-label">Properties</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Locations</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">15+</span>
                                <span className="stat-label">Years</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator with Animation */}
                <div className="hero-scroll-indicator">
                    <div className="scroll-arrow">
                        <div className="scroll-arrow-inner"></div>
                    </div>
                    <span>SCROLL TO EXPLORE</span>
                </div>
            </section>

            {/* Quick Navigation - Full Width */}
            <section className="quick-nav-section full-width">
                <div className="quick-nav-grid container">
                    <Link to="/properties" className="quick-nav-item">
                        <span className="quick-nav-number">250+</span>
                        <span className="quick-nav-label">OUR PROPERTIES</span>
                    </Link>
                    <Link to="/buyers" className="quick-nav-item">
                        <span className="quick-nav-number">1,200+</span>
                        <span className="quick-nav-label">BUYERS</span>
                    </Link>
                    <Link to="/sellers" className="quick-nav-item">
                        <span className="quick-nav-number">890+</span>
                        <span className="quick-nav-label">SELLERS</span>
                    </Link>
                    <Link to="/property-types" className="quick-nav-item">
                        <span className="quick-nav-number">15+</span>
                        <span className="quick-nav-label">PROPERTY TYPES</span>
                    </Link>
                    <Link to="/about" className="quick-nav-item">
                        <span className="quick-nav-number">25+</span>
                        <span className="quick-nav-label">ABOUT US</span>
                    </Link>
                    <Link to="/media" className="quick-nav-item">
                        <span className="quick-nav-number">50+</span>
                        <span className="quick-nav-label">IN THE MEDIA</span>
                    </Link>
                    <Link to="/contact" className="quick-nav-item">
                        <span className="quick-nav-label">CONTACT US</span>
                    </Link>
                    <div className="quick-nav-brand">
                        <span className="brand-name">DREAMPRO</span>
                        <span className="brand-tagline">GROUP</span>
                    </div>
                </div>
            </section>

            {/* Featured Properties - Regular Container */}
            <section className="section properties-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">FEATURED PROPERTIES</h2>
                        <p className="section-subtitle">
                            Handpicked selection of premium properties
                        </p>
                    </div>

                    <div className="properties-grid">
                        {featuredProperties.map(property => (
                            <div key={property.id} className="property-card">
                                <div className="property-image">
                                    <img src={property.image} alt={property.title} />
                                    <div className="property-type">{property.type}</div>
                                    <div className="property-overlay">
                                        <Link to={`/property/${property.id}`} className="btn-view-details">
                                            VIEW DETAILS
                                        </Link>
                                    </div>
                                </div>
                                <div className="property-content">
                                    <h3 className="property-title">{property.title}</h3>
                                    <p className="property-price">${property.price.toLocaleString()}</p>
                                    <p className="property-address">{property.address}</p>
                                    <div className="property-features">
                                        <span>{property.bedrooms} Beds</span>
                                        <span>{property.bathrooms} Baths</span>
                                        <span>{property.sqft} sqft</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="section-footer">
                        <Link to="/properties" className="btn btn-outline">
                            VIEW ALL PROPERTIES
                        </Link>
                    </div>
                </div>
            </section>

            {/* Locations Section - Regular Container */}
            <section className="section locations-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">OUR MARKETS</h2>
                        <p className="section-subtitle">
                            Premier locations across the finest destinations
                        </p>
                    </div>

                    <div className="locations-grid">
                        {locations.map((location, index) => (
                            <div key={index} className="location-card">
                                <h3 className="location-name">{location.name}</h3>
                                <p className="location-count">{location.properties} Properties</p>
                                <Link to={`/properties?location=${location.name.toLowerCase()}`} className="location-link">
                                    EXPLORE →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section - Regular Container */}
            <section className="section services-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">OUR SERVICES</h2>
                        <p className="section-subtitle">
                            Comprehensive real estate solutions tailored to your needs
                        </p>
                    </div>

                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div key={index} className="service-card">
                                <div className="service-icon">{service.icon}</div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                                <Link to="/services" className="service-link">
                                    Learn More →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section - Full Width */}
            <section className="stats-section full-width">
                <div className="stats-grid container">
                    <div className="stat-item">
                        <span className="stat-number">500+</span>
                        <span className="stat-label">Properties Sold</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">$2B+</span>
                        <span className="stat-label">In Sales</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">50+</span>
                        <span className="stat-label">Expert Agents</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">15+</span>
                        <span className="stat-label">Years Experience</span>
                    </div>
                </div>
            </section>

            {/* CTA Section - Full Width */}
            <section className="cta-section full-width">
                <div className="cta-content container">
                    <h2 className="cta-title">READY TO FIND YOUR DREAM HOME?</h2>
                    <p className="cta-subtitle">
                        Connect with our expert agents and start your journey today
                    </p>
                    <div className="cta-buttons">
                        <Link to="/ContactAgent" className="btn btn-primary">
                            CONTACT AGENT
                        </Link>
                        <Link to="/properties" className="btn btn-secondary">
                            BROWSE PROPERTIES
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;