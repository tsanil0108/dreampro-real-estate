import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
    FaPhone, FaWhatsapp, FaEnvelope, FaStar, FaClock, FaMoneyBill, 
    FaCheckCircle, FaTools, FaHome, FaCalendarAlt, FaMapMarkerAlt,
    FaArrowLeft, FaRuler, FaUsers, FaCertificate, FaShieldAlt,
    FaHeart, FaShare, FaDownload, FaFilePdf, FaArrowRight,
<<<<<<< Updated upstream
    FaImages, FaUserTie, FaDoorOpen, FaCouch, FaChair,
    FaTable, FaGlassMartini, FaShoePrints, FaTv, FaBook,
    FaBath, FaBed, FaWrench, FaPaintRoller, FaLightbulb,
    FaCaretLeft, FaCaretRight, FaExpand, FaCompress,
    FaRegHeart, FaRegShareSquare, FaRegBookmark,
    FaInstagram, FaFacebook, FaTwitter, FaLinkedin,
    FaStarHalfAlt, FaRegStar, FaShoppingCart, FaClipboardCheck
=======
    FaImages, FaUserTie, FaWrench, FaPaintRoller, FaLightbulb,
    FaCaretLeft, FaCaretRight, FaExpand, FaCompress,
    FaRegHeart, FaShoppingCart, FaClipboardCheck,
    FaInstagram, FaFacebook, FaTwitter, FaLinkedin,
    FaStarHalfAlt, FaRegStar, FaEye 
>>>>>>> Stashed changes
} from 'react-icons/fa';
import './ProjectComplete.css';

const ProjectComplete = () => {
    const location = useLocation();
    const navigate = useNavigate();
<<<<<<< Updated upstream
    const { project, contractors } = location.state || {};
    
=======
    const { project: initialProject, contractors } = location.state || {};
    
    // State for current project (can change when clicking similar projects)
    const [currentProject, setCurrentProject] = useState(null);
>>>>>>> Stashed changes
    const [selectedContractor, setSelectedContractor] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isSaved, setIsSaved] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    
<<<<<<< Updated upstream
    // Sample project images if not provided
    const projectImages = [
        project?.image || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop',
        'https://i.pinimg.com/564x/c4/91/48/c49148dbbf42af433d744f1605d7f345.jpg',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop',
        'https://cloudfrontgharpediabucket.gharpedia.com/uploads/2022/12/Smart-Furniture-for-Home-01-0110010034.jpeg'
    ];
    
    // Sample contractors if not provided
=======
    // Sample project data for different categories
    const projectDatabase = {
        wardrobe: [
            {
                id: 1,
                title: 'Walk-in Wardrobe Suite',
                category: 'wardrobe',
                description: 'Luxurious walk-in wardrobe with full-length mirrors, LED lighting, and custom drawer systems.',
                tags: ['Walk-in', 'Mirror Finish', 'LED Lighting', 'Custom Storage'],
                duration: '3 weeks',
                features: ['Pull-out tie racks', 'Jewelry drawers', 'Shoe carousels', 'Steam iron cabinet'],
                materials: ['Premium Plywood', 'Glass Doors', 'Aluminum Handles', 'LED Strips'],
                area: '45 sq ft',
                complexity: 'High',
                estimatedCost: '₹1,50,000 - ₹2,00,000',
                projectType: 'Premium Residential'
            },
            {
                id: 5,
                title: 'Sliding Door Wardrobe',
                category: 'wardrobe',
                description: 'Modern sliding door wardrobe with frosted glass panels and smart storage solutions.',
                tags: ['Sliding Door', 'Frosted Glass', 'Smart Storage', 'Modern'],
                duration: '2 weeks',
                features: ['Soft-close mechanisms', 'Adjustable shelves', 'Drawer organizers', 'LED interior lighting'],
                materials: ['Engineered Wood', 'Frosted Glass', 'Steel Sliding Tracks'],
                area: '35 sq ft',
                complexity: 'Medium',
                estimatedCost: '₹80,000 - ₹1,20,000',
                projectType: 'Residential'
            }
        ],
        door: [
            {
                id: 2,
                title: 'Custom Teak Wood Door',
                category: 'door',
                description: 'Handcrafted solid teak wood door with intricate carvings and brass fittings.',
                tags: ['Solid Teak', 'Hand Carved', 'Brass Fittings', 'Classic'],
                duration: '1 week',
                features: ['Solid wood construction', 'Hand-carved patterns', 'Antique finish', 'Weather resistant'],
                materials: ['Solid Teak Wood', 'Brass Hardware', 'Wood Polish'],
                area: 'Single Door',
                complexity: 'Medium',
                estimatedCost: '₹25,000 - ₹40,000',
                projectType: 'Residential'
            }
        ],
        wainscoting: [
            {
                id: 3,
                title: 'Modern Wainscoting Wall',
                category: 'wainscoting',
                description: 'Contemporary wainscoting with geometric patterns and LED accent lighting.',
                tags: ['Wall Paneling', 'Geometric Design', 'LED Accent', 'Modern'],
                duration: '2 weeks',
                features: ['Custom geometric patterns', 'Integrated LED strips', 'Easy to clean', 'Durable finish'],
                materials: ['MDF Panels', 'LED Strips', 'Premium Paint'],
                area: 'Wall Installation',
                complexity: 'High',
                estimatedCost: '₹35,000 - ₹60,000',
                projectType: 'Residential'
            }
        ]
    };

    // Sample project images based on category
    const getCategoryImages = (category) => {
        const imageMap = {
            door: [
                'https://i.pinimg.com/564x/56/89/79/5689798d7e3d1975f21fcd1dfd5ed3e8.jpg',
                'https://i.pinimg.com/564x/89/54/f2/8954f2055ec29f8886d79188e0dd5004.jpg',
                'https://i.pinimg.com/564x/78/9b/15/789b1544e4e8ee3d0ea7a74945fd4105.jpg',
                'https://i.pinimg.com/564x/f4/5c/33/f45c337d15209377170a19b9b2b03ac8.jpg'
            ],
            wardrobe: [
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop',
                'https://i.pinimg.com/564x/c4/91/48/c49148dbbf42af433d744f1605d7f345.jpg',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop'
            ],
            wainscoting: [
                'https://i.pinimg.com/564x/93/49/bb/9349bbfcd0f234f618c9b2926a197d64.jpg',
                'https://i.pinimg.com/564x/a1/2b/3a/a12b3a5b52ff2657d42150eec91d1236.jpg',
                'https://i.pinimg.com/564x/78/9b/15/789b1544e4e8ee3d0ea7a74945fd4105.jpg'
            ]
        };
        
        return imageMap[category] || imageMap.wardrobe;
    };
    
    // Enhanced contractors
