import React, { useState } from 'react';

const AddComment = ({ handleAddComment, currentUser }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      handleAddComment(newComment);
      setNewComment(''); 
    }
  };

  return (
    <div className='inputfield-container'>
    <form onSubmit={handleSubmit} className="add-comment-form">
        <img src={currentUser.image.png} alt={currentUser.username} className="avatar" />
      <textarea
        className="form-control"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        rows="4"
      ></textarea>
      <button type="submit" className='btn-send'>
        SEND
      </button>
    </form>
    </div>
  );
};

export default AddComment;
