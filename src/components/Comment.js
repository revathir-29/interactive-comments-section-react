import React, { useState } from 'react';
import DeleteModal from './DeleteModal';  

const Comment = ({ 
  comment, 
  currentUser, 
  handleReply, 
  handleEdit, 
  handleDelete, 
  handleVote, 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleSaveEdit = () => {
    handleEdit(comment.id, editContent);
    setIsEditing(false);
  };

   // Submit a new reply
  const handleReplySubmit = () => {
    handleReply(comment.id, replyContent);  
    setIsReplying(false); 
    setReplyContent(''); 
  };

   // Delete a comment
  const handleDeleteClick = () => {
    setShowDeleteModal(true); 
  };

  const handleDeleteConfirm = () => {
    handleDelete(comment.id); 
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
    <div className="comment-card">
        <DeleteModal
        showModal={showDeleteModal}
        handleDeleteConfirm={handleDeleteConfirm} 
        handleCancel={handleCancelDelete} 
        />

        <div className="vote-section">
          <button onClick={() => handleVote(comment.id, 'up')} className="vote-btn">
          <svg width="11" 
          height="11" 
          xmlns="http://www.w3.org/2000/svg">
          <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" 
          fill="#C5C6EF"/></svg>
          </button>
          <span>{comment.score}</span>
          <button onClick={() => handleVote(comment.id, 'down')} className="vote-btn">
          <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
           <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" 
             fill="#C5C6EF"/></svg>
          </button>
        </div>
        
         {/* Comment Body */}
         <div className="comment-body">
          <div className="header">
            <div className="user-info">
              {comment.user && comment.user.image && comment.user.image.png ? (
                <img src={comment.user.image.png} alt={comment.user.username} className="avatar" />
              ) : (
                <div className="avatar-placeholder">Avatar</div>
              )}
              <span className="username">
                {comment.user ? comment.user.username : 'Unknown user'}
                {comment.user && comment.user.username === currentUser.username && 
                <span className="you-label">you</span>}
              </span>
              <span className="createdAt">{comment.createdAt}</span>
            </div>

            <div className="actions">
              {!isEditing && comment.user.username !== currentUser.username && (
              <button className="reply-btn" onClick={() => setIsReplying(true)}>
              <svg width="22" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                Reply
                </button>
                )}

                {!isEditing && comment.user.username === currentUser.username && (
                <>
                  <button className="delete-btn" onClick={handleDeleteClick}>
                  <svg width="20" height="14" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" 
                  fill="#ED6368"/></svg>
                  Delete</button>
                  <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  <svg width="20" height="14" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" 
                  fill="#5357B6"/>
                  </svg>
                  Edit</button>
                </>
              )}
            </div>
          </div>

               {/* Display comment content */}
          <div className="content">
            {isEditing ? (
              <>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="form-control"
                  rows="4"
                />
                <div className='update-container'>
                <button className="btn-save" onClick={handleSaveEdit}>UPDATE</button>
                </div>
              </>
            ) : (
              <p>
                {comment.content}
                </p>
            )}
          </div>
          </div>
          </div>

        {isReplying && (
          <div className="add-comment-form reply-comment-form">
            <img src={currentUser.image.png} alt={currentUser.username} className="avatar" />
            <textarea
              className="form-control"
              // value={replyContent}
              defaultValue={`@${comment.user.username}  `}
              onChange={(e) => setReplyContent(e.target.value)}
              rows="3"
            />

              <button onClick={handleReplySubmit} className="btn-send">REPLY</button>
          </div>
        )}
       
      </>
  );
};

export default Comment;



