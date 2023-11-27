<script setup lang="ts">
import { Icon } from "@/shared";
import { ref } from "vue";

const isOpen = ref<boolean>(false);
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex gap-2 items-center w-full">
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
      <div class="w-full outer" v-if="isOpen">
        <slot name="body" />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
