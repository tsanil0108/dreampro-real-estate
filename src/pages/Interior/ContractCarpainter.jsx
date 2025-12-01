import React, { useState } from 'react';

const ContractCarpainter = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    timeline: '',
    budget: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Project inquiry:', formData);
  };

  const carpenterServices = [
    {
      title: 'Custom Millwork',
      description: 'Precision custom millwork for doors, windows, and trim',
      examples: ['Crown Molding', 'Wainscoting', 'Custom Trim Packages']
    },
    {
      title: 'Cabinet Installation',
      description: 'Professional cabinet installation and customization',
      examples: ['Kitchen Cabinets', 'Bathroom Vanities', 'Built-in Storage']
    },
    {
      title: 'Structural Carpentry',
      description: 'Structural modifications and framework construction',
      examples: ['Wall Framing', 'Stair Construction', 'Room Additions']
    },
    {
      title: 'Finish Carpentry',
      description: 'Fine finish work for the perfect final touches',
      examples: ['Baseboards', 'Door Installation', 'Custom Shelving']
    }
  ];

  return (
    <section className="carpenter-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Contract Carpenter Services</h2>
          <p className="section-subtitle">
            Professional carpentry services for residential and commercial projects
          </p>
        </div>

        <div className="carpenter-content">
          <div className="services-overview">
            <h3>Our Carpentry Expertise</h3>
            <div className="services-grid">
              {carpenterServices.map((service, index) => (
                <div key={index} className="service-card">
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                  <div className="service-examples">
                    {service.examples.map((example, idx) => (
                      <span key={idx} className="example-tag">{example}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="project-inquiry">
            <div className="inquiry-header">
              <h3>Start Your Project</h3>
              <p>Get a free consultation and quote for your carpentry project</p>
            </div>
            
            <form onSubmit={handleSubmit} className="inquiry-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="projectType">Project Type *</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Project Type</option>
                    <option value="millwork">Custom Millwork</option>
                    <option value="cabinets">Cabinet Installation</option>
                    <option value="structural">Structural Carpentry</option>
                    <option value="finish">Finish Carpentry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="timeline">Project Timeline</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                  >
                    <option value="">Select Timeline</option>
                    <option value="urgent">Urgent (1-2 weeks)</option>
                    <option value="soon">Soon (2-4 weeks)</option>
                    <option value="flexible">Flexible (1-3 months)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="budget">Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select Budget</option>
                    <option value="1k-5k">$1,000 - $5,000</option>
                    <option value="5k-15k">$5,000 - $15,000</option>
                    <option value="15k-30k">$15,000 - $30,000</option>
                    <option value="30k+">$30,000+</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Project Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Describe your project in detail..."
                />
              </div>

              <button type="submit" className="submit-inquiry">
                Get Free Quote
              </button>
            </form>
          </div>
        </div>

        <div className="why-choose-us">
          <h3>Why Choose Our Carpentry Services?</h3>
          <div className="advantages-grid">
            <div className="advantage">
              <div className="advantage-icon">👨‍🎓</div>
              <h4>Certified Craftsmen</h4>
              <p>All our carpenters are certified and continuously trained</p>
            </div>
            <div className="advantage">
              <div className="advantage-icon">📋</div>
              <h4>Detailed Quotes</h4>
              <p>Transparent pricing with no hidden costs</p>
            </div>
            <div className="advantage">
              <div className="advantage-icon">🛡️</div>
              <h4>Insurance Protected</h4>
              <p>Fully insured for your peace of mind</p>
            </div>
            <div className="advantage">
              <div className="advantage-icon">⏱️</div>
              <h4>On-Time Completion</h4>
              <p>We respect your time and deliver as promised</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContractCarpainter;