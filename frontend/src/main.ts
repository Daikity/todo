import { createApp } from "vue";
import { createPinia } from "pinia";
import api from "@/entities/api";

import App from "./app";
import router from "./app/router";

import '@/app/assets/index.sass'

const app = createApp(App);
app.provide('$api', api)

app.use(createPinia());
app.use(router);

app.mount("#app");
