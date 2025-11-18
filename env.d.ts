/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
   const component: DefineComponent<unknown, unknown, unknown>
  export default component
}

// Environment variables
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
