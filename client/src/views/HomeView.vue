<template>
    <HeaderComponent/>
    <p>Home</p>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import addr from "../../../addresses"

export default {
    name: "HomeView",
    components: {
        HeaderComponent
    }
}
</script>