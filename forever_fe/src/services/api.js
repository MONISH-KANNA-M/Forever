const API_BASE_URL = "http://localhost:5000/api";

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Helper function to set auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// API service functions
export const apiService = {
  // Authentication
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async getProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get profile");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async updateProfile(profileData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Products
  async getProducts(params = {}) {
    try {
      const queryParams = new URLSearchParams(params);
      const response = await fetch(
        `${API_BASE_URL}/products/list?${queryParams}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async getProduct(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/single/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch product");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async getBestsellerProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products/bestseller`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch bestseller products");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Cart
  async addToCart(productId, quantity = 1, size = "M") {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId, quantity, size }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add to cart");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async getCart() {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get cart");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async updateCartItem(productId, size, quantity) {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/update`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId, size, quantity }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update cart");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async removeFromCart(productId, size) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/cart/remove/${productId}/${size}`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove from cart");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async clearCart() {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/clear`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to clear cart");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Orders
  async placeOrder(orderData, paymentMethod) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/orders/place/${paymentMethod}`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async getUserOrders() {
    try {
      const userData = authUtils.getUserData();
      const response = await fetch(
        `${API_BASE_URL}/orders/userorders/${userData._id}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async getOrderById(orderId) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch order");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
};

// Auth utility functions
export const authUtils = {
  // Store user data and token
  setUserData(userData, token) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...userData,
        isLoggedIn: true,
      })
    );
    localStorage.setItem("token", token);
  },

  // Get user data
  getUserData() {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  },

  // Get token
  getToken() {
    return localStorage.getItem("token");
  },

  // Check if user is logged in
  isLoggedIn() {
    const userData = this.getUserData();
    const token = this.getToken();
    return userData && token && userData.isLoggedIn;
  },

  // Clear user data and token
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },

  // Validate token and get fresh user data
  async validateToken() {
    try {
      const token = this.getToken();
      if (!token) {
        return false;
      }

      const response = await apiService.getProfile();
      if (response.user) {
        // Update user data with fresh data from server
        this.setUserData(response.user, token);
        return true;
      }
      return false;
    } catch (error) {
      // Token is invalid, clear data
      this.logout();
      return false;
    }
  },
};
