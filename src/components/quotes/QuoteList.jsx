import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import QuoteCard from "./QuoteCard.jsx";

const QuoteList = () => {

    const quotesList = useSelector((state) => state.quotes.quotes);
    const currentUser = useSelector((state) => state.users.currentUser);

    let quotes = [];
    if ( currentUser.role === 'admin' ) {
        quotes = [...quotesList];
    } else {
        quotes = quotesList.filter((quote) => currentUser.followings.includes(quote.userId) || quote.userId === currentUser.id || quote.tags.some((tag) =>
            currentUser.tags.some((uTag) => uTag === tag)
        ));
    }

    return (
      <div>
          { currentUser.role !== 'admin' && (
              <div className='text-end'>
                  <Link to='new' className='btn btn-sm btn-success px-4 text-end mb-3'>
                      Add Quote
                  </Link>
              </div>
          )}
        {quotes &&
          quotes.map(
            (quote) => (
                <QuoteCard quote={quote} key={quote.id} />
            )
          )}
      </div>
    );
}

export default QuoteList;
