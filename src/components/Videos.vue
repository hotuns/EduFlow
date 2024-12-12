<template>
    <div>
        videos
    </div>
</template>

<script setup lang="ts">
import { videos } from '../datas'

const emit = defineEmits(['next'])

const currentVideo = ref(0)
</script>

<style scoped></style>
