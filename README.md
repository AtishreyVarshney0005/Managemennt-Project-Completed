# Management Pro - Inventory Management System

A comprehensive inventory management system built with React, Node.js, Express, and PostgreSQL.

## 🚀 Features

- **User Authentication** - Secure login system with JWT tokens
- **Dashboard** - Overview of key metrics and recent sales
- **Inventory Management** - Add, edit, delete, and search products
- **Sales Tracking** - Record and monitor sales transactions
- **Analytics** - Visual charts and insights with Chart.js
- **Billing System** - Standalone billing interface with invoice management
- **Search Functionality** - Global search across products and sales
- **Responsive Design** - Mobile-friendly interface with Tailwind CSS
- **Real-time Updates** - Live data synchronization
- **Export Reports** - CSV export functionality for data analysis

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Data visualization
- **Axios** - HTTP client
- **React Hot Toast** - Notification system

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🚀 Getting Started

### Database Setup

1. Install PostgreSQL and create a database:
```sql
CREATE DATABASE inventory_db;
CREATE USER postgres WITH PASSWORD 'password123';
GRANT ALL PRIVILEGES ON DATABASE inventory_db TO postgres;
```

2. Run the database schema:
```bash
cd server
psql -U postgres -d inventory_db -f database/schema.sql
```

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
# Local development
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=inventory_db
DB_PASSWORD=password123
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key_here

# Or, on Render, use the DATABASE_URL provided by Render PostgreSQL
# DATABASE_URL=postgresql://postgres:password123@dpg-xxxxx.render.com:5432/inventory_db
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## � Deploy to Render

This project can deploy as two Render services: one `web service` for the backend and one `static site` for the frontend. Use a Render PostgreSQL database for `DATABASE_URL`.

### 1. Create Render PostgreSQL Database

- In Render, create a new PostgreSQL database.
- Note the generated `DATABASE_URL`.
- Use the database name `inventory_db` or any name you prefer.

### 2. Add Backend Service

- Create a new Render Web Service.
- Connect it to the `server` folder.
- Set the build command to:
```bash
npm install
```
- Set the start command to:
```bash
npm start
```
- Add these environment variables in Render:
  - `DATABASE_URL` = your Render PostgreSQL connection string
  - `JWT_SECRET` = a secure random secret

### 3. Add Frontend Static Site

- Create a new Render Static Site.
- Connect it to the `client` folder.
- Set the build command to:
```bash
npm install && npm run build
```
- Set `publish` directory to:
```bash
build
```
- Add this environment variable in Render:
  - `REACT_APP_API_BASE_URL` = `https://<your-backend-service>.onrender.com`

### 4. Verify Deployment

- The backend should respond on `https://<your-backend-service>.onrender.com`
- The frontend should load and call the backend using `REACT_APP_API_BASE_URL`

## �📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Sales
- `GET /api/sales` - Get all sales
- `POST /api/sales` - Create new sale

## 🔧 Available Scripts

### Client
```bash
npm start      # Start development server
npm run build  # Build for production
npm test       # Run tests
```

### Server
```bash
npm run dev    # Start development server with nodemon
```

## 📱 Features Overview

### Dashboard
- Total products, sales, and revenue metrics
- Recent sales activity
- Low stock alerts
- Search functionality

### Inventory
- Product CRUD operations
- Category management
- Stock level monitoring
- Search and filter

### Analytics
- Revenue trends over time
- Product category distribution
- Sales performance charts
- Time-based filtering

### Billing
- Standalone billing interface
- Invoice generation
- Product selection
- Checkout process

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation
- SQL injection prevention

## 📈 Future Enhancements

- [ ] PDF invoice generation
- [ ] Email notifications
- [ ] Multi-user support
- [ ] Advanced reporting
- [ ] Inventory forecasting
- [ ] Mobile app
- [ ] API rate limiting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.