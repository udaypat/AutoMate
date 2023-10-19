import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// import * as VueGoogleMaps from 'vue2-google-maps';
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

VueGoogleMaps.load({
    key: 'AIzaSyDkGNFruQqakgT_on4HEhdbLStuLvEAd3E',
    libraries: 'places' // You can add more libraries if needed
});
app.use(VueGoogleMaps)

app.mount('#app')

