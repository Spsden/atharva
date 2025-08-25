
import { createSlice } from '@reduxjs/toolkit';

export interface UiState {
  isStartMenuOpen: boolean;
}

const initialState: UiState = {
  isStartMenuOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleStartMenu: (state) => {
      console.log("toggling start menu, current state:", state.isStartMenuOpen);
      state.isStartMenuOpen = !state.isStartMenuOpen;
      console.log("toggled to ", state.isStartMenuOpen);
    },
    closeStartMenu: (state) => {
        state.isStartMenuOpen = false;
      },
  },
});

export const { toggleStartMenu,closeStartMenu } = uiSlice.actions;

export default uiSlice.reducer;
