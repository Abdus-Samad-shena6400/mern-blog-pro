# MERN Blog Website

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Features user authentication, blog CRUD operations, comments, likes, search, and admin functionality.

## Features

- **User Authentication**: Register, login with JWT tokens
- **Blog Management**: Create, read, update, delete blogs with image uploads
- **Comments System**: Add and delete comments on blogs
- **Like System**: Like/unlike blog posts
- **Search & Filter**: Search blogs by title, filter by category
- **Admin Panel**: Admin users can manage all blogs
- **Image Upload**: Cloudinary integration for blog images
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Pagination**: Paginated blog listings
- **SEO Friendly**: Proper meta tags and structure

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Context API for state management

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mern-blog
   JWT_SECRET=your_super_secret_jwt_key_here
   CLIENT_URL=http://localhost:3000
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory (optional for local development):
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `CLIENT_URL`: Frontend URL for CORS (default: http://localhost:3000)
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

### Frontend (.env)
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:5000)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Blogs
- `GET /api/blogs` - Get all blogs (with pagination, search, filter)
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create new blog (authenticated)
- `PUT /api/blogs/:id` - Update blog (author or admin)
- `DELETE /api/blogs/:id` - Delete blog (author or admin)
- `POST /api/blogs/:id/like` - Like/unlike blog (authenticated)

### Comments
- `GET /api/comments/:blogId` - Get comments for a blog
- `POST /api/comments` - Add comment (authenticated)
- `DELETE /api/comments/:id` - Delete comment (author or admin)

### Users
- `GET /api/users/profile` - Get user profile (authenticated)
- `GET /api/users/admin` - Admin dashboard (admin only)

## Deployment

### Backend (Render)

1. Create a new account on [Render](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Set the build command: `npm install`
5. Set the start command: `npm start`
6. Add environment variables in the dashboard
7. Deploy

### Frontend (Vercel)

1. Create a new account on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Vercel will automatically detect it as a React app
4. Add environment variables in the dashboard
5. Deploy

## Project Structure

```
mern-blog-pro/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Blog.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── blogs.js
│   │   ├── comments.js
│   │   └── users.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── BlogCard.js
│   │   │   ├── CommentSection.js
│   │   │   ├── CategoryList.js
│   │   │   └── Pagination.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Blog.js
│   │   │   ├── CreateBlog.js
│   │   │   ├── EditBlog.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   └── SearchResults.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

If you have any questions or suggestions, feel free to open an issue or contact the maintainers.