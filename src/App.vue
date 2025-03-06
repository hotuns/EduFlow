<template>
  <n-config-provider>
    <n-dialog-provider>
      <n-message-provider>
        <n-modal-provider>
          <Layout />
        </n-modal-provider>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import Layout from './layout.vue';
</script>


<style scoped>
.n-layout-sider {
  position: relative;
}
</style>
