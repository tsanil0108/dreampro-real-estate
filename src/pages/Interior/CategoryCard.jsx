
import React, { useState } from 'react';
import './CategoryCard.css';

const CategoryCard = ({ 
  id, 
  title, 
  description, 
  image, 
  projectCount, 
  color, 
  icon, // Add icon prop
  isActive, 
  onClick 
}) => {
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
      </div>
      <div className="card-content">
        <h3 className="card-title">
          {icon && <span className="card-icon">{icon}</span>}
          {title}
        </h3>
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