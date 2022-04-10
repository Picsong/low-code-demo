<template>
  <router-view/>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
onErrorCaptured((err, instance) => {
  console.log(err, instance)
  return false
})
</script>
