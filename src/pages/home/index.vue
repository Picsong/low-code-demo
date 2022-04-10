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
            <div flex="~ row basic-32" text="xs light-300" items="center" max-h-8 min-h-8 h="8" bg="dark-800"
                 border="b-1 dark-100">
              <button h-full p-l-2 p-r-2 hover:bg="dark-200"
                      :class="active==='template'?'bg-dark-200':''"
                      @click="active='template'"
              >
                {{ isUpdated1 ? '*' : '' }}template
              </button>
              <button h-full p-l-2 p-r-2 border="r-1 l-1 dark-100" hover:bg="dark-200"
                      :class="active==='script'?'bg-dark-200':''"
                      @click="active='script'"
              >
                {{ isUpdated2 ? '*' : '' }}script
              </button>
              <button h-full p-l-2 p-r-2 hover:bg="dark-200"
                      :class="active==='style'?'bg-dark-200':''"
                      @click="active='style'"
              >
                {{ isUpdated3 ? '*' : '' }}style
              </button>
              <button class="icon-btn !outline-none" h-full p-l-2 p-r-2 ml="auto" hover:bg="dark-200" @click="save">
                <div i-carbon-save title="全部保存"></div>
              </button>
            </div>
            <Editor v-show="active==='template'" v-model="vueState.html" language="html" :save="save1" style="flex:1"/>
            <Editor v-show="active==='script'" v-model="vueState.js" language="javascript" :save="save2"
                    style="flex:1"/>
            <Editor v-show="active==='style'" v-model="vueState.css" language="scss" :save="save3" style="flex:1"/>
          </section>
        </Pane>
      </Splitpanes>
    </Pane>
    <Pane>
      <Splitpanes horizontal>
        <Pane>
          <section class="render-json">
            <RenderComponent/>
          </section>
        </Pane>
        <Pane>
          <section class="render-vue">
            <RenderComponent is-custom/>
          </section>
        </Pane>
      </Splitpanes>
    </Pane>
  </Splitpanes>
</template>

<script setup lang="ts">
import {Splitpanes, Pane} from 'splitpanes'
import {useJsonStore, useVueStore} from '@/stores'

const jsonStore = useJsonStore()
const vueStore = useVueStore()

const json = $ref(jsonStore.json)
const active = $ref('template')
const vueState = reactive({
  html: vueStore.template,
  js: vueStore.script,
  css: vueStore.style
})
const isUpdated0 = computed(() => {
  return jsonStore.json !== json
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
  jsonStore.setJsonSchema(json)
}
const save1 = () => {
  vueStore.setTemplate(vueState.html)
}
const save2 = () => {
  vueStore.setScript(vueState.js)
}
const save3 = () => {
  vueStore.setStyle(vueState.css)
}
const save = () => {
  save1()
  save2()
  save3()
  console.log('保存成功')
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
