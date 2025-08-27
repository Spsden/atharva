import { appsSlice } from "../store/features/apps/appsSlice";
import { filesystemSlice } from "../store/features/filesystem/fileSystemSlice";
import { FileSystemAPI } from "../types/appManifest";
import { FileSystemNode } from "../types/fileSystem";

export class FileSystemService {
  private static instance: FileSystemService;

  static getInstance(): FileSystemService {
    if (!FileSystemService.instance) {
      FileSystemService.instance = new FileSystemService();
    }
    return FileSystemService.instance;
  }

  createAPI(dispatch: any, getState: any): FileSystemAPI {
    return {
      readFile: async (path: string): Promise<string | Uint8Array> => {
        const state = getState();
        const node = this.findNodeByPath(state.filesystem.nodes, path);
        
        if (!node || node.type !== 'file') {
          throw new Error('File not found');
        }
        
        return node.content || '';
      },

      writeFile: async (path: string, content: string | Uint8Array): Promise<void> => {
        const state = getState();
        const node = this.findNodeByPath(state.filesystem.nodes, path);
        
        if (node) {
          dispatch(filesystemSlice.actions.updateFile({ id: node.id, content: content as string }));
        } else {
          // Create new file
          const pathParts = path.split('/');
          const fileName = pathParts.pop()!;
          const parentPath = pathParts.join('/') || '/';
          const parent = this.findNodeByPath(state.filesystem.nodes, parentPath);
          
          if (parent) {
            dispatch(filesystemSlice.actions.createFile({
              name: fileName,
              parentId: parent.id,
              content: content as string
            }));
          }
        }
      },

      createFolder: async (path: string): Promise<void> => {
        const pathParts = path.split('/');
        const folderName = pathParts.pop()!;
        const parentPath = pathParts.join('/') || '/';
        const state = getState();
        const parent = this.findNodeByPath(state.filesystem.nodes, parentPath);
        
        if (parent) {
          dispatch(filesystemSlice.actions.createFolder({
            name: folderName,
            parentId: parent.id
          }));
        }
      },

      deleteFile: async (path: string): Promise<void> => {
        const state = getState();
        const node = this.findNodeByPath(state.filesystem.nodes, path);
        
        if (node) {
          dispatch(filesystemSlice.actions.deleteNode(node.id));
        }
      },

      listDirectory: async (path: string): Promise<FileSystemNode[]> => {
        const state = getState();
        const node = this.findNodeByPath(state.filesystem.nodes, path);
        
        if (!node || node.type !== 'folder') {
          return [];
        }
        
        return Object.values(state.filesystem.nodes).filter(n => n.parentId === node.id);
      },

      exists: async (path: string): Promise<boolean> => {
        const state = getState();
        return !!this.findNodeByPath(state.filesystem.nodes, path);
      },

      getStats: async (path: string): Promise<FileSystemNode> => {
        const state = getState();
        const node = this.findNodeByPath(state.filesystem.nodes, path);
        
        if (!node) {
          throw new Error('File not found');
        }
        
        return node;
      }
    };
  }

  private findNodeByPath(nodes: Record<string, FileSystemNode>, path: string): FileSystemNode | null {
    return Object.values(nodes).find(node => node.path === path) || null;
  }
}

export const { installApp, uninstallApp, startProcess, killProcess } = appsSlice.actions;
export const { createFile, createFolder, deleteNode, updateFile, setCurrentDirectory } = filesystemSlice.actions;
