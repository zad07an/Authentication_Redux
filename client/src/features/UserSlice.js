import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const URL = 'http://localhost:8080/users'

const initialState = {
  users: []
}

export const checkEmailExist = createAsyncThunk('user/checkEmailExist', async () => {
  const response = await axios.get(URL);
  return await response.data;
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkEmailExist.fulfilled, (state, action) => {
        state.users = action.payload;
      })
  }
})

export const {} = userSlice.actions;
export default userSlice.reducer;