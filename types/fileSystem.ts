export interface FileSystemNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  parentId: string | null;
  path: string;
  size?: number;
  content?: string | Uint8Array;
  mimeType?: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface FileSystemState {
  nodes: Record<string, FileSystemNode>;
  currentDirectory: string;
}