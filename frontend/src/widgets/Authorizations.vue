<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "axios";
import { type ApiResult } from "@/shared/models/interfaces"

const login = ref("");
const password = ref("");

const loginStatus = ref({
  status: "",
  message: ""
})

const passwordStatus = ref({
  status: "",
  message: ""
})


const authorizations = () => {
  axios
    .post("api/user/login", {
      login: login.value.toLowerCase(),
      password: password.value,
    })
    .then(({ data }) => {
      console.log(data);
    })
    .catch(({ response }) => {
      const apiResult: ApiResult = response.data as ApiResult;
      switch (apiResult.field) {
        case "password":
          passwordStatus.value.status = "error"
          passwordStatus.value.message = apiResult.message
          break;
        case "login":
          loginStatus.value.status = "error"
          loginStatus.value.message = apiResult.message
          break;
        default:
          break;
      }
    });
};

watch(login, () => {
    if (Boolean(loginStatus.value.status)) {
        loginStatus.value = {
            status: "",
            message: ""
        }
    }
})

watch(password, () => {
    if (Boolean(passwordStatus.value.status)) {
        passwordStatus.value = {
            status: "",
            message: ""
        }
    }
})
</script>

<template>
  <template>
    <form @submit.prevent="authorizations">
      <div class="input-text">
        <input
          type="text"
          :status="loginStatus.status"
          v-model="login"
          name="login"
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
      <button status="success">Login</button>
    </form>
  </template>
</template>

<style lang="scss"></style>