>>>>>>> Stashed changes
    const sampleContractors = [
        {
            id: 1,
            name: "Rajesh Kumar",
            specialization: "Master Carpenter",
            experience: "15 years",
            rating: 4.9,
            location: "Mumbai",
            phone: "+91 98765 43210",
            whatsapp: "+91 98765 43210",
            email: "rajesh@interiorpro.com",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
<<<<<<< Updated upstream
            skills: ["Wardrobe Making", "Bed Design", "Custom Furniture", "Precision Joinery"],
=======
            skills: ["Wardrobe Making", "Custom Doors", "Bed Design", "Precision Joinery"],
>>>>>>> Stashed changes
            projectsCompleted: 250,
            verified: true,
            hourlyRate: "₹500-800/hr",
            minProject: "₹50,000",
<<<<<<< Updated upstream
            certifications: ["Carpenter Certification", "Safety Training", "Advanced Woodwork"],
            responseTime: "Within 2 hours",
            availability: "Available for Consultation",
            languages: ["Hindi", "English", "Marathi"],
            portfolioImages: [
                "https://i.pinimg.com/564x/f4/5c/33/f45c337d15209377170a19b9b2b03ac8.jpg",
                "https://i.pinimg.com/564x/93/49/bb/9349bbfcd0f234f618c9b2926a197d64.jpg"
            ]
=======
            certifications: ["Carpenter Certification", "Safety Training"],
            responseTime: "Within 2 hours",
            availability: "Available for Consultation",
            languages: ["Hindi", "English", "Marathi"]
>>>>>>> Stashed changes
        },
        {
            id: 2,
            name: "Anil Sharma",
<<<<<<< Updated upstream
            specialization: "Furniture Designer",
=======
            specialization: "Furniture & Interior Designer",
>>>>>>> Stashed changes
            experience: "10 years",
            rating: 4.7,
            location: "Mumbai",
            phone: "+91 88997 77665",
            whatsapp: "+91 88997 77665",
            email: "anil@interiorpro.com",
            image: "https://randomuser.me/api/portraits/men/67.jpg",
<<<<<<< Updated upstream
            skills: ["Design Consultation", "3D Modeling", "Material Selection", "Project Management"],
=======
            skills: ["Design Consultation", "3D Modeling", "Space Planning"],
>>>>>>> Stashed changes
            projectsCompleted: 150,
            verified: true,
            hourlyRate: "₹600-900/hr",
            minProject: "₹75,000",
<<<<<<< Updated upstream
            certifications: ["Interior Design Diploma", "AutoCAD Certified", "Space Planning"],
            responseTime: "Within 4 hours",
            availability: "Available Weekdays",
            languages: ["Hindi", "English", "Kannada"],
            portfolioImages: [
                "https://images.stockcake.com/public/f/0/a/f0a9652d-f99c-4f80-b758-c912017f5158_large/modern-kitchen-interior-stockcake.jpg",
                "https://i.pinimg.com/564x/42/04/8f/42048f89d7d50e6325028887e3f3c81f.jpg"
            ]
        },
        {
            id: 3,
            name: "Vikram Singh",
            specialization: "Kitchen Specialist",
            experience: "12 years",
            rating: 4.8,
            location: "Mumbai",
            phone: "+91 77665 44332",
            whatsapp: "+91 77665 44332",
            email: "vikram@interiorpro.com",
            image: "https://randomuser.me/api/portraits/men/44.jpg",
            skills: ["Modular Kitchen", "Cabinet Making", "Countertop Installation", "Plumbing Coordination"],
            projectsCompleted: 180,
            verified: true,
            hourlyRate: "₹550-850/hr",
            minProject: "₹1,00,000",
            certifications: ["Kitchen Specialist", "Safety Certified", "Material Expert"],
            responseTime: "Within 1 hour",
            availability: "Available Immediately",
            languages: ["Hindi", "English"],
            portfolioImages: [
                "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop",
                "https://i.pinimg.com/564x/9c/41/b5/9c41b5a82d88242ab26c670a3fa9c3e3.jpg"
            ]
        }
    ];
    
    // Use provided project or sample project
    const displayProject = project || {
        id: 1,
        title: 'Walk-in Wardrobe Suite',
        category: 'wardrobe',
        description: 'Luxurious walk-in wardrobe with full-length mirrors, LED lighting, and custom drawer systems. Perfect for organizing your clothing collection with premium finishes and smart storage solutions.',
        tags: ['Walk-in', 'Mirror Finish', 'LED Lighting', 'Custom Storage'],
        duration: '3 weeks',
        features: ['Pull-out tie racks', 'Jewelry drawers', 'Shoe carousels', 'Steam iron cabinet'],
        materials: ['Premium Plywood', 'Glass Doors', 'Aluminum Handles', 'LED Strips'],
        area: '45 sq ft',
        complexity: 'High',
        estimatedCost: '₹1,50,000 - ₹2,00,000',
        projectType: 'Premium Residential'
    };
    
    // Use provided contractors or sample ones
    const displayContractors = contractors || sampleContractors;
    
    // Similar projects data
    const similarProjects = [
        {
            id: 1,
            title: 'Sliding Door Wardrobe',
            category: 'wardrobe',
            image: 'https://i.pinimg.com/564x/c4/91/48/c49148dbbf42af433d744f1605d7f345.jpg',
            duration: '2 weeks',
            cost: '₹80,000 - ₹1,20,000'
        },
        {
            id: 2,
            title: 'Custom Bed with Storage',
            category: 'bed',
            image: 'https://i.pinimg.com/564x/89/54/f2/8954f2055ec29f8886d79188e0dd5004.jpg',
            duration: '2 weeks',
            cost: '₹60,000 - ₹90,000'
        },
        {
            id: 3,
            title: 'Modern TV Unit',
            category: 'tv-unit',
            image: 'https://i.pinimg.com/564x/42/04/8f/42048f89d7d50e6325028887e3f3c81f.jpg',
            duration: '3 weeks',
            cost: '₹1,00,000 - ₹1,50,000'
        }
    ];

=======
            certifications: ["Interior Design Diploma", "AutoCAD Certified"],
            responseTime: "Within 4 hours",
            availability: "Available Weekdays",
            languages: ["Hindi", "English", "Kannada"]
        },
    ];
    
    // Initialize current project
    useEffect(() => {
        if (initialProject) {
            setCurrentProject(initialProject);
        } else {
            // Default to first wardrobe project
            setCurrentProject(projectDatabase.wardrobe[0]);
        }
    }, [initialProject]);
    
    // Similar projects
    const similarProjects = [
        {
            id: 1,
            title: 'Custom Teak Wood Door',
            category: 'door',
            image: 'https://i.pinimg.com/564x/56/89/79/5689798d7e3d1975f21fcd1dfd5ed3e8.jpg',
            duration: '1 week',
            cost: '₹25,000 - ₹40,000'
        },
        {
            id: 2,
            title: 'Modern Wainscoting Wall',
            category: 'wainscoting',
            image: 'https://i.pinimg.com/564x/93/49/bb/9349bbfcd0f234f618c9b2926a197d64.jpg',
            duration: '2 weeks',
            cost: '₹35,000 - ₹60,000'
        },
        {
            id: 5,
            title: 'Sliding Door Wardrobe',
            category: 'wardrobe',
            image: 'https://i.pinimg.com/564x/89/54/f2/8954f2055ec29f8886d79188e0dd5004.jpg',
            duration: '2 weeks',
            cost: '₹80,000 - ₹1,20,000'
        }
    ];

    // Get project images for current project
    const projectImages = currentProject ? getCategoryImages(currentProject.category) : getCategoryImages('wardrobe');

