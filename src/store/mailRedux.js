import { configureStore, createSlice } from "@reduxjs/toolkit";

const sentMailSlice = createSlice({
  name: "sent Mail",
  initialState: { sentmail: [] },
  reducers: {
    sentMailList(state, action) {
        console.log("clicked")
      state.sentmail = [...state.sentmail, action.payload];
    },
  },
});

const mailRedux = configureStore({
  reducer: sentMailSlice.reducer,
});
export const sentMailSliceActions = sentMailSlice.actions;
export default mailRedux;
