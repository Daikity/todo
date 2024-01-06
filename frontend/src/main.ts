import { createApp } from "vue";
import { createPinia } from "pinia";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import '@/app/assets/index.sass'
import { IconsLibs } from '@/app/utils'
import { Dialog } from "@/features";
import { Button, Icon, InputText, TextArea, InputPassword } from "@/shared";


import { Registration, Authorizations, Navbar, LeftMenu, Dish } from "@/widgets";

import App from "./app";
import api from "@/app/api";
import router from "@/app/router";

const app = createApp(App);

IconsLibs.forEach((icon) => {
    library.add(icon)
});

// libs
app.provide('$api', api)
app.component('Icons', FontAwesomeIcon)

// features
app.component('Dialog', Dialog)

// shared
app.component('InputText', InputText)
app.component('InputPassword', InputPassword)
app.component('TextArea', TextArea)
app.component('Button', Button)
app.component('Icon', Icon)

//widgets
app.component('Authorizations', Authorizations)
app.component('Registration', Registration)
app.component('LeftMenu', LeftMenu)
app.component('Navbar', Navbar)
app.component('Dish', Dish)

// app
app.use(createPinia());
app.use(router);

app.mount("#app");
