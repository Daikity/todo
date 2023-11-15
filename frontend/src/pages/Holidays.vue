<script setup lang="ts">
import { ref, inject } from "vue";
import { Registration } from "@/widgets/registration";
// const login = ref("");

const api = inject("$api");
</script>

<template>
  <div class="w-80"></div>
</template>

<style lang="scss">
.input-text {
  @apply flex flex-col;
}
</style>
