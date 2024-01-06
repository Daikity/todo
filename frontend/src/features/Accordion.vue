<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref<boolean>(false);
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="header">
      <Icon
        v-if="!isOpen"
        @click="isOpen = true"
        class="cursor-pointer"
        icon="chevron-down"
      />
      <Icon
        class="cursor-pointer"
        icon="chevron-up"
        v-if="isOpen"
        @click="isOpen = false"
      />
      <slot name="header" />
    </div>
    <Transition :duration="100">
      <div class="w-full" v-if="isOpen">
        <slot name="body" />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.header {
  @apply flex gap-2 items-center w-full p-2;
  @apply rounded-tl-md rounded-tr-md border-b-2 border-slate-600;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
