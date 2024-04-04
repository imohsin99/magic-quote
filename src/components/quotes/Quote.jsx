import { Outlet, Route, Routes } from 'react-router-dom';
import QuoteList from './QuoteList';
import QuoteItem from './QuoteItem.jsx';
import CreateQuote from './CreateQuote';
import EditQuote from './EditQuote';

const Quote = () => {

    return (
      <div>
        <h1 className='text-center mt-4 mb-3'>Quotes</h1>
        <Routes>
          <Route index element={<QuoteList />} />
          <Route path=':quoteId' element={<QuoteItem />} />
          <Route path='new' element={<CreateQuote />} />
          <Route path=':quoteId/edit' element={<EditQuote />} />
        </Routes>

        <Outlet />
      </div>
    );
}

export default Quote;
