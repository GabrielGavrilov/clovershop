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
import HeaderComponent from '@/components/Header.vue';
import ProductComponent from '@/components/ProductInformation.vue';
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