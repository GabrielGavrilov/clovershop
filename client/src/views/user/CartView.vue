<template>
    <HeaderComponent/>
    <main>
        <div class="cart-content">
            <div class="cart-product-items-content">
                <div class="cart-products-header">PRODUCTS</div>
                <div class="light-line"></div>
                <div v-for="item in items">
                    <CartItemComponent v-bind:item="item"/>
                </div>
                <div class="light-line"></div>
                <div class="cart-summary">
                    <div class="cart-total-price">
                        <p>${{ price(cartSubtotal) }}</p>
                    </div>
                    <div class="reset-cart">
                        <a @click="resetCart()"><p>Reset cart</p></a>
                    </div>
                </div>
            </div>
    
            <div class="cart-checkout-content">
                <p class="cart-checkout-header">CHECKOUT</p>
                <div class="light-line cart-checkout-header-line"></div>
                <div class="cart-checkout-subtotal">
                    <p class="cart-subtotal-text">Subtotal</p>
                    <p class="cart-subtotal-amount">${{ price(cartSubtotal) }}</p>
                </div>
                <div class="cart-checkout-shipping-text">
                    <p>Taxes and shipping calculated at checkout</p>
                </div>
                <div class="cart-checkout-button-content">
                    <a v-bind:href="$router.resolve({name: 'Checkout'}).href">
                        <button class="cart-checkout-button">Checkout</button>
                    </a>
                </div>
            </div>      
        </div>
    </main>
</template>

<script>
import {
    credentialFetchRequestToServer
} from "@/modules/FetchModule.js"
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