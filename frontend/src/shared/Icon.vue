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
  @apply flex justify-center p-2 items-center
</style>
