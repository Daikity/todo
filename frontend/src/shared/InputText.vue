<template>
  <div class="form-input">
    <div class="input-text" :label-position="labelPosition">
      <label :visible="visibleLabel" v-if="props.labelText">
        {{ props.labelText }}
      </label>
      <input
        type="text"
        name="login"
        @blur="blur"
        v-model="value"
        :status="status"
        :placeholder="props.placeholder"
      />
    </div>
    <span
      :type="status"
      :visible="visibleErrorMessage"
      v-if="(props.invalidText && status) || 'error'"
      >{{ props.invalidText }}</span
    >
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, watchEffect } from "vue";

interface Props {
  modelValue: string | number;
  required?: boolean;
  status?: string;
  labelText?: string;
  placeholder?: string;
  invalidText?: string;
  labelPosition?: string;
  type?: "string" | "number";
}

const emit = defineEmits(["update:modelValue", "update:isValid", "blur"]);

const props = withDefaults(defineProps<Props>(), {
  required: false,
  type: "string",
  placeholder: "",
  invalidText: "",
  status: "",
  labelPosition: "top",
});

const status = ref<string>(props.status);

const visibleLabel = computed<string>(() =>
  props.labelText ? "show" : "hide"
);

const visibleErrorMessage = computed<string>(() =>
  props.labelText ? "show" : "hide"
);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value: string | number) {
    if (props.type === "number") {
      const regex = /\D/g;
      emit("update:modelValue", String(value).replace(regex, ""));
    } else emit("update:modelValue", value);
  },
});

const blur = (): void => {
  if (props.required) {
    status.value = value.value === "" ? "error" : "success";
  }
  emit("blur");
};

watchEffect(() => {
  if (props.status) {
    status.value = props.status;
  }
});

watch(value, (val: string | number) => {
  if (props.required) {
    status.value = !Boolean(val) ? "error" : "success";
  }
});
</script>

<style lang="sass" scoped>
.form-input
  @apply flex p-1 flex-col
  span[type=""]
    display: none
  span[type="success"]
    display: none
  .input-text
    @apply gap-1
    &[label-position="top"]
      @apply flex flex-col
    &[label-position="left"]
      @apply flex
</style>
