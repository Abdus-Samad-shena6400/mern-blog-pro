import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div className="border p-4 rounded shadow">
      {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover mb-4" />}
      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
      <p className="mb-2">{blog.description}</p>
      <p className="text-sm text-gray-600">By {blog.author.username}</p>
      <Link to={`/blog/${blog._id}`} className="text-blue-600 hover:underline">Read more</Link>
    </div>
  );
};

export default BlogCard;