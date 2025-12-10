import React from 'react';
import { 
  FaClock, 
  FaMoneyBill, 
  FaHome, 
  FaCogs, 
  FaCalendarAlt,
  FaArrowRight
} from 'react-icons/fa';
import './Interior.css';

const GalleryItem = ({ 
  id, 
  title, 
  category,
  image, 
  duration, 
  estimatedCost,
  features = [],
  contractorMatch = [],
  onClick 
}) => {
  // Get category display name
  const getCategoryDisplay = (cat) => {
    const categoryMap = {
      'kitchen': 'Kitchen',
      'wardrobe': 'Wardrobe',
      'bedroom': 'Bedroom',
      'living': 'Living Room',
      'tv-unit': 'TV Unit',
      'office': 'Home Office',
      'bed': 'Custom Bed',
      'pooja-unit': 'Pooja Unit',
      'study-table': 'Study Table',
      'shoe-rack': 'Shoe Rack',
      'bar-unit': 'Bar Unit',
      'wall-unit': 'Wall Unit',
      'bookshelf': 'Bookshelf',
      'dressing-table': 'Dressing Table',
      'kids-room': 'Kids Room'
    };
    return categoryMap[cat] || cat;
  };

  // Get category color
  const getCategoryColor = (cat) => {
    const colorMap = {
      'kitchen': '#FBBC05',
      'wardrobe': '#4285F4',
      'bed': '#34A853',
      'tv-unit': '#EA4335',
      'pooja-unit': '#8E44AD',
      'study-table': '#16A085',
      'shoe-rack': '#E74C3C',
      'bar-unit': '#3498DB',
      'wall-unit': '#9B59B6',
      'bookshelf': '#2ECC71',
      'dressing-table': '#E67E22',
      'kids-room': '#F1C40F'
    };
    return colorMap[cat] || '#333';
  };

  return (
    <div className="gallery-item" onClick={onClick}>
      <div className="gallery-image-container">
        <img src={image} alt={title} className="gallery-img" />
        
        {/* Category Badge */}
        <div 
          className="category-badge" 
          style={{ backgroundColor: getCategoryColor(category) }}
        >
          {getCategoryDisplay(category)}
        </div>
        
        {/* Image Overlay */}
        <div className="image-overlay">
          <div className="view-project">
            <FaArrowRight /> View Project
          </div>
        </div>
        
        {/* Cost Badge */}
        <div className="cost-badge">
          <FaMoneyBill />
          <span>{estimatedCost}</span>
        </div>
      </div>
      
      <div className="gallery-content">
        {/* Category */}
        <div className="project-category">{getCategoryDisplay(category)}</div>
        
        {/* Title */}
        <h3 className="project-title">{title}</h3>
        
        {/* Description - You might want to add this prop to your data */}
        <p className="project-description">
          {category === 'wardrobe' ? 'Premium wardrobe with smart storage solutions' :
           category === 'bed' ? 'Luxury bed design with premium materials' :
           category === 'kitchen' ? 'Modern kitchen with high-end finishes' :
           category === 'tv-unit' ? 'Entertainment wall unit with lighting' :
           'Custom furniture design with premium craftsmanship'}
        </p>
        
        {/* Duration */}
        <div className="project-duration">
          <FaClock />
          <span>{duration}</span>
        </div>
        
        {/* Features as Tags */}
        <div className="project-tags">
          {features.slice(0, 3).map((feature, index) => (
            <span key={index} className="project-tag">{feature}</span>
          ))}
          {features.length > 3 && (
            <span className="project-tag">+{features.length - 3} more</span>
          )}
        </div>
        
        {/* Project Details Grid */}
        <div className="project-details-grid">
          <div className="detail-item">
            <div className="detail-icon-wrapper">
              <FaClock className="detail-icon" />
            </div>
            <div className="detail-content">
              <div className="detail-label">Duration</div>
              <div className="detail-value">{duration}</div>
            </div>
          </div>
          
          <div className="detail-item">
            <div className="detail-icon-wrapper">
              <FaHome className="detail-icon" />
            </div>
            <div className="detail-content">
              <div className="detail-label">Category</div>
              <div className="detail-value">{getCategoryDisplay(category)}</div>
            </div>
          </div>
          
          <div className="detail-item">
            <div className="detail-icon-wrapper">
              <FaCogs className="detail-icon" />
            </div>
            <div className="detail-content">
              <div className="detail-label">Features</div>
              <div className="detail-value">{features.length}</div>
            </div>
          </div>
          
          <div className="detail-item">
            <div className="detail-icon-wrapper">
              <FaCalendarAlt className="detail-icon" />
            </div>
            <div className="detail-content">
              <div className="detail-label">Contractors</div>
              <div className="detail-value">{contractorMatch.length}</div>
            </div>
          </div>
        </div>
        
        {/* Action Button */}
        <div className="project-action">
          <button className="view-details-btn" onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}>
            <FaArrowRight /> View Details & Hire
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;