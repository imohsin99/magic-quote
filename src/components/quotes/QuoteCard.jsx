import PropTypes from "prop-types"
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import capitalize from '../../utils/capitalize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faQuoteLeft,
    faQuoteRight,
    faThumbsDown,
    faThumbsUp, faTrash,
    faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import {deleteQuote, dislike, like} from '../../features/quoteSlice';
import { nanoid } from '@reduxjs/toolkit';
import AddReport from '../reports/AddReport';
import {Badge, Button, Card} from "react-bootstrap";
import {removeQuote} from "../../features/tagsSlice.js";
import {removeReport} from "../../features/reportSlice.js";
import {removeComment} from "../../features/commentSlice.js";

const QuoteCard = ({ quote, showDetailsLink = true }) => {

    const currentUser = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch();

    const [showAddReport, setShowAddReport] = useState(false);

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

    const handleDeleteClick = (quote) => {
        dispatch(deleteQuote(quote.id));
        dispatch(removeQuote({ tags: quote.tags, id: quote.id }));
        dispatch(removeReport(quote.id));
        dispatch(removeComment(quote.id));
    };

    const addReportToggle = () => {
        setShowAddReport(!showAddReport);
    }

    return (
        <Card className='mb-3 shadow-sm'>
            <Card.Header className='text-sm'>
                <span className='small'>
                Tags:
                    {quote.tags.map((tag) => (
                        <Badge bg={"success"} key={nanoid()} className='ms-2 text-capitalize'>
                            {tag}
                        </Badge>
                    ))}
                </span>
            </Card.Header>
            <Card.Body>
                <blockquote className='blockquote'>
                    <FontAwesomeIcon icon={faQuoteLeft} />
                    <span className='fs-large mx-2 lead fst-italic'>
                        {capitalize(quote.body)}
                    </span>
                    <FontAwesomeIcon icon={faQuoteRight} />
                </blockquote>
                {showDetailsLink && (
                    <p className='small text-muted'>~ {capitalize(quote.author)}</p>
                )}
                <div className='d-flex'>
                    { currentUser.role !== 'admin' && (
                        <div>
                            <Button variant={"outline-success"}
                                    className='btn-sm me-3 px-3'
                                    onClick={() => handleLike(quote.id)}
                            >
                                <FontAwesomeIcon icon={faThumbsUp}/> <span className=''>{quote.likes.length}</span>
                            </Button>
                            <Button variant={"outline-danger"}
                                    className='btn-sm px-3'
                                    onClick={() => handleDislikes(quote.id)}
                            >
                                <FontAwesomeIcon icon={faThumbsDown}/>{' '}
                                <span>{quote.dislikes.length}</span>
                            </Button>
                        </div>
                    )}
                    { (!showDetailsLink && !showAddReport && currentUser.id !== quote.userId) && (
                        <Button variant={"outline-dark"} className='btn-sm ms-3 px-3' onClick={addReportToggle}>
                            Report <FontAwesomeIcon icon={faTriangleExclamation}/>
                        </Button>
                    )}
                    <div className='ms-auto'>
                        {(showDetailsLink && currentUser.role !== 'admin') && (
                            <NavLink
                                to={`/quote/${quote.id}`}
                                className='btn btn-sm px-4 btn-primary'
                            >
                                Details
                            </NavLink>
                        )}
                        {currentUser.id === quote.userId && (
                            <NavLink
                                to={`/quote/${quote.id}/edit`}
                                className='btn ms-2 btn-sm px-4 btn-warning'
                            >
                                Update
                            </NavLink>
                        )}
                        {currentUser.role === 'admin' && (
                            <Button variant={"danger"} onClick={() => handleDeleteClick(quote)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        )}
                    </div>
                </div>
                <div>
                    { showAddReport && (
                        <AddReport quote={quote} user={currentUser} setState={setShowAddReport} />
                    )}
                </div>
            </Card.Body>
            <Card.Footer className='small text-body-secondary'>{quote.createdAt}</Card.Footer>
        </Card>
    );
};

QuoteCard.propTypes = {
  quote: PropTypes.shape({
    author: PropTypes.any,
    body: PropTypes.any,
    createdAt: PropTypes.any,
    dislikes: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.any,
    likes: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
    userId: PropTypes.any,
  }).isRequired,
  showDetailsLink: PropTypes.bool,
};

export default QuoteCard;
