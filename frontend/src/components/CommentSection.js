import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/comments/${blogId}`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addComment = async () => {
    if (!content.trim()) return;
    try {
      await axios.post('/api/comments', { content, blog: blogId });
      setContent('');
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComment = async (id) => {
    try {
      await axios.delete(`/api/comments/${id}`);
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Comments</h3>
      {user && (
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Add a comment..."
          />
          <button onClick={addComment} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Add Comment</button>
        </div>
      )}
      {comments.map(comment => (
        <div key={comment._id} className="border-b py-2">
          <p>{comment.content}</p>
          <p className="text-sm text-gray-600">By {comment.author.username}</p>
          {user && user._id === comment.author._id && (
            <button onClick={() => deleteComment(comment._id)} className="text-red-600">Delete</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;