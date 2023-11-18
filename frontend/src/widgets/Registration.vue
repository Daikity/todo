<script setup lang="ts">
import { ref, watch } from "vue";
import { InputText } from "@/shared";
import { useRegistrationStore } from "@/app/stores";
import type { ApiResult } from "@/app/models/interfaces";

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
    <InputText
      v-model="login"
      :status="loginStatus.status"
      label-text="Login"
      :invalidText="loginStatus.message"
    />
    <InputText
      v-model="password"
      :status="passwordStatus.status"
      label-text="Password"
      :invalidText="passwordStatus.message"
    />
    <button status="success">send</button>
  </form>
</template>

<style lang="sass"></style>
