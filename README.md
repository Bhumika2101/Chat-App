# 💬 Real-Time Chat Application

A full-stack real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring WebSocket communication, JWT authentication, and a modern UI.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Live Demo](#live-demo)
- [Video Demonstration](#video-demonstration)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This is a modern, real-time chat application that enables users to communicate instantly with each other. The application features user authentication, real-time messaging using Socket.io, online/offline status indicators, typing indicators, and a sleek dark-themed user interface.

### Key Highlights
- **Real-time Communication**: Instant message delivery using WebSocket (Socket.io)
- **Secure Authentication**: JWT-based authentication with HTTP-only cookies
- **Modern UI/UX**: Responsive design with Tailwind CSS and DaisyUI
- **Online Status**: Real-time online/offline user status indicators
- **Typing Indicators**: See when someone is typing
- **Smart Loading**: Backend connection status with loading screen for cold starts

---

## ✨ Features

### Authentication & Security
- ✅ User registration with password hashing (bcrypt)
- ✅ Secure login with JWT tokens
- ✅ HTTP-only cookies for token storage
- ✅ Protected routes and middleware
- ✅ Logout functionality

### Real-Time Messaging
- ✅ Instant message delivery using Socket.io
- ✅ Real-time message updates
- ✅ Message history persistence
- ✅ Conversation management
- ✅ Unread message handling

### User Experience
- ✅ Online/offline status indicators (green/red dots)
- ✅ Typing indicators ("typing..." animation)
- ✅ User search functionality
- ✅ User profile with avatar
- ✅ Responsive design for all devices
- ✅ Dark theme UI with proper contrast
- ✅ Loading screen for backend connection
- ✅ Toast notifications for user feedback

### Technical Features
- ✅ RESTful API architecture
- ✅ MongoDB database with Mongoose ODM
- ✅ WebSocket communication
- ✅ Environment variable configuration
- ✅ CORS configuration
- ✅ Error handling and validation
- ✅ Modular code structure

---

## 🛠 Technology Stack

### Frontend
- **React.js** (v18.3.1) - UI library
- **React Router DOM** (v6.26.0) - Client-side routing
- **Socket.io Client** (v4.7.5) - Real-time WebSocket communication
- **Zustand** (v4.5.5) - State management
- **Tailwind CSS** (v3.x) - Utility-first CSS framework
- **DaisyUI** (v4.12.10) - Tailwind CSS component library
- **React Hot Toast** (v2.4.1) - Toast notifications
- **React Icons** (v5.2.1) - Icon library
- **Lucide React** (v0.503.0) - Icon components
- **Vite** (v5.x) - Build tool and dev server

### Backend
- **Node.js** (v18+) - JavaScript runtime
- **Express.js** (v4.19.2) - Web application framework
- **MongoDB** (v8.5.2 via Mongoose) - NoSQL database
- **Socket.io** (v4.7.5) - Real-time bidirectional communication
- **JWT** (v9.0.2) - JSON Web Tokens for authentication
- **bcryptjs** (v2.4.3) - Password hashing
- **cors** (v2.8.5) - Cross-Origin Resource Sharing
- **cookie-parser** (v1.4.6) - Cookie parsing middleware
- **dotenv** (v16.4.5) - Environment variable management

### Development Tools
- **Nodemon** (v3.1.4) - Auto-restart development server
- **ESLint** (v9.8.0) - Code linting
- **Autoprefixer** (v10.4.20) - CSS vendor prefixing
- **PostCSS** (v8.x) - CSS transformations

---

## 🏗 System Architecture

### Architecture Overview
```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│                 │  HTTP   │                  │  TCP    │                 │
│   React Client  ├────────▶│  Express Server  ├────────▶│  MongoDB Atlas  │
│   (Frontend)    │         │   (Backend)      │         │   (Database)    │
│                 │◀────────┤                  │◀────────┤                 │
└────────┬────────┘ WebSocket└────────┬─────────┘         └─────────────────┘
         │                            │
         │   Socket.io Connection     │
         └────────────────────────────┘
```

### Application Flow

#### 1. **Authentication Flow**
```
User Registration/Login
    ↓
Password Hashing (bcrypt)
    ↓
JWT Token Generation
    ↓
Store Token in HTTP-only Cookie
    ↓
Protected Route Access
```

#### 2. **Real-Time Messaging Flow**
```
User A sends message
    ↓
HTTP POST to /api/messages/send/:id
    ↓
Save to MongoDB
    ↓
Get receiver's socket ID
    ↓
Emit via Socket.io to User B
    ↓
User B receives message in real-time
```

#### 3. **Online Status Management**
```
User connects → Socket.io connection
    ↓
Store userId-socketId mapping
    ↓
Broadcast online users to all clients
    ↓
Update UI with green/red indicators
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (Local installation or MongoDB Atlas account)
- **Git**

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### Step 2: Install Dependencies

#### Root Level (for monorepo scripts)
```bash
npm install
```

#### Backend Dependencies
```bash
cd backend
npm install
```

#### Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 3: Configure Environment Variables

#### Backend (.env in root or backend folder)
Create a `.env` file in the root directory:
```env
# Server Configuration
PORT=8000
NODE_ENV=development

# MongoDB Configuration
MONGO_DB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env in frontend folder)
Create a `.env` file in the `frontend` directory:
```env
# Backend API URL
VITE_API_URL=http://localhost:8000

# Socket.io URL
VITE_SOCKET_URL=http://localhost:8000
```

### Step 4: Run the Application

#### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# OR
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

#### Option 2: Using the Root Scripts
```bash
# Start backend
npm run server

# Build entire project (backend + frontend)
npm run build
```

### Step 5: Access the Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000
- **API Health Check**: http://localhost:8000/api/health

---

## 🔐 Environment Variables

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `8000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `MONGO_DB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key_min_32_chars` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000` |
| `VITE_SOCKET_URL` | Socket.io server URL | `http://localhost:8000` |

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "fullName": "John Doe",
  "username": "johndoe",
  "password": "password123",
  "confirmPassword": "password123",
  "gender": "male"
}

