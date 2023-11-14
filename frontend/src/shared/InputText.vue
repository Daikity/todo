<template>
  <div>
    <div class="relative z-0">
      <input
        type="text"
        @focus="focus"
        aria-describedby="standard_error_help"
        :class="
          showInvalid
            ? 'border-red-600 dark:border-red-500 dark:focus:border-red-500 focus:border-red-600'
            : 'dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600'
        "
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white focus:outline-none focus:ring-0 peer border-gray-300"
        placeholder=" "
        v-model="value"
      />
      <label
        :class="
          showInvalid
            ? 'text-red-600 dark:text-red-500'
            : ' peer-focus:text-blue-600 peer-focus:dark:text-blue-500'
        "
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {{ props.placeholder }}
      </label>
    </div>
    <p
      v-if="showInvalid && invalidText !== ''"
      id="standard_error_help"
      class="mt-2 text-xs text-red-600 dark:text-red-400"
    >
      {{ invalidText }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, type Ref } from "vue";

interface Props {
  placeholder?: string;
  required?: boolean;
  modelValue: string;
  invalidText?: string;
}

const emit = defineEmits(["update:modelValue", "update:isValid"]);

const props = withDefaults(defineProps<Props>(), {
  required: false,
  placeholder: " ",
  invalidText: "",
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit("update:modelValue", value);
  },
});

const isValid = computed({
  get() {
    return String(value.value) !== "";
  },
  set(value: boolean) {
    emit("update:isValid", value);
  },
});

const showInvalid: Ref<boolean> = ref(false);

const focus = (): void => {
  if (props.required) {
    showInvalid.value = value.value === "";
  }
};

const check = () => {
  showInvalid.value = value.value === "";
};

watch(value, (val: string) => {
  if (props.required) {
    isValid.value = val !== "";
    showInvalid.value = value.value === "";
  }
});

defineExpose({ check });
</script>
