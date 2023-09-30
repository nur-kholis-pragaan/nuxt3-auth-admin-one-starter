export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token');
    // console.log('token', token.value, to.path);
    if (to.path != '/login') {
        if (!token.value) {
            return navigateTo('/login');
        }
    }

})