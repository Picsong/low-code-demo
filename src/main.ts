import { createApp } from 'vue'
import { createPinia } from 'pinia'
import loader from "@monaco-editor/loader"
import 'splitpanes/dist/splitpanes.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'

import App from './App.vue'
import Formily from "@/components/Formily.vue";
import router from "./routers";
import './styles/main.scss'

loader.config({
    paths: {
        // vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.31.1/min/vs'
        vs: "./monaco-editor/min/vs",
    },
    "vs/nls": {
        availableLanguages: {
            "*": "zh-cn",
        },
    },
})

const app =  createApp(App)
app.component('Formily', Formily)
app.use(router)
app.use(createPinia())
app.mount('#app')
