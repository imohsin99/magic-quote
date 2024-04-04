import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/usersSlice';
import quoteReducer from '../features/quoteSlice';
import commentReducer from '../features/commentSlice';
import tagsReducer from '../features/tagsSlice';
import reportReducer from '../features/reportSlice';

const reducers = combineReducers({
    users: userReducer,
    quotes: quoteReducer,
    comments: commentReducer,
    tags: tagsReducer,
    reports: reportReducer
});

const store = configureStore({
    reducer: reducers,
});

export default store;
