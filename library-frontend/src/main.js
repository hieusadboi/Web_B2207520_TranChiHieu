
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import router from "./router";

const app = createApp(App);
const pinia = createPinia();


app.use(pinia).use(router).mount("#app");
