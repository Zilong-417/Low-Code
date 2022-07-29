<template>
  <div class="app">
    <editor v-model="state"></editor>
  </div>
</template>

<script>
import data from './data.json'//数据源
import { ref, provide } from 'vue'
import Editor from './packages/editor'
import { registerConfig as config } from './utils/editor-config'

export default {
  components: {
    Editor
  },
  setup() {
    const state = ref(data);
    provide('config', config)
    return {
      state
    }
  }
}
</script>

<style lang="scss">
.app {
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
}
</style>
