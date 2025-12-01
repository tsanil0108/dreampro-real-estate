import React from 'react';
import { Link } from 'react-router-dom'; // Add this import
import './About.css';

const About = () => {
    const teamMembers = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'CEO & Founder',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
            description: '15+ years in real estate with a passion for connecting people with their dream homes.',
            social: { linkedin: '#', twitter: '#' }
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Head of Sales',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
            description: 'Expert in property valuation and market analysis with a track record of successful deals.',
            social: { linkedin: '#', twitter: '#' }
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Senior Agent',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
            description: 'Specializes in luxury properties and personalized client service.',
            social: { linkedin: '#', twitter: '#' }
        },
        {
            id: 4,
            name: 'David Kim',
            role: 'Property Manager',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
            description: 'Ensures all properties are maintained to the highest standards.',
            social: { linkedin: '#', twitter: '#' }
        }
    ];

    const stats = [
        { number: '500+', label: 'Properties Sold' },
        { number: '15+', label: 'Years Experience' },
        { number: '98%', label: 'Client Satisfaction' },
        { number: '50+', label: 'Expert Agents' }
    ];

    const values = [
        {
            icon: '🤝',
            title: 'Trust & Integrity',
            description: 'We build relationships based on transparency and honesty.'
        },
        {
            icon: '🎯',
            title: 'Excellence',
            description: 'We strive for the highest standards in everything we do.'
        },
        {
            icon: '💡',
            title: 'Innovation',
            description: 'We leverage technology to provide better service.'
        },
        {
            icon: '❤️',
            title: 'Community',
            description: 'We believe in giving back to the communities we serve.'
        }
    ];

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="hero-content">
                    <h1 className="hero-title">Building Dreams, One Home at a Time</h1>
                    <p className="hero-subtitle">
                        At DreamPro, we're more than just real estate agents - we're your partners in finding the perfect place to call home.
                    </p>
                    <div className="hero-stats">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-item">
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="floating-card card-1">🏡</div>
                    <div className="floating-card card-2">🔑</div>
                    <div className="floating-card card-3">⭐</div>
                </div>
            </section>

            {/* Story Section */}
            <section className="story-section">
                <div className="container">
                    <div className="story-content">
                        <div className="story-text">
                            <h2>Our Story</h2>
                            <p>
                                Founded in 2010, DreamPro began with a simple mission: to make real estate
                                transactions seamless and enjoyable. What started as a small team of passionate
                                individuals has grown into a trusted name in the industry.
                            </p>
                            <p>
                                We've helped thousands of families find their perfect homes and investors
                                build their portfolios. Our commitment to excellence and client satisfaction
                                has been the driving force behind our success.
                            </p>
                            <div className="story-highlights">
                                <div className="highlight">
                                    <span className="highlight-icon">🎯</span>
                                    <span>Personalized Service</span>
                                </div>
                                <div className="highlight">
                                    <span className="highlight-icon">🚀</span>
                                    <span>Market Expertise</span>
                                </div>
                                <div className="highlight">
                                    <span className="highlight-icon">💫</span>
                                    <span>Innovative Solutions</span>
                                </div>
                            </div>
                        </div>
                        <div className="story-image">
                            <div className="image-placeholder">
                                <span>Our Journey</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <div className="container">
                    <h2 className="section-title">Our Values</h2>
                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-card">
                                <div className="value-icon">{value.icon}</div>
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <div className="container">
                    <h2 className="section-title">Meet Our Team</h2>
                    <p className="section-subtitle">
                        Dedicated professionals committed to your real estate success
                    </p>
                    <div className="team-grid">
                        {teamMembers.map(member => (
                            <div key={member.id} className="team-card">
                                <div className="member-image">
                                    <img src={member.image} alt={member.name} />
                                    <div className="image-overlay">
                                        <div className="social-links">
                                            <a href={member.social.linkedin}>💼</a>
                                            <a href={member.social.twitter}>🐦</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="member-info">
                                    <h3>{member.name}</h3>
                                    <p className="member-role">{member.role}</p>
                                    <p className="member-description">{member.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Find Your Dream Home?</h2>
                        <p>Let's start your journey today. Our team is here to guide you every step of the way.</p>
                        <div className="cta-buttons">
                            <Link to="/Properties" className="btn-primary">
                                Browse Properties
                            </Link>
                            <Link to="/Contact" className="btn-secondary">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;