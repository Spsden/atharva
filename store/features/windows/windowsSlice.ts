import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WindowState } from '../../../types/windows';
import { AppManifest } from '../../../types/appManifest';

interface WindowsManagerState {
    windows: Record<string, WindowState>;
    focusOrder: string[]; // Track window focus order
}

const initialState: WindowsManagerState = {
    windows: {},
    focusOrder: []
};

export const windowsSlice = createSlice({
    name: 'windows',
    initialState,
    reducers: {
        createWindow: (state, action: PayloadAction<{ processId: string; manifest: AppManifest }>) => {
            const { processId, manifest } = action.payload;
            const windowId = `win_${processId}`;
            
            state.windows[windowId] = {
                windowId,
                processId,
                title: manifest.name,
                icon: manifest.icon,
                isVisible: true,
                isMinimized: false,
                isMaximized: false,
                isResizable: manifest.defaultWindow?.resizable ?? true,
                position: { x: 100, y: 100 },
                size: { width: manifest.defaultWindow?.width ?? 800, height: manifest.defaultWindow?.height ?? 600 },
                zIndex: state.focusOrder.length + 1
            };
            state.focusOrder.push(windowId);
        },
        closeWindow: (state, action: PayloadAction<string>) => {
            const windowId = action.payload;
            delete state.windows[windowId];
            state.focusOrder = state.focusOrder.filter(id => id !== windowId);
        },
        minimizeWindow: (state, action: PayloadAction<string>) => {
            if (state.windows[action.payload]) {
                state.windows[action.payload].isMinimized = true;
            }
        },
        maximizeWindow: (state, action: PayloadAction<string>) => {
             if (state.windows[action.payload]) {
                state.windows[action.payload].isMaximized = !state.windows[action.payload].isMaximized;
            }
        },
        restoreWindow: (state, action: PayloadAction<string>) => {
             if (state.windows[action.payload]) {
                state.windows[action.payload].isMinimized = false;
            }
        },
        focusWindow: (state, action: PayloadAction<string>) => {
            const windowId = action.payload;
            state.focusOrder = [windowId, ...state.focusOrder.filter(id => id !== windowId)];
            state.focusOrder.forEach((id, index) => {
                if (state.windows[id]) {
                    state.windows[id].zIndex = state.focusOrder.length - index;
                }
            });
        },
        updateWindowPosition: (state, action: PayloadAction<{ windowId: string; position: { x: number; y: number } }>) => {
            const { windowId, position } = action.payload;
            if (state.windows[windowId]) {
                state.windows[windowId].position = position;
            }
        },
        updateWindowSize: (state, action: PayloadAction<{ windowId: string; size: { width: number; height: number } }>) => {
            const { windowId, size } = action.payload;
            if (state.windows[windowId]) {
                state.windows[windowId].size = size;
            }
        },
        updateWindowTitle: (state, action: PayloadAction<{ windowId: string; title: string }>) => {
             const { windowId, title } = action.payload;
            if (state.windows[windowId]) {
                state.windows[windowId].title = title;
            }
        },
        updateWindowIcon: (state, action: PayloadAction<{ windowId: string; icon: string }>) => {
             const { windowId, icon } = action.payload;
            if (state.windows[windowId]) {
                state.windows[windowId].icon = icon;
            }
        }
    }
});


export default windowsSlice.reducer