import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import GalleryItem from './GalleryItem';
import FurnitureWork from './FurnitureWork';
import ContractCarpainter from './ContractCarpainter';
import ProjectComplete from './ProjectComplete';
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaStar, FaCalendarAlt, FaImages, FaUserTie, FaClock, FaMoneyBill, FaCheckCircle, FaTools, FaArrowRight, FaHome, FaCouch, FaChair, FaTable, FaDoorOpen, FaShapes } from 'react-icons/fa';
import './Interior.css';
import './GalleryItem.css'; 

const InteriorPage = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [activeWorkType, setActiveWorkType] = useState('wardrobe');
    const [projectGalleryIndex, setProjectGalleryIndex] = useState(0);
    
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
            features: ['Sliding doors', 'Mirror finish', 'LED lighting', 'Drawer systems'],
            contractors: [1, 2, 4]
        },
        {
            id: 'bed',
            title: 'Custom Beds',
            description: 'Masterpiece beds with storage and lighting',
            image: 'https://i.pinimg.com/564x/93/49/bb/9349bbfcd0f234f618c9b2926a197d64.jpg',
            projectCount: 32,
            color: '#34A853',
            icon: '🛏️',
            features: ['Storage beds', 'Canopy designs', 'Upholstered', 'LED headboards'],
            contractors: [1, 3]
        },
        {
            id: 'kitchen',
            title: 'Modular Kitchens',
            description: 'Ergonomic kitchen designs with premium hardware',
            image: 'https://images.stockcake.com/public/f/0/a/f0a9652d-f99c-4f80-b758-c912017f5158_large/modern-kitchen-interior-stockcake.jpg',
            projectCount: 38,
            color: '#FBBC05',
            icon: '🍳',
            features: ['Soft-close drawers', 'Pull-out systems', 'Quartz countertops', 'Backlighting'],
            contractors: [2, 3, 5]
        },
        {
            id: 'tv-unit',
            title: 'TV Units & Walls',
            description: 'Feature walls with integrated entertainment systems',
            image: 'https://i.pinimg.com/564x/42/04/8f/42048f89d7d50e6325028887e3f3c81f.jpg',
            projectCount: 28,
            color: '#EA4335',
            icon: '📺',
            features: ['Wall paneling', 'Cable management', 'Display shelves', 'Ambient lighting'],
            contractors: [1, 4, 6]
        },
        {
            id: 'pooja-unit',
            title: 'Pooja Units',
            description: 'Traditional and modern prayer room designs',
            image: 'https://i.pinimg.com/564x/1a/15/38/1a15388968e4a4c69a4c40a88853432c.jpg',
            projectCount: 25,
            color: '#8E44AD',
            icon: '🕉️',
            features: ['Carved designs', 'LED backlight', 'Storage cabinets', 'Temple designs'],
            contractors: [2, 5]
        },
        {
            id: 'study-table',
            title: 'Study Units',
            description: 'Ergonomic study tables and book shelves',
            image: 'https://i.pinimg.com/564x/74/14/68/74146836e8b776e553ad23583c02ab6f.jpg',
            projectCount: 22,
            color: '#16A085',
            icon: '📚',
            features: ['Built-in lighting', 'Cable ports', 'Adjustable shelves', 'Hidden storage'],
            contractors: [3, 4]
        },
        {
            id: 'shoe-rack',
            title: 'Shoe Racks',
            description: 'Organized shoe storage solutions',
            image: 'https://i.pinimg.com/564x/32/fd/3f/32fd3fe8a8a3db27dcdc91ad7a4b10a4.jpg',
            projectCount: 30,
            color: '#E74C3C',
            icon: '👟',
            features: ['Ventilated design', 'Pull-out trays', 'Bench seating', 'Mirror finish'],
            contractors: [1, 6]
        },
        {
            id: 'bar-unit',
            title: 'Bar Units',
            description: 'Home bar designs with glass displays',
            image: 'https://i.pinimg.com/564x/9c/41/b5/9c41b5a82d88242ab26c670a3fa9c3e3.jpg',
            projectCount: 18,
            color: '#3498DB',
            icon: '🍷',
            features: ['Glass cabinets', 'Wine racks', 'LED lighting', 'Bar seating'],
            contractors: [2, 5]
        },
        {
            id: 'wall-unit',
            title: 'Wall Units',
            description: 'Complete wall paneling and storage systems',
            image: 'https://i.pinimg.com/564x/5d/54/2b/5d542b2489a83a2db8dc83efb8d83c57.jpg',
            projectCount: 35,
            color: '#9B59B6',
            icon: '🧱',
            features: ['Full-wall panels', 'Hidden storage', 'Display niches', 'Mood lighting'],
            contractors: [4, 6]
        },
        {
            id: 'bookshelf',
            title: 'Bookshelves',
            description: 'Custom bookshelves and display units',
            image: 'https://i.pinimg.com/564x/68/a3/d4/68a3d4f3742e4c0c13b78099458bf6bc.jpg',
            projectCount: 20,
            color: '#2ECC71',
            icon: '📖',
            features: ['Floating shelves', 'Glass doors', 'LED strips', 'Adjustable height'],
            contractors: [3, 4]
        },
        {
            id: 'dressing-table',
            title: 'Dressing Tables',
            description: 'Vanity units with storage and lighting',
            image: 'https://i.pinimg.com/564x/3b/e5/5d/3be55d7ba59a26e69df2b201cd7b1087.jpg',
            projectCount: 25,
            color: '#E67E22',
            icon: '💄',
            features: ['Mirror lighting', 'Jewelry drawers', 'Makeup storage', 'Stool included'],
            contractors: [1, 2]
        },
        {
            id: 'kids-room',
            title: 'Kids Room Furniture',
            description: 'Themed furniture for children\'s rooms',
            image: 'https://i.pinimg.com/564x/7a/41/2d/7a412dfe2a8c1b5c5e6876fe2cf7e920.jpg',
            projectCount: 28,
            color: '#F1C40F',
            icon: '🧸',
            features: ['Theme-based designs', 'Safety features', 'Growth adaptable', 'Colorful finishes'],
            contractors: [3, 5]
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
            description: 'Luxurious walk-in wardrobe with full-length mirrors, LED lighting, and custom drawer systems. Perfect for organizing your clothing collection with premium finishes and smart storage solutions.',
            tags: ['Walk-in', 'Mirror Finish', 'LED Lighting', 'Custom Storage'],
            duration: '3 weeks',
            features: ['Pull-out tie racks', 'Jewelry drawers', 'Shoe carousels', 'Steam iron cabinet'],
            materials: ['Premium Plywood', 'Glass Doors', 'Aluminum Handles', 'LED Strips'],
            area: '45 sq ft',
            contractorMatch: [1, 2],
            complexity: 'High',
            estimatedCost: '₹1,50,000 - ₹2,00,000'
        },
        {
            id: 2,
            title: 'Sliding Door Wardrobe',
            category: 'wardrobe',
            image: 'https://i.pinimg.com/564x/c4/91/48/c49148dbbf42af433d744f1605d7f345.jpg',
            description: 'Modern sliding door wardrobe with frosted glass and smart compartmentalization. Space-saving design with smooth sliding mechanisms and elegant finishes.',
            tags: ['Sliding Doors', 'Frosted Glass', 'Smart Compartments'],
            duration: '2 weeks',
            features: ['Full-height doors', 'Mirror panels', 'Hanging rods', 'Shelf organizers'],
            materials: ['Engineered Wood', 'Frosted Glass', 'Soft-close Slides'],
            area: '30 sq ft',
            contractorMatch: [1, 4],
            complexity: 'Medium',
            estimatedCost: '₹80,000 - ₹1,20,000'
        },
        
        // Bed Projects
        {
            id: 3,
            title: 'Canopy Bed Masterpiece',
            category: 'bed',
            image: 'https://i.pinimg.com/564x/93/49/bb/9349bbfcd0f234f618c9b2926a197d64.jpg',
            description: 'Elegant canopy bed with upholstered headboard and integrated lighting. Creates a luxurious bedroom centerpiece with premium fabric and modern features.',
            tags: ['Canopy Design', 'Upholstered', 'LED Lighting', 'Premium'],
            duration: '2 weeks',
            features: ['LED headboard', 'Storage drawers', 'Soft-close hinges', 'Premium fabric'],
            materials: ['Solid Wood', 'Premium Fabric', 'LED Lights'],
            area: 'Queen Size',
            contractorMatch: [1, 3],
            complexity: 'High',
            estimatedCost: '₹75,000 - ₹1,00,000'
        },
        {
            id: 4,
            title: 'Storage Bed with Drawers',
            category: 'bed',
            image: 'https://i.pinimg.com/564x/89/54/f2/8954f2055ec29f8886d79188e0dd5004.jpg',
            description: 'Space-saving storage bed with hydraulic lift system and multiple drawers. Perfect for maximizing storage in compact bedrooms.',
            tags: ['Storage Bed', 'Hydraulic Lift', 'Space Saving', 'Modern'],
            duration: '2 weeks',
            features: ['Hydraulic mechanism', '6 large drawers', 'USB charging ports', 'Headboard storage'],
            materials: ['Plywood', 'Hydraulic System', 'Fabric Upholstery'],
            area: 'King Size',
            contractorMatch: [1, 4],
            complexity: 'Medium',
            estimatedCost: '₹60,000 - ₹90,000'
        },
        
        // Kitchen Projects
        {
            id: 5,
            title: 'Gourmet Kitchen Island',
            category: 'kitchen',
            image: 'https://images.stockcake.com/public/f/0/a/f0a9652d-f99c-4f80-b758-c912017f5158_large/modern-kitchen-interior-stockcake.jpg',
            description: 'Professional kitchen with large island, breakfast bar, and premium appliances. Designed for cooking enthusiasts with smart storage and high-end finishes.',
            tags: ['Kitchen Island', 'Breakfast Bar', 'Professional', 'High-End'],
            duration: '6 weeks',
            features: ['Quartz countertop', 'Soft-close cabinets', 'Under-cabinet lighting', 'Pantry system'],
            materials: ['Quartz', 'Acrylic Finish', 'Premium Hardware'],
            area: '200 sq ft',
            contractorMatch: [2, 3],
            complexity: 'High',
            estimatedCost: '₹3,00,000 - ₹5,00,000'
        },
        
        // TV Unit Projects
        {
            id: 6,
            title: 'Entertainment Wall Unit',
            category: 'tv-unit',
            image: 'https://i.pinimg.com/564x/42/04/8f/42048f89d7d50e6325028887e3f3c81f.jpg',
            description: 'Modern entertainment wall with integrated TV unit, display shelves, and hidden storage. Perfect for living room organization.',
            tags: ['Wall-mounted', 'Storage', 'Display', 'Modern'],
            duration: '3 weeks',
            features: ['Floating design', 'Cable management', 'Glass cabinets', 'LED lighting'],
            materials: ['Plywood', 'Glass', 'Metal Frames', 'LED Strips'],
            area: '25 sq ft',
            contractorMatch: [4, 6],
            complexity: 'Medium',
            estimatedCost: '₹1,00,000 - ₹1,50,000'
        },
        
        // Study Table Projects
        {
            id: 7,
            title: 'Ergonomic Study Corner',
            category: 'study-table',
            image: 'https://i.pinimg.com/564x/74/14/68/74146836e8b776e553ad23583c02ab6f.jpg',
            description: 'Complete study setup with adjustable desk, bookshelves, and cable management system. Designed for productivity and comfort.',
            tags: ['Ergonomic', 'Adjustable', 'Storage', 'Modern'],
            duration: '2 weeks',
            features: ['Height-adjustable desk', 'Built-in lighting', 'Cable ports', 'Book display'],
            materials: ['Engineered Wood', 'Metal Frame', 'Acrylic', 'LED Lights'],
            area: '20 sq ft',
            contractorMatch: [3, 4],
            complexity: 'Medium',
            estimatedCost: '₹50,000 - ₹80,000'
        },
        
        // Shoe Rack Projects
        {
            id: 8,
            title: 'Custom Entryway Shoe Rack',
            category: 'shoe-rack',
            image: 'https://i.pinimg.com/564x/32/fd/3f/32fd3fe8a8a3db27dcdc91ad7a4b10a4.jpg',
            description: 'Built-in entryway shoe rack with bench seating and mirror. Space-saving solution with elegant design.',
            tags: ['Entryway', 'Bench Seating', 'Storage', 'Modern'],
            duration: '1 week',
            features: ['Ventilated design', 'Pull-out trays', 'Bench seat', 'Full-length mirror'],
            materials: ['Plywood', 'Fabric', 'Mirror', 'Metal Handles'],
            area: '15 sq ft',
            contractorMatch: [1, 6],
            complexity: 'Low',
            estimatedCost: '₹30,000 - ₹50,000'
        }
    ];

    // Enhanced Contractor Data
    const contractors = [
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
            skills: ["Wardrobe Making", "Bed Design", "Shoe Racks", "Custom Furniture"],
            availability: "Available for Consultation",
            projectsCompleted: 250,
            verified: true,
            languages: ["Hindi", "English", "Marathi"],
            portfolio: ["wardrobe", "bed", "shoe-rack"],
            expertise: ["Custom Furniture", "Precision Joinery", "Finish Carpentry"],
            responseTime: "Within 2 hours",
            hourlyRate: "₹500-800/hr",
            minProject: "₹50,000",
            certifications: ["Carpenter Certification", "Safety Training"]
        },
        {
            id: 2,
            name: "Anil Sharma",
            specialization: "Furniture Designer",
            experience: "10 years",
            rating: 4.7,
            location: "Mumbai",
            phone: "+91 88997 77665",
            whatsapp: "+91 88997 77665",
            email: "anil@interiorpro.com",
            image: "https://randomuser.me/api/portraits/men/67.jpg",
            skills: ["Design Consultation", "3D Modeling", "Material Selection", "Project Management"],
            availability: "Available Weekdays",
            projectsCompleted: 150,
            verified: true,
            languages: ["Hindi", "English", "Kannada"],
            portfolio: ["kitchen", "wardrobe", "dressing-table"],
            expertise: ["Design Consultation", "CAD Drawings", "Custom Solutions"],
            responseTime: "Within 4 hours",
            hourlyRate: "₹600-900/hr",
            minProject: "₹75,000",
            certifications: ["Interior Design Diploma", "AutoCAD Certified"]
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
            availability: "Available Immediately",
            projectsCompleted: 180,
            verified: true,
            languages: ["Hindi", "English"],
            portfolio: ["kitchen", "bar-unit", "kids-room"],
            expertise: ["Kitchen Planning", "Material Selection", "Installation"],
            responseTime: "Within 1 hour",
            hourlyRate: "₹550-850/hr",
            minProject: "₹1,00,000",
            certifications: ["Kitchen Specialist", "Safety Certified"]
        },
        {
            id: 4,
            name: "Suresh Patel",
            specialization: "TV Unit Expert",
            experience: "8 years",
            rating: 4.6,
            location: "Mumbai",
            phone: "+91 99887 66554",
            whatsapp: "+91 99887 66554",
            email: "suresh@interiorpro.com",
            image: "https://randomuser.me/api/portraits/men/22.jpg",
            skills: ["TV Units", "Wall Paneling", "Display Units", "Lighting Integration"],
            availability: "Available for Site Visits",
            projectsCompleted: 120,
            verified: true,
            languages: ["Hindi", "Marathi"],
            portfolio: ["tv-unit", "wall-unit", "bookshelf"],
            expertise: ["Wall Units", "Cable Management", "Lighting Design"],
            responseTime: "Within 3 hours",
            hourlyRate: "₹450-700/hr",
            minProject: "₹40,000",
            certifications: ["Carpentry Advanced", "Electrical Safety"]
        },
        {
            id: 5,
            name: "Ramesh Iyer",
            specialization: "Traditional Woodworker",
            experience: "20 years",
            rating: 4.9,
            location: "Mumbai",
            phone: "+91 88997 11223",
            whatsapp: "+91 88997 11223",
            email: "ramesh@interiorpro.com",
            image: "https://randomuser.me/api/portraits/men/55.jpg",
            skills: ["Pooja Units", "Carved Furniture", "Traditional Designs", "Wood Carving"],
            availability: "By Appointment",
            projectsCompleted: 300,
            verified: true,
            languages: ["Hindi", "Marathi", "Tamil"],
            portfolio: ["pooja-unit", "bar-unit", "kids-room"],
            expertise: ["Traditional Carving", "Wood Finishing", "Custom Designs"],
            responseTime: "Within 6 hours",
            hourlyRate: "₹700-1000/hr",
            minProject: "₹60,000",
            certifications: ["Traditional Woodwork", "Heritage Restoration"]
        },
        {
            id: 6,
            name: "Ajay Mehta",
            specialization: "Modern Furniture Maker",
            experience: "7 years",
            rating: 4.5,
            location: "Mumbai",
            phone: "+91 98765 77889",
            whatsapp: "+91 98765 77889",
            email: "ajay@interiorpro.com",
            image: "https://randomuser.me/api/portraits/men/66.jpg",
            skills: ["Modern Designs", "Minimalist Furniture", "Space-saving Solutions", "Multi-functional"],
            availability: "Flexible Hours",
            projectsCompleted: 90,
            verified: true,
            languages: ["Hindi", "English", "Gujarati"],
            portfolio: ["shoe-rack", "wall-unit", "study-table"],
            expertise: ["Modern Designs", "Space Optimization", "Multi-functional Furniture"],
            responseTime: "Within 2 hours",
            hourlyRate: "₹400-650/hr",
            minProject: "₹35,000",
            certifications: ["Modern Furniture Design", "Space Planning"]
        }
    ];

    const filteredItems = activeCategory === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeCategory);

    // Contact Contractor Functions
    const callContractor = (phone) => {
        window.location.href = `tel:${phone}`;
    };

    const whatsappContractor = (contractor, project = null, category = null) => {
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
        
        window.open(`https://wa.me/${contractor.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const emailContractor = (contractor, project = null, category = null) => {
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
        
        window.location.href = `mailto:${contractor.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const handleProjectClick = (project) => {
        // Navigate to ProjectComplete page with project data
        navigate('/project-complete', { 
            state: { 
                project: project,
                contractors: getMatchedContractors(project)
            } 
        });
    };

    const handleCategoryClick = (category) => {
        setActiveCategory(category.id);
        // Navigate to category projects view
        navigate('/category-projects', { state: { category } });
    };

    const closeModal = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'auto';
    };

    const nextGalleryImage = () => {
        const gallery = projectGalleries[selectedProject?.id] || [selectedProject?.image];
        setProjectGalleryIndex((prev) => (prev + 1) % gallery.length);
    };

    const prevGalleryImage = () => {
        const gallery = projectGalleries[selectedProject?.id] || [selectedProject?.image];
        setProjectGalleryIndex((prev) => prev === 0 ? gallery.length - 1 : prev - 1);
    };

    const getMatchedContractors = (project = selectedProject) => {
        if (!project || !project.contractorMatch) return contractors;
        return contractors.filter(contractor => 
            project.contractorMatch.includes(contractor.id)
        );
    };

    // Scroll to contractor section
    const scrollToContractors = () => {
        const contractorSection = document.querySelector('.contractor-section');
        if (contractorSection) {
            contractorSection.scrollIntoView({ behavior: 'smooth' });
        }
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
                            <span className="stat-number">15</span>
                            <span className="stat-label">Years Experience</span>
                        </div>
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

            {/* Categories Section */}
            <section className="categories-section">
                <div className="container">
                    <h2 className="section-title">Explore Our Services</h2>
                    <p className="section-subtitle">
                        From concept to completion, we handle every aspect of your interior transformation
                    </p>
                    <div className="categories-grid">
                        {categories.map(category => (
                            <div key={category.id} className="category-card-wrapper">
                                <CategoryCard
                                    {...category}
                                    isActive={activeCategory === category.id}
                                    onClick={() => handleCategoryClick(category)}
                                />
                                <div className="category-hire-buttons">
                                    <button 
                                        className="category-hire-btn view-projects"
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        <FaImages /> View {category.projectCount} Projects
                                    </button>
                                    <button 
                                        className="category-hire-btn whatsapp"
                                        onClick={() => whatsappContractor(contractors[0], null, category)}
                                    >
                                        <FaWhatsapp /> Hire for {category.title}
                                    </button>
                                    <button 
                                        className="category-hire-btn call"
                                        onClick={() => callContractor(contractors[0].phone)}
                                    >
                                        <FaPhone /> Call Expert
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        className="view-all-btn"
                        onClick={() => setActiveCategory('all')}
                    >
                        <FaArrowRight /> View All Projects
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
                                        <FaArrowRight /> View Complete Project
                                    </button>
                                    <button 
                                        className="gallery-hire-btn whatsapp"
                                        onClick={() => whatsappContractor(contractors[0], item)}
                                    >
                                        <FaWhatsapp /> Hire for Similar
                                    </button>
                                    <button 
                                        className="gallery-hire-btn call"
                                        onClick={() => callContractor(contractors[0].phone)}
                                    >
                                        <FaPhone /> Call Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced FurnitureWork with more work types */}
            <FurnitureWork contractors={contractors} />
            
            {/* Enhanced ContractCarpainter with more services */}
            <ContractCarpainter contractors={contractors} />

            {/* Contractor Contact Section */}
            <section className="contractor-section">
                <div className="container">
                    <h2 className="section-title">Hire Expert Contractors</h2>
                    <p className="section-subtitle">
                        Connect with verified professionals for your interior work needs
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
                                    <div className="contractor-rate">
                                        <FaMoneyBill /> <strong>Hourly Rate:</strong> {contractor.hourlyRate}
                                    </div>
                                    <div className="contractor-min-project">
                                        <FaShapes /> <strong>Min Project:</strong> {contractor.minProject}
                                    </div>
                                    <div className="contractor-availability">
                                        <FaClock /> <strong>Response Time:</strong> {contractor.responseTime}
                                    </div>
                                </div>
                                
                                <div className="contractor-contact">
                                    <h4>Contact Contractor:</h4>
                                    <div className="contact-buttons">
                                        <button 
                                            className="contact-btn call-btn"
                                            onClick={() => callContractor(contractor.phone)}
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
                            <p>Connect with our top-rated contractors instantly</p>
                        </div>
                        <div className="banner-actions">
                            <button 
                                className="banner-btn whatsapp"
                                onClick={() => whatsappContractor(contractors[0])}
                            >
                                <FaWhatsapp /> Chat on WhatsApp
                            </button>
                            <button 
                                className="banner-btn call"
                                onClick={() => callContractor(contractors[0].phone)}
                            >
                                <FaPhone /> Call Now
                            </button>
                            <button 
                                className="banner-btn consultation"
                                onClick={() => navigate('/consultation')}
                            >
                                <FaHome /> Book Consultation
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
                                <input type="tel" placeholder="Phone Number" />
                                <input type="email" placeholder="Email Address" />
                                <select>
                                    <option value="">Select Service Required</option>
                                    <option value="wardrobe">Custom Wardrobe</option>
                                    <option value="kitchen">Modular Kitchen</option>
                                    <option value="bed">Custom Bed</option>
                                    <option value="tv-unit">TV Unit</option>
                                    <option value="complete">Complete Interior</option>
                                </select>
                                <button className="btn-primary">Request Free Consultation</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InteriorPage;