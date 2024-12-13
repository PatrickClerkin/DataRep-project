import React, { useState } from 'react';

// used to display commentys of a speicific todo item
const CommentsPage = ({ todoId }) => {
  // state to hold a comment for a todo item
  const [comments, setComments] = useState([]);

  // tracks new comment added byu user
  const [newComment, setNewComment] = useState('');

  
  const handleAddComment = () => {
   
    setComments([...comments, newComment]);
    setNewComment(''); 
  };

  return (
    <div>
      {}
      <h1>Comments</h1>

      {}
      <ul>
        {comments.map((comment, index) => (
         
          <li key={index}>{comment}</li>
        ))}
      </ul>

      {}
      <input
        type="text"
        value={newComment} 
        onChange={(e) => setNewComment(e.target.value)} 
        placeholder="Write a comment"
      />

      {}
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default CommentsPage;
