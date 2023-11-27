<script setup lang="ts">
import { ref, inject, provide } from "vue";
import type { AxiosStatic } from "axios";
import { useHolidaysStore } from "@/app/stores";
import { Button, Icon, InputText } from "@/shared";
import { Dialog, DropDown } from "@/features";
import Dish from "@/widgets/Dish.vue";

const api = inject<AxiosStatic>("$api");
const holidaysStore = useHolidaysStore();
const newTitle = ref<string>("");
const openDialog = ref<boolean>(false);

const setHoliday = () => {
  if (newTitle.value === "") return;
  holidaysStore.setHoliday(newTitle.value);
  openDialog.value = false;
};

console.log(holidaysStore.holiday);

// Birthday of the daughter
</script>

<template>
  <div class="flex flex-col gap-3">
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
    <div class="bg-gray-800 p-3">
      <Button class="w-2" button-type="transparent" icon-name="plus">
        Add a dish
      </Button>
      <Dish v-for="dish in holidaysStore.dishes" :dish="dish" />
    </div>
    <div>gifts</div>
    <div>leisure</div>
    <div>{{ String(holidaysStore.total) }}</div>

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

<style lang="scss">
$grid-gap: 10px;

.grid-container {
  display: grid;
  grid-template-columns: 50% 20% 20%; // Три столбца
  grid-template-rows: 1fr auto auto; // Три строки
  grid-gap: $grid-gap; // Пространство между ячейками
  height: 100%; // Высота контейнера

  .grid-item {
    border: 1px solid #ccc;
    padding: 20px;
    height: 100%;
  }

  .grid-item:first-child {
    grid-column: 1; // Первый элемент занимает первый столбец
    @apply flex items-center justify-center;
  }

  .grid-item:not(:first-child) {
    grid-column: span 2; // Остальные элементы располагаются справа по контенту
  }
}
</style>
