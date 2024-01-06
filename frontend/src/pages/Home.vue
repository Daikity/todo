<script setup lang="ts">
import { ref, inject } from "vue";

const api = inject("$api");
</script>

<template>
  <div class="w-80">
    <Authorizations />
  </div>
</template>

<style lang="sass"></style>
