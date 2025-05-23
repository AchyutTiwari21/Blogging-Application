import  { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        updateUser: (state, action) => {
            state.userData = {...state.userData, ProfileImage: action.payload.ProfileImage, Designation: action.payload.Designation}
        }
    }
});

export const { login, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;