import {
    fileURLToPath,
    URL,
} from 'node:url';

// Utilities
import { defineConfig } from 'vite';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// Plugins
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [
        vue({
            template: { transformAssetUrls },
        }),
        // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
        vuetify({
            autoImport: true,
            styles: {
                configFile: 'src/styles/vuetify.scss',
            },
        }),
    ],
    css: {
        preprocessorOptions: {
            css: {
                additionalData: '@import "lato-font/css/lato-font.css";',
            },
        },
    },
    resolve: {
        alias: [
            { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
        ],
        extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },
    envDir: './',
}));