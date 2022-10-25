<template>
  <div class="app">
    <Editor v-model="state" :formData="formData"></Editor>
  </div>
</template>

<script>
import { ref, provide } from 'vue';
import data from './data.json';
import Editor from './packages/editor';
import { registerConfig as config } from './utils/editor-config';
export default {
  components: {
    Editor
  },
  setup() {
    var data1 = localStorage.getItem("data");
    var flag = localStorage.getItem("flag");
    var obj = JSON.parse(data1);
    if (flag == null && obj == null) {
      const state = ref(data);
      console.log(state)
      provide('config', config); // 将组件的配置直接传值
      const formData = ref({
        username: 'hahaha',
        password: 123456,
      })

      return {
        state,
        formData
      }
    }
    if (flag != null && obj != null) {
      const data1 = Object.assign(data, obj)
      const state = ref(data1);
      console.log(state)
      provide('config', config); // 将组件的配置直接传值
      const formData = ref({
        username: 'hahaha',
        password: 123456,
      })

      return {
        state,
        formData
      }
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
