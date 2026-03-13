import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import Pagination from '../components/Pagination';

const SearchResults = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    if (query) fetchBlogs();
  }, [query, page]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/blogs', { params: { search: query, page } });
      setBlogs(res.data);
      setTotalPages(10); // Assume
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default SearchResults;