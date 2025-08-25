import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import { processReducers, runningProcessesSlice } from "./features/processes/processesSlice";
import { windowStateReducers } from "./features/windowStates/windowStatesSlice";

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
