// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import taskReducer from "./taskSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // This type will be useful for dispatching actions

export default store;
