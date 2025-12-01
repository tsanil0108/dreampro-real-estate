import React from 'react';

const FurnitureWork = () => {
  const furnitureServices = [
    {
      id: 1,
      title: 'Custom Furniture Design',
      description: 'Bespoke furniture pieces tailored to your space and style preferences',
      icon: '🛋️',
      features: ['Custom Measurements', 'Material Selection', '3D Visualization']
    },
    {
      id: 2,
      title: 'Furniture Restoration',
      description: 'Breathing new life into antique and vintage furniture pieces',
      icon: '🔧',
      features: ['Structural Repair', 'Finish Restoration', 'Hardware Replacement']
    },
    {
      id: 3,
      title: 'Built-in Cabinetry',
      description: 'Custom built-in solutions for optimal space utilization',
      icon: '📚',
      features: ['Space Planning', 'Custom Finishes', 'Integrated Lighting']
    },
    {
      id: 4,
      title: 'Upholstery Services',
      description: 'Professional upholstery and reupholstery for all furniture types',
      icon: '🪑',
      features: ['Fabric Selection', 'Padding Upgrade', 'Frame Repair']
    }
  ];

  return (
    <section className="furniture-work-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Furniture & Woodwork</h2>
          <p className="section-subtitle">
            Custom furniture solutions and expert woodworking services
          </p>
        </div>
        
        <div className="furniture-grid">
          {furnitureServices.map(service => (
            <div key={service.id} className="furniture-service">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="feature-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="service-cta">Learn More</button>
            </div>
          ))}
        </div>

        <div className="furniture-showcase">
          <div className="showcase-content">
            <h3>Why Choose Our Furniture Services?</h3>
            <div className="benefits-grid">
              <div className="benefit">
                <div className="benefit-icon">🎯</div>
                <h4>Precision Craftsmanship</h4>
                <p>Every piece is crafted with attention to detail and quality</p>
              </div>
              <div className="benefit">
                <div className="benefit-icon">🌱</div>
                <h4>Sustainable Materials</h4>
                <p>We use eco-friendly and responsibly sourced materials</p>
              </div>
              <div className="benefit">
                <div className="benefit-icon">⚡</div>
                <h4>Quick Turnaround</h4>
                <p>Efficient processes without compromising on quality</p>
              </div>
              <div className="benefit">
                <div className="benefit-icon">🔒</div>
                <h4>Lifetime Warranty</h4>
                <p>Confidence in our work with comprehensive warranties</p>
              </div>
            </div>
          </div>
          <div className="showcase-image">
            <img src="/api/placeholder/600/400" alt="Furniture Craftsmanship" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FurnitureWork;