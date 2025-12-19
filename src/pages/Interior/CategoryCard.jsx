import React from 'react';
import './CategoryCard.css';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';

const CategoryCard = ({ 
  id, 
  title, 
  description, 
  image, 
  projectCount, 
  color, 
  icon,
  isActive, 
  onClick,
  contactInfo, // Add contactInfo prop
  onCall, // Add onCall callback
  onWhatsApp // Add onWhatsApp callback
}) => {
  
  // Default contact functions if not provided
  const handleCall = (e) => {
    e.stopPropagation(); // Prevent card click
    if (onCall) {
      onCall(id, title);
    } else {
      // Default phone call
      const phoneNumber = contactInfo?.phone || '7304603314';
      const cleanNumber = phoneNumber.toString().replace(/[-\s]/g, '');
      const fullNumber = `+91${cleanNumber}`;
      
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        window.location.href = `tel:${fullNumber}`;
      } else {
        const confirmed = window.confirm(`Call: ${phoneNumber}\n\nClick OK to attempt call through browser or copy the number to dial from your phone.`);
        if (confirmed) {
          window.location.href = `tel:${fullNumber}`;
        }
      }
    }
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation(); // Prevent card click
    if (onWhatsApp) {
      onWhatsApp(id, title);
    } else {
      // Default WhatsApp message
      const phoneNumber = contactInfo?.whatsapp || '7304603314';
      const cleanNumber = phoneNumber.toString().replace(/[+\s-]/g, '');
      const message = `Hello! I'm interested in your ${title} services. Could you please share more details?`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/91${cleanNumber}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div 
      className={`category-card ${isActive ? 'active' : ''}`}
      onClick={onClick}
      style={{ '--accent-color': color }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="card-image">
        <img src={image} alt={title} loading="lazy" />
        <div className="card-overlay">
          <div className="project-count">{projectCount} Projects</div>
        </div>
        
        {/* Contact Buttons Overlay */}
        <div className="card-contact-overlay">
          <button 
            className="contact-btn phone-btn"
            onClick={handleCall}
            aria-label={`Call about ${title}`}
          >
            <FaPhone />
          </button>
          <button 
            className="contact-btn whatsapp-btn"
            onClick={handleWhatsApp}
            aria-label={`WhatsApp about ${title}`}
          >
            <FaWhatsapp />
          </button>
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">
          {icon && <span className="card-icon">{icon}</span>}
          {title}
        </h3>
        <p className="card-description">{description}</p>
        
        <div className="card-footer">
          <div className="card-actions">
            <button 
              className="action-btn whatsapp-action"
              onClick={handleWhatsApp}
            >
              <FaWhatsapp /> WhatsApp
            </button>
            <button 
              className="action-btn call-action"
              onClick={handleCall}
            >
              <FaPhone /> Call Now
            </button>
          </div>
          <div className="card-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M5 12H19M19 12L12 5M19 12L12 19" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;