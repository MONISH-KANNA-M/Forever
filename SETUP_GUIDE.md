# 🚀 Forever E-commerce Setup Guide

## Overview

This guide will help you set up MongoDB Atlas and Cloudinary for the Forever e-commerce application.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Cloudinary account

## 🔧 Step 1: MongoDB Atlas Setup

### 1.1 Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project

### 1.2 Create Database Cluster

1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider and region
4. Click "Create"

### 1.3 Configure Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password (save these!)
4. Select "Read and write to any database"
5. Click "Add User"

### 1.4 Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### 1.5 Get Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password

## 🔧 Step 2: Cloudinary Setup

### 2.1 Create Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Verify your email

### 2.2 Get API Credentials

1. Go to your Cloudinary Dashboard
2. Note down:
   - Cloud Name
   - API Key
   - API Secret

## 🔧 Step 3: Environment Configuration

### 3.1 Create .env File

Create a `.env` file in the `forever_be` directory:

```env
# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/forever?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

### 3.2 Replace Placeholder Values

- Replace `your_username` and `your_password` with your MongoDB Atlas credentials
- Replace `your_cloud_name`, `your_api_key`, `your_api_secret` with your Cloudinary credentials
- Generate a strong JWT secret (you can use a random string)

## 🔧 Step 4: Install Dependencies

### 4.1 Backend Dependencies

```bash
cd forever_be
npm install
```

### 4.2 Frontend Dependencies

```bash
cd forever_fe
npm install
```

## 🔧 Step 5: Start the Application

### 5.1 Start Backend Server

```bash
cd forever_be
npm start
```

You should see:

```
✅ MongoDB Connected: your-cluster.mongodb.net
✅ MongoDB connection is healthy
✅ Cloudinary connected successfully
🚀 Server running on port 5000
📊 Health check: http://localhost:5000/api/health
```

### 5.2 Start Frontend Server

```bash
cd forever_fe
npm run dev
```

You should see:

```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## 🧪 Step 6: Test the Setup

### 6.1 Test Health Check

Visit: `http://localhost:5000/api/health`

Expected response:

```json
{
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": {
    "mongodb": "connected",
    "cloudinary": "configured"
  }
}
```

### 6.2 Test Product Upload

1. Go to the admin panel
2. Try adding a product with images
3. Check if images are uploaded to Cloudinary
4. Verify products are saved in MongoDB

### 6.3 Test COD Order Flow

1. Add items to cart
2. Go to checkout
3. Fill delivery information
4. Select "Cash on Delivery"
5. Place order
6. Check if order is saved in MongoDB

## 🔧 Step 7: Troubleshooting

### MongoDB Connection Issues

- Check if your IP is whitelisted in MongoDB Atlas
- Verify username and password in connection string
- Ensure cluster is running

### Cloudinary Issues

- Verify API credentials in .env file
- Check if images are being uploaded correctly
- Monitor Cloudinary dashboard for uploads

### General Issues

- Check server logs for error messages
- Verify all environment variables are set
- Ensure all dependencies are installed

## 📊 Monitoring

### MongoDB Atlas

- Monitor database usage in Atlas dashboard
- Check connection status
- Monitor query performance

### Cloudinary

- Monitor upload usage in Cloudinary dashboard
- Check image transformations
- Monitor bandwidth usage

## 🔒 Security Notes

### Production Deployment

- Use environment-specific .env files
- Set up proper CORS configuration
- Use strong JWT secrets
- Implement rate limiting
- Set up proper MongoDB user roles
- Configure Cloudinary upload presets

### Environment Variables

- Never commit .env files to version control
- Use different credentials for development and production
- Rotate secrets regularly

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)

## 🎉 Success!

Once all steps are completed, your Forever e-commerce application should be fully functional with:

- ✅ MongoDB Atlas database
- ✅ Cloudinary image storage
- ✅ COD order processing
- ✅ Dynamic product management
- ✅ User authentication
- ✅ Cart functionality

Happy coding! 🚀
