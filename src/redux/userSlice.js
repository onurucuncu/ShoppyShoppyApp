import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";

const initialState = {
  usersToken: localStorage.getItem('usersToken') ? JSON.parse(localStorage.getItem('usersToken')) : null,
  usersTokenStatus: localStorage.getItem('usersToken') ? STATUS.SUCCESS : STATUS.IDLE,
  users: []
};

export const getUsers = createAsyncThunk("users", async () => {
  const response = await fetch("https://fakestoreapi.com/users")
  const data = response.json()
  return data
})

export const getUsersToken = createAsyncThunk("usertoken", async ({ username, password }) => {
  const response = await fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })

    const data = await response.json()
    localStorage.setItem('usersToken', JSON.stringify(data));
    return data   
});

export const userSlice = createSlice({
  name: "usersToken",
  initialState,
  reducers: {
    logout: (state) => {
      state.usersToken = null
      state.usersTokenStatus = STATUS.IDLE
      localStorage.removeItem('usersToken')
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getUsersToken.pending, (state) => {
      state.usersTokenStatus = STATUS.LOADING
    })
    .addCase(getUsersToken.fulfilled, (state, action) => {
      state.usersToken = action.payload;
      state.usersTokenStatus = STATUS.SUCCESS
    })
    .addCase(getUsersToken.rejected, (state) => {
     state.usersTokenStatus = STATUS.FAIL
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload
    })
  },
});

// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions

export default userSlice.reducer;
