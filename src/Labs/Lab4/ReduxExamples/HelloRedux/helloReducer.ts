{/**
    "helloReducer" responsible for maintaining a state that consists of a message state string
    initialized to "Hello World"
    */}
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  message: "Hello World",
};
const helloSlice = createSlice({
  name: "hello",
  initialState,
  reducers: {},
});
export default helloSlice.reducer;