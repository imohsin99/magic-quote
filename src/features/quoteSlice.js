import { createSlice } from '@reduxjs/toolkit';
import updateLikesDislikes from '../utils/updateLikesDislikes';

const initialState = {
    quotes: [
        {
            id: '1',
            body: 'hello world',
            author: 'mohsin',
            createdAt: "20/12/2023, 17:11:08",
            tags: ['game'],
            likes: [],
            dislikes: [],
            userId: '1'
        },
        {
            id: '2',
            body: 'hello world ahmad',
            author: 'ahmad',
            createdAt: "20/12/2023, 17:11:08",
            tags: ['game'],
            likes: [],
            dislikes: [],
            userId: '2'
        }
    ]
}

const quoteSlice = createSlice({
    name: 'quotes',
    initialState,
    reducers: {
        addQuote: (state, action) => {
            const quote = action.payload;
            quote.likes = [];
            quote.dislikes = [];
            state.quotes.push(quote);
        },
        editQuote: (state, action) => {
            const quote = state.quotes.find((quote) => quote.id === action.payload.id);
            quote.body = action.payload.quote.body;
            quote.tags = action.payload.quote.tags;
        },
        like: (state, action) => {
            const { id, userId } = action.payload;
            const quote = state.quotes.find((quote) => quote.id === id);
            updateLikesDislikes(quote, userId, 'like');
        },
        dislike: (state, action) => {
            const { id, userId } = action.payload;
            const quote = state.quotes.find((quote) => quote.id === id);
            updateLikesDislikes(quote, userId, 'dislike');
        },
        deleteQuote: (state, action) => {
            state.quotes = state.quotes.filter((quote) => quote.id !== action.payload);
        },
        removeTag: (state, action) => {
            const quotes = state.quotes.filter((quote) => quote.tags.includes(action.payload));
            quotes.forEach((quote) => {
                quote.tags = quote.tags.filter((tag) => tag !== action.payload);
            });
        },
    }
});

export const { addQuote, editQuote, like, dislike, deleteQuote, removeTag  } = quoteSlice.actions;
export default quoteSlice.reducer;
