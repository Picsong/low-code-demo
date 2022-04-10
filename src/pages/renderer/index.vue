<template>
  <RenderComponent :queryId="queryId"/>
</template>

<script lang="ts">
export default defineComponent({
  name: "Renderer",
  data() {
    return {
      queryId: ""
    };
  },
  created() {
    this.queryId = this.$route.params.id;
  }
})
</script>

<style scoped>

</style>
