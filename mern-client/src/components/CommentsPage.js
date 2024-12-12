import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchComments, addComment, deleteComment } from '../services/todoService';

const CommentsPage = () => {
  const { todoId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const getComments = async () => {
      try {
        const commentsFromServer = await fetchComments(todoId);
        setComments(commentsFromServer);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    getComments();
  }, [todoId]);

  const handleAddComment = async () => {
    if (!newComment) return;
    const updatedComments = await addComment(todoId, newComment);
    setComments(updatedComments);
    setNewComment('');
  };

  const handleDeleteComment = async (commentId) => {
    const updatedComments = await deleteComment(todoId, commentId);
    setComments(updatedComments);
  };

  return (
    <div>
      <h1>Comments</h1>
      <input
        type="text"
        placeholder="Add a comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Add Comment</button>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            {comment.text}
            <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsPage;
