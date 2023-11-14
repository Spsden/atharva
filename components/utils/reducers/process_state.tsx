import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum windowStates {
  MINIMIZED,
  MAXIMIZED,
  
}

export type windowState = {
    
  currentState: windowStates;
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
        const { processID ,currentState} = action.payload;

        // Check if the processID already exists
        const existingWindow = state.list.find((window) => window.processID === processID);
  
        if (existingWindow) {
          state.list = state.list.map((window) =>
            window.processID === processID ? { ...window, currentState: currentState } : window
          );
        } else {
          state.list.push({ currentState: windowStates.MAXIMIZED, processID });
        }
      console.log("maximized");
    },
    setMaximize(state: windowStatesList, action: PayloadAction<windowState>) {
      console.log("minized");
    },
  },
});

export  const {setMinimize,setMaximize} = windowStatesSlice.actions;
export const windowStateReducers = windowStatesSlice.reducer



