import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum windowStates {
  MINIMIZED,
  MAXIMIZED,
  OPEN,
}

export type windowState = {
  currentState: windowState;
  processID: string;
};

type windowStatesList = {
  list: windowState[];
};

const processState: windowStatesList = {
  list: [],
};

export const windowStatesSlice = createSlice({
  name: "windowState",
  initialState: processState,
  reducers: {
    setMinimize(state: windowStatesList, action: PayloadAction<windowState>) {
      console.log("maximized");
    },
    setMaximize(state: windowStatesList, action: PayloadAction<windowState>) {
      console.log("minized");
    },
  },
});

export  const {setMinimize,setMaximize} = windowStatesSlice.actions;
export const windowStateReducers = windowStatesSlice.reducer



