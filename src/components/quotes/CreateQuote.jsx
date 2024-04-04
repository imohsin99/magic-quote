import { useDispatch } from 'react-redux';
import { addQuote } from '../../features/quoteSlice';
import QuoteForm from './QuoteForm.jsx';
import { addTag } from '../../features/tagsSlice';
import {useNavigate} from "react-router-dom";

const CreateQuote = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCreateQuote = (formData) => {
        dispatch(addQuote(formData));
        dispatch(
          addTag({
            quoteId: formData.id,
            comingTags: formData.tags,
          })
        );
        navigate('/quote');
    }

    return (
        <div>
            <h2>Create Quote</h2>
            <QuoteForm onSubmit={handleCreateQuote} initialData={null} />
        </div>
    )
}

export default CreateQuote;
