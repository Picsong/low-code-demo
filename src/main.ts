import { createApp } from 'vue'
import { createPinia } from 'pinia'
import loader from "@monaco-editor/loader"
import '@unocss/reset/tailwind.css'
import 'splitpanes/dist/splitpanes.css'
import 'ant-design-vue/dist/antd.dark.css';
import 'uno.css'
import {Button} from "ant-design-vue";

import App from './App.vue'
import Dialog from "@/components/Dialog.vue";
import Formily from "@/components/Formily.vue";
import PageLayout from "@/components/PageLayout.vue";
import RenderComponent from "@/components/RenderComponent.vue";
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
app.component('Dialog', Dialog)
app.component('Button', Button)
app.component('Formily', Formily)
app.component('PageLayout', PageLayout)
app.component('RenderComponent', RenderComponent)
app.use(router)
app.use(createPinia())
app.mount('#app')
