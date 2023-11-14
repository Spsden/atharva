import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum windowStates {
  MINIMIZED,
  MAXIMIZED,
  OPEN,
}

// export type windowState = {

//   currentState: windowState;
//   processID: string;
// };

export type windowStateMapType = Map<string, windowStates>;

const processState: windowStateMapType = new Map();

export const windowStatesSlice = createSlice({
  name: "windowState",
  initialState: processState,
  reducers: {
    setMinimize(state: windowStateMapType, action: PayloadAction<string>) {
      state.set(action.payload, windowStates.MINIMIZED);
      console.log("minimized");
    },
    setMaximize(state: windowStateMapType, action: PayloadAction<string>) {
      state.set(action.payload, windowStates.MAXIMIZED);

      console.log("maximized");
    },
  },
});

export const { setMinimize, setMaximize } = windowStatesSlice.actions;
export const windowStateReducers = windowStatesSlice.reducer;
