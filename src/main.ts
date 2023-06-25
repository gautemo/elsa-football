import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js')
  })
}