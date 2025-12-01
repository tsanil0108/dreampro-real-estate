import React from 'react';

const GalleryItem = ({ 
  id, 
  title, 
  category, 
  image, 
  description, 
  tags, 
  duration, 
  budget, 
  onClick 
}) => {
  return (
    <div className="gallery-item" onClick={onClick}>
      <div className="gallery-image">
        <img src={image} alt={title} />
        <div className="image-overlay">
          <div className="view-project">View Project</div>
        </div>
        <div className="project-budget">{budget}</div>
      </div>
      <div className="gallery-content">
        <div className="project-category">{category.replace('-', ' ')}</div>
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <div className="project-duration">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12.5 13H11V7H12.5V13M12.5 17H11V15H12.5V17Z"/>
          </svg>
          {duration}
        </div>
        <div className="project-tags">
          {tags.map(tag => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;