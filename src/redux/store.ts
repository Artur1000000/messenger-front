import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import messageReducer from "./slices/messageSlice";
import usersReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    message:messageReducer,
    users: usersReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
