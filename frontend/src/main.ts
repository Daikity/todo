import { createApp } from "vue";
import { createPinia } from "pinia";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import '@/app/assets/index.sass'
import { IconsLibs } from '@/app/utils'

import App from "./app";
import api from "@/app/api";
import router from "./app/router";

const app = createApp(App);

IconsLibs.forEach((icon) => {
    library.add(icon)
});

app.provide('$api', api)
app.component('Icons', FontAwesomeIcon)

app.use(createPinia());
app.use(router);

app.mount("#app");
