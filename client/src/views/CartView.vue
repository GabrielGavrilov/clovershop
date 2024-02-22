<template>
    <HeaderComponent/>
    <h2>Cart</h2>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'

export default {
    name: "CartView",
    components: {
        HeaderComponent
    },
    data() {
        return {
            cart: undefined
        }
    },
    async mounted() {
        const response = await fetch("http://localhost:3000/cart/", {
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        })

        this.cart = await response.json()
        console.log(this.cart)
    }
}
</script>