<template>
  <div class="page-layout">
    <div class="page-layout__header">
      <Formily :schema="schema" :formOptions="formOptions"/>
    </div>
    <div class="page-layout__toolbar">
      <template v-for="btn in buttons">
        <Button v-bind="btn" v-on:[btn.eventName]="btn.handler">{{ btn.text }}</Button>
      </template>
    </div>
    <div class="page-layout__content">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import {Button} from 'ant-design-vue'

export default defineComponent({
  name: "PageLayout",
  components: {Button},
  props: ['schema', 'formOptions', 'buttons', 'tableConfig'],
  created() {
    console.log('PageLayout created', this)
  }
})
</script>

<style lang="scss" scoped>
.page-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  background-color: #121212;
}
</style>
