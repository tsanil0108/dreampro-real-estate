import React, { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import GalleryItem from './GalleryItem';
import FurnitureWork from './FurnitureWork';
import ContractCarpainter from './ContractCarpainter';
import './Interior.css';

const InteriorPage = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    
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

    // Auto slideshow with slower transitions
    useEffect(() => {
        let currentIndex = 0;
        let timeoutId;
        let intervalId;

        const startSlideshow = () => {
            setIsTransitioning(true);
            
            // Wait for transition to complete
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % heroImages.length;
                setCurrentImageIndex(currentIndex);
                
                // Wait a bit before starting next transition
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 100);
            }, 800); // Transition duration - SLOWER
        };

        // Start the slideshow cycle
        const startCycle = () => {
            // First image stays for 3 seconds
            timeoutId = setTimeout(() => {
                startSlideshow();
                
                // After first transition, set interval for 4 seconds
                intervalId = setInterval(() => {
                    startSlideshow();
                }, 4000); // 4 seconds interval - SLOWER
            }, 3000); // 3 seconds for first image - SLOWER
        };

        startCycle();

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [heroImages.length]);

    // Sample categories data
    const categories = [
        {
            id: 'living-room',
            title: 'Living Rooms',
            description: 'Transform your living space with elegant and comfortable designs',
            image: 'https://media.designcafe.com/wp-content/uploads/2020/03/21012613/luxury-living-room-designs.jpg',
            projectCount: 24,
            color: '#4285F4'
        },
        {
            id: 'bedroom',
            title: 'Bedrooms',
            description: 'Create your perfect sanctuary with personalized bedroom designs',
            image: 'https://www.craftedbeds.co.uk/cdn/shop/articles/c6229643564835.57f4204983b16.jpg?v=1654414798',
            projectCount: 18,
            color: '#34A853'
        },
        {
            id: 'kitchen',
            title: 'Kitchens',
            description: 'Modern and functional kitchen designs for the heart of your home',
            image: 'https://images.stockcake.com/public/f/0/a/f0a9652d-f99c-4f80-b758-c912017f5158_large/modern-kitchen-interior-stockcake.jpg',
            projectCount: 32,
            color: '#FBBC05'
        },
        {
            id: 'bathroom',
            title: 'Bathrooms',
            description: 'Luxurious bathroom designs combining style and functionality',
            image: 'https://i.pinimg.com/564x/fb/8f/76/fb8f767237e5842b1765a32e6bfcf797.jpg',
            projectCount: 15,
            color: '#EA4335'
        },
        {
            id: 'office',
            title: 'Home Offices',
            description: 'Productive and inspiring workspace designs for remote work',
            image: 'https://bokefurniture.com/wp-content/uploads/2024/05/u-shape-office-desk.jpg',
            projectCount: 12,
            color: '#8E44AD'
        },
        {
            id: 'outdoor',
            title: 'Outdoor Spaces',
            description: 'Beautiful outdoor living areas and garden designs',
            image: 'https://cdn.ecommercedns.uk/files/7/228247/1/18623541/wooden-garden-lounge-sofa-armchairs-hardwood-acacia-modern-slatt.jpg',
            projectCount: 20,
            color: '#16A085'
        }
    ];

    // Sample gallery items data
    const galleryItems = [
        {
            id: 1,
            title: 'Modern Luxury Living Room',
            category: 'living-room',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
            description: 'Contemporary living room with premium finishes and smart home integration',
            tags: ['Modern', 'Luxury', 'Smart Home'],
            duration: '4 weeks',
            budget: '$25,000'
        },
        {
            id: 2,
            title: 'Minimalist Bedroom Suite',
            category: 'bedroom',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
            description: 'Clean and serene bedroom design with custom built-in storage',
            tags: ['Minimalist', 'Custom Storage', 'Serene'],
            duration: '3 weeks',
            budget: '$18,000'
        },
        {
            id: 3,
            title: 'Gourmet Kitchen Design',
            category: 'kitchen',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
            description: 'Professional-grade kitchen with high-end appliances and island seating',
            tags: ['Gourmet', 'Professional', 'High-End'],
            duration: '6 weeks',
            budget: '$45,000'
        },
        {
            id: 4,
            title: 'Spa-like Master Bathroom',
            category: 'bathroom',
            image: 'https://cdn.decorilla.com/online-decorating/wp-content/uploads/2024/06/Glamorous-bathroom-fixtures-by-DECORILLA-Designer-Monica-Waimin-1024x574.jpeg?width=900',
            description: 'Luxurious bathroom with steam shower and freestanding tub',
            tags: ['Spa', 'Luxury', 'Steam Shower'],
            duration: '5 weeks',
            budget: '$32,000'
        },
        {
            id: 5,
            title: 'Executive Home Office',
            category: 'office',
            image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=400&fit=crop',
            description: 'Professional workspace with custom cabinetry and acoustic treatment',
            tags: ['Executive', 'Professional', 'Acoustic'],
            duration: '3 weeks',
            budget: '$22,000'
        },
        {
            id: 6,
            title: 'Outdoor Entertainment Area',
            category: 'outdoor',
            image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&h=400&fit=crop',
            description: 'Complete outdoor living space with kitchen, seating, and fire pit',
            tags: ['Entertainment', 'Outdoor Kitchen', 'Fire Pit'],
            duration: '8 weeks',
            budget: '$38,000'
        }
    ];

    const filteredItems = activeCategory === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeCategory);

    return (
        <div className="interior-page">
            {/* Updated Hero Section with Smooth Slideshow */}
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
                            <span className="stat-number">15</span>
                            <span className="stat-label">Years Experience</span>
                        </div>
                    </div>
                </div>
                
                {/* Smooth Slideshow Container */}
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
                    
                    {/* Slideshow Progress Bar */}
                    <div className="slideshow-progress">
                        <div className="progress-bar">
                            <div className={`progress-fill ${isTransitioning ? 'paused' : ''}`}></div>
                        </div>
                    </div>
                    
                    {/* Slideshow Dots */}
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

            {/* Categories Section */}
            <section className="categories-section">
                <div className="container">
                    <h2 className="section-title">Explore Our Services</h2>
                    <p className="section-subtitle">
                        From concept to completion, we handle every aspect of your interior transformation
                    </p>
                    <div className="categories-grid">
                        {categories.map(category => (
                            <CategoryCard
                                key={category.id}
                                {...category}
                                isActive={activeCategory === category.id}
                                onClick={() => setActiveCategory(category.id)}
                            />
                        ))}
                    </div>
                    <button
                        className="view-all-btn"
                        onClick={() => setActiveCategory('all')}
                    >
                        View All Projects
                    </button>
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
                            <GalleryItem
                                key={item.id}
                                {...item}
                                onClick={() => setSelectedProject(item)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <FurnitureWork />
            <ContractCarpainter />

            {/* Project Modal */}
            {selectedProject && (
                <div className="project-modal">
                    <div className="modal-content">
                        <button
                            className="close-modal"
                            onClick={() => setSelectedProject(null)}
                        >
                            ×
                        </button>
                        <img src={selectedProject.image} alt={selectedProject.title} />
                        <div className="modal-info">
                            <h3>{selectedProject.title}</h3>
                            <p>{selectedProject.description}</p>
                            <div className="project-details">
                                <div className="detail">
                                    <span className="label">Duration:</span>
                                    <span className="value">{selectedProject.duration}</span>
                                </div>
                                <div className="detail">
                                    <span className="label">Budget:</span>
                                    <span className="value">{selectedProject.budget}</span>
                                </div>
                                <div className="tags">
                                    {selectedProject.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InteriorPage;