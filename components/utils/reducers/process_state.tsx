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
    // setMaximize(
    //   state: WindowStatesList,
    //   action: PayloadAction<{ processID: string }>
    // ) {
    //   const { processID } = action.payload;

    //   const existingWindow = state.list.find(
    //     (window) => window.processID === processID
    //   );

    //   if (existingWindow) {
    //     state.list = state.list.map((window) =>
    //       window.processID === processID
    //         ? { ...window, isMinimized: false }
    //         : window
    //     );
    //   } else {
    //     state.list.push({ isMinimized: false, processID });
    //   }
    // },
  },
});

export const { setMinimize } = windowStatesSlice.actions;
export const windowStateReducers = windowStatesSlice.reducer;
