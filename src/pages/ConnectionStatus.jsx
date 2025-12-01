// src/components/ConnectionStatus.jsx
import React, { useState, useEffect } from 'react';
import { isOnline } from '../services/Api';
import { checkBackendStatus } from '../services/connectionTest';

const ConnectionStatus = () => {
  const [isBackendOnline, setIsBackendOnline] = useState(null);
  const [checking, setChecking] = useState(false);

  const checkConnection = async () => {
    setChecking(true);
    const status = await checkBackendStatus();
    setIsBackendOnline(status.online);
    setChecking(false);
  };

  useEffect(() => {
    checkConnection();
    
    // Check every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isOnline()) {
    return (
      <div style={{
        background: '#fef2f2',
        border: '1px solid #fecaca',
        color: '#dc2626',
        padding: '8px 12px',
        borderRadius: '6px',
        margin: '10px 0',
        fontSize: '14px'
      }}>
        🔴 You are offline. Please check your internet connection.
      </div>
    );
  }

  if (isBackendOnline === false) {
    return (
      <div style={{
        background: '#fffbeb',
        border: '1px solid #fed7aa',
        color: '#ea580c',
        padding: '8px 12px',
        borderRadius: '6px',
        margin: '10px 0',
        fontSize: '14px'
      }}>
        ⚠️ Cannot connect to server. 
        <button 
          onClick={checkConnection}
          disabled={checking}
          style={{
            marginLeft: '10px',
            background: '#ea580c',
            color: 'white',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {checking ? 'Checking...' : 'Retry'}
        </button>
      </div>
    );
  }

  if (isBackendOnline === true) {
    return (
      <div style={{
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
        color: '#16a34a',
        padding: '8px 12px',
        borderRadius: '6px',
        margin: '10px 0',
        fontSize: '14px'
      }}>
        ✅ Connected to server
      </div>
    );
  }

  return null;
};

export default ConnectionStatus;