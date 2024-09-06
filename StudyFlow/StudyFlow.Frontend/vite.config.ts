import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';  // Asegúrate de importar 'path'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5173,
    },
    plugins: [react()],
    resolve: {
        alias: {
            '@components': path.resolve('./src/components'),
            '@pages': path.resolve('./src/pages'),
            '@layouts': path.resolve('./src/layouts'),
        },
    },
})