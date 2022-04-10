<template>
  <div>渲染器{{ renderId }}</div>
</template>

<script lang="ts">
export default defineComponent({
  name: "Renderer",
  data() {
    return {
      renderId: ""
    };
  },
  created() {
    this.renderId = this.$route.params.id;
  }
})
</script>

<style scoped>

</style>
