<template>
    <form v-on:submit.prevent="addItemToCart()">
        <div>
            <input v-model="item.quantity" type="number" value="1">
        </div>
        <div>
            <button type="submit">Add to cart</button>
        </div>
    </form>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from "vue-router"

export default {
    name: "AddToCardComponent",
    props: ["productId"],
    data() {
        return {
            router: useRouter(),
            item: reactive({
                productId: this.$props.productId,
                quantity: 1
            })
        }
    },
    methods: {
        async addItemToCart() {
            const response = await fetch("http://localhost:3000/cart/add", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(this.item)
            })

            console.log(await response.json())

            await this.router.push("/")
        }
    }
}
</script>