import React from 'react';
import { FaWhatsapp, FaPhone, FaHome } from 'react-icons/fa';
import './QuickHireBanner.css';

const QuickHireBanner = ({ 
    onWhatsappClick, 
    onCallClick, 
    onConsultationClick 
}) => {
    return (
        <section className="quick-hire-banner">
            <div className="container">
                <div className="banner-content">
                    <div className="banner-text">
                        <h3 className="banner-title">Need Immediate Help?</h3>
                        <p className="banner-subtitle">Connect with our top-rated contractors instantly</p>
                    </div>
                    <div className="banner-actions">
                        <button 
                            className="banner-btn whatsapp"
                            onClick={onWhatsappClick}
                        >
                            <FaWhatsapp /> Chat on WhatsApp
                        </button>
                        <button 
                            className="banner-btn call"
                            onClick={onCallClick}
                        >
                            <FaPhone /> Call Now
                        </button>
                        <button 
                            className="banner-btn consultation"
                            onClick={onConsultationClick}
                        >
                            <FaHome /> Book Consultation
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuickHireBanner;