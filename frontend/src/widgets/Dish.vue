<script setup lang="ts">
import type { Dishes } from "@/app/models/interfaces";
import { useHolidaysStore } from "@/app/stores";
import { Button, InputText } from "@/shared";
import { DropDown } from "@/features";
import { ref } from "vue";

interface Props {
  dish: Dishes;
}

const holidaysStore = useHolidaysStore();
const props = defineProps<Props>();

const inputQuantityActive = ref({
  id: "",
  show: false,
});

const showInputQuantity = (id: string) => {
  inputQuantityActive.value = {
    id: id,
    show: true,
  };
};
const clearInputQuantity = () => {
  inputQuantityActive.value = {
    id: "",
    show: false,
  };
};

const getReceptWeight = (id: string, products: any[]) => {
  return products.find((el) => el.productId === id).weight || 0;
};

const getReceptQuantity = (id: string, products: any[]) => {
  return products.find((el) => el.productId === id).quantity || 0;
};
</script>

<template>
  <div class="flex flex-col gap-1">
    <DropDown>
      <template #header>
        <div class="flex justify-between w-full">
          <div class="flex gap-2 items-center">
            <span
              v-if="
                (inputQuantityActive.id === props.dish.id &&
                  !inputQuantityActive.show) ||
                inputQuantityActive.id === ''
              "
              @click="showInputQuantity(props.dish.id)"
              class="cursor-pointer"
            >
              {{ props.dish.quantity }}
            </span>
            <InputText
              v-if="
                inputQuantityActive.id === props.dish.id &&
                inputQuantityActive.show
              "
              v-model="props.dish.quantity"
              @blur="clearInputQuantity"
              type="number"
            />
            <span
              >-&nbsp; {{ props.dish.title }}: {{ props.dish.cost }} руб</span
            >
          </div>
          <Button
            @click="holidaysStore.setQuantity(props.dish.id, 1)"
            class="p-0"
            button-type="transparent"
            icon-name="plus"
          >
            More servings
          </Button>
        </div>
      </template>
      <template #body>
        <div class="grid-container w-full">
          <div
            class="grid-item"
            :style="`grid-row: span ${props.dish.receptProduct?.length};`"
          >
            {{ props.dish.recept }}
          </div>
          <div
            class="grid-item"
            v-for="receptProduct in props.dish.receptProduct"
          >
            {{ receptProduct.title }}:
            {{
              getReceptWeight(receptProduct.id, props.dish.products) *
              props.dish.quantity
            }}
            гм ({{ getReceptQuantity(receptProduct.id, props.dish.products) }}
            шт)
          </div>
        </div>
      </template>
    </DropDown>
  </div>
</template>

<style lang="scss">
.input-text {
  @apply flex flex-col;
}
</style>
