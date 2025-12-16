import React, { useState, useEffect } from 'react';
import Api, { handleApiError } from './Api';

const ApiTester = () => {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [data, setData] = useState(null);
  const [backendReachable, setBackendReachable] = useState(null);
  const [isMockMode, setIsMockMode] = useState(true);

  // Check if we're using mock mode by checking the URL being called
  const checkApiMode = () => {
    // Check localStorage or another indicator
    const mode = localStorage.getItem('api_mode') || 'mock';
    setIsMockMode(mode === 'mock');
  };

  const toggleMockMode = () => {
    const newMode = !isMockMode;
    setIsMockMode(newMode);
    localStorage.setItem('api_mode', newMode ? 'mock' : 'real');
    setMessage(`Switched to ${newMode ? '🔧 MOCK' : '🌐 REAL'} API mode`);
    setBackendReachable(null);
    setData(null);
  };

  const testBackendConnection = async () => {
    setStatus('loading');
    setMessage('Testing backend connection...');
    
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      console.log('Testing connection to:', `${baseUrl}/api/health`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`${baseUrl}/api/health`, {
        method: 'GET',
        signal: controller.signal,
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors'
      }).catch(err => {
        console.error('Fetch error:', err);
        throw err;
      });
      
      clearTimeout(timeoutId);
      
      console.log('Response status:', response.status, response.statusText);
      
      if (response.ok) {
        const responseData = await response.json();
        setBackendReachable(true);
        setMessage(`✅ Backend is reachable - Status: ${responseData.status || 'OK'}`);
        setData(responseData);
      } else {
        setBackendReachable(false);
        const errorText = await response.text();
        setMessage(`❌ Backend responded with ${response.status}: ${errorText.substring(0, 100)}`);
      }
    } catch (error) {
      setBackendReachable(false);
      console.error('Connection test error:', error);
      
      if (error.name === 'AbortError' || error.message.includes('timeout')) {
        setMessage('❌ Request timed out (backend not responding)');
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        setMessage('❌ Network error - backend might not be running');
      } else if (error.message.includes('CORS') || error.message.includes('cross-origin')) {
        setMessage('❌ CORS error - check Spring Boot CORS configuration');
      } else {
        setMessage(`❌ Connection failed: ${error.message}`);
      }
    } finally {
      setStatus('idle');
    }
  };

  const testHealthEndpoint = async () => {
    setStatus('loading');
    setMessage('Testing /api/health endpoint...');
    
    try {
      const response = await Api.get('/api/health');
      setData(response.data);
      setMessage(`✅ Health endpoint successful - ${response.data.status || 'OK'}`);
      setStatus('success');
    } catch (error) {
      setMessage(`❌ Health failed: ${handleApiError(error)}`);
      setStatus('error');
    }
  };

  const testAuthEndpoints = async () => {
    setStatus('loading');
    setMessage('Testing auth endpoints...');

    try {
      const response = await Api.post('/api/auth/register', {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      });

      setData(response.data);
      setMessage('✅ Auth endpoint responding');
    } catch (error) {
      if (error.response) {
        setMessage('✅ Auth endpoint responding (expected failure)');
        setData(error.response.data);
      } else {
        setMessage(`❌ Auth failed: ${handleApiError(error)}`);
      }
    } finally {
      setStatus('idle');
    }
  };

  const testPropertiesEndpoint = async () => {
    setStatus('loading');
    setMessage('Testing properties endpoint...');

    try {
      const response = await Api.get('/api/properties/public');
      setData(response.data);
      setMessage('✅ Properties endpoint successful');
      setStatus('success');
    } catch (error) {
      setMessage(`❌ Properties failed: ${handleApiError(error)}`);
      setStatus('error');
    }
  };

  const testPublicEndpoint = async () => {
    setStatus('loading');
    setMessage('Testing /api/test/public endpoint...');
    
    try {
      const response = await Api.get('/api/test/public');
      setData(response.data);
      setMessage('✅ Public test endpoint successful');
      setStatus('success');
    } catch (error) {
      setMessage(`❌ Public test failed: ${handleApiError(error)}`);
      setStatus('error');
    }
  };

  const clearStorage = () => {
    Api.clearAuthData();
    setMessage('✅ Local storage cleared');
    setData(null);
  };

  // Direct test URLs
  const testDirectUrls = async () => {
    setStatus('loading');
    setMessage('Testing common endpoints directly...');
    
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
    const urls = [
      `${baseUrl}/api/health`,
      `${baseUrl}/api/test/public`,
      `${baseUrl}/health`,
      `${baseUrl}/`
    ];
    
    const results = [];
    
    for (const url of urls) {
      try {
        const startTime = Date.now();
        const response = await fetch(url, { 
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });
        const endTime = Date.now();
        
        let responseData = null;
        try {
          responseData = await response.json();
        } catch {
          responseData = await response.text();
        }
        
        results.push({
          url,
          status: response.status,
          ok: response.ok,
          statusText: response.statusText,
          responseTime: `${endTime - startTime}ms`,
          data: typeof responseData === 'string' ? responseData.substring(0, 100) : responseData
        });
      } catch (error) {
        results.push({
          url,
          status: 'ERROR',
          ok: false,
          statusText: error.message,
          responseTime: 'N/A',
          data: null
        });
      }
    }
    
    setData(results);
    setMessage('✅ Direct URL tests completed');
    setStatus('success');
  };

  // Test all endpoints at once
  const testAllEndpoints = async () => {
    setStatus('loading');
    setMessage('Testing all endpoints...');
    setData(null);
    
    const tests = [
      { name: 'Backend Connection', func: testBackendConnection },
      { name: 'Health Endpoint', func: testHealthEndpoint },
      { name: 'Public Test', func: testPublicEndpoint },
      { name: 'Auth Register', func: testAuthEndpoints },
      { name: 'Properties', func: testPropertiesEndpoint }
    ];
    
    const results = [];
    
    for (const test of tests) {
      try {
        // For now, just run them in sequence
        if (test.name === 'Backend Connection') {
          await testBackendConnection();
          results.push({ test: test.name, status: backendReachable ? '✅' : '❌' });
        } else if (test.name === 'Health Endpoint') {
          await testHealthEndpoint();
          results.push({ test: test.name, status: status === 'success' ? '✅' : '❌' });
        }
        // Add small delay between tests
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        results.push({ test: test.name, status: '❌', error: error.message });
      }
    }
    
    setData(results);
    const passed = results.filter(r => r.status === '✅').length;
    setMessage(`✅ Test completed: ${passed}/${results.length} tests passed`);
    setStatus('success');
  };

  useEffect(() => {
    checkApiMode();
    setMessage(
      isMockMode 
        ? '🔧 Using MOCK API mode - backend simulation'
        : '🌐 Using REAL API mode - connecting to actual backend'
    );
  }, [isMockMode]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', minHeight: '80vh' }}>
      <h2>🌐 API Connection Tester</h2>
      
      <div style={{ marginBottom: '20px', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
        <p><strong>API Base URL:</strong> {import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}</p>
        <p><strong>Mode:</strong> {isMockMode ? '🔧 MOCK (simulated)' : '🌐 REAL (live backend)'}</p>
        <p><strong>Online Status:</strong> {navigator.onLine ? '✅ Online' : '❌ Offline'}</p>
        <p><strong>Backend Reachable:</strong> 
          {backendReachable === null ? ' 🔄 Not tested yet' : 
           backendReachable ? ' ✅ Yes' : ' ❌ No'}
        </p>
      </div>

      <div style={{ marginBottom: '20px', gap: '10px', display: 'flex', flexWrap: 'wrap' }}>
        <button 
          onClick={testAllEndpoints}
          style={{ padding: '10px 15px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🚀 Test All
        </button>
        
        <button 
          onClick={toggleMockMode}
          style={{ padding: '10px 15px', backgroundColor: isMockMode ? '#17a2b8' : '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          {isMockMode ? '🔧 Switch to REAL API' : '🌐 Switch to MOCK API'}
        </button>
        
        <button 
          onClick={testDirectUrls}
          style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🔗 Test URLs
        </button>
        
        <button 
          onClick={testBackendConnection}
          style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🔄 Connection
        </button>
        
        <button 
          onClick={testHealthEndpoint}
          style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🏥 Health
        </button>
        
        <button 
          onClick={testPublicEndpoint}
          style={{ padding: '10px 15px', backgroundColor: '#20c997', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🧪 Public Test
        </button>
        
        <button 
          onClick={testAuthEndpoints}
          style={{ padding: '10px 15px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🔐 Auth
        </button>
        
        <button 
          onClick={testPropertiesEndpoint}
          style={{ padding: '10px 15px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🏠 Properties
        </button>
        
        <button 
          onClick={clearStorage}
          style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🗑️ Clear
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
          
          <h4>🔄 Current Mode: {isMockMode ? 'MOCK' : 'REAL'}</h4>
          <p>In MOCK mode, all API calls return simulated data.</p>
          <p>In REAL mode, API calls connect to: <strong>{import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}</strong></p>
          
          <h4>📋 Next Steps:</h4>
          <ol>
            <li><strong>Test in MOCK mode first</strong> - Click buttons to see simulated responses</li>
            <li><strong>Test backend connection</strong> - Click "Connection" to check if Spring Boot is reachable</li>
            <li><strong>Switch to REAL mode</strong> - Only after confirming backend is running</li>
            <li><strong>Fix backend if needed</strong> - Use debug info below</li>
          </ol>
          
          <h4>🔗 Test These URLs in Browser:</h4>
          <ul>
            <li><a href="http://localhost:8080/api/health" target="_blank" rel="noopener noreferrer">http://localhost:8080/api/health</a></li>
            <li><a href="http://localhost:8080/api/test/public" target="_blank" rel="noopener noreferrer">http://localhost:8080/api/test/public</a></li>
            <li><a href="http://localhost:8080" target="_blank" rel="noopener noreferrer">http://localhost:8080</a></li>
          </ul>
          
          <h4>🔧 Backend Setup Checklist:</h4>
          <ul>
            <li>✅ Spring Boot running on port 8080</li>
            <li>❌ HealthController at <code>/api/health</code></li>
            <li>❌ TestController at <code>/api/test/public</code></li>
            <li>❌ CORS configured for <code>http://localhost:5173</code></li>
            <li>❌ SecurityConfig allowing public endpoints</li>
          </ul>
          
          <h4>💡 Quick Fixes:</h4>
          <ul>
            <li>Add the HealthController and TestController code to your Spring Boot project</li>
            <li>Make sure controllers are in <code>com.rsapp.controller</code> package</li>
            <li>Restart Spring Boot after adding controllers</li>
            <li>Check browser console for CORS errors</li>
          </ul>
        </div>
      </details>
    </div>
  );
};

export default ApiTester;