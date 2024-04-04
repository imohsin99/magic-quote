import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    tags: [
        {
            id: '1',
            name: 'game',
            quotes: ['1', '2'],
            followers: []
        }
    ]
}

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        addTag: (state, action) => {
            const { comingTags, quoteId } = action.payload;
            comingTags.forEach(comingTag => {
                const checkTag = state.tags.find((tag) => tag.name === comingTag);
                if (checkTag && !checkTag.quotes.includes(quoteId)) {
                    checkTag.quotes.push(quoteId);
                } else {
                    const newTag = {
                        id: nanoid(),
                        name: comingTag,
                        quotes: [quoteId],
                        followers: []
                    }
                    state.tags.push(newTag);
                }
            })
        },
        follow: (state, action) => {
            const tag = state.tags.find((tag) => tag.id === action.payload.id);
            const followerCheck = tag.followers.some((follower) => follower === action.payload.followerId);
            if (!followerCheck) {
                tag.followers.push(action.payload.followerId);
            } else {
                tag.followers = tag.followers.filter((follower) => follower !== action.payload.followerId);
            }
        },
        removeQuote: (state, action) => {
            const { id, tags } = action.payload;
            tags.forEach((tagName) => {
                const tag = state.tags.find((tag) => tag.name === tagName);
                tag.quotes = tag.quotes.filter((quote) => quote !== id);
            });
        },
        deleteTag: (state, action) => {
            state.tags = state.tags.filter((tag) => tag.id !== action.payload);
        },
    }
})

export const { addTag, follow, removeQuote, deleteTag } = tagsSlice.actions;
export default tagsSlice.reducer;
