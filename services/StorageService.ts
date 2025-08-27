import { storageSlice } from "../store/features/storage/storageSlice";
import { StorageAPI } from "../types/appManifest";

export class StorageService {
  private static instance: StorageService;

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  createAPI(dispatch: any, getState: any): StorageAPI {
    return {
      get: async (key: string): Promise<any> => {
        const state = getState();
        return state.storage.data[key] || null;
      },

      set: async (key: string, value: any): Promise<void> => {
        dispatch(storageSlice.actions.setStorageItem({ key, value }));
      },

      remove: async (key: string): Promise<void> => {
        dispatch(storageSlice.actions.removeStorageItem(key));
      },

      clear: async (): Promise<void> => {
        dispatch(storageSlice.actions.clearStorage());
      },

      keys: async (): Promise<string[]> => {
        const state = getState();
        return Object.keys(state.storage.data);
      },

      getSize: async (): Promise<number> => {
        const state = getState();
        return state.storage.size;
      }
    };
  }
}