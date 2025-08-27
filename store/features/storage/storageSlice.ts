import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StorageState {
  data: Record<string, any>;
  size: number;
}

const initialStorageState: StorageState = {
  data: {},
  size: 0
};

export const storageSlice = createSlice({
  name: 'storage',
  initialState: initialStorageState,
  reducers: {
    setStorageItem: (state, action: PayloadAction<{ key: string; value: any }>) => {
      const { key, value } = action.payload;
      const serialized = JSON.stringify(value);
      const oldSize = state.data[key] ? JSON.stringify(state.data[key]).length : 0;
      
      state.data[key] = value;
      state.size = state.size - oldSize + serialized.length;
    },

    removeStorageItem: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      if (state.data[key]) {
        const size = JSON.stringify(state.data[key]).length;
        delete state.data[key];
        state.size -= size;
      }
    },

    clearStorage: (state) => {
      state.data = {};
      state.size = 0;
    }
  }
});


export const { 
  setStorageItem, 
  removeStorageItem, 
  clearStorage 
} = storageSlice.actions;