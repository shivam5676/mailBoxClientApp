import { configureStore, createSlice } from "@reduxjs/toolkit";

const sentMailSlice = createSlice({
  name: "sent Mail",
  initialState: { sentmail: [] },
  reducers: {
    sentMailList(state, action) {
      console.log("clicked");

      const newItem = action.payload;
      const existingItem = state.sentmail.find(
        (item) => item.id === newItem.id
      );

      if (!existingItem) {
        state.sentmail.push(newItem);
      }
    },
  },
});

const allMailSlice = createSlice({
  name: "All Mail",
  initialState: { allmail: [] },
  reducers: {
    allMailList(state, action) {
      console.log("added");
      const newItem = action.payload;
      const existingItem = state.allmail.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.allmail.push(newItem);
      }
    },
  },
});

const readMailSlice = createSlice({
  name: "read Mail",
  initialState: { readmail: []},
  reducers: {
    readMailList(state, action) {
      console.log("read")
      state.readmail=action.payload
    },
  },
});
// const ProfileSlice=createSlice({
//   name:"sender email and profile data",
//   initialState:{}
// })

const mailRedux = configureStore({
  reducer: { sent: sentMailSlice.reducer, all: allMailSlice.reducer ,reads:readMailSlice.reducer},
});

export const sentMailSliceActions = sentMailSlice.actions;
export const allMailSliceActions = allMailSlice.actions;
export const readMailSliceActions=readMailSlice.actions;
export default mailRedux;
