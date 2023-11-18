<script setup lang="ts">
import { ref, inject } from "vue";
import type { AxiosStatic } from "axios";
import { useHolidaysStore } from "@/app/stores";
import { InputText } from "@/shared";

const api = inject<AxiosStatic>("$api");
const holidaysStore = useHolidaysStore();
const newTitle = ref<string>("");

// Birthday of the daughter
</script>

<template>
  <div class="w-80">
    <div>
      <div v-if="holidaysStore.titleHoliday">
        {{ holidaysStore.titleHoliday }}
      </div>
      <form @submit.prevent="holidaysStore.setHoliday(newTitle)" v-else>
        <span></span>
        <InputText
          v-model="newTitle"
          required
          label-text="Enter the name of your holiday"
          invalidText="holiday name is required"
        />
      </form>
    </div>
    <div>
      <div v-for="owner in holidaysStore.owners"></div>
    </div>
    <div>the guests</div>
    <div>drinks</div>
    <div>meal</div>
    <div>gifts</div>
    <div>leisure</div>
    <div>total cost</div>
  </div>
</template>

<style lang="scss"></style>
