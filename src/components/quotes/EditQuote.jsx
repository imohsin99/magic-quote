import { useNavigate, useParams } from 'react-router-dom';
import QuoteForm from './QuoteForm.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { editQuote } from '../../features/quoteSlice';
import { addTag } from '../../features/tagsSlice';

const EditQuote = () => {

    const { quoteId } = useParams();
    const quotes = useSelector((state) => state.quotes.quotes);
    const quote = quotes.find((quote) => quote.id === quoteId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEditQuote = (formData) => {
        dispatch(editQuote({
            id: quoteId,
            quote: formData
        }))
        dispatch(
          addTag({
            quoteId: formData.id,
            comingTags: formData.tags,
          })
        );
        navigate('/quote');
    };

    return (
      <div>
        <h2>Edit Quote</h2>
        <QuoteForm onSubmit={handleEditQuote} initialData={quote} />
      </div>
    );
}

export default EditQuote;
