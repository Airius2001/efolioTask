// import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});


import { createApp } from 'vue'
import App from './App.vue'


// import './style.css'

createApp(App).mount('#app')
