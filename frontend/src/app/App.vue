<script setup lang="ts">
import { RouterView } from "vue-router";
import { computed, onMounted, ref } from "vue";

onMounted(() => {});

const access_token = localStorage.getItem("access_token");
const sessionExpiresAt = localStorage.getItem("expires_at");

const checkSessionExpires = computed<Boolean>(() => {
  return Math.round(Date.now() / 1000) < Math.round(Date.parse(sessionExpiresAt as string) / 1000)
})

const authOrReg = ref<string>('');
</script>

<template>
  <div class="page auth" v-if="!access_token || !checkSessionExpires">
    <Authorizations v-if="authOrReg === 'signIn'" />
    <Registration v-if="authOrReg === 'signUp'" />
    <div class="authType">
      <button @click="authOrReg = 'signIn'">Sign In</button>
      <button @click="authOrReg = 'signUp'">Sign Up</button>
    </div>
  </div>
  <div class="page" v-else>
    <LeftMenu />
    <div class="content">
      <header>
        <Navbar />
      </header>
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  &.auth{
    @apply justify-center flex-col items-center gap-5;
  }
  @apply flex gap-2 h-screen bg-zinc-900 text-slate-50 sm:gap-0 md:gap-0;
  .authType {
    @apply flex gap-2;
  }
  .content {
    @apply w-full;
    main {
      @apply p-4;
    }
  }
}
</style>
