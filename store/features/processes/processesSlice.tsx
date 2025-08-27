// import { PayloadAction, combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
// import { InstalledApps } from "../../../components/utils/processes/alltypes";

// type runningProcesses = {
//   list: InstalledApps[];
// };
// const runningProcessesState: runningProcesses = {
//   list: [],
// };

// export const runningProcessesSlice = createSlice({
//   name: "processes",
//   initialState: runningProcessesState,
//   reducers: {
//     addProcess(state: runningProcesses, action: PayloadAction<InstalledApps>) {
//       state.list.push(action.payload);
//     },

//     removeProcess(state: runningProcesses, action: PayloadAction<string>) {
//       let indexToDelete = -1;

//       for (let i = 0; i < state.list.length; i++) {
//         if (state.list[i].id === action.payload) {
//           indexToDelete = i;
//           break;
//         }
//       }

//       if (indexToDelete != -1) {
//         state.list.splice(indexToDelete, 1);
//       }
//     },
//   },
// });



// export const { addProcess, removeProcess } = runningProcessesSlice.actions;
// export const selectProcess = (state: RootState) => state.processes.list;


// export const processReducers = runningProcessesSlice.reducer

// const processesStore = configureStore({
//     reducer: {
//       processes: runningProcessesSlice.reducer,
//     },
//   });
// export type RootState = ReturnType<typeof processesStore.getState>;
