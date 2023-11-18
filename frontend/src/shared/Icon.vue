<template>
  <div class="icon">
    <Icons :icon="['fas', props.icon]" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  icon: string;
}>();
</script>

<style scoped lang="sass">
.icon
  @apply flex justify-center w-full p-2 items-center h-1/6
  height: 6%
</style>
