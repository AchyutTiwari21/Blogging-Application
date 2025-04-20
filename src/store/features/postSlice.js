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
            state.posts = [action.payload, ...state.posts]
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter(post => post.Id !== action.payload.Id);
        },
        updatePost: (state, action) => {
            state.posts = state.posts.map(post => {
                if (post.Id === action.payload.Id) {
                    return { Title: action.payload.Title, Description: action.payload.Description, FeaturedImage: action.payload.FeaturedImage };
                }
                return post;
            })
        },
        likePost: (state, action) => {
            state.posts = state.posts.map(post => {
                if(post.Id === action.payload.Id) {
                    return {...post, HasLiked: action.payload.HasLiked}
                }
                return post;
            })
        }
    }
});

export const { initPosts, clearPosts, addPost, removePost, updatePost, likePost, addComment} = postSlice.actions;

export default postSlice.reducer;