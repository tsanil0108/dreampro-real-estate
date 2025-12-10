import React from 'react';

// Icon component as workaround
const Icon = ({ children, className }) => (
  <span className={className}>{children}</span>
);

const ModuleSelector = ({ activeModule, setActiveModule }) => {
  return (
    <div className="module-selector">
      <div className="module-tabs">
        <button
          className={`module-tab ${activeModule === 'real-estate' ? 'active' : ''}`}
          onClick={() => setActiveModule('real-estate')}
        >
          <Icon className="tab-icon">🏢</Icon>
          <span className="tab-label">Real Estate</span>
        </button>
        <button
          className={`module-tab ${activeModule === 'interior-work' ? 'active' : ''}`}
          onClick={() => setActiveModule('interior-work')}
        >
          <Icon className="tab-icon">🎨</Icon>
          <span className="tab-label">Interior Work</span>
        </button>
      </div>
      <div className="module-stats">
        <div className="stat-item">
          <span className="stat-label">Active {activeModule === 'real-estate' ? 'Properties' : 'Projects'}</span>
          <span className="stat-value">42</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Pending {activeModule === 'real-estate' ? 'Bookings' : 'Consultations'}</span>
          <span className="stat-value">12</span>
        </div>
      </div>

      <style jsx>{`
        .module-selector {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 15px 25px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 25px;
        }
        
        .module-tabs {
          display: flex;
          gap: 10px;
        }
        
        .module-tab {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          color: #666;
        }
        
        .module-tab:hover {
          border-color: #007bff;
          color: #007bff;
          transform: translateY(-2px);
        }
        
        .module-tab.active {
          background: #007bff;
          border-color: #007bff;
          color: white;
        }
        
        .module-tab.active:hover {
          background: #0056b3;
          border-color: #0056b3;
        }
        
        .tab-icon {
          font-size: 1.2rem;
        }
        
        .tab-label {
          font-size: 0.95rem;
        }
        
        .module-stats {
          display: flex;
          gap: 30px;
        }
        
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        .stat-label {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 5px;
        }
        
        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #2c3e50;
        }
        
        @media (max-width: 768px) {
          .module-selector {
            flex-direction: column;
            gap: 20px;
            align-items: stretch;
          }
          
          .module-tabs {
            justify-content: center;
          }
          
          .module-stats {
            justify-content: center;
            gap: 20px;
          }
          
          .module-tab {
            padding: 10px 20px;
          }
        }
        
        @media (max-width: 480px) {
          .module-tabs {
            flex-direction: column;
          }
          
          .module-tab {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default ModuleSelector;