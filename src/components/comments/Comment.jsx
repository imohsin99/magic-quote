import PropTypes from "prop-types"
import { useDispatch, useSelector } from 'react-redux';
import { addComment, dislike, editComment, like } from '../../features/commentSlice';
import AddComment from './AddComment';
import { useState } from 'react';
import capitalize from '../../utils/capitalize';
import {Badge, Button, Form} from "react-bootstrap";

const Comment = ({ quoteId }) => {

    const [editBtn, setEditBtn] = useState(false);

    const comments = useSelector((state) => state.comments.comments);
    const currentUser = useSelector((state) => state.users.currentUser);
    const quoteComments = comments.filter((comment) => comment.quoteId === quoteId && comment.userId === currentUser.id);
    
    const dispatch = useDispatch();
    const [cmtbtn, setCmtBtn] = useState(true);

    const handleEditClick = () => {
      setEditBtn(true);
    }

    const handleLike = (id) => {
      dispatch(
        like({
          userId: currentUser.id,
          id: id,
        })
      );
    };

    const handleDislikes = (id) => {
      dispatch(
        dislike({
          userId: currentUser.id,
          id: id,
        })
      );
    };

    const handleAddComment = () => {
        setCmtBtn(false);
    }

    const handleFormSubmit = (formData) => {
        const newComment = { ...formData }
        newComment.author = currentUser.username;
        newComment.userId = currentUser.id;
        newComment.quoteId = quoteId;
        dispatch(addComment(newComment));
        setCmtBtn(true);
    }

    const handleEditComment = (comment) => {
        dispatch(editComment({id: comment.id, body: comment.body}));
        setEditBtn(false);
    }

    return (
      <>
        {cmtbtn ? (
          <div className='text-end mb-4'>
            <Button variant={"primary"}
              className='btn-sm'
              onClick={handleAddComment}
            >
              Add Comment
            </Button>
          </div>
        ) : (
          <AddComment onSubmit={handleFormSubmit} />
        )}
        {quoteComments &&
          quoteComments.map((comment) => (
            <div key={comment.id}>
              <h6>{capitalize(comment.author)}</h6>
              {editBtn ? (
                <AddComment onSubmit={handleEditComment} editData={comment} />
              ) : (
                <Form.Control
                  className='w-75'
                  as='textarea'
                  id='body'
                  value={comment.body}
                  disabled
                ></Form.Control>
              )}
              <div className='d-flex mt-4 mb-4'>
                <Button variant={"outline-success"}
                  className='btn-sm me-3 px-3'
                  onClick={() => handleLike(comment.id)}
                >
                  Like{' '}
                  <Badge bg={"success"}>
                    {comment.likes.length}
                  </Badge>
                </Button>
                <Button variant={"outline-danger"}
                  className='btn-sm me-3 px-3'
                  onClick={() => handleDislikes(comment.id)}
                >
                  Dislike{' '}
                  <Badge bg={"danger"}>
                    {comment.dislikes.length}
                  </Badge>
                </Button>
                {!editBtn && (<div className='ms-auto'>
                  <Button variant={"warning"} className='btn-sm px-5' onClick={handleEditClick}>Edit</Button>
                </div>)}
              </div>
            </div>
          ))}
      </>
    );
}

Comment.propTypes = {
  quoteId: PropTypes.any.isRequired
}

export default Comment;
