import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Panel</h1>

        <form>
          {/* Email field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address:
            </label>
            <input
              type="email"
              className="rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Password field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password:
            </label>
            <input
              type="password"
              className="rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
