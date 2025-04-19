import { Description } from "@radix-ui/react-dialog";
import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

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
            state.posts = [action.payload, ...state.posts]
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter(post => post.Id !== action.payload.Id);
        },
        updatePost: (state, action) => {
            state.posts = state.posts.map(post => {
                if (post.Id === action.payload.Id) {
                    post = { ...post, Description : action.payload.Description };
                }
            })
        },
        likePost: (state, action) => {
            state.posts = state.posts.map(post => {
                if(post.Id === action.payload.Id) {
                    post = {...post, HasLiked: action.payload.HasLiked}
                }
            })
        },
        addComment: (state, action) => {
            state.posts = state.posts.map(post => {
                if (post.Id === action.payload.Id) {
                    post = { ...post, Comments : [...post.Comments, action.payload.Comment] };
                }
            })
        }
    }
});

export const { initPosts, clearPosts, addPost, removePost, updatePost, likePost, addComment} = postSlice.actions;

export default postSlice.reducer;