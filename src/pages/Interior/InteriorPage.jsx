import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import GalleryItem from './GalleryItem';
import FurnitureWork from './FurnitureWork';
import ContractCarpainter from './ContractCarpainter';
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaStar, FaCalendarAlt, FaImages, FaUserTie, FaClock, FaMoneyBill, FaCheckCircle, FaTools, FaArrowRight, FaHome, FaCouch, FaChair, FaTable, FaDoorOpen, FaShapes } from 'react-icons/fa';
import './InteriorPage.css';
import './GalleryItem.css'; 
import './FurnitureWork.css'; 
import './ContractCarpainter.css';
import './CategoryCard.css'

const InteriorPage = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [activeWorkType, setActiveWorkType] = useState('wardrobe');
    const [projectGalleryIndex, setProjectGalleryIndex] = useState(0);
    
    // Contact Information
    const contactInfo = {
        phone: '7304603314',
        whatsapp: '7304603314',
        email: 'dreamprospace108@gmail.com',
        formattedPhone: '+91 73046 03314'
    };
    
    // Different images with titles for slideshow
    const heroImages = [
        {
            src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
            title: "Modern Luxury Living",
            description: "Elegant contemporary designs with premium finishes"
        },
        {
            src: "https://i.pinimg.com/564x/e2/ce/d8/e2ced875b7d0c41280878a5b5e2dc750.jpg",
            title: "Art Deco Interior",
            description: "Timeless luxury style with classic elements"
        },
        {
            src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
            title: "Minimalist Design",
            description: "Clean & sophisticated spaces with smart storage"
        },
        {
            src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop",
            title: "Premium Finishes",
            description: "High-end materials and craftsmanship"
        },
        {
            src: "https://cloudfrontgharpediabucket.gharpedia.com/uploads/2022/12/Smart-Furniture-for-Home-01-0110010034.jpeg",
            title: "Smart Home Integration",
            description: "Modern technology meets elegant design"
        }
    ];

    // Project gallery images for each project
    const projectGalleries = {
        1: [
            'https://i.pinimg.com/564x/f4/5c/33/f45c337d15209377170a19b9b2b03ac8.jpg',
            'https://i.pinimg.com/564x/c4/91/48/c49148dbbf42af433d744f1605d7f345.jpg',
            'https://images.unsplash.com/photo-1600257059544-8671d6c4de1e?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&auto=format&fit=crop'
        ],
        2: [
            'https://i.pinimg.com/564x/c4/91/48/c49148dbbf42af433d744f1605d7f345.jpg',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop'
        ],
        3: [
            'https://i.pinimg.com/564x/93/49/bb/9349bbfcd0f234f618c9b2926a197d64.jpg',
            'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
        ],
        4: [
            'https://i.pinimg.com/564x/89/54/f2/8954f2055ec29f8886d79188e0dd5004.jpg',
            'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop'
        ],
        5: [
            'https://images.stockcake.com/public/f/0/a/f0a9652d-f99c-4f80-b758-c912017f5158_large/modern-kitchen-interior-stockcake.jpg',
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop'
        ],
        6: [
            'https://i.pinimg.com/564x/1a/15/38/1a15388968e4a4c69a4c40a88853432c.jpg',
            'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&auto=format&fit=crop'
        ],
        7: [
            'https://i.pinimg.com/564x/74/14/68/74146836e8b776e553ad23583c02ab6f.jpg',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
        ],
        8: [
            'https://i.pinimg.com/564x/32/fd/3f/32fd3fe8a8a3db27dcdc91ad7a4b10a4.jpg',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop'
        ]
    };

    // Auto slideshow with slower transitions
    useEffect(() => {
        let currentIndex = 0;
        let timeoutId;
        let intervalId;

        const startSlideshow = () => {
            setIsTransitioning(true);
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % heroImages.length;
                setCurrentImageIndex(currentIndex);
                
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 100);
            }, 800);
        };

        const startCycle = () => {
            timeoutId = setTimeout(() => {
                startSlideshow();
                
                intervalId = setInterval(() => {
                    startSlideshow();
                }, 4000);
            }, 3000);
        };

        startCycle();

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [heroImages.length]);

    // Enhanced categories data with more specialized work
    const categories = [
        {
            id: 'wardrobe',
            title: 'Custom Wardrobes',
            description: 'Built-in wardrobes with smart storage solutions',
            image: 'https://i.pinimg.com/564x/f4/5c/33/f45c337d15209377170a19b9b2b03ac8.jpg',
            projectCount: 45,
            color: '#4285F4',
            icon: '👔',
            features: ['Sliding doors', 'Mirror finish', 'LED lighting', 'Drawer systems']
        },
        {
            id: 'bed',
            title: 'Custom Beds',
            description: 'Masterpiece beds with storage and lighting',
            image: 'https://i.pinimg.com/564x/93/49/bb/9349bbfcd0f234f618c9b2926a197d64.jpg',
            projectCount: 32,
            color: '#34A853',
            icon: '🛏️',
            features: ['Storage beds', 'Canopy designs', 'Upholstered', 'LED headboards']
        },
        {
            id: 'kitchen',
            title: 'Modular Kitchens',
            description: 'Ergonomic kitchen designs with premium hardware',
            image: 'https://images.stockcake.com/public/f/0/a/f0a9652d-f99c-4f80-b758-c912017f5158_large/modern-kitchen-interior-stockcake.jpg',
            projectCount: 38,
            color: '#FBBC05',
            icon: '🍳',
            features: ['Soft-close drawers', 'Pull-out systems', 'Quartz countertops', 'Backlighting']
        },
        {
            id: 'tv-unit',
            title: 'TV Units & Walls',
            description: 'Feature walls with integrated entertainment systems',
            image: 'https://i.pinimg.com/564x/42/04/8f/42048f89d7d50e6325028887e3f3c81f.jpg',
            projectCount: 28,
            color: '#EA4335',
            icon: '📺',
            features: ['Wall paneling', 'Cable management', 'Display shelves', 'Ambient lighting']
        }
    ];

    // Enhanced gallery items with more specific work types
    const galleryItems = [
        // Wardrobe Projects
        {
            id: 1,
            title: 'Walk-in Wardrobe Suite',
            category: 'wardrobe',
            image: 'https://i.pinimg.com/564x/f4/5c/33/f45c337d15209377170a19b9b2b03ac8.jpg',
            description: 'Luxurious walk-in wardrobe with full-length mirrors, LED lighting, and custom drawer systems.',
            tags: ['Walk-in', 'Mirror Finish', 'LED Lighting', 'Custom Storage'],
            duration: '3 weeks',
            features: ['Pull-out tie racks', 'Jewelry drawers', 'Shoe carousels', 'Steam iron cabinet'],
            materials: ['Premium Plywood', 'Glass Doors', 'Aluminum Handles', 'LED Strips'],
            area: '45 sq ft',
            complexity: 'High',
            estimatedCost: '₹1,50,000 - ₹2,00,000'
        },
        {
            id: 2,
            title: 'Sliding Door Wardrobe',
            category: 'wardrobe',
            image: 'https://i.pinimg.com/564x/c4/91/48/c49148dbbf42af433d744f1605d7f345.jpg',
            description: 'Modern sliding door wardrobe with frosted glass and smart compartmentalization.',
            tags: ['Sliding Doors', 'Frosted Glass', 'Smart Compartments'],
            duration: '2 weeks',
            features: ['Full-height doors', 'Mirror panels', 'Hanging rods', 'Shelf organizers'],
            materials: ['Engineered Wood', 'Frosted Glass', 'Soft-close Slides'],
            area: '30 sq ft',
            complexity: 'Medium',
            estimatedCost: '₹80,000 - ₹1,20,000'
        }
    ];

    // Enhanced Contractor Data
    const contractors = [
        {
            id: 1,
            name: "Dream Pro Space Team",
            specialization: "Interior Design & Construction",
            experience: "10+ years",
            rating: 4.9,
            location: "Mumbai",
            phone: contactInfo.phone,
            whatsapp: contactInfo.whatsapp,
            email: contactInfo.email,
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            skills: ["Wardrobe Making", "Kitchen Design", "Complete Interior", "Custom Furniture"],
            availability: "Available 24/7",
            projectsCompleted: 500,
            verified: true,
            languages: ["Hindi", "English", "Marathi"],
            expertise: ["Complete Interior", "Custom Furniture", "Space Planning"],
            responseTime: "Immediate Response",
            hourlyRate: "Consultation Based",
            minProject: "Flexible",
            certifications: ["Interior Design Certified", "Safety Training"]
        }
    ];

    const filteredItems = activeCategory === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeCategory);

    // UNIVERSAL CONTACT FUNCTIONS
    const makePhoneCall = (phoneNumber = contactInfo.phone) => {
        const cleanNumber = phoneNumber.toString().replace(/[-\s]/g, '');
        const fullNumber = `+91${cleanNumber}`;
        
        // Check if mobile device
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
            window.location.href = `tel:${fullNumber}`;
        } else {
            // For desktop, show alert with number
            const confirmed = window.confirm(`Call: ${contactInfo.formattedPhone}\n\nClick OK to attempt call through browser or copy the number to dial from your phone.`);
            if (confirmed) {
                window.location.href = `tel:${fullNumber}`;
            }
        }
    };

    const sendWhatsApp = (message = '', phoneNumber = contactInfo.whatsapp) => {
        const cleanNumber = phoneNumber.toString().replace(/[+\s-]/g, '');
        const defaultMessage = `Hello! I'm interested in your interior design services. Could you please share more details?`;
        const finalMessage = message || defaultMessage;
        const encodedMessage = encodeURIComponent(finalMessage);
        const whatsappUrl = `https://wa.me/91${cleanNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    };

    const sendEmail = (subject = '', body = '', emailAddress = contactInfo.email) => {
        const defaultSubject = 'Inquiry About Interior Design Services';
        const defaultBody = `Dear Dream Pro Space Team,\n\nI am interested in your interior design services. Please share:\n1. Portfolio and previous work\n2. Service packages and pricing\n3. Consultation availability\n4. Timeline for projects\n\nThank you,\n[Your Name]`;
        
        const finalSubject = subject || defaultSubject;
        const finalBody = body || defaultBody;
        const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(finalBody)}`;
        
        window.location.href = mailtoUrl;
    };

    // Updated contractor contact functions
    const callContractor = (contractor = contractors[0]) => {
        makePhoneCall(contractor.phone);
    };

    const whatsappContractor = (contractor = contractors[0], project = null, category = null) => {
        let message = `Hello ${contractor.name}, I'm interested in your ${contractor.specialization} services`;
        
        if (project) {
            message += ` for a project similar to "${project.title}". `;
            message += `Duration: ${project.duration}. Estimated Cost: ${project.estimatedCost}. `;
        } else if (category) {
            message += ` for ${category.title} work. `;
        } else {
            message += ` for my interior project. `;
        }
        
        message += `Please provide more details about availability and pricing.`;
        
        sendWhatsApp(message, contractor.whatsapp);
    };

    const emailContractor = (contractor = contractors[0], project = null, category = null) => {
        let subject = `Inquiry: ${contractor.specialization} Services`;
        let body = `Dear ${contractor.name},\n\nI am interested in your ${contractor.specialization} services`;
        
        if (project) {
            body += ` for a project similar to "${project.title}".\n\n`;
            body += `Project Details:\n`;
            body += `- Type: ${project.title}\n`;
            body += `- Duration: ${project.duration}\n`;
            body += `- Estimated Cost: ${project.estimatedCost}\n`;
            body += `- Features: ${project.features.join(', ')}\n\n`;
        } else if (category) {
            body += ` for ${category.title} work.\n\n`;
        } else {
            body += ` for my interior project.\n\n`;
        }
        
        body += `Please share:\n1. Availability for site visit\n2. Portfolio of similar projects\n3. Rate card and payment terms\n4. Timeline for completion\n\nLooking forward to your response.\n\nBest regards,\n[Your Name]`;
        
        sendEmail(subject, body, contractor.email);
    };

    const handleProjectClick = (project) => {
        navigate('/project-complete', { 
            state: { 
                project: project,
                contractors: contractors
            } 
        });
    };

    // Updated: Categories navigate to WorkCategories page
    const handleCategoryClick = (category) => {
        navigate('/work-categories', { 
            state: { 
                selectedCategory: category.id
            } 
        });
    };

    // Navigate to all work categories
    const navigateToAllCategories = () => {
        navigate('/work-categories');
    };

    // Navigate to WorkCategories page
    const navigateToWorkCategories = () => {
        navigate('/work-categories');
    };

    // Navigate to specific work categories with state
    const navigateToSpecificCategories = (categoryType) => {
        navigate('/work-categories', { 
            state: { 
                selectedCategoryType: categoryType
            } 
        });
    };

    return (
        <div className="interior-page">
            {/* Hero Section */}
            <section className="interior-hero">
                <div className="hero-content">
                    <h1 className="hero-title">Transform Your Space</h1>
                    <p className="hero-subtitle">
                        Discover stunning interior designs and professional craftsmanship
                        to bring your vision to life
                    </p>
                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Projects Completed</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">98%</span>
                            <span className="stat-label">Client Satisfaction</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">10+</span>
                            <span className="stat-label">Years Experience</span>
                        </div>
                    </div>
                    
                    {/* Quick Contact Buttons in Hero */}
                    <div className="hero-contact-buttons">
                        <button 
                            className="hero-btn call"
                            onClick={() => makePhoneCall()}
                        >
                            <FaPhone /> Call Now: {contactInfo.formattedPhone}
                        </button>
                        <button 
                            className="hero-btn whatsapp"
                            onClick={() => sendWhatsApp()}
                        >
                            <FaWhatsapp /> WhatsApp Us
                        </button>
                        <button 
                            className="hero-btn email"
                            onClick={() => sendEmail()}
                        >
                            <FaEnvelope /> Email Us
                        </button>
                    </div>
                </div>
                
                <div className="hero-slideshow">
                    <div className="slideshow-container">
                        {heroImages.map((image, index) => (
                            <div
                                key={index}
                                className={`slide ${index === currentImageIndex ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`}
                            >
                                <img 
                                    src={image.src} 
                                    alt={image.title}
                                    className="slide-image"
                                />
                                <div className="slide-content">
                                    <h3 className="slide-title">{image.title}</h3>
                                    <p className="slide-description">{image.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="slideshow-progress">
                        <div className="progress-bar">
                            <div className={`progress-fill ${isTransitioning ? 'paused' : ''}`}></div>
                        </div>
                    </div>
                    
                    <div className="slideshow-dots">
                        {heroImages.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                                onClick={() => {
                                    setCurrentImageIndex(index);
                                    setIsTransitioning(false);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section - NOW NAVIGATES TO WorkCategories */}
            <section className="services-section">  {/* Changed from categories-section */}
                <div className="container">
                    <h2 className="section-title">Explore Our Services</h2>
                    <p className="section-subtitle">
                        From concept to completion, we handle every aspect of your interior transformation
                    </p>
                    <div className="services-grid">  {/* Changed from categories-grid */}
                        {categories.map(category => (
                            <div key={category.id} className="service-card-square">  {/* Changed from category-card-square */}
                                <CategoryCard
                                    {...category}
                                    isActive={activeCategory === category.id}
                                    onClick={() => handleCategoryClick(category)}
                                    contactInfo={contactInfo}
                                    onCall={() => makePhoneCall()}
                                    onWhatsApp={() => sendWhatsApp(`Hello! I'm interested in your ${category.title} services. Could you please share more details?`)}
                                />
                                <div className="service-square-buttons">  {/* Changed from category-square-buttons */}
                                    <button 
                                        className="service-btn view-projects" 
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        <FaImages /> View Projects
                                    </button>
                                    <button 
                                        className="service-btn whatsapp"
                                        onClick={() => whatsappContractor(contractors[0], null, category)}
                                    >
                                        <FaWhatsapp /> Get Quote
                                    </button>
                                    <button 
                                        className="service-btn call"  
                                        onClick={() => callContractor(contractors[0])}
                                    >
                                        <FaPhone /> Call Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        className="view-all-btn"
                        onClick={navigateToAllCategories}
                    >
                        <FaArrowRight /> Browse All 100+ Work Categories
                    </button>
                </div>
            </section>

            {/* Work Categories Section */}
            <section className="interior-categories-preview">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">100+ Interior Work Categories</h2>
                        <p className="section-subtitle">
                            We specialize in every aspect of interior design and construction
                        </p>
                    </div>
                    
                    <div className="interior-categories-overview"> 
                        <div className="overview-content">
                            <h3>Complete Interior Solutions</h3>
                            <p>From basic furniture to complete home transformations, we handle it all with expertise and precision.</p>
                            <div className="interior-category-groups"> 
                                <div className="interior-category-group"> 
                                    <h4 
                                        className="interior-category-title" 
                                        onClick={() => navigateToSpecificCategories('residential')}
                                        style={{cursor: 'pointer'}}
                                    >
                                        🏠 Residential Interiors
                                    </h4>
                                    <p>Living rooms, bedrooms, kitchens, bathrooms</p>
                                    <button 
                                        className="interior-category-btn" 
                                        onClick={() => navigateToSpecificCategories('residential')}
                                    >
                                        View 40+ Categories <FaArrowRight />
                                    </button>
                                </div>
                                <div className="interior-category-group"> 
                                    <h4 
                                        className="interior-category-title" 
                                        onClick={() => navigateToSpecificCategories('commercial')}
                                        style={{cursor: 'pointer'}}
                                    >
                                        🏢 Commercial Spaces
                                    </h4>
                                    <p>Offices, restaurants, shops, showrooms</p>
                                    <button 
                                        className="interior-category-btn" 
                                        onClick={() => navigateToSpecificCategories('commercial')}
                                    >
                                        View 30+ Categories <FaArrowRight />
                                    </button>
                                </div>
                                <div className="interior-category-group">
                                    <h4 
                                        className="interior-category-title" 
                                        onClick={() => navigateToSpecificCategories('specialty')}
                                        style={{cursor: 'pointer'}}
                                    >
                                        🎯 Specialty Work
                                    </h4>
                                    <p>Custom furniture, built-ins, renovations</p>
                                    <button 
                                        className="interior-category-btn" 
                                        onClick={() => navigateToSpecificCategories('specialty')}
                                    >
                                        View 30+ Categories <FaArrowRight />
                                    </button>
                                </div>
                            </div>
                            <button 
                                className="interior-explore-btn" 
                                onClick={navigateToWorkCategories}
                            >
                                <FaArrowRight /> Explore All 100+ Categories
                            </button>
                        </div>
                        <div className="overview-image">
                            <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop" alt="Interior Work" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="gallery-section">
                <div className="container">
                    <h2 className="section-title">Our Portfolio</h2>
                    <p className="section-subtitle">
                        Browse through our latest interior design projects and get inspired
                    </p>
                    <div className="gallery-grid">
                        {filteredItems.map(item => (
                            <div key={item.id} className="gallery-item-wrapper">
                                <GalleryItem
                                    {...item}
                                    onClick={() => handleProjectClick(item)}
                                />
                                <div className="gallery-hire-buttons">
                                    <button 
                                        className="gallery-hire-btn view-details"
                                        onClick={() => handleProjectClick(item)}
                                    >
                                        <FaArrowRight /> View Project
                                    </button>
                                    <button 
                                        className="gallery-hire-btn whatsapp"
                                        onClick={() => whatsappContractor(contractors[0], item)}
                                    >
                                        <FaWhatsapp /> Get Quote
                                    </button>
                                    <button 
                                        className="gallery-hire-btn call"
                                        onClick={() => callContractor(contractors[0])}
                                    >
                                        <FaPhone /> Call Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced FurnitureWork */}
            <FurnitureWork contractors={contractors} />
            
            {/* Enhanced ContractCarpainter */}
            <ContractCarpainter contractors={contractors} />

            {/* Contractor Contact Section */}
            <section className="contractor-section">
                <div className="container">
                    <h2 className="section-title">Hire Expert Contractors</h2>
                    <p className="section-subtitle">
                        Connect with our verified professionals for your interior work needs
                    </p>
                    
                    <div className="contractor-grid">
                        {contractors.map(contractor => (
                            <div key={contractor.id} className="contractor-card">
                                <div className="contractor-header">
                                    <div className="contractor-profile">
                                        <img src={contractor.image} alt={contractor.name} />
                                        <div className="contractor-info">
                                            <h3>{contractor.name}</h3>
                                            <div className="contractor-specialization">
                                                <span>{contractor.specialization}</span>
                                                {contractor.verified && (
                                                    <span className="verified-badge">
                                                        <FaStar /> Verified
                                                    </span>
                                                )}
                                            </div>
                                            <div className="contractor-rating">
                                                <FaStar />
                                                <span>{contractor.rating}</span>
                                                <span className="reviews">({contractor.projectsCompleted} projects)</span>
                                            </div>
                                            <div className="contractor-location">
                                                <FaMapMarkerAlt />
                                                <span>{contractor.location}</span>
                                            </div>
                                            <div className="contractor-experience">
                                                <FaCalendarAlt />
                                                <span>{contractor.experience} experience</span>
                                            </div>
                                            <div className="contractor-contact-info">
                                                <FaPhone /> <strong>Phone:</strong> {contactInfo.formattedPhone}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="contractor-details">
                                    <div className="contractor-skills">
                                        <h4>Skills:</h4>
                                        <div className="skills-list">
                                            {contractor.skills.map((skill, index) => (
                                                <span key={index} className="skill-tag">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="contractor-expertise">
                                        <strong>Expertise:</strong> {contractor.expertise.join(', ')}
                                    </div>
                                    <div className="contractor-availability">
                                        <FaClock /> <strong>Availability:</strong> {contractor.availability}
                                    </div>
                                    <div className="contractor-response">
                                        <FaCheckCircle /> <strong>Response Time:</strong> {contractor.responseTime}
                                    </div>
                                </div>
                                
                                <div className="contractor-contact">
                                    <h4>Contact Now:</h4>
                                    <div className="contact-buttons">
                                        <button 
                                            className="contact-btn call-btn"
                                            onClick={() => callContractor(contractor)}
                                        >
                                            <FaPhone /> Call Now
                                        </button>
                                        <button 
                                            className="contact-btn whatsapp-btn"
                                            onClick={() => whatsappContractor(contractor)}
                                        >
                                            <FaWhatsapp /> WhatsApp
                                        </button>
                                        <button 
                                            className="contact-btn email-btn"
                                            onClick={() => emailContractor(contractor)}
                                        >
                                            <FaEnvelope /> Email
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Hire Banner */}
            <section className="quick-hire-banner">
                <div className="container">
                    <div className="banner-content">
                        <div className="banner-text">
                            <h3>Need Immediate Help?</h3>
                            <p>Connect with our team instantly</p>
                            <div className="contact-display">
                                <div className="contact-item">
                                    <FaPhone /> <span>{contactInfo.formattedPhone}</span>
                                </div>
                                <div className="contact-item">
                                    <FaWhatsapp /> <span>{contactInfo.whatsapp}</span>
                                </div>
                                <div className="contact-item">
                                    <FaEnvelope /> <span>{contactInfo.email}</span>
                                </div>
                            </div>
                        </div>
                        <div className="banner-actions">
                            <button 
                                className="banner-btn whatsapp"
                                onClick={() => sendWhatsApp()}
                            >
                                <FaWhatsapp /> Chat on WhatsApp
                            </button>
                            <button 
                                className="banner-btn call"
                                onClick={() => makePhoneCall()}
                            >
                                <FaPhone /> Call Now
                            </button>
                            <button 
                                className="banner-btn categories"
                                onClick={navigateToWorkCategories}
                            >
                                <FaHome /> Browse 100+ Work Categories
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Free Consultation Section */}
            <section className="consultation-section">
                <div className="container">
                    <div className="consultation-card">
                        <div className="consultation-content">
                            <h2>Get Free Consultation</h2>
                            <p>Book a free site visit and consultation with our interior experts</p>
                            <div className="consultation-features">
                                <div className="feature">
                                    <div className="feature-icon">📐</div>
                                    <div className="feature-text">Free Site Measurement</div>
                                </div>
                                <div className="feature">
                                    <div className="feature-icon">💡</div>
                                    <div className="feature-text">Expert Design Advice</div>
                                </div>
                                <div className="feature">
                                    <div className="feature-icon">💰</div>
                                    <div className="feature-text">Detailed Quotation</div>
                                </div>
                                <div className="feature">
                                    <div className="feature-icon">📅</div>
                                    <div className="feature-text">Flexible Scheduling</div>
                                </div>
                            </div>
                            <div className="consultation-form">
                                <input type="text" placeholder="Your Name" />
                                <input type="tel" placeholder="Phone Number" defaultValue={contactInfo.phone} />
                                <input type="email" placeholder="Email Address" />
                                <select>
                                    <option value="">Select Service Required</option>
                                    <option value="wardrobe">Custom Wardrobe</option>
                                    <option value="kitchen">Modular Kitchen</option>
                                    <option value="complete">Complete Interior</option>
                                    <option value="custom">Custom Work</option>
                                </select>
                                <button 
                                    className="btn-primary"
                                    onClick={() => sendWhatsApp('I want to book a free consultation for interior design services.')}
                                >
                                    Request Free Consultation
                                </button>
                            </div>
                            <div className="direct-contact">
                                <p>Or contact directly:</p>
                                <div className="direct-buttons">
                                    <button onClick={() => makePhoneCall()}>
                                        <FaPhone /> Call: {contactInfo.formattedPhone}
                                    </button>
                                    <button onClick={() => sendWhatsApp()}>
                                        <FaWhatsapp /> WhatsApp
                                    </button>
                                </div>
                                <div className="browse-categories-link">
                                    <p>
                                        Want to see all our services? 
                                        <button 
                                            className="inline-link-btn"
                                            onClick={navigateToWorkCategories}
                                        >
                                            <FaArrowRight /> Browse 100+ Work Categories
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InteriorPage;