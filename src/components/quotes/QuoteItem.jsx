import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import Comment from '../comments/Comment';
import QuoteCard from "./QuoteCard.jsx";
import { useState } from 'react';
import {Button} from "react-bootstrap";

const QuoteItem = () => {

    const [showComments, setShowComments] = useState(false);

    const {quoteId} = useParams();
    const quotes = useSelector((state) => state.quotes.quotes);
    const quote = quotes.find((quote) => quote.id === quoteId);
    useSelector((state) => state.users.currentUser);

    const toggleComment = () => setShowComments(!showComments);

    return (
      <div>
        <QuoteCard quote={quote} showDetailsLink={false} />
        <div>
          <Button variant={"dark"} onClick={toggleComment} className='btn-sm'>
            {showComments ? 'Hide Comments' : 'Show Comments'}
          </Button>
          {showComments && <Comment quoteId={quote.id} />}
        </div>
      </div>
    );
}

export default QuoteItem;
