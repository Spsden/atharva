import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import { processReducers, runningProcessesSlice } from "./processes";
import { windowStateReducers, windowStatesSlice } from "./process_state";

interface RootStates {
  processes: ReturnType<typeof processReducers>;
  windowStates: ReturnType<typeof windowStateReducers>;
}

export type { RootStates };

const allReducers = combineReducers({
  processes: processReducers,
  windowStates: windowStateReducers,
});

var store = configureStore({
  reducer: allReducers,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
