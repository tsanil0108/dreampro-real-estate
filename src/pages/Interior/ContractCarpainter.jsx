import React, { useState } from 'react';
import './ContractCarpainter.css';
import {
  FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt,
  FaStore, FaShippingFast, FaCertificate, FaTags,
  FaPaperPlane, FaUser, FaCalendar, FaMoneyBill,
  FaDirections, FaPhoneVolume, FaTree, FaDoorClosed,
  FaTools, FaStar
} from 'react-icons/fa';

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

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format message for WhatsApp
    const whatsappMessage = `🎯 *New Project Inquiry*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `📱 *Phone:* ${formData.phone}\n` +
      `🏠 *Project Type:* ${formData.projectType}\n` +
      `⏰ *Timeline:* ${formData.timeline}\n` +
      `💰 *Budget:* ${formData.budget}\n` +
      `📝 *Description:* ${formData.description}\n\n` +
      `📅 *Submitted:* ${new Date().toLocaleDateString()}`;

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // WhatsApp number for inquiries
    const whatsappNumber = '7304603314';

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

    // Show success message
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);

    // Log to console
    console.log('Project inquiry submitted:', formData);

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      timeline: '',
      budget: '',
      description: ''
    });
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

  const supplierProducts = {
    interior: [
      'Premium Paints & Coatings',
      'Wallpaper & Wall Panels',
      'False Ceiling Materials',
      'Flooring (Laminate, Vinyl, Wood)',
      'Adhesives & Sealants',
      'Glass & Mirror Works',
      'Lighting Fixtures',
      'Wall Cladding Materials'
    ],
    hardware: [
      'Door & Window Hardware',
      'Hinges, Locks, & Handles',
      'Kitchen & Wardrobe Fittings',
      'Plumbing & Sanitary Fittings',
      'Electrical Conduits & Boxes',
      'Safety & Security Hardware',
      'Furniture Fittings',
      'Decorative Hardware'
    ],
    carpenterSupplies: [
      'Plywood & Block Boards',
      'Laminates & Veneers',
      'Tooling & Fasteners',
      'Wood Finishes & Polishes',
      'Adhesives & Sealants',
      'Solid Wood & Engineered Wood',
      'MDF & Particle Boards',
      'Hardware Kits'
    ],
    otherProducts: [
      'Bathroom Accessories',
      'Kitchen Sinks & Faucets',
      'Wardrobe Systems',
      'Storage Solutions',
      'Outdoor Furniture Materials',
      'Garden & Landscape Materials'
    ]
  };

  return (
    <section className="carpenter-section">
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Contract Carpenter Services</h1>
          <p className="section-subtitle">
            Professional carpentry services for residential and commercial projects with trusted material partnerships
          </p>
        </div>

        <div className="carpenter-content">
          <div className="services-overview">
            <h2>Our Carpentry Expertise</h2>
            <div className="services-grid">
              {carpenterServices.map((service, index) => (
                <div key={index} className="service-card">
                  <div className="service-icon">
                    {index === 0 ? '🔨' : index === 1 ? '🚪' : index === 2 ? '🏗️' : '✨'}
                  </div>
                  <h3>{service.title}</h3>
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

          {/* Material Supplier Partnership Section */}
          <div className="material-partner-section">
            <div className="partner-header">
              <h2>Premium Material Partnership</h2>
              <div className="partner-badge">Official Partner</div>
            </div>

            <div className="partner-card">
              <div className="partner-info">
                <div className="partnerr-logo">
                  <div className="logo-placeholder">
                    <img
                      src="https://ih1.redbubble.net/image.3945081491.9102/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg"
                      alt="Shree Radhe Enterprise Logo"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50%'
                      }}
                    />
                  </div>
                  <h3>Shree Radhe Enterprise</h3>
                  <p className="partner-tagline">Your Complete Interior & Hardware Solution</p>
                  <div className="partner-features">
                    <span className="feature-tag"><FaStore /> Showroom Available</span>
                    <span className="feature-tag"><FaShippingFast /> Free Delivery</span>
                    <span className="feature-tag"><FaCertificate /> Authentic Products</span>
                    <span className="feature-tag"><FaTags /> Best Prices</span>
                  </div>
                </div>

                <div className="partner-details">
                  <div className="contact-info">
                    <div className="contact-item">
                      <div className="contact-icon-wrapper">
                        <FaMapMarkerAlt />
                      </div>
                      <div className="contact-details">
                        <h4>Showroom Address</h4>
                        <p>123 Carpenter Street, Industrial Area</p>
                        <p>Mumbai, Maharashtra 400001</p>
                        <a
                          href="https://maps.google.com/?q=Shree+Radhe+Enterprise+Mumbai"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="map-link"
                        >
                          <FaDirections /> Get Directions
                        </a>
                      </div>
                    </div>

                    <div className="contact-item">
                      <div className="contact-icon-wrapper">
                        <FaPhone />
                      </div>
                      <div className="contact-details">
                        <h4>Contact Number</h4>
                        <a href="tel:+912212345678" className="phone-link">
                          <FaPhone /> +91 22 1234 5678
                        </a>
                        <div className="button-group">
                          <a
                            href="https://wa.me/917304603314"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whatsapp-btn"
                          >
                            <FaWhatsapp /> WhatsApp
                          </a>
                          <button
                            className="direct-call-btn"
                            onClick={() => window.location.href = 'tel:+917304603314'}
                          >
                            <FaPhoneVolume /> Call Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="product-showcase">
                <h3>Available Materials & Products</h3>
                <div className="product-categories">
                  <div className="product-category">
                    <h4><FaTree /> Wood & Plywood</h4>
                    <ul>
                      <li>Marine Plywood</li>
                      <li>BWR Grade Plywood</li>
                      <li>MDF Board</li>
                      <li>Block Board</li>
                      <li>Veneer Sheets</li>
                    </ul>
                  </div>

                  <div className="product-category">
                    <h4><FaDoorClosed /> Hardware & Fittings</h4>
                    <ul>
                      <li>Hinges & Handles</li>
                      <li>Drawer Slides</li>
                      <li>Locks & Latches</li>
                      <li>Cabinet Accessories</li>
                      <li>Glass Fittings</li>
                    </ul>
                  </div>

                  <div className="product-category">
                    <h4><FaTools /> Tools & Equipment</h4>
                    <ul>
                      <li>Power Tools</li>
                      <li>Hand Tools</li>
                      <li>Safety Equipment</li>
                      <li>Measuring Tools</li>
                      <li>Finishing Tools</li>
                    </ul>
                  </div>
                </div>

                <div className="partner-benefits">
                  <h4><FaStar /> Partnership Benefits</h4>
                  <ul>
                    <li><strong>10% Discount</strong> for all contract carpenter projects</li>
                    <li><strong>Free Delivery</strong> within city limits</li>
                    <li><strong>Priority Support</strong> for bulk orders</li>
                    <li><strong>Quality Guarantee</strong> on all products</li>
                    <li><strong>Credit Facilities</strong> for regular clients</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Project Inquiry Form with WhatsApp Submission */}
          <div className="project-inquiry-section">
            <div className="inquiry-header">
              <h2>Get Your Project Started</h2>
              <p>Submit your project details and we'll connect with you on WhatsApp for immediate response</p>
            </div>

            <form onSubmit={handleSubmit} className="inquiry-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    <FaUser /> Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope /> Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">
                    <FaPhone /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your WhatsApp number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="projectType">
                    <FaStore /> Project Type *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select project type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="renovation">Renovation</option>
                    <option value="new-construction">New Construction</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="timeline">
                    <FaCalendar /> Timeline *
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select timeline</option>
                    <option value="urgent">Urgent (1-2 weeks)</option>
                    <option value="soon">Soon (1 month)</option>
                    <option value="flexible">Flexible (1-3 months)</option>
                    <option value="planning">Planning stage</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="budget">
                    <FaMoneyBill /> Budget Range *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select budget</option>
                    <option value="under-50k">Under ₹50,000</option>
                    <option value="50k-1l">₹50,000 - ₹1 Lakh</option>
                    <option value="1l-5l">₹1 Lakh - ₹5 Lakh</option>
                    <option value="over-5l">Over ₹5 Lakh</option>
                    <option value="quote-needed">Need Quote</option>
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
                  placeholder="Describe your project requirements, area, specific needs..."
                  rows="4"
                />
              </div>

              <div className="form-submit-info">
                <p className="whatsapp-info">
                  <FaWhatsapp /> <strong>Note:</strong> After submitting, your inquiry will be sent via WhatsApp for immediate response
                </p>
              </div>

              <button type="submit" className="submit-btn whatsapp-submit">
                <FaPaperPlane /> Submit via WhatsApp
              </button>

              {submitted && (
                <div className="success-message">
                  ✅ Your inquiry has been submitted! Opening WhatsApp...
                </div>
              )}
            </form>


            </div>
          </div>
        </div>

        <div className="why-choose-us">
          <h2>Why Choose Our Carpentry Services?</h2>
          <div className="advantages-grid">
            <div className="advantage">
              <div className="advantage-icon">👨‍🎓</div>
              <h3>Certified Craftsmen</h3>
              <p>All our carpenters are certified and continuously trained in latest techniques</p>
            </div>
            <div className="advantage">
              <div className="advantage-icon">📋</div>
              <h3>Detailed Quotes</h3>
              <p>Transparent pricing with no hidden costs and itemized estimates</p>
            </div>
            <div className="advantage">
              <div className="advantage-icon">🛡️</div>
              <h3>Insurance Protected</h3>
              <p>Fully insured for your peace of mind and project protection</p>
            </div>
            <div className="advantage">
              <div className="advantage-icon">⏱️</div>
              <h3>On-Time Completion</h3>
              <p>We respect your time and deliver as promised with milestone tracking</p>
            </div>
            <div className="advantage">
              <div className="advantage-icon">🤝</div>
              <h3>Material Partnership</h3>
              <p>Direct access to quality materials at discounted rates through our partners</p>
            </div>
            <div className="advantage">
              <div className="advantage-icon">🔧</div>
              <h3>After-Sales Support</h3>
              <p>1-year warranty on all workmanship and ongoing support</p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Start Your Project?</h2>
          <p>Contact us today for a free consultation and estimate</p>
          <div className="cta-buttons">
            <a href="tel:+917304603314" className="cta-btn primary">
              <FaPhone /> Call Now: +917304603314
            </a>
            <a
              href="https://wa.me/917304603314?text=Hello,%20I'm%20interested%20in%20your%20carpentry%20services.%20Can%20you%20provide%20more%20information?"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn secondary"
            >
              <FaWhatsapp /> WhatsApp Inquiry
            </a>
          </div>
        </div>
      
    </section>
  );
};

export default ContractCarpainter;