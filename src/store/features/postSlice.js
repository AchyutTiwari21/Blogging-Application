import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        initPosts: (state, action) => {
            state.posts = action.payload;
        },
        clearPosts: (state) => {
            state.posts = [];
        },
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload.id);
        },
        updatePost: (state, action) => {
            state.posts = state.posts.map(post => {
                if (post.id === action.payload.id) {
                    post = { ...post, text : action.payload.text };
                }
            })
        },
        likePost: (state, action) => {
            state.posts = state.posts.map(post => {
                if (post.id === action.payload.id) {
                    post = { ...post, like : action.payload.like };
                }
            })
        },
        addComment: (state, action) => {
            state.posts = state.posts.map(post => {
                if (post.id === action.payload.id) {
                    post = { ...post, comments : [...post.comments, action.payload.comment] };
                }
            })
        },
        removeComment: (state, action) => {
            state.posts = state.posts.map(post => {
                if (post.id === action.payload.id) {
                    post = { ...post, comments : post.comments.filter(comment => comment.id !== action.payload.commentId) };
                }
            })
        },
    }
});

export const { initPosts, clearPosts, addPost, removePost, updatePost, likePost, addComment, removeComment } = postSlice.actions;

export default postSlice.reducer;