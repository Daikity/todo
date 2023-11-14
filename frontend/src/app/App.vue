<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import Navbar from "@/widgets/navbar";
import LeftMenu from "@/widgets/leftMenu";

onMounted(() => {});
</script>

<template>
  <div class="page">
    <LeftMenu />
    <div class="content">
      <header><Navbar /></header>
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  @apply flex gap-2 h-screen bg-zinc-900 text-slate-50 sm:gap-0 md:gap-0;
  .content {
    @apply w-full;
    main {
      @apply p-4;
    }
  }
}
</style>
