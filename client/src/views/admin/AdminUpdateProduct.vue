<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <div class="flexbox middle">
            <div class="admin-form-content">
                <p>{{ message }}</p>
                <div>
                    <p class="medium-text spacing-bottom-2">Update product</p>
                    <AdminProductForm v-bind:productId="productId"/>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import AdminHeaderComponent from '@/components/AdminHeader.vue';
import AdminSideMenuComponent from '@/components/AdminSideMenu.vue';
import {useRoute, useRouter} from "vue-router"
import AdminProductForm from '@/components/AdminProductForm.vue';
import { isUserAuthorized } from '@/common/functions.js';

export default {
    name: "AdminUpdateProductView.vue",
    components: {
        AdminHeaderComponent,
        AdminSideMenuComponent,
        AdminProductForm
    },
    data() {
        return {
            message: "",
            router: useRouter(),
            route: useRoute(),
            productId: ""
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            this.router.push("/admin/login")

        this.productId = this.route.params.productId
    }
}
</script>
