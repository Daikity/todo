<script setup lang="ts">
import { ref } from "vue";
import { AddIcon, MenuFooterIcon } from "./icons";

const iconSize: number = 30;

const test = ref("");
</script>

<template>
  <div class="left-menu">
    <div class="phone">
      <AddIcon :size="iconSize" />
      <div class="menu">
        left-menu-phone
      </div>
      <MenuFooterIcon :size="iconSize" />
    </div>
    <div class="screen">
      left-menu-screen
    </div>
  </div>
</template>

<style scoped lang="scss">
.left-menu {
  .phone {
    @apply sm:max-w-screen-sm md:max-w-screen-sm;
    @apply hd:hidden full-hd:hidden 2k:hidden;
    @apply flex-col justify-between h-screen;
    .menu {
      @apply border-r-neutral-800 border-r-2 flex-col gap-1;
      height: 100% - 12%;
    }
  }
  .screen {
    @apply sm:hidden md:hidden hd:flex full-hd:flex 2k:flex;
    @apply w-60 p-4;
    @apply border-r-neutral-800 border-r-2 h-full flex-col gap-1;
  }
}
</style>
