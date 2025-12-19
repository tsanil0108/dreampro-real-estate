// src/services/propertyService.js
// import Api from './Api';


class PropertiesService {
  // Get all properties with pagination and filters
  async getProperties(params = {}) {
    try {
      const response = await Api.get('/properties', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Get property by ID
  async getPropertyById(id) {
    try {
      const response = await Api.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Create new property
  async createProperty(propertyData) {
    try {
      const response = await Api.post('/properties', propertyData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Update property
  async updateProperty(id, propertyData) {
    try {
      const response = await Api.put(`/properties/${id}`, propertyData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Delete property
  async deleteProperty(id) {
    try {
      const response = await Api.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Search properties
  async searchProperties(filters = {}) {
    try {
      const response = await Api.get('/properties/search', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Get featured properties
  async getFeaturedProperties() {
    try {
      const response = await Api.get('/properties/featured');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Get properties by city
  async getPropertiesByCity(city, page = 0, size = 10) {
    try {
      const response = await Api.get(`/properties/city/${city}`, {
        params: { page, size }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Add amenities to property
  async addAmenities(propertyId, amenities) {
    try {
      const response = await Api.post(`/properties/${propertyId}/amenities`, amenities);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Get available cities
  async getAvailableCities() {
    try {
      const response = await Api.get('/properties/cities');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Get property statistics
  async getPropertyStats() {
    try {
      const response = await Api.get('/properties/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}

export default new PropertiesService();
