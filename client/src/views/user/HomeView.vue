<template>
    <HeaderComponent/>
    <p>Home</p>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import config from "../../../../config/index.js"

export default {
    name: "HomeView",
    components: {
        HeaderComponent
    },
    data() {
        return {
            server: `${config.SERVER_PROTOCOL}://${config.SERVER_DOMAIN}:${config.SERVER_PORT}`
        }
    }
}
</script>