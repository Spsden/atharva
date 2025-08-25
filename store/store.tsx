import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import { processReducers, runningProcessesSlice } from "./features/processes/processesSlice";
import { windowStateReducers } from "./features/windowStates/windowStatesSlice";
import uiReducer from "./features/ui/uiSlice";

interface RootStates {
  processes: ReturnType<typeof processReducers>;
  windowStates: ReturnType<typeof windowStateReducers>;
  ui: ReturnType<typeof uiReducer>;
}

export type { RootStates };

const allReducers = combineReducers({
  processes: processReducers,
  windowStates: windowStateReducers,
  ui: uiReducer,
});

var store = configureStore({
  reducer: allReducers,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
