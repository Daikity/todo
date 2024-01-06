<script setup lang="ts">
interface Props {
  iconPosition?: "left" | "right";
  iconName?: string;
  buttonType?: string;
  buttonSize?: string;
  status?: "success" | "warning" | "danger";
}

const emit = defineEmits(["click"]);

const props = withDefaults(defineProps<Props>(), {
  iconPosition: "left",
  buttonSize: "small",
});
</script>

<template>
  <button
    @click="emit('click')"
    class="w-2"
    :status="props.status"
    :button-size="props.buttonSize"
    :button-type="props.buttonType"
  >
    <Icon
      v-if="props.iconPosition === 'left' && props.iconName"
      :icon="props.iconName"
    />
    <slot></slot>
    <Icon
      v-if="props.iconPosition === 'right' && props.iconName"
      :icon="props.iconName"
    />
  </button>
</template>

<style lang="scss">
.input-text {
  @apply flex flex-col;
}
</style>
