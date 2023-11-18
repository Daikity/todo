<script setup lang="ts">
import { ref, inject } from "vue";
import { Registration, Authorizations } from "@/widgets";
// const login = ref("");

const api = inject("$api");
</script>

<template>
  <div class="w-80">
    <Registration />
  </div>
</template>

<style lang="sass"></style>
