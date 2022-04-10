<template>
  <component :is="name"></component>
</template>

<script setup lang="ts">
import useVueScoped from "@hooks/useVueScoped";
import {useJsonStore, useVueStore} from '@/stores'

const props = defineProps<{
  isCustom?: boolean;
}>()

const name = ref()
const oldId = ref<string>()
const JsonStore = useJsonStore()
const VueStore = useVueStore()

const render = () => {
  const id = `data-ps-${Math.random().toString(36).slice(2, 9)}`;
  const {templateTransform, createStyleToHead} = useVueScoped(id)
  if (!props.isCustom) {
    const json = JSON.parse(JsonStore.json)
    name.value = json.name
  } else {
    let options = {
      template: templateTransform(VueStore.template),
    }
    const vue_script = Function(VueStore.script!.replace('export default', 'return')).call(null)
    if (typeof vue_script === 'function') {
      options = vue_script
    } else {
      options = {
        ...options,
        ...vue_script,
      }
    }
    if (VueStore.style) {
      createStyleToHead(VueStore.style, oldId)
    }
    name.value = defineComponent(options)
  }
}
render()

JsonStore.$subscribe(() => {
  console.log('JsonStore changed')
  render()
})
VueStore.$subscribe(() => {
  console.log('VueStore changed')
  render()
})
</script>

<style scoped>

</style>
