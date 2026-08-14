/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, unknown>
  export default component
}

interface Window {
  showDirectoryPicker(options?: { mode: 'read' | 'readwrite' }): Promise<FileSystemDirectoryHandle>
}

interface FileSystemHandle {
  queryPermission(options?: { mode: 'read' | 'readwrite' }): Promise<PermissionState>
  requestPermission(options?: { mode: 'read' | 'readwrite' }): Promise<PermissionState>
}

interface FileSystemDirectoryHandle extends FileSystemHandle {
  entries(): AsyncIterableIterator<[string, FileSystemHandle]>
}