Response: 200 OK
{
  "_id": "userId",
  "fullName": "John Doe",
  "username": "johndoe",
  "profilePic": "avatar_url"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}

Response: 200 OK
{
  "_id": "userId",
  "fullName": "John Doe",
  "username": "johndoe",
  "profilePic": "avatar_url"
}
```

#### Logout User
```http
POST /api/auth/logout

Response: 200 OK
{
  "message": "Logged out successfully"
}
```

### Message Routes (`/api/messages`)

#### Send Message
```http
POST /api/messages/send/:id
Content-Type: application/json
Authorization: JWT Token (Cookie)

{
  "message": "Hello, how are you?"
}

Response: 201 Created
{
  "_id": "messageId",
  "senderId": "userId1",
  "receiverId": "userId2",
  "message": "Hello, how are you?",
  "createdAt": "2025-12-05T10:30:00Z"
}
```

#### Get Messages
```http
GET /api/messages/:id
Authorization: JWT Token (Cookie)

Response: 200 OK
[
  {
    "_id": "messageId",
    "senderId": "userId1",
    "receiverId": "userId2",
    "message": "Hello!",
    "createdAt": "2025-12-05T10:30:00Z"
  }
]
```

### User Routes (`/api/users`)

#### Get All Users (for sidebar)
```http
GET /api/users
Authorization: JWT Token (Cookie)

Response: 200 OK
[
  {
    "_id": "userId",
    "fullName": "John Doe",
    "username": "johndoe",
    "profilePic": "avatar_url"
  }
]
```

### Health Check

#### Check Backend Status
```http
GET /api/health

