<script setup lang="ts">
import { ref, inject, provide } from "vue";
import type { AxiosStatic } from "axios";
import { useHolidaysStore } from "@/app/stores";
import { Icon, InputText } from "@/shared";
import { Dialog } from "@/features";

const api = inject<AxiosStatic>("$api");
const holidaysStore = useHolidaysStore();
const newTitle = ref<string>("");
const openDialog = ref<boolean>(false);

const setHoliday = () => {
  if (newTitle.value === "") return;
  holidaysStore.setHoliday(newTitle.value);
  openDialog.value = false;
};
// Birthday of the daughter
</script>

<template>
  <div>
    <div class="w-full flex justify-center" v-if="holidaysStore.titleHoliday">
      <span class="text-2xl font-semibold">
        ~ {{ holidaysStore.titleHoliday }} ~
      </span>
    </div>
    <button v-else class="w-2" button-size="small" @click="openDialog = true">
      <Icon icon="plus" />
      Add name holiday
    </button>
    <div>
      <div v-for="owner in holidaysStore.owners"></div>
    </div>
    <div>the guests</div>
    <div>drinks</div>
    <div>meal</div>
    <div>gifts</div>
    <div>leisure</div>
    <div>total cost</div>

    <Dialog :is-open="openDialog" @close="openDialog = false">
      <template #header>
        <span>Enter the name of your holiday</span>
      </template>
      <template #default>
        <form @submit.prevent="setHoliday">
          <InputText
            v-model="newTitle"
            required
            invalidText="Holiday name is required"
          />
        </form>
      </template>
    </Dialog>
  </div>
</template>

<style lang="scss"></style>
