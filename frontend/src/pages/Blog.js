import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentSection from '../components/CommentSection';
import { AuthContext } from '../context/AuthContext';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`/api/blogs/${id}`);
      setBlog(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const likeBlog = async () => {
    if (!user) return;
    try {
      const res = await axios.post(`/api/blogs/${id}/like`);
      setBlog(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  if (!blog) return <div className="text-center">Blog not found</div>;

  return (
    <div className="container mx-auto p-4">
      <article>
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover mb-4" />}
        <p className="text-lg mb-4">{blog.description}</p>
        <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: blog.content }} />
        <p className="text-sm text-gray-600">By {blog.author.username} on {new Date(blog.createdAt).toLocaleDateString()}</p>
        <button
          onClick={likeBlog}
          className={`mt-4 px-4 py-2 rounded ${blog.likes.includes(user?._id) ? 'bg-red-600' : 'bg-blue-600'} text-white`}
        >
          Like ({blog.likes.length})
        </button>
      </article>
      <CommentSection blogId={id} />
    </div>
  );
};

export default Blog;