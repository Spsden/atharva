import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppManifest, DynamicApp } from '../../../types/appManifest';
import { RootState } from '../../store';

interface AppsState {
    installedApps: Record<string, AppManifest>;
    dynamicApps: Record<string, DynamicApp>;
    runningProcesses: Record<string, {
        appId: string;
        processId: string;
        windowId: string;
        state: 'running' | 'minimized' | 'suspended';
    }>;
    appStore: AppManifest[];
}

const initialState: AppsState = {
    installedApps: {},
    dynamicApps: {},
    runningProcesses: {},
    appStore: []
};

const fetchAppBundle = async (manifest: AppManifest): Promise<any> => {
    if (manifest.main.startsWith('http')) {
        const response = await fetch(manifest.main);
        const code = await response.text();
        const module = new Function('exports', 'require', 'module', code);
        const exports = {};
        const moduleObj = { exports };
        module(exports, require, moduleObj);
        return moduleObj.exports;
    } else {
        return await import(`../../../dynamic-apps/${manifest.id}/${manifest.main}`);
    }
};


export const loadDynamicApp = createAsyncThunk(
    'apps/loadDynamicApp',
    async (appId: string, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const appManifest = state.apps.installedApps[appId];
        const isAvailable = state.apps.appStore.some(storeApp => storeApp.id === appId);

        console.log(appManifest);
        console.log(isAvailable);

        if (!appManifest || appManifest.type !== 'dynamic') {
            return rejectWithValue('App not found or not a dynamic app');

        }
        // if (!isAvailable) {
        //     return rejectWithValue(`App with id '${appId}' is not available in the file system.`);
        // }

        try {
            const bundle = await fetchAppBundle(appManifest);
            return {
                appId,
                component: bundle.default || bundle, // Handle different module export styles
                manifest: appManifest
            };
        } catch (error: any) {
            console.error(`Failed to load and execute bundle for ${appId}:`, error);
            return rejectWithValue(error.message);
        }
    }
);

export const appsSlice = createSlice({
    name: 'apps',
    initialState,
    reducers: {
        setInstalledApps: (state, action: PayloadAction<AppManifest[]>) => {
            const appsAsRecord: Record<string, AppManifest> = {};
            for (const app of action.payload) {
                appsAsRecord[app.id] = app;
            }
            state.installedApps = appsAsRecord;
        },
        installApp: (state, action: PayloadAction<AppManifest>) => {
            //TODO  ---
            // state.installedApps[action.payload.id] = action.payload;
        },
        uninstallApp: (state, action: PayloadAction<string>) => {
            //TODO
            // delete state.installedApps[action.payload];
            // delete state.dynamicApps[action.payload];
        },
        startProcess: (state, action: PayloadAction<{
            appId: string;
            processId: string;
            windowId: string;
        }>) => {
            const { appId, processId, windowId } = action.payload;
            state.runningProcesses[processId] = {
                appId,
                processId,
                windowId,
                state: 'running'
            };
        },
        killProcess: (state, action: PayloadAction<string>) => {
            console.log("killing starts");
            delete state.runningProcesses[action.payload];
        },
        updateAppStore: (state, action: PayloadAction<AppManifest[]>) => {
            state.appStore = action.payload;
        },
        updateProcessState: (state, action: PayloadAction<{
            processId: string;
            newState: 'running' | 'minimized' | 'suspended';
        }>) => {
            const { processId, newState } = action.payload;
            if (state.runningProcesses[processId]) {
                state.runningProcesses[processId].state = newState;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadDynamicApp.fulfilled, (state, action) => {
            const { appId, component, manifest } = action.payload;
            state.dynamicApps[appId] = {
                manifest,
                component,
                isLoaded: true
            };
        });
        builder.addCase(loadDynamicApp.rejected, (state, action) => {
            console.error(`Failed to load dynamic app:`, action.payload);
        });
    }
});


export const {
    setInstalledApps,
    installApp,
    uninstallApp,
    startProcess,
    killProcess,
    updateAppStore,
    updateProcessState
} = appsSlice.actions;


export default appsSlice.reducer