Response: 200 OK
{
  "status": "ok",
  "message": "Backend is running"
}
```

---

## 🔌 WebSocket Events (Socket.io)

### Client → Server Events

| Event | Payload | Description |
|-------|---------|-------------|
| `connection` | `{ userId }` | User connects with their ID |
| `typing` | `{ receiverId, isTyping }` | User is typing to another user |
| `disconnect` | - | User disconnects |

### Server → Client Events

| Event | Payload | Description |
|-------|---------|-------------|
| `getOnlineUsers` | `[userId1, userId2, ...]` | List of online user IDs |
| `newMessage` | `{ message }` | New message received |
| `userTyping` | `{ userId, isTyping }` | Someone is typing |

---

## 📁 Project Structure

```
chat-app/
├── backend/
│   ├── controllers/
│   │   ├── auth.controller.js       # Authentication logic
│   │   ├── message.controller.js    # Message handling logic
│   │   └── user.controller.js       # User management logic
│   ├── db/
│   │   └── connectToMongoDB.js      # Database connection
│   ├── middleware/
│   │   └── protectRoutes.js         # JWT authentication middleware
│   ├── models/
│   │   ├── conversation.model.js    # Conversation schema
│   │   ├── message.model.js         # Message schema
│   │   └── user.model.js            # User schema
│   ├── routes/
│   │   ├── auth.routes.js           # Authentication routes
│   │   ├── message.routes.js        # Message routes
│   │   └── user.routes.js           # User routes
│   ├── socket/
│   │   └── socket.js                # Socket.io configuration
│   ├── utils/
│   │   └── generateToken.js         # JWT token generation
│   └── server.js                    # Main server file
│
├── frontend/
│   ├── public/
│   │   └── (static assets)
│   ├── src/
│   │   ├── assets/                  # Images and static files
│   │   ├── components/
│   │   │   ├── messages/
│   │   │   │   ├── message.jsx
│   │   │   │   ├── messageContainer.jsx
│   │   │   │   ├── messageInput.jsx
│   │   │   │   └── messages.jsx
│   │   │   ├── sidebar/
│   │   │   │   ├── conversation.jsx
│   │   │   │   ├── conversations.jsx
│   │   │   │   ├── logoutButton.jsx
│   │   │   │   ├── searchInput.jsx
│   │   │   │   └── sidebar.jsx
│   │   │   ├── skeletons/
│   │   │   │   └── messageSkeleton.jsx
│   │   │   └── LoadingScreen.jsx    # Backend connection loader
│   │   ├── context/
│   │   │   ├── authContext.jsx      # Authentication state
│   │   │   ├── socketContext.jsx    # Socket.io state
│   │   │   └── backendConnectionContext.jsx
│   │   ├── hooks/
│   │   │   ├── useGetConversations.js
│   │   │   ├── useGetMessages.js
│   │   │   ├── useListenMessages.js
│   │   │   ├── useLogin.js
│   │   │   ├── useLogout.js
│   │   │   ├── useSendMessage.js
│   │   │   └── useSignup.js
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   │   └── home.jsx
│   │   │   ├── login/
│   │   │   │   └── login.jsx
│   │   │   └── signup/
│   │   │       ├── genderCheckBox.jsx
│   │   │       └── signup.jsx
│   │   ├── utils/
│   │   │   ├── api.js               # API utility functions
│   │   │   ├── emojis.js            # Random emoji generator
│   │   │   └── extractTime.js       # Time formatting
│   │   ├── zustand/
│   │   │   └── useConversation.js   # Conversation state management
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env                         # Environment variables
│   ├── .env.production              # Production environment
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .env                             # Root environment variables
├── .gitignore
├── DEPLOYMENT.md                    # Deployment guide
├── QUICK_START.md                   # Quick start guide
├── package.json                     # Root package configuration
└── README.md                        # This file
```

---

## 🎨 Features Breakdown

### 1. User Authentication System
- **Registration**: Users create accounts with unique usernames
- **Login**: Secure authentication with password verification
- **Profile Pictures**: Auto-generated avatars based on gender
- **Session Management**: JWT tokens stored in HTTP-only cookies
- **Protected Routes**: Middleware to protect API endpoints

### 2. Real-Time Messaging
- **Instant Delivery**: Messages appear immediately for both users
- **Message History**: All conversations are persisted in MongoDB
- **Conversation Threads**: Messages grouped by conversation
- **Sender Identification**: Clear distinction between sent and received messages
- **Timestamps**: Each message shows when it was sent

### 3. Online Status System
- **Visual Indicators**: 
  - 🟢 Green dot = User is online
  - 🔴 Red dot = User is offline
- **Real-Time Updates**: Status updates instantly when users connect/disconnect
- **Multiple Locations**: Status shown in sidebar and chat header

### 4. Typing Indicators
- **Visual Feedback**: "typing..." text appears when someone is typing
- **Smart Timeout**: Indicator disappears after 1 second of inactivity
- **Multiple Views**: Shows in both conversation list and chat header

### 5. User Interface
- **Dark Theme**: Modern dark theme with excellent contrast
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Search Functionality**: Find users quickly
- **Smooth Animations**: Professional transitions and effects
- **Toast Notifications**: User-friendly feedback messages
- **Loading States**: Skeleton loaders and spinners

### 6. Backend Connection Management
- **Health Check**: Verifies backend availability before loading app
- **Loading Screen**: Professional loading animation during connection
- **Cold Start Handling**: Manages Render's free tier cold starts
- **Auto-Retry**: Automatically retries connection every 3 seconds
- **Error Messages**: Clear feedback about connection status

---

## 📸 Screenshots

### Login Page
- Dark theme with gradient background
- Input validation
- Responsive form design

### Signup Page
- User registration form
- Password confirmation
- Gender selection

### Chat Dashboard
- Two-panel layout (conversations + messages)
- Online/offline status indicators
- User search functionality
- Real-time message updates

### Message Interface
- Chat bubbles with timestamps
- Typing indicators
- Message input with emoji support
- Online status in header

---

## 🌐 Deployment

### Deploying to Render

#### Backend Deployment
1. Create a new **Web Service** on Render
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add Environment Variables:
   - `MONGO_DB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://your-frontend.onrender.com`

