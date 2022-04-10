import {defineStore} from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useJsonStore = defineStore('json', {
    // other options...
    state: () => ({
        json: JSON.stringify({
            name: 'Formily',
            schema: {
                type: 'object',
                properties: {
                    layout: {
                        type: 'void',
                        'x-component': 'Form',
                        'x-component-props': {
                            layout: 'inline',
                            style: {padding: '10px'}
                        },
                        properties: {
                            total: {
                                type: 'number',
                                'x-component': "InputNumber",
                                'x-component-props': {
                                    placeholder: '请输入',
                                },
                                'x-decorator': "FormItem",
                                'x-decorator-props': {
                                    label: "总价",
                                },
                                'x-reactions': {
                                    dependencies: ['.count', '.price'],
                                    fulfill: {
                                        state: {
                                            value:
                                                '{{$deps[0] !== undefined && $deps[1] !== undefined ? $deps[0] * $deps[1] : $self.value}}',
                                        },
                                    },
                                }
                            },
                            count: {
                                type: 'number',
                                'x-decorator': "FormItem",
                                'x-decorator-props': {
                                    label: "数量",
                                },
                                'x-component': 'InputNumber',
                                'x-component-props': {
                                    placeholder: '请输入',
                                },
                                'x-reactions': {
                                    dependencies: ['.total', '.price'],
                                    fulfill: {
                                        state: {
                                            value: '{{ $deps[1] > 0 ? $deps[0] / $deps[1] : $self.value}}',
                                        },
                                    },
                                }
                            },
                            price: {
                                type: 'number',
                                'x-decorator': "FormItem",
                                'x-decorator-props': {
                                    label: "单价",
                                },
                                'x-component': 'InputNumber',
                                'x-component-props': {
                                    placeholder: '请输入',
                                },
                                'x-reactions': {
                                    dependencies: ['.total', '.count'],
                                    fulfill: {
                                        state: {
                                            value: '{{ $deps[1] > 0 ? $deps[0] / $deps[1] : $self.value}}',
                                        },
                                    },
                                }
                            },
                        }
                    },
                    button: {
                        type: 'void',
                        'x-component': 'Button',
                        'x-content': '一个普通的按钮',
                        'x-component-props': {
                            '@click': '{{() => { console.log($values) }}}'
                        }
                    },
                },
            },
            form: {
                initialValues: {
                    total: 100,
                    count: 10,
                    price: 10,
                },
            }
        }, null, 2),
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
        template: `<div class="wrap p-4">
    <span>{{name}}{{count}}</span>
    <button btn @click="add">+</button>
    <button btn @click="sub">-</button>
</div>`,
        script: `export default {
            data() {
                return {
                    name: 'vue',
                    count: 0,
                }
            },
            methods: {
                add() {
                    this.count++
                },
                sub() {
                    this.count--
                },
            }
        }`,
        style: `.wrap{
    span { 
        color: red;
    }
    
    a { 
        color: blue;
    }
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
