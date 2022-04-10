<template>
    <Modal
        :visible="visible"
        v-bind="dialogConfig"
        @ok="handleOk"
        @cancel="handleCancel"
    >
        <component :is="componentName" v-bind="componentConfig"/>
    </Modal>
</template>

<script>
import {Modal} from "ant-design-vue";

export default defineComponent({
    name: "Dialog",
    components: {
        Modal
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        dialogConfig: {
            type: Object,
            default: () => ({})
        },
        componentName: {
            type: String,
            default: "RenderComponent"
        },
        componentConfig: {
            type: Object,
            default: () => ({})
        }
    },
    emits: ["ok", "cancel"],
    methods: {
        handleOk() {
            this.$emit("ok");
        },
        handleCancel() {
            this.$emit("cancel");
        }
    }
})
</script>

<style scoped>

</style>
