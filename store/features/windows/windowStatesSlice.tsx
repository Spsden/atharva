import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type WindowState = {
  isMinimized: boolean;
  processID: string;
};

type WindowStatesList = {
  list: WindowState[];
};

const processState: WindowStatesList = {
  list: [],
};

export const windowStatesSlice = createSlice({
  name: "windowState",
  initialState: processState,
  reducers: {
    setMinimize(
      state: WindowStatesList,
      action: PayloadAction<{ processID: string }>
    ) {
      const { processID } = action.payload;

      const existingWindow = state.list.find(
        (window) => window.processID === processID
      );

      if (existingWindow) {
        state.list = state.list.map((window) =>
          window.processID === processID
            ? { ...window, isMinimized: !window.isMinimized }
            : window
        );
      } else {
        state.list.push({ isMinimized: false, processID });
      }
    },
    removeFromProcessStates(
      state: WindowStatesList,
      action: PayloadAction<{ processID: string }>
    ) {
      const { processID } = action.payload;

      const indexOfProcess = state.list.findIndex(
        (window) => window.processID === processID
      );
      

      if(indexOfProcess !== -1){
        state.list.splice(indexOfProcess, 1);
      }

     
    },
  },
});

export const { setMinimize,removeFromProcessStates } = windowStatesSlice.actions;
export const windowStateReducers = windowStatesSlice.reducer;
