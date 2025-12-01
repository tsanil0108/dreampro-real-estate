import React, { useState, useEffect } from 'react';
import Api, { handleApiError, isOnline } from './Api';

const ApiTester = () => {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [data, setData] = useState(null);
  const [backendReachable, setBackendReachable] = useState(null);

  const testBackendConnection = async () => {
    setStatus('loading');
    setMessage('Testing backend connection...');
    
    try {
      const isReachable = await Api.checkBackendReachability();
      setBackendReachable(isReachable);
      setMessage(isReachable ? '✅ Backend is reachable' : '❌ Backend is not reachable');
    } catch (error) {
      setBackendReachable(false);
      setMessage('❌ Error checking backend reachability');
    } finally {
      setStatus('idle');
    }
  };

  const testHealthEndpoint = async () => {
    setStatus('loading');
    setMessage('Testing /health endpoint...');
    
    try {
      const response = await Api.get('/health');
      setData(response.data);
      setMessage('✅ Health endpoint successful');
      setStatus('success');
    } catch (error) {
      setMessage(`❌ Health endpoint failed: ${handleApiError(error)}`);
      setStatus('error');
    }
  };

  const testAuthEndpoints = async () => {
    setStatus('loading');
    setMessage('Testing auth endpoints...');

    try {
      // Test registration endpoint (even if it fails due to existing user, it should respond)
      const registerResponse = await Api.post('/auth/register', {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      });
      setData(registerResponse.data);
      setMessage('✅ Auth endpoints responding');
    } catch (error) {
      // Even if registration fails (user exists), we got a response
      if (error.response) {
        setMessage('✅ Auth endpoints responding (registration failed as expected)');
        setData(error.response.data);
      } else {
        setMessage(`❌ Auth endpoints failed: ${handleApiError(error)}`);
      }
    } finally {
      setStatus('idle');
    }
  };

  const testPropertiesEndpoint = async () => {
    setStatus('loading');
    setMessage('Testing properties endpoint...');
    
    try {
      const response = await Api.get('/properties/public');
      setData(response.data);
      setMessage('✅ Properties endpoint successful');
      setStatus('success');
    } catch (error) {
      setMessage(`❌ Properties endpoint failed: ${handleApiError(error)}`);
      setStatus('error');
    }
  };

  const clearStorage = () => {
    Api.clearAuthData();
    setMessage('✅ Local storage cleared');
    setData(null);
  };

  useEffect(() => {
    testBackendConnection();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', minHeight: '80vh' }}>
      <h2>🌐 API Connection Tester</h2>
      
      <div style={{ marginBottom: '20px', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
        <p><strong>API Base URL:</strong> {import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'}</p>
        <p><strong>Online Status:</strong> {isOnline() ? '✅ Online' : '❌ Offline'}</p>
        <p><strong>Backend Reachable:</strong> 
          {backendReachable === null ? ' 🔄 Checking...' : 
           backendReachable ? ' ✅ Yes' : ' ❌ No'}
        </p>
      </div>

      <div style={{ marginBottom: '20px', gap: '10px', display: 'flex', flexWrap: 'wrap' }}>
        <button 
          onClick={testBackendConnection}
          style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🔄 Test Backend Connection
        </button>
        
        <button 
          onClick={testHealthEndpoint}
          style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🏥 Test Health Endpoint
        </button>
        
        <button 
          onClick={testAuthEndpoints}
          style={{ padding: '10px 15px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🔐 Test Auth Endpoints
        </button>
        
        <button 
          onClick={testPropertiesEndpoint}
          style={{ padding: '10px 15px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🏠 Test Properties Endpoint
        </button>
        
        <button 
          onClick={clearStorage}
          style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🗑️ Clear Storage
        </button>
      </div>

      {message && (
        <div style={{
          padding: '15px',
          borderRadius: '5px',
          backgroundColor: status === 'error' ? '#f8d7da' : 
                          status === 'success' ? '#d1edff' : '#fff3cd',
          border: `1px solid ${status === 'error' ? '#f5c6cb' : 
                              status === 'success' ? '#b8daff' : '#ffeaa7'}`,
          color: status === 'error' ? '#721c24' : 
                 status === 'success' ? '#004085' : '#856404',
          marginBottom: '20px'
        }}>
          {message}
        </div>
      )}

      {data && (
        <div>
          <h3>Response Data:</h3>
          <pre style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '5px',
            overflow: 'auto',
            fontSize: '14px',
            maxHeight: '400px'
          }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      {/* Debug Information */}
      <details style={{ marginTop: '20px' }}>
        <summary style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
          🔧 Debug Information
        </summary>
        <div style={{ marginTop: '10px', fontSize: '14px', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
          <p><strong>Local Storage Contents:</strong></p>
          <ul>
            {Object.keys(localStorage).map(key => (
              <li key={key}>
                <strong>{key}:</strong> {localStorage.getItem(key).length > 50 ? 
                  localStorage.getItem(key).substring(0, 50) + '...' : 
                  localStorage.getItem(key)}
              </li>
            ))}
          </ul>
          
          <p style={{ marginTop: '15px' }}><strong>Troubleshooting Tips:</strong></p>
          <ul>
            <li>Ensure Spring Boot is running on port 8080</li>
            <li>Check if PostgreSQL database is running</li>
            <li>Verify CORS configuration in backend</li>
            <li>Check browser console for detailed errors</li>
          </ul>
        </div>
      </details>
    </div>
  );
};

export default ApiTester;