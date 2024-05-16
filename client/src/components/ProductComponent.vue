<template>
    <div v-if="!productExists">
        <NotFoundComponent message="The page you are looking for does not exist!"/>
    </div>
    <div class="product-content" v-else-if="product !== undefined && productExists">
        <div class="product-picture-content">
            <img class="product-picture" v-bind:src="require(`@/assets/${product.productPicture}`)">
        </div>
        <div class="product-information">
            <div class="product-name">
                <p>{{ product.productName }}</p>
            </div>
            <div class="product-price">
                <p>${{ formatPrice(product.productPrice) }}</p>
            </div>
            <div class="product-stock">
                <p>{{ product.productQuantity }}</p>
            </div>
            <div>
                <AddToCardComponent v-bind:productId="product._id"/>
            </div>
            <div class="product-description">
                <p>{{ product.productDescription }}</p>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script>
import addr from "../../../addresses.js"
import AddToCardComponent from "@/components/AddToCardComponent.vue"
import NotFoundComponent from "./NotFoundComponent.vue"

export default {
    name: "ProductComponent",
    props: ["categoryName", "productName"],
    components: {
        AddToCardComponent,
        NotFoundComponent
    },
    data() {
        return {
            productExists: true,
            product: undefined
        }
    },
    async mounted() {
        const response = await fetch(`${addr.SERVER_ADDRESS}/api/product`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                categoryName: this.categoryName,
                productName: this.productName
            })
        })
        
        this.product = await response.json()

        if(this.product.status == 404)
            this.productExists = false
    },
    methods: {
        formatPrice(price) {
            const priceString = String(price)
            const formattedPrice = priceString.substring(0, priceString.length - 2) + "." + priceString.substring(priceString.length - 2)
            return formattedPrice
        }
    }
}
</script>