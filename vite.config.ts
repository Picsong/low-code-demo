import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Jsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "vue": "vue/dist/vue.esm-bundler.js",
            "@": "/src",
            "@hooks": "/src/hooks",
            "@pages": "/src/pages",
            "@components": "/src/components",
        },
    },
    plugins: [
        vue({
            reactivityTransform: true,
            template: {
                compilerOptions: {}
            }
        }),
        Jsx(),
        // https://github.com/antfu/unplugin-auto-import
        AutoImport({
            imports: [
                'vue',
                'vue/macros',
                'vue-router',
                '@vueuse/core',
            ],
            dts: 'src/auto-imports.d.ts',
        }),

        // https://github.com/antfu/vite-plugin-components
        Components({
            dts: 'src/components.d.ts',
        }),

        // https://github.com/antfu/unocss
        // see unocss.config.ts for config
        Unocss(),
    ]
})
