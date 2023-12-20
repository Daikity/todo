<script setup lang="ts">
import { ref, inject, provide } from "vue";
import type { AxiosStatic } from "axios";
import { useHolidaysStore } from "@/app/stores";
import Dish from "@/widgets/Dish.vue";
import type { Dishes } from "@/app/models/interfaces";

const api = inject<AxiosStatic>("$api");
const holidaysStore = useHolidaysStore();
const newTitle = ref<string>("");
const openDialog = ref<boolean>(false);
const openDialogAddDish = ref<boolean>(false);
const newDish = ref<Dishes>({} as Dishes);
const newDishValidate = ref<{ nameField: string; isValid: boolean }[]>([]);

const setHoliday = () => {
  if (newTitle.value === "") return;
  holidaysStore.setHoliday(newTitle.value);
  openDialog.value = false;
};

const addDish = (dish: Dishes) => {
  const isNotValid = newDishValidate.value.find((el) => !el.isValid);

  if (isNotValid) return;

  console.log(dish);
};

const checkNewDishValidate = (isValid: boolean, nameField: string) => {
  const haveChecker = newDishValidate.value.find(
    (el) => el.nameField === nameField
  );
  if (haveChecker) {
    haveChecker.isValid = isValid;
  } else {
    newDishValidate.value.push({
      isValid,
      nameField,
    });
  }
};

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
    <div class="p-3">
      <Button
        @click="openDialogAddDish = true"
        class="w-2"
        button-type="transparent"
        icon-name="plus"
      >
        Add a dish
      </Button>
      <Dish v-for="dish in holidaysStore.dishes" :dish="dish" />
      <div class="flex gap-3"></div>
    </div>
    <div>gifts</div>
    <div>leisure</div>
    <div>{{ String(holidaysStore.total) }}</div>

    <Dialog :isOpen="openDialog" @close="openDialog = false">
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

    <Dialog :isOpen="openDialogAddDish" @close="openDialogAddDish = false">
      <template #header>
        <span>Add the dish</span>
      </template>
      <template #default>
        <form @submit.prevent="addDish(newDish)">
          <InputText
            v-model="newDish.title"
            required
            @isValid="checkNewDishValidate($event, 'title')"
            labelText="Name"
            invalidText="Dish name is required"
          />
          <TextArea
            v-model="newDish.recept"
            required
            @isValid="checkNewDishValidate($event, 'recept')"
            labelText="Recipe"
            invalidText="Please write the recipe for the dish"
          />
        </form>
        <span>Ингридиенты</span>
      </template>
      <template #footer>
        <span>footer</span>
      </template>
    </Dialog>
  </div>
</template>

<style lang="scss"></style>
