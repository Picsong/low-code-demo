<template>
  <div ref="editorRef"></div>
</template>

<script lang="ts">
import {ref, PropType, defineComponent, onMounted} from "vue"
import loader from "@monaco-editor/loader"
import {editor} from "monaco-editor"

export default defineComponent({
  name: "Editor",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "javascript",
    },
    save: {
      type: Function,
      default: () => {
      },
    },
    otherOptions: {
      type: Object as PropType<editor.IStandaloneEditorConstructionOptions>,
      default: () => ({
        minimap: {
          enabled: false, // 关闭小地图
        },
        automaticLayout: true, // 自适应宽高
        // wordWrap: "on", // 代码超出换行
        theme: "vs-dark", // 主题
        backgroundColor: "rgba(12, 12, 12, 1)", // 背景色
      }),
    },
  },
  emits: ["update:modelValue", "change", "blur"],
  setup(props, {emit}) {
    const editorRef = ref()
    let monacoEditor: editor.IStandaloneCodeEditor
    const getEditor = () => monacoEditor

    onMounted(async () => {
      const res = await loader.init().catch(console.log)
      if (res) {
        monacoEditor = res.editor.create(editorRef.value, {
          language: props.language,
          value: props.modelValue,
          ...props.otherOptions,
        })
        // 监听编辑器变化
        monacoEditor.onDidChangeModelContent(e => {
          console.log("onDidChangeModelContent")
          const value = monacoEditor.getValue()
          emit("update:modelValue", value)
          emit("change", value, e)
        })
        // 监听编辑器失焦
        monacoEditor.onDidBlurEditorText(() => {
          console.log("onDidBlurEditorText")
          emit("blur")
        })
        // 注册键盘事件（⌘ + s）
        useEventListener(editorRef.value, "keydown", e => {
          if (e.metaKey) {
            if (e.key === "s") {
              e.preventDefault()
              props.save()
            }
          }
        })
      }
    })

    return {
      editorRef,
      getEditor,
    }
  },
})
</script>

<style lang="scss" scoped></style>
