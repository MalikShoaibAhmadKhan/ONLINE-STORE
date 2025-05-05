# Online Store Application

A modern, containerized e-commerce application built with Node.js, Express, PostgreSQL, and a static frontend served by NGINX.

## 🌟 Features

- Containerized microservices architecture
- Secure and optimized Docker configurations
- Health monitoring for all services
- Resource management and scaling capabilities
- Development and production environments
- Automated build and deployment process

## 🏗️ Architecture

The application consists of three main services:

1. **Frontend Service**
   - NGINX-based static file server
   - Modern responsive UI
   - Health monitoring endpoint
   - Optimized asset caching
   - Gzip compression enabled

2. **Backend Service**
   - Node.js/Express REST API
   - PostgreSQL database integration
   - CORS enabled
   - Health monitoring endpoint
   - Secure non-root user execution

3. **Database Service**
   - PostgreSQL 13
   - Persistent volume storage
   - Health monitoring
   - Automated backup capability

## 🚀 Getting Started

### Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd online-store
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configurations
```

3. Build and start the containers:
```bash
docker-compose up -d
```

4. Access the application:
- Frontend: http://localhost:80
- Backend API: http://localhost:3000
- Database: PostgreSQL on port 5432 (internal)

## 🛠️ Development

### Local Development Setup

1. Install dependencies:
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

2. Start development servers:
```bash
# Frontend
npm start

# Backend
npm run dev
```

### Docker Commands

- Build containers: `docker-compose build`
- Start services: `docker-compose up -d`
- Stop services: `docker-compose down`
- View logs: `docker-compose logs -f [service]`
- Restart services: `docker-compose restart`
- Remove volumes: `docker-compose down -v`

## 🔒 Security Features

- Non-root user execution in containers
- Environment variable management
- Secure headers in NGINX
- CORS configuration
- Resource limitations
- Network isolation

## 📊 Monitoring & Maintenance

### Health Checks

- Frontend: `http://localhost:80/health`
- Backend: `http://localhost:3000/health`
- Database: Internal PostgreSQL health check

### Logging

- JSON format logs
- Log rotation enabled
- Size-based log management
- Separate logs per service

### Resource Management

- CPU limits configured
- Memory limits in place
- Disk space monitoring
- Container resource tracking

## 🔧 Configuration

### Environment Variables

Key environment variables (configured in `.env`):

```env
# Node Environment
NODE_ENV=production

# Database Configuration
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=your_strong_password_here
DB_NAME=onlinestore
DB_PORT=5432

# Backend Configuration
BACKEND_PORT=3000
BACKEND_HOST=0.0.0.0

# Frontend Configuration
FRONTEND_PORT=80

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRATION=24h
```

### Docker Compose Configuration

- Resource limits per service
- Health check parameters
- Logging configuration
- Network settings
- Volume management

## 🔍 Improvements Made

1. **Security Enhancements**:
   - Non-root user implementation
   - Secure file permissions
   - Environment variable management
   - Alpine-based images
   - Security headers

2. **Performance Optimizations**:
   - Multi-stage builds
   - NGINX caching
   - Gzip compression
   - Resource limits
   - Layer optimization

3. **Reliability Improvements**:
   - Health monitoring
   - Automatic restarts
   - Dependency management
   - Error handling
   - Logging configuration

4. **Development Experience**:
   - Clear project structure
   - Development/production separation
   - Easy-to-use commands
   - Comprehensive documentation

## 📝 License

[Your License Here]

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request 