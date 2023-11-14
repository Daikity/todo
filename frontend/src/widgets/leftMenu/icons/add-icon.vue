<template>
  <div class="icon">
    <svg-icon type="mdi" :path="mdiPlus" :size="props.size"></svg-icon>
  </div>
</template>

<script lang="ts" setup>
import { mdiPlus } from "@mdi/js";

const props = defineProps<{
  size: number;
}>();
</script>

<style scoped lang="scss">
.icon {
  @apply flex justify-center w-full p-2 items-center h-1/6;
  @apply border-b-neutral-800 border-b-2;
  @apply border-r-neutral-800 border-r-2;
  height: 6%;
}
</style>
