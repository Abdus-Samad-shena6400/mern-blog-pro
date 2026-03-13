import React from 'react';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const categories = ['Tech', 'Lifestyle', 'Travel', 'Food', 'Health'];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Categories</h3>
      <ul>
        {categories.map(cat => (
          <li key={cat} className="mb-2">
            <Link to={`/?category=${cat}`} className="text-blue-600 hover:underline">{cat}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;