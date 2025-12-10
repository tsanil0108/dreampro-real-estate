// ConnectionTester.jsx
import React, { useState } from 'react';
import AdminService from '../services/AdminService';

const ConnectionTester = () => {
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const testAllConnections = async () => {
    setLoading(true);
    setStatus({ message: 'Testing connections...' });
    
    try {
      // Test basic connection
      const connection = await AdminService.testConnection();
      setStatus(prev => ({ ...prev, connection }));
      
      // If connected, try auth endpoints
      if (connection.connected) {
        try {
          const profile = await AdminService.getProfile();
          setStatus(prev => ({ ...prev, auth: '✅ Authenticated', profile }));
        } catch (authError) {
          setStatus(prev => ({ ...prev, auth: '🔒 Not authenticated or token invalid' }));
        }
      }
      
    } catch (error) {
      setStatus({ 
        error: true, 
        message: 'Connection failed',
        details: error 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      background: '#f9f9f9'
    }}>
      <h3>🔌 Spring Boot Connection Tester</h3>
      
      <div style={{ margin: '10px 0' }}>
        <strong>Expected Configuration:</strong>
        <ul>
          <li>Backend: <code>http://localhost:8080/api/v1</code></li>
          <li>Admin API: <code>http://localhost:8080/api/v1/admin</code></li>
          <li>CORS: Enabled for <code>localhost:3000</code></li>
        </ul>
      </div>
      
      <button 
        onClick={testAllConnections}
        disabled={loading}
        style={{
          padding: '10px 20px',
          background: loading ? '#6c757d' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? '🔄 Testing...' : '🚀 Test Connections'}
      </button>
      
      <button 
        onClick={() => setShowDetails(!showDetails)}
        style={{
          marginLeft: '10px',
          padding: '10px 15px',
          background: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      
      {status.message && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          background: status.error ? '#f8d7da' : '#d1ecf1',
          border: `1px solid ${status.error ? '#f5c6cb' : '#bee5eb'}`,
          borderRadius: '4px'
        }}>
          <h4>{status.error ? '❌ Issues Found' : '✅ Connection Status'}</h4>
          <pre style={{ 
            whiteSpace: 'pre-wrap', 
            background: 'white', 
            padding: '10px', 
            borderRadius: '4px',
            maxHeight: showDetails ? 'none' : '100px',
            overflow: 'auto'
          }}>
            {JSON.stringify(status, null, 2)}
          </pre>
        </div>
      )}
      
      <div style={{ marginTop: '20px', fontSize: '0.9em', color: '#666' }}>
        <h5>💡 Troubleshooting Tips:</h5>
        <ol>
          <li>Run Spring Boot: <code>mvn spring-boot:run</code> or use IDE</li>
          <li>Check if port 8080 is free: <code>lsof -i :8080</code></li>
          <li>Verify PostgreSQL is running: <code>sudo service postgresql status</code></li>
          <li>Check browser console for CORS errors</li>
          <li>Test with curl: <code>curl http://localhost:8080/api/v1/health</code></li>
        </ol>
      </div>
    </div>
  );
};

export default ConnectionTester;