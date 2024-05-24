<template>
    <div>
        <img v-bind:src="require(`@/assets/images/uploads/${productPicture}`)">
    </div>
    <div>
        <a v-bind:href="$router.resolve({name: 'Product', params: {category: categoryName, product: productName}}).href">
            {{ productName }}
        </a>
    </div>
    <div>
        <p>${{ price(productPrice) }}</p>
    </div>
</template>

<script>
import { formatPrice } from '@/modules/CommonModule';

export default {
    name: "CategoryProductComponent",
    props: [
        "productId",
        "productPicture",
        "productName",
        "productPrice",
        "categoryName"
    ],
    methods: {
        price: formatPrice
    }
}
</script>