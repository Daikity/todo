<script setup lang="ts">
import { useRouter, useRoute, RouterLink } from "vue-router";

const router = useRouter();
const routes = useRouter().options.routes;
const route = useRoute();

const menuData = routes.filter((el) => el.name !== "home") as any;
const logout = () => {
  localStorage.clear();
  window.location.reload();
}
// const isActive = (path: string) => {
//   return route.path !== path;
// };
</script>

<template>
  <nav class="nav-bar">
    <div class="logo" @click="router.push('/')"></div>
    <ul class="nav-menu">
      <li v-for="rout in menuData">
        <RouterLink :to="rout.path">
          {{ rout.name }}
        </RouterLink>
      </li>
      <li>
        <a class="cursor-pointer" @click="logout">Log out</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav.nav-bar {
  @apply flex justify-between px-4 py-1;
  .logo {
    @apply w-10 h-10 bg-slate-800 rounded-lg cursor-pointer;
  }
  ul.nav-menu {
    @apply flex gap-2 2k:bottom-5;
    li {
      @apply px-2 py-1;
      a {
        @apply text-lg font-medium;
      }
    }
  }
}
</style>
