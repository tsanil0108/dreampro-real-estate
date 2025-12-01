import React from 'react';

const CategoryCard = ({ 
  id, 
  title, 
  description, 
  image, 
  projectCount, 
  color, 
  isActive, 
  onClick 
}) => {
  return (
    <div 
      className={`category-card ${isActive ? 'active' : ''}`}
      onClick={onClick}
      style={{ '--accent-color': color }}
    >
      <div className="card-image">
        <img src={image} alt={title} />
        <div className="card-overlay">
          <div className="project-count">{projectCount} Projects</div>
        </div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
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
  );
};

export default CategoryCard;