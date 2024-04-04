import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    users: [
        {
            id: '1',
            firstName: 'Muhammad',
            lastName: 'Mohsin',
            username: 'mohsin',
            gender: 'Male',
            email: 'mohsin@gmail.com',
            password: '123',
            role: 'user',
            followers: [],
            followings: [],
            tags: []
        },
        {
            id: '2',
            firstName: 'Ahmad',
            lastName: 'Faraz',
            username: 'ahmad',
            gender: 'Male',
            email: 'ahmad@gmail.com',
            password: '123',
            role: 'user',
            followers: [],
            followings: [],
            tags: []
        },
        {
            id: '3',
            firstName: 'Ayub',
            lastName: 'Ahmad',
            username: 'ayub',
            gender: 'Male',
            email: 'ayub@gmail.com',
            password: '123',
            role: 'user',
            followers: [],
            followings: [],
            tag: []
        },
        {
            id: '4',
            firstName: 'admin',
            username: 'admin',
            email: 'admin@admin.com',
            password: 'admin',
            role: 'admin'
        }
    ],
    currentUser: null,
    signupError: null
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login: (state, action) => {
            state.users.forEach((user) => {
                if (user.email === action.payload.email && user.password === action.payload.password) {
                    state.currentUser = user;
                }
            })
        },
        signup: (state, action) => {
            const userCheck = state.users.some((user) => user.email === action.payload.email);
            if (!userCheck) {
                const newUser = action.payload;
                newUser.id = nanoid();
                newUser.tags = [];
                newUser.followers = [];
                newUser.followings = [];
                newUser.role = 'user';
                state.users.push(newUser);
                state.currentUser = newUser;
                state.signupError = null;
            } else {
                state.signupError = `User ${action.payload.email} already exists`;
            }
        },
        logout: (state, action) => {
            if (state.currentUser && state.currentUser.id === action.payload) {
                state.currentUser = null;
            }
        },
        follow: (state, action) => {
            const user = state.users.find(user => user.id === action.payload.id);
            const follower = state.users.find(user => user.id === action.payload.followerId);
            const followerCheck = user.followers.some((follower) => follower === action.payload.followerId);
            if (!followerCheck) {
                user.followers.push(follower.id);
                follower.followings.push(user.id);
                state.currentUser?.followings.push(user.id);
            } else {
                user.followers = user.followers.filter(flr => flr !== follower.id);
                follower.followings = follower.followings.filter(flr => flr !== user.id);
                state.currentUser.followings = state.currentUser?.followings.filter(flr => flr !== user.id);
            }
        },
        followTag: (state, action) => {
            const user = state.users.find(user => user.id === action.payload.id);
            const followCheck = user.tags.includes(action.payload.tagName);
            if (!followCheck) {
                user.tags.push(action.payload.tagName);
                state.currentUser?.tags.push(action.payload.tagName);
            } else {
                user.tags = user.tags.filter(tag => tag !== action.payload.tagName);
                state.currentUser.tags = state.currentUser?.tags.filter(tag => tag !== action.payload.tagName);
            }
        },
        editProfile: (state, action) => {
            const user = state.users.find(user => user.id === action.payload.id);
            const emailCheck = state.users.some((user) => user.email === action.payload.email && user.id !== action.payload.id);

            if (!emailCheck) {
                user.email = action.payload.email;
                user.firstName = action.payload.firstName;
                user.lastName = action.payload.lastName;
                user.username = action.payload.username;
                user.password = action.payload.password;
                user.gender = action.payload.gender;

                state.currentUser = {...user}
            } else {
                state.signupError = `User ${action.payload.email} already exists`;
            }
        },
        removeTags: (state, action) => {
            const users = state.users.filter((user) => user.role === 'user' && user.tags?.includes(action.payload));
            users.forEach((user) => {
                user.tags = user.tags.filter((tag) => tag !== action.payload);
            })
        },
    }
});

export const { login, signup, logout, follow, followTag, editProfile, removeTags } = usersSlice.actions;
export default usersSlice.reducer;
