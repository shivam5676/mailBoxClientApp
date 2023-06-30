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
    deleteSentMail(state, action) {
      const newArray = state.sentmail.filter(
        (currentitem) => currentitem.id !== action.payload
      );
      state.sentmail=newArray
    },
  },
});

const allMailSlice = createSlice({
  name: "All Mail",
  initialState: { allmail: [],unread:0 },
  reducers: {
    allMailList(state, action) {
      console.log("added");
      const newItem = action.payload;
      const existingItem = state.allmail.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.allmail.push(newItem);
      }
    },
    unreadMail(state,action){
      state.unread=action.payload;
    },
    logOutHandler(state,action){
      state.allmail=[];
      state.unread=0
    }
  },
});

const readMailSlice = createSlice({
  name: "read Mail",
  initialState: { readmail: [] },
  reducers: {
    readMailList(state, action) {
      console.log("read");
      state.readmail = action.payload;
    },
  },
});
const LoggedInSlice=createSlice({
  name:"user logged in or not",
  initialState:{loggedIn:false},
  reducers:{userLogIn(state){
  state.loggedIn=true
}
,
userLogOut(state){
  state.loggedIn=false
}}

})

const mailRedux = configureStore({
  reducer: {
    sent: sentMailSlice.reducer,
    all: allMailSlice.reducer,
    reads: readMailSlice.reducer,
    logIn:LoggedInSlice.reducer
  },
});

export const sentMailSliceActions = sentMailSlice.actions;
export const allMailSliceActions = allMailSlice.actions;
export const readMailSliceActions = readMailSlice.actions;
export const LoggedInSliceActions=LoggedInSlice.actions
export default mailRedux;
