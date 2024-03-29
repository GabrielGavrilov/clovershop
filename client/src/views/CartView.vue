<template>
    <HeaderComponent/>
    <h2>Cart</h2>
    <div v-for="item in items">
        <CartItemComponent v-bind:item="item"/>
    </div>
    <p>${{ formatPrice(cartSubtotal) }}</p>
    <a v-bind:href="$router.resolve({name: 'Checkout'}).href">
        <button>Checkout</button>
    </a>
</template>

<script>
import addr from "../../../addresses.js"
import HeaderComponent from '@/components/HeaderComponent.vue'
import CartItemComponent from '@/components/CartItemComponent.vue'

export default {
    name: "CartView",
    components: {
        HeaderComponent,
        CartItemComponent
    },
    data() {
        return {
            items: [],
            cartSubtotal: 0
        }
    },
    async mounted() {
        const response = await fetch(`${addr.SERVER_ADDRESS}/cart/`, {
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        })
        const cartItems = await response.json()
        
        // Check if cart even exists
        for(let i = 0; i < cartItems.length; i++) {
            const product = await this.getProductInformation(cartItems[i].productId);
            const quantity = cartItems[i].quantity;

            const cartItem = {
                product: product,
                quantity: quantity
            }

            this.cartSubtotal += (product.productPrice * quantity)
            this.items.push(cartItem)
        }
    },
    methods: {
        async getProductInformation(productId) {
            const response = await fetch(`${addr.SERVER_ADDRESS}/api/product/${productId}`, {
                headers: {"Content-Type": "application/json"}
            })

            const product = await response.json()
            return product
        },
        formatPrice(price) {
            const priceString = String(price)
            const formattedPrice = priceString.substring(0, priceString.length - 2) + "." + priceString.substring(priceString.length - 2)
            return formattedPrice
        }
    }
}
</script>