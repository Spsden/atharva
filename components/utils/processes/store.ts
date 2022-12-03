import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { InstalledApps } from "./alltypes";

type InstalledAppsList = {
  list: InstalledApps[];
};

const initialState: InstalledAppsList = {
  list: [],
};

const processSlice = createSlice({
  name: "processes",
  initialState ,
  reducers: {
    addProcess(state: InstalledAppsList, action: PayloadAction<InstalledApps>) {
      console.log("from provess");
      // [...state.list, action.payload];
      state.list.push(action.payload);
    },
    removeProcess(state) {},
  },
});

export const {addProcess,removeProcess} = processSlice.actions;
export const selectProcess = (state:RootState) => state.processes.list;


const store = configureStore({
  reducer: {
    processes: processSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
