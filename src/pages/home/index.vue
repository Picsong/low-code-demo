<template>
    <Splitpanes class="custom-splitpanes" p-4 bg="#0F0F0F">
        <Pane>
            <Splitpanes horizontal>
                <Pane>
                    <section flex="~ col">
                        <div flex="~ row" text="xs light-300" items="center" p="l-2" max-h-8 min-h-8
                             h="8" bg="dark-800" border="b-1 dark-100"
                        >
                            {{ isUpdated0 ? '*' : '' }}json
                        </div>
                        <Editor v-model="json" language="json" :save="save0" style="flex: 1"/>
                    </section>
                </Pane>
                <Pane>
                    <section flex="~ col">
                        <div flex="~ row basic-32" text="xs light-300" items="center" max-h-8 min-h-8 h="8"
                             bg="dark-800"
                             border="b-1 dark-100">
                            <button h-full p-l-2 p-r-2
                                    class="hover:bg-dark-200"
                                    :class="active==='template'?'bg-dark-200':''"
                                    @click="active='template'"
                            >
                                {{ isUpdated1 ? '*' : '' }}template
                            </button>
                            <button h-full p-l-2 p-r-2 border="r-1 l-1 dark-100"
                                    class="hover:bg-dark-200"
                                    :class="active==='script'?'bg-dark-200':''"
                                    @click="active='script'"
                            >
                                {{ isUpdated2 ? '*' : '' }}script
                            </button>
                            <button h-full p-l-2 p-r-2
                                    class="hover:bg-dark-200"
                                    :class="active==='style'?'bg-dark-200':''"
                                    @click="active='style'"
                            >
                                {{ isUpdated3 ? '*' : '' }}style
                            </button>
                            <button class="icon-btn !outline-none hover:bg-dark-200" h-full p-l-2 p-r-2 ml="auto"
                                    @click="save">
                                <div i-carbon-save title="全部保存"></div>
                            </button>
                        </div>
                        <Editor v-show="active==='template'" v-model="vueState.html" language="html" :save="save1"
                                style="flex:1"/>
                        <Editor v-show="active==='script'" v-model="vueState.js" language="javascript" :save="save2"
                                style="flex:1"/>
                        <Editor v-show="active==='style'" v-model="vueState.css" language="scss" :save="save3"
                                style="flex:1"/>
                    </section>
                </Pane>
            </Splitpanes>
        </Pane>
        <Pane>
            <Splitpanes horizontal>
                <Pane>
                    <section class="render-layout">
                        <RenderComponent :key="forceUpdateJson" query-id="render-layout"/>
                    </section>
                </Pane>
                <Pane>
                    <section class="render-vue">
                        <RenderComponent :key="forceUpdateVue" query-id="render-vue"/>
                    </section>
                </Pane>
            </Splitpanes>
        </Pane>
    </Splitpanes>
</template>

<script setup lang="ts">
import {Splitpanes, Pane} from 'splitpanes'

const active = $ref('template')
const json = ref(localStorage.getItem('render-layout'))
const vueStore = reactive(JSON.parse(localStorage.getItem('render-vue')!) || {})
const vueState = reactive({
    html: vueStore.template,
    js: vueStore.script,
    css: vueStore.style
})
const forceUpdateJson = ref(0)
const forceUpdateVue = ref(0)

const isUpdated0 = computed(() => {
    console.log(forceUpdateJson.value)
    const storageJson = localStorage.getItem('render-layout')
    return storageJson !== json.value
})
const isUpdated1 = computed(() => {
    return vueStore.template !== vueState.html
})
const isUpdated2 = computed(() => {
    return vueStore.script !== vueState.js
})
const isUpdated3 = computed(() => {
    return vueStore.style !== vueState.css

})
const isUpdated = computed(() => {
    return isUpdated1.value || isUpdated2.value || isUpdated3.value
})
const save0 = () => {
    try {
        localStorage.setItem('render-layout', json.value ? JSON.stringify(JSON.parse(json.value), null, 2) : '')
        forceUpdateJson.value++
    } catch (e) {
        console.log(e)
    }
}
const save1 = () => {
    vueStore.template = vueState.html
    localStorage.setItem('render-vue', JSON.stringify({
        ...vueStore,
        template: vueStore.template
    }))
    forceUpdateVue.value++

}
const save2 = () => {
    vueStore.script = vueState.js
    localStorage.setItem('render-vue', JSON.stringify({
        ...vueStore,
        script: vueStore.script
    }))
    forceUpdateVue.value++

}
const save3 = () => {
    vueStore.style = vueState.css
    localStorage.setItem('render-vue', JSON.stringify({
        ...vueStore,
        style: vueStore.style
    }))
    forceUpdateVue.value++

}
const save = () => {
    save1()
    save2()
    save3()
}
</script>

<style lang="scss" scoped>
section {
    width: 100%;
    height: 100%;
    border: 1px solid #343434;
    border-radius: 4px;
    overflow: hidden;
    background-color: #181818;
}

</style>
