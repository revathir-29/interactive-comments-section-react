import React from 'react';
import Comment from './Comment';

const CommentList = ({ 
  comments, 
  currentUser, 
  handleReply, 
  handleEdit, 
  handleDelete, 
  handleVote, 
}) => {
  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id}>
          <Comment
            comment={comment}
            currentUser={currentUser}
            handleReply={handleReply}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleVote={handleVote}
          />
          
          {/* If the comment has replies, display them as nested comments */}
          {comment.replies && Array.isArray(comment.replies) && comment.replies.length > 0 && (
            <div className="nested-replies">
              <CommentList
                comments={comment.replies}
                currentUser={currentUser}
                handleReply={handleReply}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleVote={handleVote}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
