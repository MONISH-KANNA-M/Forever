# Forever E-commerce Backend

A Node.js/Express backend API for the Forever e-commerce application.

## Features

- User authentication (register/login)
- JWT token-based authentication
- Product management
- Cart functionality
- MongoDB database integration
- Input validation
- CORS enabled

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd forever_be
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/forever_ecommerce
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

5. Start the server:
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/bestseller` - Get bestseller products

### Cart

- `POST /api/cart/add` - Add item to cart (requires auth)
- `GET /api/cart` - Get user's cart (requires auth)
- `DELETE /api/cart/remove/:productId` - Remove item from cart (requires auth)

### Health Check

- `GET /api/health` - Server health check

## Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, min 6 chars),
  cartData: Object (default: {}),
  createdAt: Date (default: now)
}
```

### Product Schema
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  image: [String] (required),
  category: String (required),
  subcategory: String (required),
  sizes: [String] (required),
  bestseller: Boolean (default: false),
  date: Number (required)
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Development

### Project Structure

```
forever_be/
├── config/
│   ├── mongodb.js
│   └── cloudinary.js
├── middleware/
│   └── usercontroller.js
├── models/
│   ├── usermodel.js
│   └── productmodel.js
├── routes/
│   └── useroute.js
├── server.js
├── package.json
└── .env
```

### Adding New Features

1. Create models in the `models/` directory
2. Create controllers in the `middleware/` directory
3. Create routes in the `routes/` directory
4. Import and use routes in `server.js`

## Testing

Test the API endpoints using tools like Postman, curl, or any HTTP client.

Example registration:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong JWT_SECRET
3. Use a production MongoDB instance
4. Set up proper CORS configuration
5. Use environment variables for all sensitive data

## License

ISC 