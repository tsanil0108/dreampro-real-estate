// src/services/connectionTest.js
// import Api from "./Api";

const connectionTest = async () => {
  try {
    console.log('🔍 Testing connection to backend...');
    
    // Try a simple health check endpoint
    const response = await Api.get('/health');
    console.log('✅ Backend connection successful:', response.data);
    return { success: true, data: response.data };
    
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    
    if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNREFUSED') {
      return { 
        success: false, 
        error: 'Cannot connect to server. Make sure the backend is running.' 
      };
    }
    
    return { 
      success: false, 
      error: error.message 
    };
  }
};

export const checkBackendStatus = async () => {
  const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
  
  try {
    const response = await fetch(backendUrl, {
      method: 'HEAD',
      mode: 'no-cors' // Simple connection test
    });
    return { online: true, url: backendUrl };
  } catch (error) {
    return { online: false, url: backendUrl, error: error.message };
  }
};

export default connectionTest;