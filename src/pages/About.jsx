import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHome, 
  FaPaintRoller, 
  FaUsers, 
  FaTrophy, 
  FaLightbulb, 
  FaHandshake, 
  FaStar,
  FaBuilding,
  FaChair,
  FaPalette,
  FaToolbox,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaChartLine
} from 'react-icons/fa';
import './About.css';

const About = () => {
    // Company Stats
    const stats = [
        { 
            number: '1000+', 
            label: 'Projects Completed', 
            description: 'Properties & Interior Works',
            icon: <FaTrophy />
        },
        { 
            number: '15+', 
            label: 'Years Experience', 
            description: 'Industry Excellence',
            icon: <FaStar />
        },
        { 
            number: '98%', 
            label: 'Client Satisfaction', 
            description: 'Happy Customers',
            icon: <FaCheckCircle />
        },
        { 
            number: '200+', 
            label: 'Expert Team', 
            description: 'Professionals',
            icon: <FaUsers />
        }
    ];

    // Service Categories
    const services = [
        {
            category: "Real Estate",
            icon: <FaHome />,
            color: "#4f46e5",
            services: [
                "Property Buying & Selling",
                "Rental Management",
                "Investment Guidance",
                "Legal Consultation",
                "Home Loan Assistance",
                "Property Valuation"
            ],
            description: "Comprehensive real estate solutions for residential and commercial properties"
        },
        {
            category: "Interior Work",
            icon: <FaPaintRoller />,
            color: "#8b5cf6",
            services: [
                "Interior Design",
                "Custom Furniture",
                "Renovation Work",
                "Space Planning",
                "Material Selection",
                "3D Visualization"
            ],
            description: "Transform your spaces with expert interior design and execution"
        }
    ];

    // Core Values
    const values = [
        {
            icon: <FaHandshake />,
            title: 'Integrity First',
            description: 'We believe in transparent dealings and honest communication with every client.',
            color: "#10b981"
        },
        {
            icon: <FaLightbulb />,
            title: 'Innovative Solutions',
            description: 'Combining traditional expertise with modern technology for better results.',
            color: "#f59e0b"
        },
        {
            icon: <FaUsers />,
            title: 'Client-Centric',
            description: 'Your vision is our priority. We listen, understand, and deliver accordingly.',
            color: "#3b82f6"
        },
        {
            icon: <FaStar />,
            title: 'Excellence',
            description: 'We strive for perfection in every project, big or small.',
            color: "#8b5cf6"
        }
    ];

    // Team Members
    const teamMembers = [
        {
            id: 1,
            name: 'Anil Thakur',
            role: 'Founder & CEO',
            specialization: 'Real Estate & Interior Design',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200',
            description: '20+ years experience in property development and interior design.',
            expertise: ['Property Investment', 'Design Planning', 'Project Management']
        },
        {
            id: 2,
            name: 'Priya Sharma',
            role: 'Interior Design Head',
            specialization: 'Luxury Interiors',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
            description: 'Expert in creating functional and aesthetic living spaces.',
            expertise: ['Space Planning', 'Material Selection', 'Color Theory']
        },
        {
            id: 3,
            name: 'Rajesh Verma',
            role: 'Real Estate Director',
            specialization: 'Commercial Properties',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
            description: 'Specialized in commercial real estate and investment properties.',
            expertise: ['Property Valuation', 'Market Analysis', 'Legal Documentation']
        },
        {
            id: 4,
            name: 'Neha Patel',
            role: 'Senior Interior Designer',
            specialization: 'Modern & Minimalist',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
            description: 'Creating beautiful, functional spaces with modern aesthetics.',
            expertise: ['3D Visualization', 'Custom Furniture', 'Lighting Design']
        }
    ];

    // Success Stories
    const successStories = [
        {
            type: "Property",
            title: "Luxury Apartment Complex",
            description: "Successfully managed the sale of a 50-unit luxury apartment complex in Mumbai.",
            icon: <FaBuilding />
        },
        {
            type: "Interior",
            title: "Corporate Office Design",
            description: "Transformed a 10,000 sq ft office space into a modern, productive work environment.",
            icon: <FaChair />
        },
        {
            type: "Property",
            title: "Real Estate Investment",
            description: "Helped clients achieve 25% ROI through strategic property investments.",
            icon: <FaChartLine />
        },
        {
            type: "Interior",
            title: "Residential Makeover",
            description: "Complete home renovation delivering both functionality and stunning aesthetics.",
            icon: <FaPalette />
        }
    ];

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <h1 className="about-hero-title">
                        Your Trusted Partner in Real Estate & Interior Excellence
                    </h1>
                    <p className="about-hero-subtitle">
                        At DreamPro, we blend property expertise with interior artistry to create spaces that inspire and investments that grow.
                    </p>
                    
                    <div className="about-service-highlights">
                        <div className="service-highlight service-highlight-realestate">
                            <FaHome className="highlight-icon" />
                            <span>Real Estate Solutions</span>
                        </div>
                        <div className="service-highlight service-highlight-interior">
                            <FaPaintRoller className="highlight-icon" />
                            <span>Interior Transformation</span>
                        </div>
                    </div>

                    <div className="about-hero-stats">
                        {stats.map((stat, index) => (
                            <div key={index} className="about-stat-item">
                                <div className="about-stat-icon">{stat.icon}</div>
                                <div className="about-stat-number">{stat.number}</div>
                                <div className="about-stat-label">{stat.label}</div>
                                <div className="about-stat-description">{stat.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Services Section */}
            <section className="about-services-section">
                <div className="about-container">
                    <div className="about-section-header">
                        <h2 className="about-section-title">Our Comprehensive Services</h2>
                        <p className="about-section-subtitle">
                            From finding your dream property to designing your perfect space - we've got you covered
                        </p>
                    </div>

                    <div className="about-services-grid">
                        {services.map((service, index) => (
                            <div 
                                key={index} 
                                className="about-service-card"
                                style={{ borderLeft: `4px solid ${service.color}` }}
                            >
                                <div className="about-service-header">
                                    <div 
                                        className="about-service-icon"
                                        style={{ color: service.color }}
                                    >
                                        {service.icon}
                                    </div>
                                    <h3 className="about-service-category">{service.category}</h3>
                                </div>
                                
                                <p className="about-service-description">{service.description}</p>
                                
                                <div className="about-service-features">
                                    {service.services.map((feature, idx) => (
                                        <div key={idx} className="about-service-feature">
                                            <FaCheckCircle style={{ color: service.color }} />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link 
                                    to={service.category === "Real Estate" ? "/properties" : "/interior-work"} 
                                    className="about-service-link"
                                    style={{ color: service.color }}
                                >
                                    Explore {service.category} →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="about-story-section">
                <div className="about-container">
                    <div className="about-story-content">
                        <div className="about-story-text">
                            <h2>Our Journey</h2>
                            <p className="about-story-paragraph">
                                DreamPro was founded in 2010 with a vision to bridge the gap between real estate 
                                and interior design. We recognized that finding a property was just the beginning - 
                                turning it into a dream space was equally important.
                            </p>
                            <p className="about-story-paragraph">
                                What started as a small real estate consultancy has evolved into a comprehensive 
                                service provider, helping clients with everything from property acquisition to 
                                complete interior makeovers. Our integrated approach sets us apart in the industry.
                            </p>
                            
                            <div className="about-story-milestones">
                                <div className="about-milestone">
                                    <div className="about-milestone-year">2010</div>
                                    <div className="about-milestone-text">Founded as Real Estate Consultancy</div>
                                </div>
                                <div className="about-milestone">
                                    <div className="about-milestone-year">2015</div>
                                    <div className="about-milestone-text">Added Interior Design Services</div>
                                </div>
                                <div className="about-milestone">
                                    <div className="about-milestone-year">2020</div>
                                    <div className="about-milestone-text">Expanded to 50+ Cities</div>
                                </div>
                                <div className="about-milestone">
                                    <div className="about-milestone-year">2024</div>
                                    <div className="about-milestone-text">1000+ Projects Completed</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="about-story-visual">
                            <div className="about-visual-card about-visual-realestate">
                                <FaBuilding className="about-visual-icon" />
                                <span>Property Excellence</span>
                            </div>
                            <div className="about-visual-card about-visual-interior">
                                <FaPaintRoller className="about-visual-icon" />
                                <span>Design Innovation</span>
                            </div>
                            <div className="about-visual-card about-visual-success">
                                <FaStar className="about-visual-icon" />
                                <span>Client Success</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="about-values-section">
                <div className="about-container">
                    <div className="about-section-header">
                        <h2 className="about-section-title">Our Core Values</h2>
                        <p className="about-section-subtitle">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="about-values-grid">
                        {values.map((value, index) => (
                            <div 
                                key={index} 
                                className="about-value-card"
                                style={{ borderTop: `4px solid ${value.color}` }}
                            >
                                <div 
                                    className="about-value-icon"
                                    style={{ color: value.color }}
                                >
                                    {value.icon}
                                </div>
                                <h3 className="about-value-title">{value.title}</h3>
                                <p className="about-value-description">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stories */}
            <section className="about-success-section">
                <div className="about-container">
                    <div className="about-section-header">
                        <h2 className="about-section-title">Success Stories</h2>
                        <p className="about-section-subtitle">
                            Transforming properties and lives across India
                        </p>
                    </div>

                    <div className="about-success-grid">
                        {successStories.map((story, index) => (
                            <div 
                                key={index} 
                                className={`about-success-card about-success-${story.type.toLowerCase()}`}
                            >
                                <div className="about-success-icon">
                                    {story.icon}
                                </div>
                                <div className="about-success-badge">
                                    {story.type}
                                </div>
                                <h3 className="about-success-title">{story.title}</h3>
                                <p className="about-success-description">{story.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="about-team-section">
                <div className="about-container">
                    <div className="about-section-header">
                        <h2 className="about-section-title">Meet Our Expert Team</h2>
                        <p className="about-section-subtitle">
                            Professionals dedicated to excellence in real estate and interior design
                        </p>
                    </div>

                    <div className="about-team-grid">
                        {teamMembers.map(member => (
                            <div key={member.id} className="about-team-card">
                                <div className="about-member-image">
                                    <img src={member.image} alt={member.name} />
                                    <div className="about-member-overlay">
                                        <div className="about-member-specialization">
                                            {member.specialization}
                                        </div>
                                    </div>
                                </div>
                                <div className="about-member-info">
                                    <h3 className="about-member-name">{member.name}</h3>
                                    <p className="about-member-role">{member.role}</p>
                                    <p className="about-member-description">{member.description}</p>
                                    
                                    <div className="about-member-expertise">
                                        {member.expertise.map((skill, idx) => (
                                            <span key={idx} className="about-expertise-tag">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta-section">
                <div className="about-container">
                    <div className="about-cta-content">
                        <h2 className="about-cta-title">Ready to Begin Your Journey?</h2>
                        <p className="about-cta-subtitle">
                            Whether you're looking for the perfect property or planning to transform your space, 
                            our team is here to make it happen.
                        </p>
                        
                        <div className="about-cta-buttons">
                            <Link to="/properties" className="about-cta-btn about-cta-realestate">
                                <FaHome /> Explore Properties
                            </Link>
                            <Link to="/interior-work" className="about-cta-btn about-cta-interior">
                                <FaPaintRoller /> View Interior Services
                            </Link>
                            <Link to="/contact" className="about-cta-btn about-cta-contact">
                                <FaUsers /> Contact Our Team
                            </Link>
                        </div>

                        <div className="about-cta-stats">
                            <div className="about-cta-stat">
                                <div className="about-cta-stat-number">24/7</div>
                                <div className="about-cta-stat-label">Support Available</div>
                            </div>
                            <div className="about-cta-stat">
                                <div className="about-cta-stat-number">Free</div>
                                <div className="about-cta-stat-label">Initial Consultation</div>
                            </div>
                            <div className="about-cta-stat">
                                <div className="about-cta-stat-number">100%</div>
                                <div className="about-cta-stat-label">Satisfaction Guarantee</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;