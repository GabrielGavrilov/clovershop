<template>
    <HeaderComponent/>
    <main>
        <div class="product-content">
            <ProductComponent 
                v-bind:categoryName="this.route.params.category"
                v-bind:productName="this.route.params.product"
            />
        </div>
    </main>
</template>

<script>
import style from '@/assets/css/product.css'
import HeaderComponent from '@/components/HeaderComponent.vue';
import ProductComponent from '@/components/ProductComponent.vue';
import { useRoute } from 'vue-router';

export default {
    name: "ProductView",
    components: {
        HeaderComponent,
        ProductComponent
    },
    data() {
        return {
            route: useRoute()
        }
    }
}
</script>