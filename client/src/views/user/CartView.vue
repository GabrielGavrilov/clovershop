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
import { credentialFetchRequestToServer } from "@/modules/FetchModule.js"
import { formatPrice } from "@/modules/CommonModule"
import { useRouter } from "vue-router"
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
            router: useRouter(),
            items: [],
            cartSubtotal: 0,
        }
    },
    async mounted() {
        const cartItems = await credentialFetchRequestToServer("GET", "/cart/")

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
            return await credentialFetchRequestToServer("GET", `/api/product/${productId}`)
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