#### Frontend Deployment
1. Update `.env.production` with backend URL
2. Create a **Static Site** on Render
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🔗 Live Demo

**Live Application**: [Add your deployed URL here]

**Example URLs**:
- Frontend: `https://chat-app-frontend.onrender.com`
- Backend: `https://chat-app-backend.onrender.com`

### Test Credentials (if applicable)
```
Username: testuser1
Password: Test@123

Username: testuser2
Password: Test@123
```

---

## 🎥 Video Demonstration

**Project Demo Video**: [Add your video link here]

**Video Content Overview**:
- Application overview and features
- User registration and authentication
- Real-time messaging demonstration
- Online/offline status indicators
- Typing indicators in action
- Responsive design showcase
- Code structure walkthrough
- Deployment process

---

## 🚦 Getting Started Checklist

- [ ] Clone the repository
- [ ] Install Node.js (v18+)
- [ ] Create MongoDB database (Atlas or local)
- [ ] Configure environment variables
- [ ] Install backend dependencies
- [ ] Install frontend dependencies
- [ ] Start backend server
- [ ] Start frontend development server
- [ ] Create test user accounts
- [ ] Test real-time messaging
- [ ] Test online/offline status
- [ ] Test typing indicators

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Backend Connection Error
**Problem**: "Backend is not responding"
**Solution**: 
- Verify backend is running on correct port (8000)
- Check environment variables are set correctly
- Ensure MongoDB connection string is valid

#### 2. CORS Errors
**Problem**: "CORS policy blocked"
**Solution**:
- Verify `FRONTEND_URL` in backend .env matches frontend URL
- Check CORS middleware is configured in server.js

#### 3. Socket.io Connection Issues
**Problem**: Real-time features not working
**Solution**:
- Check `VITE_SOCKET_URL` in frontend .env
- Verify WebSocket is not blocked by firewall
- Check browser console for Socket.io errors

#### 4. Login/Signup Not Working
**Problem**: Authentication fails
**Solution**:
- Verify JWT_SECRET is set in backend .env
- Check MongoDB connection
- Clear browser cookies and try again

#### 5. Messages Not Appearing
**Problem**: Messages sent but not visible
**Solution**:
- Check MongoDB collections for data
- Verify Socket.io connection is established
- Check browser console for errors

---

## 🧪 Testing

### Manual Testing Checklist

#### Authentication
- [ ] User can register with valid credentials
- [ ] Duplicate username is rejected
- [ ] Password validation works
- [ ] User can login with correct credentials
- [ ] Invalid credentials are rejected
- [ ] User can logout successfully

#### Messaging
- [ ] User can send messages
- [ ] Messages appear in real-time for receiver
- [ ] Message history is preserved
- [ ] Timestamps are displayed correctly
- [ ] Can send multiple messages in succession

#### Real-Time Features
- [ ] Online status updates when user logs in
- [ ] Offline status updates when user logs out
- [ ] Typing indicator appears when typing
- [ ] Typing indicator disappears after stopping
- [ ] Multiple users can be online simultaneously

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 Future Enhancements

- [ ] Group chat functionality
- [ ] File and image sharing
- [ ] Voice and video calls
- [ ] Message reactions (like, love, etc.)
- [ ] Message editing and deletion
- [ ] Read receipts
- [ ] Push notifications
- [ ] User profiles and settings
- [ ] Chat themes customization
- [ ] Message search functionality
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] End-to-end encryption

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- **MongoDB** for the database solution
- **Socket.io** for real-time communication
- **React** team for the amazing library
- **Tailwind CSS** for the styling framework
- **DaisyUI** for UI components
- All open-source contributors

---

## 📞 Support

For support, email your.email@example.com or open an issue in the GitHub repository.

---

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on GitHub!

---

**Built with ❤️ using MERN Stack**

