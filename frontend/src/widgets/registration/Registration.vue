<script setup lang="ts">
import { ref, watch, inject } from "vue";
import type { ApiResult } from "@/shared/models/interfaces";
import api from "@/entities/api";
import { useRegistrationStore } from "@/widgets/registration/api";

const registrationStore = useRegistrationStore();
const login = ref("");
const password = ref("");

const loginStatus = ref({
  status: "",
  message: "",
});

const passwordStatus = ref({
  status: "",
  message: "",
});

const createUser = () => {
  try {
    const createUser = registrationStore.createUser(
      login.value,
      password.value
    );

    createUser
      .then((data) => {
        checkStatus(data.code, data.field, data.message);
      })
      .catch((error: ApiResult) => {
        checkStatus(error.code, error.field, error.message);
      });
  } catch (error) {
    console.log(error);
  }
};

const checkStatus = (code: number, field: string, message: string): void => {
  if (code === 200) return;
  switch (field) {
    case "password":
      passwordStatus.value.status = "error";
      passwordStatus.value.message = message;
      break;
    case "login":
      loginStatus.value.status = "error";
      loginStatus.value.message = message;
      break;
    default:
      console.table([{ code, field, message }]);
      break;
  }
};

watch(login, () => {
  if (Boolean(loginStatus.value.status)) {
    loginStatus.value = {
      status: "",
      message: "",
    };
  }
});

watch(password, () => {
  if (Boolean(passwordStatus.value.status)) {
    passwordStatus.value = {
      status: "",
      message: "",
    };
  }
});
</script>

<template>
  <form @submit.prevent="createUser">
    <div class="input-text">
      <input
        type="text"
        :status="loginStatus.status"
        v-model="login"
        name="login"
        placeholder="test"
      />
      <span :type="loginStatus.status">{{ loginStatus.message }}</span>
    </div>
    <div class="input-text">
      <input
        type="password"
        :status="passwordStatus.status"
        v-model="password"
        name="password"
      />
      <span :type="passwordStatus.status">{{ passwordStatus.message }}</span>
    </div>
    <button status="success">send</button>
  </form>
</template>

<style lang="scss">
.input-text {
  @apply flex flex-col;
}
</style>
