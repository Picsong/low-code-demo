import {defineStore} from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useJsonStore = defineStore('json', {
    // other options...
    state: () => ({
        json: JSON.stringify({
            name: 'Formily'
        })
    }),
    actions: {
        setJsonSchema(payload: string) {
            this.json = payload
        }
    },
})
export const useVueStore = defineStore('vue', {
    // other options...
    state: () => ({
        template: `<div class="wrap">
    <span>vue~</span>
    <a href="javascript:void 0">abc~</a>
</div>`,
        script: `export default {}`,
        style: `.wrap{
    span{ color: red; }
    a{ color: blue; }
}`
    }),
    actions: {
        setTemplate(payload: string) {
            this.template = payload
        },
        setScript(payload: string) {
            this.script = payload
        },
        setStyle(payload: string) {
            this.style = payload
        },
    },
})
