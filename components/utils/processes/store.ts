import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { InstalledApps } from "./alltypes";

type InstalledAppsList = {
  list: InstalledApps[];
};

const initialState: InstalledAppsList = {
  list: [],
};

const processSlice = createSlice({
  name: "processes",
  initialState,
  reducers: {
    addProcess(state: InstalledAppsList, action: PayloadAction<InstalledApps>) {
      state.list.push(action.payload);
    },
    removeProcess(state: InstalledAppsList, action: PayloadAction<string>) {
      let indexToDelete = -1;

      for (let i = 0; i < state.list.length; i++) {
        if (state.list[i].id === action.payload) {
          indexToDelete = i;
          break;
        }
      }

      if (indexToDelete != -1) {
        state.list.splice(indexToDelete, 1);
      }

      // let index: number = state.list
      //   .map((item) => {
      //     return item.id;
      //   })
      //   .indexOf(action.payload);

      //  state.list.splice(index, 1);

      // state.list.filter(anApp => anApp.id != action.payload);
      // console.log("from store" + action.payload + "\n");
      // state.list.forEach(
      //   l =>  console.log(l.id)
      // )
    },
  },
});

export const { addProcess, removeProcess } = processSlice.actions;
export const selectProcess = (state: RootState) => state.processes.list;

const store = configureStore({
  reducer: {
    processes: processSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
