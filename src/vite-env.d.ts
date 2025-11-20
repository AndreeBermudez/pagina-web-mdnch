/// <reference types="vite/client" />
/// <reference types="vitest" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_IMAGENES_URL: string;
  readonly VITE_DOCUMENTOS_URL: string;
  readonly VITE_APP_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
