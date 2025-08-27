import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileSystemState } from '../../../types/fileSystem';

const initialState: FileSystemState = {
  nodes: {
    'root': {
      id: 'root',
      name: '',
      type: 'folder',
      parentId: null,
      path: '/',
      createdAt: new Date(),
      modifiedAt: new Date()
    },
    'home': {
      id: 'home',
      name: 'Home',
      type: 'folder',
      parentId: 'root',
      path: '/Home',
      createdAt: new Date(),
      modifiedAt: new Date()
    },
    'apps': {
      id: 'apps',
      name: 'Applications',
      type: 'folder',
      parentId: 'root',
      path: '/Applications',
      createdAt: new Date(),
      modifiedAt: new Date()
    }
  },
  currentDirectory: 'root'
};

export const filesystemSlice = createSlice({
  name: 'filesystem',
  initialState,
  reducers: {
    createFile: (state, action: PayloadAction<{
      name: string;
      parentId: string;
      content?: string;
      mimeType?: string;
    }>) => {
      const { name, parentId, content, mimeType } = action.payload;
      const id = `file_${Date.now()}_${Math.random()}`;
      const parent = state.nodes[parentId];
      
      state.nodes[id] = {
        id,
        name,
        type: 'file',
        parentId,
        path: `${parent.path}/${name}`,
        content: content || '',
        mimeType: mimeType || 'text/plain',
        size: content ? content.length : 0,
        createdAt: new Date(),
        modifiedAt: new Date()
      };
    },
    createFolder: (state, action: PayloadAction<{
      name: string;
      parentId: string;
    }>) => {
      const { name, parentId } = action.payload;
      const id = `folder_${Date.now()}_${Math.random()}`;
      const parent = state.nodes[parentId];
      
      state.nodes[id] = {
        id,
        name,
        type: 'folder',
        parentId,
        path: `${parent.path}/${name}`,
        createdAt: new Date(),
        modifiedAt: new Date()
      };
    },
    deleteNode: (state, action: PayloadAction<string>) => {
      const nodeId = action.payload;
      const node = state.nodes[nodeId];
      
      if (node) {
        // Recursively delete children if folder
        if (node.type === 'folder') {
          const children = Object.values(state.nodes).filter(n => n.parentId === nodeId);
          children.forEach(child => {
            delete state.nodes[child.id];
          });
        }
        delete state.nodes[nodeId];
      }
    },
    updateFile: (state, action: PayloadAction<{
      id: string;
      content: string;
    }>) => {
      const { id, content } = action.payload;
      const file = state.nodes[id];
      
      if (file && file.type === 'file') {
        file.content = content;
        file.size = content.length;
        file.modifiedAt = new Date();
      }
    },
    setCurrentDirectory: (state, action: PayloadAction<string>) => {
      state.currentDirectory = action.payload;
    }
  }
});


export default filesystemSlice.reducer