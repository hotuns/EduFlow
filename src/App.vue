<template>
  <n-message-provider>
    <n-modal-provider>
      <Layout v-if="userStore.currentUser" />
      <Login v-else />
    </n-modal-provider>
  </n-message-provider>
</template>

<script setup lang="ts">
import Layout from './layout.vue';
import { useUserStore } from './store';

const userStore = useUserStore();
</script>


<style scoped>
.n-layout-sider {
  position: relative;
}
</style>