>>>>>>> Stashed changes
    useEffect(() => {
        // Disable body scroll when in fullscreen
        if (isFullscreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isFullscreen]);

    const callContractor = (phone) => {
        window.location.href = `tel:${phone}`;
    };

    const whatsappContractor = (contractor) => {
<<<<<<< Updated upstream
        const message = `Hello ${contractor.name}, I'm interested in hiring you for a project similar to "${displayProject.title}". \n\nProject Details:\n- Type: ${displayProject.title}\n- Duration: ${displayProject.duration}\n- Estimated Cost: ${displayProject.estimatedCost}\n- Category: ${displayProject.category}\n\nPlease provide your availability and detailed quotation.`;
=======
        const message = `Hello ${contractor.name}, I'm interested in hiring you for a ${currentProject?.category} project similar to "${currentProject?.title}".`;
>>>>>>> Stashed changes
        window.open(`https://wa.me/${contractor.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const emailContractor = (contractor) => {
<<<<<<< Updated upstream
        const subject = `Inquiry: ${contractor.specialization} for ${displayProject.title}`;
        const body = `Dear ${contractor.name},\n\nI am interested in hiring you for a project similar to "${displayProject.title}".\n\nProject Details:\n- Type: ${displayProject.title}\n- Duration: ${displayProject.duration}\n- Estimated Cost: ${displayProject.estimatedCost}\n- Category: ${displayProject.category}\n- Features: ${displayProject.features?.join(', ') || 'Custom requirements'}\n\nPlease share:\n1. Your availability for site visit\n2. Portfolio of similar projects\n3. Detailed quotation with material options\n4. Timeline for completion\n5. Payment terms\n\nLooking forward to your response.\n\nBest regards,\n[Your Name]`;
=======
        const subject = `Inquiry: ${contractor.specialization} for ${currentProject?.title}`;
        const body = `Dear ${contractor.name},\n\nI am interested in hiring you for a ${currentProject?.category} project similar to "${currentProject?.title}".`;
>>>>>>> Stashed changes
        window.location.href = `mailto:${contractor.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const downloadProjectPDF = () => {
<<<<<<< Updated upstream
        // In a real app, this would generate/download a PDF
        const link = document.createElement('a');
        link.href = '#';
        link.download = `${displayProject.title.replace(/\s+/g, '_')}_Project_Details.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert(`Downloading project details for "${displayProject.title}"`);
=======
        const link = document.createElement('a');
        link.href = '#';
        link.download = `${currentProject?.title.replace(/\s+/g, '_')}_Project_Details.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert(`Downloading project details for "${currentProject?.title}"`);
>>>>>>> Stashed changes
    };

    const shareProject = () => {
        if (navigator.share) {
            navigator.share({
<<<<<<< Updated upstream
                title: displayProject.title,
                text: `Check out this amazing ${displayProject.category} project: ${displayProject.title}`,
                url: window.location.href,
            });
        } else {
            // Fallback for browsers that don't support Web Share API
=======
                title: currentProject?.title,
                text: `Check out this amazing ${currentProject?.category} project: ${currentProject?.title}`,
                url: window.location.href,
            });
        } else {
>>>>>>> Stashed changes
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const handleSaveProject = () => {
        setIsSaved(!isSaved);
<<<<<<< Updated upstream
        // In a real app, this would save to localStorage or backend
        const savedProjects = JSON.parse(localStorage.getItem('savedProjects') || '[]');
        if (!isSaved) {
            savedProjects.push(displayProject);
            localStorage.setItem('savedProjects', JSON.stringify(savedProjects));
        } else {
            const updatedProjects = savedProjects.filter(p => p.id !== displayProject.id);
=======
        const savedProjects = JSON.parse(localStorage.getItem('savedProjects') || '[]');
        if (!isSaved && currentProject) {
            savedProjects.push(currentProject);
            localStorage.setItem('savedProjects', JSON.stringify(savedProjects));
        } else {
            const updatedProjects = savedProjects.filter(p => p.id !== currentProject?.id);
>>>>>>> Stashed changes
            localStorage.setItem('savedProjects', JSON.stringify(updatedProjects));
        }
    };

    const handleHireNow = (contractor) => {
<<<<<<< Updated upstream
        const message = `I want to hire you for my ${displayProject.category} project immediately. Please confirm your availability and share the next steps.`;
        window.open(`https://wa.me/${contractor.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const getCategoryIcon = (category) => {
        switch(category?.toLowerCase()) {
            case 'wardrobe': return '👔';
            case 'bed': return '🛏️';
            case 'kitchen': return '🍳';
            case 'tv-unit': return '📺';
            case 'pooja-unit': return '🕉️';
            case 'study-table': return '📚';
            case 'shoe-rack': return '👟';
            case 'bar-unit': return '🍷';
            case 'wall-unit': return '🧱';
            case 'bookshelf': return '📖';
            case 'dressing-table': return '💄';
            case 'kids-room': return '🧸';
=======
        const message = `I want to hire you for my ${currentProject?.category} project immediately.`;
        window.open(`https://wa.me/${contractor.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    };

    // Function to get category color
    const getCategoryColor = (category) => {
        switch(category?.toLowerCase()) {
            case 'wardrobe': return '#D4AF37';
            case 'door': return '#8B4513';
            case 'bed': return '#4169E1';
            case 'kitchen': return '#FF6347';
            case 'wainscoting': return '#9C27B0';
            default: return '#2E8B57';
        }
    };

    // Function to get category icon
    const getCategoryIcon = (category) => {
        switch(category?.toLowerCase()) {
            case 'wardrobe': return '👔';
            case 'door': return '🚪';
            case 'bed': return '🛏️';
            case 'kitchen': return '🍳';
            case 'wainscoting': return '🧱';
>>>>>>> Stashed changes
            default: return '🏠';
        }
    };

<<<<<<< Updated upstream
=======
    // Handle similar project click - update current project
    const handleSimilarProjectClick = (similarProject) => {
        // Find the full project details from database
        const categoryProjects = projectDatabase[similarProject.category];
        if (categoryProjects) {
            // Find project by title or use first matching project
            const fullProject = categoryProjects.find(p => 
                p.title === similarProject.title || p.id === similarProject.id
            ) || categoryProjects[0];
            
            setCurrentProject(fullProject);
            setCurrentImageIndex(0); // Reset to first image
            setIsSaved(false); // Reset saved status
            
            // Scroll to top of page
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Show notification
            const notification = document.createElement('div');
            notification.className = 'project-switch-notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <span>Now viewing:</span>
                    <strong>${fullProject.title}</strong>
                </div>
            `;
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 3000);
        }
    };

    // Get current category details
    const currentCategory = currentProject ? {
        name: currentProject.category.charAt(0).toUpperCase() + currentProject.category.slice(1),
        color: getCategoryColor(currentProject.category),
        icon: getCategoryIcon(currentProject.category)
    } : {
        name: 'Wardrobe',
        color: '#D4AF37',
        icon: '👔'
    };

    if (!currentProject) {
        return <div className="loading-project">Loading project details...</div>;
    }

>>>>>>> Stashed changes
    return (
        <div className="project-complete-page">
            {/* Back Button */}
            <div className="navigation-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Back to Portfolio
                </button>
                <div className="breadcrumb">
                    <span onClick={() => navigate('/')}>Home</span>
                    <FaArrowRight size={12} />
                    <span onClick={() => navigate('/portfolio')}>Portfolio</span>
                    <FaArrowRight size={12} />
<<<<<<< Updated upstream
                    <span className="current">{displayProject.title}</span>
=======
                    <span className="current">{currentProject.title}</span>
>>>>>>> Stashed changes
                </div>
            </div>

            <div className="project-complete-container">
                {/* Project Header */}
                <div className="project-header">
                    <div className="project-title-section">
<<<<<<< Updated upstream
                        <div className="category-tag">
                            <span className="category-icon">{getCategoryIcon(displayProject.category)}</span>
                            <span className="category-name">{displayProject.category}</span>
                        </div>
                        <h1>{displayProject.title}</h1>
=======
                        <div className="category-tag" style={{ backgroundColor: currentCategory.color + '20', borderColor: currentCategory.color }}>
                            <span className="category-icon">{currentCategory.icon}</span>
                            <span className="category-name">{currentCategory.name}</span>
                        </div>
                        <h1>{currentProject.title}</h1>
>>>>>>> Stashed changes
                        <div className="project-meta">
                            <div className="meta-item">
                                <FaMapMarkerAlt />
                                <span>Mumbai, India</span>
                            </div>
                            <div className="meta-item">
                                <FaCalendarAlt />
                                <span>Completed: Dec 2024</span>
                            </div>
                            <div className="meta-item">
                                <FaUsers />
                                <span>Client: Residential</span>
                            </div>
                        </div>
                    </div>
                    <div className="project-actions">
                        <button 
                            className={`action-btn save-btn ${isSaved ? 'saved' : ''}`}
                            onClick={handleSaveProject}
                        >
                            {isSaved ? <FaHeart /> : <FaRegHeart />}
                            {isSaved ? 'Saved' : 'Save Project'}
                        </button>
                        <button className="action-btn share-btn" onClick={shareProject}>
                            <FaShare /> Share
                        </button>
                        <button className="action-btn pdf-btn" onClick={downloadProjectPDF}>
                            <FaFilePdf /> Download PDF
                        </button>
<<<<<<< Updated upstream
                        <button className="action-btn quote-btn" onClick={() => setActiveTab('inquiry')}>
                            <FaShoppingCart /> Get Instant Quote
                        </button>
                    </div>
                </div>

                {/* Project Gallery with Enhanced Features */}
=======
                    </div>
                </div>

                {/* Project Gallery */}
>>>>>>> Stashed changes
                <div className={`project-gallery ${isFullscreen ? 'fullscreen' : ''}`}>
                    <div className="gallery-main">
                        <div className="image-container">
                            <img 
                                src={projectImages[currentImageIndex]} 
<<<<<<< Updated upstream
                                alt={`${displayProject.title} - Image ${currentImageIndex + 1}`}
=======
                                alt={`${currentProject.title} - Image ${currentImageIndex + 1}`}
>>>>>>> Stashed changes
                            />
                            <div className="image-overlay">
                                <button className="nav-btn prev-btn" onClick={prevImage}>
                                    <FaCaretLeft />
                                </button>
                                <button className="nav-btn next-btn" onClick={nextImage}>
                                    <FaCaretRight />
                                </button>
                                <button className="fullscreen-btn" onClick={toggleFullscreen}>
                                    {isFullscreen ? <FaCompress /> : <FaExpand />}
                                </button>
                                <div className="image-counter">
                                    {currentImageIndex + 1} / {projectImages.length}
                                </div>
<<<<<<< Updated upstream
=======
                                <div className="category-badge" style={{ backgroundColor: currentCategory.color }}>
                                    {currentCategory.name}
                                </div>
>>>>>>> Stashed changes
                            </div>
                        </div>
                        <div className="gallery-info">
                            <div className="info-card">
                                <h4><FaRuler /> Project Specifications</h4>
                                <div className="specs-grid">
                                    <div className="spec">
<<<<<<< Updated upstream
                                        <strong>Duration:</strong> {displayProject.duration}
                                    </div>
                                    <div className="spec">
                                        <strong>Area:</strong> {displayProject.area}
                                    </div>
                                    <div className="spec">
                                        <strong>Complexity:</strong> {displayProject.complexity}
                                    </div>
                                    <div className="spec">
                                        <strong>Estimated Cost:</strong> {displayProject.estimatedCost}
                                    </div>
                                    <div className="spec">
                                        <strong>Project Type:</strong> {displayProject.projectType || 'Residential'}
                                    </div>
                                    <div className="spec">
                                        <strong>Material Grade:</strong> Premium
=======
                                        <strong>Duration:</strong> {currentProject.duration}
                                    </div>
                                    <div className="spec">
                                        <strong>Area:</strong> {currentProject.area}
                                    </div>
                                    <div className="spec">
                                        <strong>Complexity:</strong> {currentProject.complexity}
                                    </div>
                                    <div className="spec">
                                        <strong>Estimated Cost:</strong> {currentProject.estimatedCost}
                                    </div>
                                    <div className="spec">
                                        <strong>Project Type:</strong> {currentProject.projectType || 'Residential'}
>>>>>>> Stashed changes
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="gallery-thumbnails">
                        {projectImages.map((img, index) => (
                            <div 
                                key={index} 
                                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                                onClick={() => setCurrentImageIndex(index)}
                            >
                                <img src={img} alt={`Thumbnail ${index + 1}`} />
<<<<<<< Updated upstream
=======
                                <div className="thumbnail-overlay">
                                    <FaImages />
                                </div>
>>>>>>> Stashed changes
                            </div>
                        ))}
                    </div>
                </div>

                {/* Project Stats */}
                <div className="project-stats-section">
                    <div className="stat-card">
<<<<<<< Updated upstream
                        <div className="stat-icon">
=======
                        <div className="stat-icon" style={{ color: '#D4AF37' }}>
>>>>>>> Stashed changes
                            <FaClock />
                        </div>
                        <div className="stat-content">
                            <h4>Time Saved</h4>
                            <p>30% faster than traditional methods</p>
                        </div>
                    </div>
                    <div className="stat-card">
<<<<<<< Updated upstream
                        <div className="stat-icon">
=======
                        <div className="stat-icon" style={{ color: '#4CAF50' }}>
>>>>>>> Stashed changes
                            <FaMoneyBill />
                        </div>
                        <div className="stat-content">
                            <h4>Cost Effective</h4>
                            <p>Best price guarantee</p>
                        </div>
                    </div>
                    <div className="stat-card">
<<<<<<< Updated upstream
                        <div className="stat-icon">
=======
                        <div className="stat-icon" style={{ color: '#2196F3' }}>
>>>>>>> Stashed changes
                            <FaShieldAlt />
                        </div>
                        <div className="stat-content">
                            <h4>Warranty</h4>
                            <p>5 years comprehensive warranty</p>
                        </div>
                    </div>
                    <div className="stat-card">
<<<<<<< Updated upstream
                        <div className="stat-icon">
=======
                        <div className="stat-icon" style={{ color: '#FF9800' }}>
>>>>>>> Stashed changes
                            <FaClipboardCheck />
                        </div>
                        <div className="stat-content">
                            <h4>Quality</h4>
                            <p>Premium materials & craftsmanship</p>
                        </div>
                    </div>
                </div>

                {/* Project Tabs */}
                <div className="project-tabs">
                    <button 
                        className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <FaHome /> Overview
                    </button>
                    <button 
                        className={`tab ${activeTab === 'details' ? 'active' : ''}`}
                        onClick={() => setActiveTab('details')}
                    >
                        <FaTools /> Project Details
                    </button>
                    <button 
                        className={`tab ${activeTab === 'contractors' ? 'active' : ''}`}
                        onClick={() => setActiveTab('contractors')}
                    >
<<<<<<< Updated upstream
                        <FaUserTie /> Hire Contractors
=======
                        <FaUserTie /> Hire Contractors ({sampleContractors.length})
>>>>>>> Stashed changes
                    </button>
                    <button 
                        className={`tab ${activeTab === 'process' ? 'active' : ''}`}
                        onClick={() => setActiveTab('process')}
                    >
                        <FaWrench /> Work Process
                    </button>
<<<<<<< Updated upstream
                    <button 
                        className={`tab ${activeTab === 'inquiry' ? 'active' : ''}`}
                        onClick={() => setActiveTab('inquiry')}
                    >
                        <FaShoppingCart /> Get Quote
                    </button>
=======
>>>>>>> Stashed changes
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                    {activeTab === 'overview' && (
                        <div className="overview-content">
                            <div className="project-description">
                                <h3>Project Description</h3>
<<<<<<< Updated upstream
                                <p>{displayProject.description}</p>
=======
                                <p>{currentProject.description}</p>
>>>>>>> Stashed changes
                                <div className="description-features">
                                    <div className="feature-highlight">
                                        <FaCheckCircle />
                                        <span>Custom designed to client specifications</span>
                                    </div>
                                    <div className="feature-highlight">
                                        <FaCheckCircle />
                                        <span>Premium materials for long-lasting durability</span>
                                    </div>
                                    <div className="feature-highlight">
                                        <FaCheckCircle />
                                        <span>Smart storage solutions for maximum space utilization</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="project-highlights">
                                <h3>Key Features & Benefits</h3>
                                <div className="highlights-grid">
<<<<<<< Updated upstream
                                    {displayProject.features?.map((feature, index) => (
=======
                                    {currentProject.features?.map((feature, index) => (
>>>>>>> Stashed changes
                                        <div key={index} className="highlight">
                                            <div className="highlight-icon">
                                                <FaLightbulb />
                                            </div>
                                            <div className="highlight-content">
                                                <h5>Feature {index + 1}</h5>
                                                <p>{feature}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
<<<<<<< Updated upstream
                            <div className="project-materials">
                                <h3>Materials & Finishes</h3>
                                <div className="materials-grid">
                                    {displayProject.materials?.map((material, index) => (
                                        <div key={index} className="material">
                                            <div className="material-icon">
                                                <FaPaintRoller />
                                            </div>
                                            <div className="material-content">
                                                <h5>Material {index + 1}</h5>
                                                <p>{material}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="project-tags">
                                <h3>Project Tags</h3>
                                <div className="tags-container">
                                    {displayProject.tags?.map((tag, index) => (
=======
                            <div className="project-tags">
                                <h3>Project Tags</h3>
                                <div className="tags-container">
                                    {currentProject.tags?.map((tag, index) => (
>>>>>>> Stashed changes
                                        <span key={index} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'details' && (
                        <div className="details-content">
                            <div className="details-grid">
                                <div className="detail-card">
                                    <h4><FaRuler /> Technical Specifications</h4>
                                    <div className="specs-list">
                                        <div className="spec-item">
                                            <strong>Dimensions:</strong> Custom as per space
                                        </div>
                                        <div className="spec-item">
<<<<<<< Updated upstream
                                            <strong>Material Thickness:</strong> 18mm Premium Plywood
=======
                                            <strong>Material Thickness:</strong> {currentProject.materials?.[0] || '18mm Premium Plywood'}
>>>>>>> Stashed changes
                                        </div>
                                        <div className="spec-item">
                                            <strong>Finish:</strong> Matte Laminate
                                        </div>
                                        <div className="spec-item">
                                            <strong>Hardware:</strong> German Brand Hinges
                                        </div>
                                        <div className="spec-item">
                                            <strong>Lighting:</strong> LED Strip Lights
                                        </div>
                                        <div className="spec-item">
                                            <strong>Warranty:</strong> 5 Years
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="detail-card">
                                    <h4><FaCalendarAlt /> Timeline Breakdown</h4>
                                    <div className="timeline">
                                        <div className="timeline-item">
                                            <div className="timeline-marker">1</div>
                                            <div className="timeline-content">
                                                <h5>Day 1-3: Consultation & Design</h5>
                                                <p>Site measurement and 3D design presentation</p>
                                            </div>
                                        </div>
                                        <div className="timeline-item">
                                            <div className="timeline-marker">2</div>
                                            <div className="timeline-content">
                                                <h5>Day 4-7: Material Selection</h5>
                                                <p>Client approval of materials and finishes</p>
                                            </div>
                                        </div>
                                        <div className="timeline-item">
                                            <div className="timeline-marker">3</div>
                                            <div className="timeline-content">
                                                <h5>Day 8-18: Fabrication</h5>
                                                <p>Precision cutting and assembly in workshop</p>
                                            </div>
                                        </div>
                                        <div className="timeline-item">
                                            <div className="timeline-marker">4</div>
                                            <div className="timeline-content">
                                                <h5>Day 19-21: Installation</h5>
                                                <p>On-site installation and finishing</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="detail-card">
                                    <h4><FaMoneyBill /> Cost Breakdown</h4>
                                    <div className="cost-breakdown">
                                        <div className="cost-item">
                                            <span>Materials Cost</span>
<<<<<<< Updated upstream
                                            <span>₹80,000 - ₹1,00,000</span>
                                        </div>
                                        <div className="cost-item">
                                            <span>Labor Cost</span>
                                            <span>₹40,000 - ₹60,000</span>
                                        </div>
                                        <div className="cost-item">
                                            <span>Hardware & Fittings</span>
                                            <span>₹20,000 - ₹30,000</span>
=======
                                            <span>{currentProject.category === 'door' ? '₹15,000 - ₹25,000' : 
                                                  currentProject.category === 'wainscoting' ? '₹20,000 - ₹35,000' : 
                                                  '₹80,000 - ₹1,00,000'}</span>
                                        </div>
                                        <div className="cost-item">
                                            <span>Labor Cost</span>
                                            <span>{currentProject.category === 'door' ? '₹8,000 - ₹12,000' : 
                                                  currentProject.category === 'wainscoting' ? '₹10,000 - ₹18,000' : 
                                                  '₹40,000 - ₹60,000'}</span>
                                        </div>
                                        <div className="cost-item">
                                            <span>Hardware & Fittings</span>
                                            <span>{currentProject.category === 'door' ? '₹2,000 - ₹3,000' : 
                                                  currentProject.category === 'wainscoting' ? '₹5,000 - ₹7,000' : 
                                                  '₹20,000 - ₹30,000'}</span>
>>>>>>> Stashed changes
                                        </div>
                                        <div className="cost-item">
                                            <span>Design & Consultation</span>
                                            <span>₹10,000</span>
                                        </div>
                                        <div className="cost-item total">
                                            <strong>Total Estimated Cost</strong>
<<<<<<< Updated upstream
                                            <strong>{displayProject.estimatedCost}</strong>
=======
                                            <strong>{currentProject.estimatedCost}</strong>
>>>>>>> Stashed changes
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'contractors' && (
                        <div className="contractors-content">
                            <div className="section-header">
<<<<<<< Updated upstream
                                <h3>Recommended Contractors</h3>
                                <p className="subtitle">Specialized professionals for {displayProject.category} projects</p>
                            </div>
                            
                            <div className="contractors-grid">
                                {displayContractors.map(contractor => (
                                    <div 
                                        key={contractor.id} 
                                        className={`contractor-card ${selectedContractor?.id === contractor.id ? 'selected' : ''}`}
                                        onClick={() => setSelectedContractor(contractor)}
                                    >
                                        <div className="contractor-card-header">
                                            <div className="contractor-avatar">
                                                <img src={contractor.image} alt={contractor.name} />
                                                {contractor.verified && (
                                                    <span className="verified-badge">
                                                        <FaStar />
                                                    </span>
                                                )}
                                            </div>
                                            <div className="contractor-info">
                                                <h4>{contractor.name}</h4>
                                                <div className="contractor-specialization">
                                                    {contractor.specialization}
                                                </div>
                                                <div className="contractor-rating">
                                                    <div className="stars">
                                                        {[...Array(5)].map((_, i) => (
                                                            i < Math.floor(contractor.rating) ? 
                                                            <FaStar key={i} /> : 
                                                            i < contractor.rating ? 
                                                            <FaStarHalfAlt key={i} /> : 
                                                            <FaRegStar key={i} />
                                                        ))}
                                                    </div>
                                                    <span className="rating-text">{contractor.rating}/5</span>
                                                    <span className="projects-count">({contractor.projectsCompleted} projects)</span>
                                                </div>
                                            </div>
                                            <div className="contractor-rate">
                                                {contractor.hourlyRate}
                                            </div>
                                        </div>
                                        
                                        <div className="contractor-card-body">
                                            <div className="skills-section">
                                                <h5>Skills</h5>
                                                <div className="skills-tags">
                                                    {contractor.skills.map((skill, index) => (
                                                        <span key={index} className="skill-tag">{skill}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <div className="contractor-details">
                                                <div className="detail">
                                                    <FaCalendarAlt />
                                                    <span><strong>{contractor.experience}</strong> experience</span>
                                                </div>
                                                <div className="detail">
                                                    <FaClock />
                                                    <span>Response: {contractor.responseTime}</span>
                                                </div>
                                                <div className="detail">
                                                    <FaCertificate />
                                                    <span>{contractor.certifications?.length || 0} certifications</span>
                                                </div>
                                            </div>
                                            
                                            {contractor.portfolioImages && (
                                                <div className="portfolio-preview">
                                                    <h5>Portfolio Preview</h5>
                                                    <div className="portfolio-images">
                                                        {contractor.portfolioImages.slice(0, 3).map((img, index) => (
                                                            <img key={index} src={img} alt={`Portfolio ${index + 1}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="contractor-card-actions">
                                            <button 
                                                className="action-btn hire-now"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleHireNow(contractor);
                                                }}
                                            >
                                                <FaWhatsapp /> Hire Now
                                            </button>
                                            <div className="quick-actions">
                                                <button 
                                                    className="quick-btn call"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        callContractor(contractor.phone);
                                                    }}
                                                    title="Call"
                                                >
                                                    <FaPhone />
                                                </button>
                                                <button 
                                                    className="quick-btn whatsapp"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        whatsappContractor(contractor);
                                                    }}
                                                    title="WhatsApp"
                                                >
                                                    <FaWhatsapp />
                                                </button>
                                                <button 
                                                    className="quick-btn email"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        emailContractor(contractor);
                                                    }}
                                                    title="Email"
                                                >
                                                    <FaEnvelope />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
=======
                                <h3>Recommended Contractors for {currentProject.title}</h3>
                                <p className="subtitle">Showing {sampleContractors.length} specialized contractors</p>
                            </div>
                            
                            {sampleContractors.length === 0 ? (
                                <div className="no-contractors">
                                    <div className="no-contractors-icon">
                                        <FaUserTie />
                                    </div>
                                    <h4>No contractors found</h4>
                                    <p>Browse all contractors</p>
                                </div>
                            ) : (
                                <div className="contractors-grid">
                                    {sampleContractors.map(contractor => (
                                        <div 
                                            key={contractor.id} 
                                            className={`contractor-card ${selectedContractor?.id === contractor.id ? 'selected' : ''}`}
                                            onClick={() => setSelectedContractor(contractor)}
                                        >
                                            <div className="contractor-card-header">
                                                <div className="contractor-avatar">
                                                    <img src={contractor.image} alt={contractor.name} />
                                                    {contractor.verified && (
                                                        <span className="verified-badge">
                                                            <FaStar />
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="contractor-info">
                                                    <h4>{contractor.name}</h4>
                                                    <div className="contractor-specialization">
                                                        {contractor.specialization}
                                                    </div>
                                                    <div className="contractor-rating">
                                                        <div className="stars">
                                                            {[...Array(5)].map((_, i) => (
                                                                i < Math.floor(contractor.rating) ? 
                                                                <FaStar key={i} /> : 
                                                                i < contractor.rating ? 
                                                                <FaStarHalfAlt key={i} /> : 
                                                                <FaRegStar key={i} />
                                                            ))}
                                                        </div>
                                                        <span className="rating-text">{contractor.rating}/5</span>
                                                        <span className="projects-count">({contractor.projectsCompleted} projects)</span>
                                                    </div>
                                                </div>
                                                <div className="contractor-rate">
                                                    {contractor.hourlyRate}
                                                </div>
                                            </div>
                                            
                                            <div className="contractor-card-body">
                                                <div className="skills-section">
                                                    <h5>Skills</h5>
                                                    <div className="skills-tags">
                                                        {contractor.skills.map((skill, index) => (
                                                            <span key={index} className="skill-tag">{skill}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                
                                                <div className="contractor-details">
                                                    <div className="detail">
                                                        <FaCalendarAlt />
                                                        <span><strong>{contractor.experience}</strong> experience</span>
                                                    </div>
                                                    <div className="detail">
                                                        <FaClock />
                                                        <span>Response: {contractor.responseTime}</span>
                                                    </div>
                                                    <div className="detail">
                                                        <FaCertificate />
                                                        <span>{contractor.certifications?.length || 0} certifications</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="contractor-card-actions">
                                                <button 
                                                    className="action-btn hire-now"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleHireNow(contractor);
                                                    }}
                                                >
                                                    <FaWhatsapp /> Hire Now
                                                </button>
                                                <div className="quick-actions">
                                                    <button 
                                                        className="quick-btn call"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            callContractor(contractor.phone);
                                                        }}
                                                        title="Call"
                                                    >
                                                        <FaPhone />
                                                    </button>
                                                    <button 
                                                        className="quick-btn whatsapp"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            whatsappContractor(contractor);
                                                        }}
                                                        title="WhatsApp"
                                                    >
                                                        <FaWhatsapp />
                                                    </button>
                                                    <button 
                                                        className="quick-btn email"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            emailContractor(contractor);
                                                        }}
                                                        title="Email"
                                                    >
                                                        <FaEnvelope />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
>>>>>>> Stashed changes
                        </div>
                    )}

                    {activeTab === 'process' && (
                        <div className="process-content">
                            <div className="section-header">
                                <h3>Our Complete Work Process</h3>
                                <p className="subtitle">From concept to completion - our 6-step process</p>
                            </div>
                            
                            <div className="process-steps">
                                <div className="process-step">
                                    <div className="step-header">
                                        <div className="step-number">01</div>
                                        <h4>Initial Consultation</h4>
                                    </div>
                                    <div className="step-content">
                                        <p>Free site visit and detailed discussion about your requirements, budget, and timeline.</p>
                                        <ul>
                                            <li>Site measurement</li>
                                            <li>Requirement analysis</li>
                                            <li>Budget planning</li>
                                            <li>Timeline discussion</li>
                                        </ul>
                                    </div>
                                    <div className="step-duration">
                                        <FaClock /> 1-2 Days
                                    </div>
                                </div>
                                
                                <div className="process-step">
                                    <div className="step-header">
                                        <div className="step-number">02</div>
                                        <h4>Design & 3D Visualization</h4>
                                    </div>
                                    <div className="step-content">
                                        <p>Creation of detailed 3D designs and virtual walkthroughs for your approval.</p>
                                        <ul>
                                            <li>3D design creation</li>
                                            <li>Material selection</li>
                                            <li>Virtual walkthrough</li>
                                            <li>Client approval</li>
                                        </ul>
                                    </div>
                                    <div className="step-duration">
                                        <FaClock /> 3-5 Days
                                    </div>
                                </div>
                                
                                <div className="process-step">
                                    <div className="step-header">
                                        <div className="step-number">03</div>
                                        <h4>Material Procurement</h4>
                                    </div>
                                    <div className="step-content">
                                        <p>Sourcing of premium materials and hardware from trusted suppliers.</p>
                                        <ul>
                                            <li>Material sourcing</li>
                                            <li>Quality checking</li>
                                            <li>Hardware selection</li>
                                            <li>Inventory management</li>
                                        </ul>
                                    </div>
                                    <div className="step-duration">
                                        <FaClock /> 2-4 Days
                                    </div>
                                </div>
                                
                                <div className="process-step">
                                    <div className="step-header">
                                        <div className="step-number">04</div>
                                        <h4>Precision Fabrication</h4>
                                    </div>
                                    <div className="step-content">
                                        <p>Expert fabrication in our workshop using advanced machinery and techniques.</p>
                                        <ul>
                                            <li>Precision cutting</li>
                                            <li>Assembly</li>
                                            <li>Finishing</li>
                                            <li>Quality control</li>
                                        </ul>
                                    </div>
                                    <div className="step-duration">
                                        <FaClock /> 7-10 Days
                                    </div>
                                </div>
                                
                                <div className="process-step">
                                    <div className="step-header">
                                        <div className="step-number">05</div>
                                        <h4>Professional Installation</h4>
                                    </div>
                                    <div className="step-content">
                                        <p>On-site installation by skilled craftsmen with minimal disruption.</p>
                                        <ul>
                                            <li>Site preparation</li>
                                            <li>Installation</li>
                                            <li>Finishing touches</li>
                                            <li>Cleanup</li>
                                        </ul>
                                    </div>
                                    <div className="step-duration">
                                        <FaClock /> 3-5 Days
                                    </div>
                                </div>
                                
                                <div className="process-step">
                                    <div className="step-header">
                                        <div className="step-number">06</div>
                                        <h4>Handover & Support</h4>
                                    </div>
                                    <div className="step-content">
                                        <p>Final inspection, handover, and ongoing support and maintenance.</p>
                                        <ul>
                                            <li>Final inspection</li>
                                            <li>Client walkthrough</li>
                                            <li>Warranty documentation</li>
                                            <li>After-sales support</li>
                                        </ul>
                                    </div>
                                    <div className="step-duration">
                                        <FaClock /> 1-2 Days
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
<<<<<<< Updated upstream

                    {activeTab === 'inquiry' && (
                        <div className="inquiry-content">
                            <div className="inquiry-header">
                                <h3>Get Your Custom Quote</h3>
                                <p className="subtitle">Fill out the form below and get instant pricing for your project</p>
                            </div>
                            
                            <div className="inquiry-form-container">
                                <div className="form-section">
                                    <h4>Project Details</h4>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Project Type</label>
                                            <select defaultValue={displayProject.category}>
                                                <option value="wardrobe">Custom Wardrobe</option>
                                                <option value="kitchen">Modular Kitchen</option>
                                                <option value="bed">Custom Bed</option>
                                                <option value="tv-unit">TV Unit</option>
                                                <option value="complete">Complete Interior</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Area Size (sq ft)</label>
                                            <input type="number" placeholder="e.g., 45" defaultValue={displayProject.area?.match(/\d+/)?.[0] || ''} />
                                        </div>
                                        <div className="form-group">
                                            <label>Budget Range</label>
                                            <select defaultValue="1-2">
                                                <option value="under-1">Under ₹1,00,000</option>
                                                <option value="1-2">₹1,00,000 - ₹2,00,000</option>
                                                <option value="2-5">₹2,00,000 - ₹5,00,000</option>
                                                <option value="5+">Above ₹5,00,000</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Timeline</label>
                                            <select defaultValue="2-4">
                                                <option value="1-2">1-2 Weeks</option>
                                                <option value="2-4">2-4 Weeks</option>
                                                <option value="1-2m">1-2 Months</option>
                                                <option value="2+m">2+ Months</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="form-section">
                                    <h4>Your Information</h4>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <input type="text" placeholder="Enter your name" />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone Number</label>
                                            <input type="tel" placeholder="Enter your phone number" />
                                        </div>
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input type="email" placeholder="Enter your email" />
                                        </div>
                                        <div className="form-group">
                                            <label>City</label>
                                            <input type="text" placeholder="Enter your city" defaultValue="Mumbai" />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="form-section">
                                    <h4>Additional Requirements</h4>
                                    <div className="form-group">
                                        <label>Project Description</label>
                                        <textarea 
                                            placeholder="Describe your project requirements, special features needed, etc."
                                            rows="4"
                                            defaultValue={`I'm interested in a project similar to "${displayProject.title}". Key requirements include: ${displayProject.features?.join(', ')}.`}
                                        ></textarea>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Preferred Contact Method</label>
                                        <div className="contact-methods">
                                            <label className="method-option">
                                                <input type="radio" name="contact" defaultChecked />
                                                <span>WhatsApp</span>
                                            </label>
                                            <label className="method-option">
                                                <input type="radio" name="contact" />
                                                <span>Phone Call</span>
                                            </label>
                                            <label className="method-option">
                                                <input type="radio" name="contact" />
                                                <span>Email</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Best Time to Contact</label>
                                        <select defaultValue="anytime">
                                            <option value="anytime">Anytime</option>
                                            <option value="morning">Morning (9 AM - 12 PM)</option>
                                            <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                                            <option value="evening">Evening (4 PM - 8 PM)</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="form-actions">
                                    <button className="submit-btn whatsapp">
                                        <FaWhatsapp /> Get Instant Quote on WhatsApp
                                    </button>
                                    <button className="submit-btn call">
                                        <FaPhone /> Schedule Call Back
                                    </button>
                                    <button className="submit-btn email">
                                        <FaEnvelope /> Send via Email
                                    </button>
                                </div>
                                
                                <div className="form-notice">
                                    <FaShieldAlt />
                                    <p>Your information is secure and will only be used to provide you with the best service. No spam, guaranteed.</p>
                                </div>
                            </div>
                        </div>
                    )}
=======
>>>>>>> Stashed changes
                </div>

                {/* Similar Projects */}
                <div className="similar-projects">
<<<<<<< Updated upstream
                    <h3>Similar Projects You Might Like</h3>
=======
                    <div className="similar-projects-header">
                        <h3>Similar Projects</h3>
                        <div className="view-all">
                            <span>Showing {similarProjects.length} projects</span>
                            <button className="view-all-btn" onClick={() => navigate('/portfolio')}>
                                View All <FaArrowRight />
                            </button>
                        </div>
                    </div>
>>>>>>> Stashed changes
                    <div className="projects-grid">
                        {similarProjects.map(project => (
                            <div 
                                key={project.id} 
                                className="similar-project-card"
<<<<<<< Updated upstream
                                onClick={() => navigate('/project-complete', { 
                                    state: { project, contractors: displayContractors } 
                                })}
                            >
                                <div className="project-image">
                                    <img src={project.image} alt={project.title} />
                                    <div className="project-category">{project.category}</div>
=======
                                onClick={() => handleSimilarProjectClick(project)}
                            >
                                <div className="project-image">
                                    <img src={project.image} alt={project.title} />
                                    <div className="project-category" style={{ backgroundColor: getCategoryColor(project.category) }}>
                                        {project.category}
                                    </div>
                                    <div className="project-overlay">
                                        <FaEye />
                                    </div>
>>>>>>> Stashed changes
                                </div>
                                <div className="project-info">
                                    <h4>{project.title}</h4>
                                    <div className="project-meta">
                                        <span><FaClock /> {project.duration}</span>
                                        <span><FaMoneyBill /> {project.cost}</span>
                                    </div>
<<<<<<< Updated upstream
                                    <button className="view-project-btn">
=======
                                    <button 
                                        className="view-project-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSimilarProjectClick(project);
                                        }}
                                    >
>>>>>>> Stashed changes
                                        <FaArrowRight /> View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
<<<<<<< Updated upstream

                {/* Social Share */}
                <div className="social-share">
                    <h4>Share this Project</h4>
                    <div className="share-buttons">
                        <button className="share-btn facebook">
                            <FaFacebook /> Facebook
                        </button>
                        <button className="share-btn whatsapp">
                            <FaWhatsapp /> WhatsApp
                        </button>
                        <button className="share-btn instagram">
                            <FaInstagram /> Instagram
                        </button>
                        <button className="share-btn twitter">
                            <FaTwitter /> Twitter
                        </button>
                        <button className="share-btn linkedin">
                            <FaLinkedin /> LinkedIn
                        </button>
                    </div>
                </div>
=======
>>>>>>> Stashed changes
            </div>
            
            {/* Fullscreen Gallery Modal */}
            {isFullscreen && (
                <div className="fullscreen-modal" onClick={toggleFullscreen}>
                    <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-fullscreen" onClick={toggleFullscreen}>
                            ×
                        </button>
                        <img src={projectImages[currentImageIndex]} alt="Fullscreen view" />
                        <button className="nav-btn fullscreen-prev" onClick={prevImage}>
                            <FaCaretLeft />
                        </button>
                        <button className="nav-btn fullscreen-next" onClick={nextImage}>
                            <FaCaretRight />
                        </button>
                        <div className="fullscreen-counter">
                            {currentImageIndex + 1} / {projectImages.length}
                        </div>
                    </div>
                </div>
            )}
<<<<<<< Updated upstream
=======

            {/* CSS for notification */}
            <style>{`
                .project-switch-notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: rgba(26, 26, 26, 0.95);
                    border: 1px solid #D4AF37;
                    border-radius: 10px;
                    padding: 15px 20px;
                    color: white;
                    z-index: 1000;
                    animation: slideIn 0.3s ease;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                    max-width: 300px;
                }
                
                .notification-content {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
                
                .notification-content span {
                    color: #D4AF37;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .notification-content strong {
                    font-size: 14px;
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .loading-project {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background: #0a0a0a;
                    color: #D4AF37;
                    font-size: 1.2rem;
                }
            `}</style>
>>>>>>> Stashed changes
        </div>
    );
};

export default ProjectComplete;