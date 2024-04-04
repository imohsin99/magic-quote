import { createSlice, nanoid } from '@reduxjs/toolkit';
import updateLikesDislikes from '../utils/updateLikesDislikes';

const initialState = {
    comments: [
        {
            id: nanoid(),
            body: 'good',
            quoteId: '1',
            userId: '2',
            author: 'ahmad',
            likes: [],
            dislikes: []
        }
    ]
};

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, action) => {
            const newComment = {...action.payload};
            newComment.id = nanoid();
            newComment.likes = [];
            newComment.dislikes = [];
            state.comments.push(newComment);
        },
        editComment: (state, action) => {
            const comment = state.comments.find(comment => comment.id === action.payload.id);
            comment.body = action.payload.body;
        },
        like: (state, action) => {
            const { id, userId } = action.payload;
            const comment = state.comments.find((comment) => comment.id === id);
            updateLikesDislikes(comment, userId, 'like');
        },
        dislike: (state, action) => {
            const { id, userId } = action.payload;
            const comment = state.comments.find((comment) => comment.id === id);
            updateLikesDislikes(comment, userId, 'dislike');
        },
        removeComment: (state, action) => {
            state.comments = state.comments.filter((comment) => comment.quoteId !== action.payload);
        },
    }
});

export const { addComment, like, dislike, editComment, removeComment } = commentSlice.actions;
export default commentSlice.reducer;
