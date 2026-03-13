import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) fetchBlogs();
  }, [user]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/blogs');
      setBlogs(res.data.filter(blog => blog.author._id === user._id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await axios.delete(`/api/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
      <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4 inline-block">Create New Blog</Link>
      <div className="space-y-4">
        {blogs.length === 0 ? (
          <p>No blogs yet. <Link to="/create" className="text-blue-600">Create your first blog</Link></p>
        ) : (
          blogs.map(blog => (
            <div key={blog._id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{blog.title}</h2>
                <p>{blog.description}</p>
                <p className="text-sm text-gray-600">Created on {new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="space-x-2">
                <Link to={`/edit/${blog._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</Link>
                <button onClick={() => deleteBlog(blog._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;