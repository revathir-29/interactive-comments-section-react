import React, { useState, useEffect } from 'react';
import CommentList from './components/CommentList';
import AddComment from './components/AddComment';
import data from './data.json';

function App() {
  // const [comments, setComments] = useState(data.comments);
  const currentUser = data.currentUser;

  const loadComments = () => {
        const savedComments = localStorage.getItem('comments');
        return savedComments ? JSON.parse(savedComments) : data.comments;
      };
      const [comments, setComments] = useState(loadComments());

        // Update local storage whenever comments change
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
    console.log('Comments updated:', comments); // Log updated comments
  }, [comments]);

    const updateNestedReplies = (replies, parentId, newReply) => {
      return replies.map(reply => {
        if (reply.id === parentId) {
          return {
            ...reply,
            replies: [...reply.replies || [], newReply]
          };
        } else if (reply.replies && reply.replies.length > 0) {
          return {
            ...reply,
            replies: updateNestedReplies(reply.replies, parentId, newReply)
          };
        }
        return reply;
      });
    };


  const handleEditReply = (commentId, replyId, newReplyContent) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map((reply) =>
          reply.id === replyId ? { ...reply, content: newReplyContent } : reply
        );
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleDeleteReply = (commentId, replyId) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.filter((reply) => reply.id !== replyId);
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
    setComments(updatedComments);
  };


  const handleAddComment = (newCommentText) => {
    const newComment = {
      id: Date.now(), 
      content: newCommentText,
      createdAt: "Just now", 
      score: 0,
      user: currentUser,
      replies: [] 
    };

    setComments([...comments, newComment]); 
  };

    const handleReply = (parentId, replyText) => {
      const newReply = {
        id: Date.now(),
        content: replyText,
        createdAt: "Just now",
        score: 0,
        user: currentUser,
        replies: []  
      };
      
    const updatedComments = comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...comment.replies || [], newReply]
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateNestedReplies(comment.replies, parentId, newReply)
        };
      }
      return comment;
    });

    setComments(updatedComments);
  };
    
  const handleEdit = (id, newContent) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === id) {
        return { ...comment, content: newContent };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleDelete = (id) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
    setComments(updatedComments);
  };

  const handleVote = (id, type, parentId = null) => {
    const updatedComments = comments.map(comment => {

      if (comment.id === id && !parentId) {
        return {
          ...comment,
          score: type === 'up' ? comment.score + 1 : comment.score - 1
        };
      }
  
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateNestedVote(comment.replies, id, type)
        };
      }
  
      return comment;
    });
  
    setComments(updatedComments);
  };

  const updateNestedVote = (replies, id, type) => {
    return replies.map(reply => {
      if (reply.id === id) {
        return {
          ...reply,
          score: type === 'up' ? reply.score + 1 : reply.score - 1
        };
      } else if (reply.replies && reply.replies.length > 0) {
        return {
          ...reply,
          replies: updateNestedVote(reply.replies, id, type) 
        };
      }
      return reply;
    });
  };
  

  return (
    <div className="container">
      <CommentList
        comments={comments}
        currentUser={currentUser}
        handleReply={handleReply}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleVote={handleVote}
        handleEditReply={handleEditReply}
        handleDeleteReply={handleDeleteReply} 
      />
      
      <AddComment handleAddComment={handleAddComment} currentUser={currentUser} />

    </div>
  );
}

export default App;

