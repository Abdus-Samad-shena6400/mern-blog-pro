import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import CategoryList from '../components/CategoryList';
import Pagination from '../components/Pagination';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    fetchBlogs();
  }, [page, category]);

  const fetchBlogs = async () => {
    try {
      const params = { page };
      if (category) params.category = category;
      const res = await axios.get('/api/blogs', { params });
      setBlogs(res.data);
      // For simplicity, assume 10 pages or calculate
      setTotalPages(10);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-8">Latest Blogs</h1>
          <div className="grid grid-cols-1 gap-6">
            {blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
        <div>
          <CategoryList />
        </div>
      </div>
    </div>
  );
};

export default Home;