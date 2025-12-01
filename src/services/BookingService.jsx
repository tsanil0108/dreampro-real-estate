
import api from './Api';

class BookingService {
  // Create new booking
  async createBooking(bookingData) {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Get user bookings
  async getUserBookings(userId, page = 0, size = 10) {
    try {
      const response = await api.get(`/bookings/user/${userId}`, {
        params: { page, size }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Get booking by ID
  async getBookingById(id) {
    try {
      const response = await api.get(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Update booking
  async updateBooking(id, bookingData) {
    try {
      const response = await api.put(`/bookings/${id}`, bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Cancel booking
  async cancelBooking(id) {
    try {
      const response = await api.delete(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Check property availability
  async checkAvailability(propertyId, date) {
    try {
      const response = await api.get(`/bookings/property/${propertyId}/availability`, {
        params: { date }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // Get available slots
  async getAvailableSlots(propertyId, date) {
    try {
      const response = await api.get(`/bookings/property/${propertyId}/available-slots`, {
        params: { date }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}

export default new BookingService();