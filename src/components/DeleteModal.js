import React from 'react';

const DeleteModal = ({ showModal, handleDeleteConfirm, handleCancel }) => {
  if (!showModal) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Delete comment</h3>
        <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={handleCancel}>NO, CANCEL</button>
          <button className="delete-btn" onClick={handleDeleteConfirm}>YES, DELETE</button>
        </div>
      </div>
      </div>
  );
};

export default DeleteModal;
