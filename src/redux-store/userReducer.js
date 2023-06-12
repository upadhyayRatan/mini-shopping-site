import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const userLogin = createAsyncThunk("loginuser", async (userCredentialsObj, thunkAPI) => {
    let response = await axios.post('/users/login', userCredentialsObj)
    let data = response.data
    if (data.message === "success") {
        //save token in local storage
        let username = response.data.user.username
        localStorage.setItem("token", data.token)
        localStorage.setItem("username", username)
        return data.user;
    }
    else {
        return thunkAPI.rejectWithValue(data.message)
    }

})

let userSlice = createSlice({
    name: "user",
    initialState: {
        userObj: {
        },
        isSuccess: false,
        isLoading: false,
        isError: false,
        invalidLoginMessage: ''
    },
    reducers: {
        clearLoginStatus: (state, action) => {
            state.isSuccess = false;
            return state;
        },
    },
    extraReducers: {
        [userLogin.fulfilled]: (state, action) => {
            state.userObj = action.payload
            localStorage.setItem("isLoggedIn", true)
            state.isSuccess = true;
            state.isLoading = false;
            state.invalidLoginMessage = "";
            state.isError = false;
        },
        [userLogin.pending]: (state, action) => {
            state.isLoading = true;
        },
        [userLogin.rejected]: (state, action) => {
            console.log("Action payload slce",action.payload)
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.invalidLoginMessage = action.payload;

        }
    }
})

export const { clearLoginStatus } = userSlice.actions
export default userSlice.reducer