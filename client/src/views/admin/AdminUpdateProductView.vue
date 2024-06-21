<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <div class="admin">
            <div class="admin-form-content">
                <p>{{ message }}</p>
                <div>
                    <p class="medium spacing-bottom-small-medium">Update product</p>
                    <AdminProductForm v-bind:productId="productId"/>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import AdminHeaderComponent from '@/components/AdminHeaderComponent.vue';
import AdminSideMenuComponent from '@/components/AdminSideMenuComponent.vue';
import {useRoute, useRouter} from "vue-router"
import { reactive } from 'vue';
import AdminProductForm from '@/components/AdminProductForm.vue';
import { isUserAuthorized } from '@/modules/CommonModule';
import { credentialFetchRequestToServerWithBody, fetchRequestToServer } from '@/modules/FetchModule';

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
