<template>
  <div class="icon">
    <Icons :icon="['fas', 'gear']" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  size: number;
}>();
</script>

<style scoped lang="scss">
.icon {
  @apply flex justify-center w-full p-2 items-center;
  @apply border-t-neutral-800 border-t-2;
  @apply border-r-neutral-800 border-r-2;
  height: 6%;
}
</style>
