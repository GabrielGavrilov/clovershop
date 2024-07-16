<template>
    <HeaderComponent/>
    <main>
        <div>
            <div>
                <div v-for="item in items">
                    <CartItemComponent v-bind:item="item"/>
                </div>
                <div>
                    <div>
                        <p>${{ price(cartSubtotal) }}</p>
                    </div>
                    <div>
                        <a @click="resetCart()"><p>Reset cart</p></a>
                    </div>
                </div>
            </div>
    
            <div>
                <div>
                    <p>${{ price(cartSubtotal) }}</p>
                </div>
                <div>
                    <p>Taxes and shipping calculated at checkout</p>
                </div>
                <div>
                    <a v-bind:href="$router.resolve({name: 'Checkout'}).href">
                        <button>Checkout</button>
                    </a>
                </div>
            </div>      
        </div>
    </main>
</template>

<script>
import { fetchRequestToServer, credentialFetchRequestToServer } from "@/common/fetch.js"
import { formatPrice } from "@/common/functions.js"
import { useRouter } from "vue-router"
import HeaderComponent from '@/components/Header.vue'
import CartItemComponent from '@/components/CartItem.vue'

export default {
    name: "CartView",
    components: {
        HeaderComponent,
        CartItemComponent
    },
    data() {
        return {
            router: useRouter(),
            items: [],
            cartSubtotal: 0,
        }
    },
    async mounted() {
        const cart = await credentialFetchRequestToServer("GET", "/cart/")
        const cartItems = cart.data

        for(let i = 0; i < cartItems.length; i++) {
            const product = await this.getProductInformation(cartItems[i].productId);
            const quantity = cartItems[i].quantity;

            const cartItem = {
                product: product,
                quantity: quantity
            }

            this.items.push(cartItem)
            this.cartSubtotal += (product.productPrice * quantity)
        }
    },
    methods: {
        async getProductInformation(productId) {
            return (await fetchRequestToServer("GET", `/api/product/${productId}`)).data
        },
        async resetCart() {
            const cartResponse = await credentialFetchRequestToServer("POST", "/cart/reset")

            if(cartResponse.status == 200)
                await this.router.go()
        },
        price: formatPrice
    }
}
</script>