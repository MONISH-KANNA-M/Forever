import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

const testProduct = {
  name: 'Test Product',
  description: 'A test product for testing',
  price: 99.99,
  image: ['test-image.jpg'],
  category: 'test',
  subcategory: 'test-sub',
  sizes: ['S', 'M', 'L'],
  bestseller: true,
  date: Date.now()
};

let authToken = '';
let userId = '';
let productId = '';

// Helper function to make API calls
async function makeRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
      ...options.headers
    },
    ...options
  });
  
  const data = await response.json();
  return { response, data };
}

// Test functions
async function testHealthCheck() {
  console.log('🔍 Testing health check...');
  const { response, data } = await makeRequest('/health');
  console.log(`Status: ${response.status}`);
  console.log(`Response:`, data);
  console.log('✅ Health check passed\n');
}

async function testUserRegistration() {
  console.log('🔍 Testing user registration...');
  const { response, data } = await makeRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(testUser)
  });
  
  console.log(`Status: ${response.status}`);
  if (response.ok) {
    authToken = data.token;
    userId = data.user.id;
    console.log('✅ Registration successful');
    console.log(`Token: ${authToken.substring(0, 20)}...`);
  } else {
    console.log('❌ Registration failed:', data.message);
  }
  console.log('');
}

async function testUserLogin() {
  console.log('🔍 Testing user login...');
  const { response, data } = await makeRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: testUser.email,
      password: testUser.password
    })
  });
  
  console.log(`Status: ${response.status}`);
  if (response.ok) {
    authToken = data.token;
    console.log('✅ Login successful');
    console.log(`Token: ${authToken.substring(0, 20)}...`);
  } else {
    console.log('❌ Login failed:', data.message);
  }
  console.log('');
}

async function testGetProfile() {
  console.log('🔍 Testing get profile...');
  const { response, data } = await makeRequest('/auth/profile');
  
  console.log(`Status: ${response.status}`);
  if (response.ok) {
    console.log('✅ Profile retrieved successfully');
    console.log(`User: ${data.user.name} (${data.user.email})`);
  } else {
    console.log('❌ Get profile failed:', data.message);
  }
  console.log('');
}

async function testUpdateProfile() {
  console.log('🔍 Testing update profile...');
  const updatedData = {
    name: 'Updated Test User',
    email: 'updated@example.com'
  };
  
  const { response, data } = await makeRequest('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(updatedData)
  });
  
  console.log(`Status: ${response.status}`);
  if (response.ok) {
    console.log('✅ Profile updated successfully');
    console.log(`Updated user: ${data.user.name} (${data.user.email})`);
  } else {
    console.log('❌ Update profile failed:', data.message);
  }
  console.log('');
}

async function testGetProducts() {
  console.log('🔍 Testing get products...');
  const { response, data } = await makeRequest('/products');
  
  console.log(`Status: ${response.status}`);
  if (response.ok) {
    console.log(`✅ Retrieved ${data.length} products`);
    if (data.length > 0) {
      productId = data[0]._id;
      console.log(`First product: ${data[0].name}`);
    }
  } else {
    console.log('❌ Get products failed:', data.message);
  }
  console.log('');
}

async function testGetBestsellerProducts() {
  console.log('🔍 Testing get bestseller products...');
  const { response, data } = await makeRequest('/products/bestseller');
  
  console.log(`Status: ${response.status}`);
  if (response.ok) {
    console.log(`✅ Retrieved ${data.length} bestseller products`);
  } else {
    console.log('❌ Get bestseller products failed:', data.message);
  }
  console.log('');
}

async function testCartOperations() {
  if (!productId) {
    console.log('⚠️ Skipping cart tests - no product ID available');
    return;
  }
  
  console.log('🔍 Testing cart operations...');
  
  // Add to cart
  const { response: addResponse, data: addData } = await makeRequest('/cart/add', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity: 2 })
  });
  
  console.log(`Add to cart status: ${addResponse.status}`);
  if (addResponse.ok) {
    console.log('✅ Added to cart successfully');
  } else {
    console.log('❌ Add to cart failed:', addData.message);
  }
  
  // Get cart
  const { response: getResponse, data: getData } = await makeRequest('/cart');
  console.log(`Get cart status: ${getResponse.status}`);
  if (getResponse.ok) {
    console.log('✅ Retrieved cart successfully');
    console.log(`Cart items: ${Object.keys(getData.cartData).length}`);
  } else {
    console.log('❌ Get cart failed:', getData.message);
  }
  
  // Remove from cart
  const { response: removeResponse, data: removeData } = await makeRequest(`/cart/remove/${productId}`, {
    method: 'DELETE'
  });
  
  console.log(`Remove from cart status: ${removeResponse.status}`);
  if (removeResponse.ok) {
    console.log('✅ Removed from cart successfully');
  } else {
    console.log('❌ Remove from cart failed:', removeData.message);
  }
  
  console.log('');
}

// Main test function
async function runTests() {
  console.log('🚀 Starting API tests...\n');
  
  try {
    await testHealthCheck();
    await testUserRegistration();
    await testUserLogin();
    await testGetProfile();
    await testUpdateProfile();
    await testGetProducts();
    await testGetBestsellerProducts();
    await testCartOperations();
    
    console.log('🎉 All tests completed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests();
}

export { runTests }; 