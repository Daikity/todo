<script setup lang="ts">
import Icon from "@/shared/Icon.vue";
import { ref, watchEffect } from "vue";

interface Props {
  isNoCloseBtn?: boolean;
  isOpen: boolean;
}

const emit = defineEmits(["close"]);

const props = withDefaults(defineProps<Props>(), {
  isNoCloseBtn: false,
});

const showBlocks = ref<boolean>(false);

const close = () => {
  setTimeout(() => {
    emit("close");
  }, 20);
};

watchEffect(() => {
  if (!props.isOpen) {
    showBlocks.value = false;
    setTimeout(() => {
      emit("close");
    }, 20);
  } else {
    showBlocks.value = true;
  }
});
</script>

<template>
  <div class="dialog" :class="{ show: showBlocks }" :show="showBlocks">
    <div class="content" :show="showBlocks">
      <header>
        <div>
          <slot name="header">
            header
          </slot>
        </div>
        <button
          v-if="!props.isNoCloseBtn"
          button-type="transparent"
          @click="close"
        >
          <Icon icon="xmark" />
        </button>
      </header>
      <main>
        <div>
          <slot>
            main
          </slot>
        </div>
      </main>
      <footer>
        <div>
          <slot name="footer">
            footer
          </slot>
        </div>
      </footer>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.dialog
    &.show
        @apply flex
    height: 100vh
    display: none
    background: #0006
    &[show="true"]
        animation: show 0.1s
    &[show="false"]
        animation: hide 0.2s
    @apply absolute top-0 left-0 w-full
    @apply justify-center items-center
    .content
        &[show="true"]
            animation: show-content 0.1s
        &[show="false"]
            header
                div
                    display: none
            main
                div
                    display: none
            footer
                div
                    display: none
            animation: hide-content 0.2s
        animation: show-content 0.1s
        @apply w-7/12
        header
            @apply flex justify-between items-center py-1 pl-5 pr-1
            @apply text-slate-100 bg-blue-500 rounded-t-xl
        main
            @apply text-emerald-600 bg-white px-5 py-3
        footer
            @apply text-emerald-600 bg-white px-5 py-3 rounded-b-xl

@keyframes show
    0%
        @apply bg-transparent
    100%
        background: #0006
@keyframes hide
    0%
        background: #0006
    100%
        @apply bg-transparent

@keyframes show-content
    0%
        @apply w-0
    100%
        @apply w-7/12

@keyframes hide-content
    0%
        @apply w-7/12
    100%
        @apply w-0
</style>
