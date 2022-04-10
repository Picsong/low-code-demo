import {createRouter, createWebHistory} from "vue-router";
import Home from "../pages/home/index.vue";

const Visual = () => import("../pages/visual/index.vue");
const Renderer = () => import("../pages/renderer/index.vue");

const routes = [
    {path: '/', component: Home},
    {path: '/visual', component: Visual},
    {path: '/renderer/:id', component: Renderer},
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
