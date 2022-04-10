<template>
    <component :is="name" v-bind="config"/>
    <Dialog v-if="dialog.visible" v-bind="dialog" @ok="handleOk" @cancel="handleCancel"/>
</template>

<script>

import _ from "lodash-es";
import {templateTransform, createStyleToHead} from "@/helpers";


function $require(name) {
    const help = {
        lodash: _,
    }
    return help[name];
}

export default defineComponent({
    name: "RenderComponent",
    props: {
        queryId: String,
    },
    data() {
        return {
            name: '',
            config: {},
            scopedId: '',
            dialog: {
                visible: false,
                dialogConfig: {},
                componentConfig: {},
            },
        }
    },
    async created() {
        this.init()
    },
    methods: {
        init() {
            const data = JSON.parse(localStorage.getItem(this.queryId))
            if (!data) return
            // 解析json替换函数
            data.buttons && this.parserEval(data.buttons)
            this.config = data
            if (this.config.name) {
                // JsonSchema组件
                this.name = this.config.name
            } else {
                this.scopedId = `data-ps-${Math.random().toString(36).slice(2, 9)}`;
                // CustomVue组件
                let options = {
                    template: templateTransform(this.config?.template, this.scopedId),
                }
                const vue_script = Function('require', this.config?.script?.replace('export default', 'return')).call(this, $require);
                if (typeof vue_script === 'function') {
                    options = vue_script
                } else {
                    options = {
                        ...options,
                        ...vue_script,
                    }
                }
                if (this.config?.style) {
                    createStyleToHead(this.config?.style, this.scopedId)
                }
                this.name = defineComponent(options)
            }
        },
        setDialogProps(props) {
            console.log(props)
            this.dialog = {
                ...this.dialog,
                ...props
            }
        },
        handleOk() {
            this.dialog.visible = false
        },
        handleCancel() {
            this.dialog.visible = false
        },
        parserEval(obj) {
            for (const [k, v] of Object.entries(obj)) {
                if (v && typeof v === 'object') {
                    if (typeof v.$eval === 'string') {
                        obj[k] = Function('return ' + v.$eval).call(this)
                    } else {
                        this.parserEval(v)
                    }
                }
            }
            return obj
        }
    },
    beforeUnmount() {
        if (this.scopedId) {
            const oldStyle = document.getElementById(this.scopedId);
            oldStyle && oldStyle.remove()
        }
    }
})
</script>

<style scoped>

</style>
