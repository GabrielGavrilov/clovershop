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
                        <p>${{ formatPrice(cartSubtotal) }}</p>
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
                    <p class="cart-subtotal-amount">${{ formatPrice(cartSubtotal) }}</p>
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
import config from "../../../../config/index.js"
import style from "@/assets/css/cart.css"
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
            server: `${config.SERVER_PROTCOL}:${config.SERVER_DOMAIN}:${config.SERVER_PORT}`
        }
    },
    async mounted() {
        const response = await fetch(`${this.server}/cart/`, {
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        })
        
        const cartItems = await response.json()
        
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
            const response = await fetch(`${this.server}/api/product/${productId}`, {
                headers: {"Content-Type": "application/json"}
            })

            const product = await response.json()
            return product
        },
        async resetCart() {
            const response = await fetch(`${this.server}/cart/reset`, {
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                method: "POST"
            })

            const cartResponse = await response.json()

            if(cartResponse.status == 200)
                await this.router.go()
        },
        formatPrice(price) {
            const priceString = String(price)
            const formattedPrice = priceString.substring(0, priceString.length - 2) + "." + priceString.substring(priceString.length - 2)
            return formattedPrice
        }
    }
}
</script>