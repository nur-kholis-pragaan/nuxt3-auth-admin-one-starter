import Swal from "sweetalert2/dist/sweetalert2.all";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('swal', Swal)
})
