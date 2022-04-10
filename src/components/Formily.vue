<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
  </FormProvider>
</template>

<script lang="ts">
import {Input, Button, InputNumber, Form, FormItem} from 'ant-design-vue'
import {createForm} from '@formily/core'
import {FormProvider, createSchemaField} from '@formily/vue'
import RenderComponent from "@/components/RenderComponent.vue"

const {SchemaField} = createSchemaField({
  components: {
    RenderComponent,Input, Button, InputNumber, Form, FormItem
  },
})
export default defineComponent({
  name: 'Formily',
  components: {
    SchemaField, FormProvider
  },
  props: {
    schema: {
      type: Object,
      default: () => ({})
    },
    formOptions: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      form: createForm(this.formOptions)
    }
  },
  created() {
    console.log('formily created',this)
  }
})
</script>

<style lang="scss" scoped>

</style>
