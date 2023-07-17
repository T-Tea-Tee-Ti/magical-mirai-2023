import drag from 'v-drag';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(drag)
})