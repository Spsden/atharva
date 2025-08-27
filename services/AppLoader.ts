// import { AppManifest, AppProps } from "../types/appManifest";

// export class AppLoader {
//   private static instance: AppLoader;
//   private loadedApps: Map<string, React.ComponentType<AppProps>> = new Map();

//   static getInstance(): AppLoader {
//     if (!AppLoader.instance) {
//       AppLoader.instance = new AppLoader();
//     }
//     return AppLoader.instance;
//   }

//   async loadApp(appId: string, manifest: AppManifest): Promise<React.ComponentType<AppProps>> {
//     if (this.loadedApps.has(appId)) {
//       return this.loadedApps.get(appId)!;
//     }

//     try {
//       // Load the app dynamically
//       const module = await this.importApp(appId, manifest.main);
//       const AppComponent = module.default || module;

//       this.loadedApps.set(appId, AppComponent);
//       return AppComponent;
//     } catch (error) {
//       console.error(`Failed to load app ${appId}:`, error);
//       throw error;
//     }
//   }

//   private async importApp(appId: string, mainFile: string): Promise<any> {
//     // Different loading strategies based on app type
    
//     // Strategy 1: Load from a URL (for externally hosted apps)
//     if (mainFile.startsWith('http')) {
//       return await this.loadFromURL(mainFile);
//     }
    
//     // Strategy 2: Load from the apps directory
//     console.log(`/dynamic-apps/${appId}/${mainFile}`)
//     return await import(`../dynamic-apps/${appId}/${mainFile}`);
//   }

//   private async loadFromURL(url: string): Promise<any> {
//     // Load app from external URL
//     const response = await fetch(url);
//     const code = await response.text();
//     console.log(code);
    
    
//     // Create a module from the code (be careful with eval in production)
//     // const module = new Function('exports', 'require', 'module', code);
//     // const exports = {};
//     // const moduleObj = { exports };
    
//     // module(exports, require, moduleObj);
//     // return moduleObj.exports;
//   }

//   unloadApp(appId: string): void {
//     this.loadedApps.delete(appId);
//   }
// }