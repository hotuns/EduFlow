<template>
  <n-config-provider :theme="theme">

    <n-message-provider>
      <n-modal-provider>
        <Layout v-if="userStore.currentUser" />
        <Login v-else />
      </n-modal-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import Layout from './layout.vue';
import { useUserStore } from './store';
import { darkTheme } from 'naive-ui'


const userStore = useUserStore();
const theme = computed(() => {
  return userStore.theme === 'dark' ? darkTheme : null
})

</script>


<style scoped>
.n-layout-sider {
  position: relative;
}
</style>
