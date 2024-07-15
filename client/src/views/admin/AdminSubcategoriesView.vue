<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <div class="admin-content">
            <div class="flexbox">
                <div>
                    <p class="medium-text bold">Subcategories</p>
                </div>
                <div class="right">
                    <a v-bind:href="$router.resolve({name: 'New subcategory'}).href">
                        <button class="btn-green">New Subcategory</button>
                    </a>
                </div>
            </div>
            <div class="admin-section">
                <div v-if="subcategories !== undefined">
                    <div v-if="subcategories.length > 0">
                        <ul class="admin-section-ul">
                            <li v-for="subcategory in subcategories">
                                <div class="admin-section-item">
                                    <a v-bind:href="$router.resolve({name: 'Update subcategory', params: {subcategoryId: subcategory._id}}).href">
                                        {{ subcategory.subcategoryName }}
                                    </a>
                                </div>
                                <div class="hr-line-light"></div>
                            </li>
                            <li>
                                <div class="admin-section-item flexbox">
                                    <p class="right">{{subcategoryCount}} records</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <p>No subcategories</p>
                    </div>
                </div>
                <div v-else>
                    <p>Loading...</p>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import clovershop from "@/assets/styles/Clovershop.css"
import AdminHeaderComponent from '@/components/AdminHeaderComponent.vue';
import AdminSideMenuComponent from '@/components/AdminSideMenuComponent.vue';
import { isUserAuthorized } from '@/modules/CommonModule';
import { fetchRequestToServer } from '@/modules/FetchModule';
import { useRouter } from 'vue-router';

export default {
    name: "AdminSubcategoriesView",
    components: {
        AdminHeaderComponent,
        AdminSideMenuComponent
    },
    data() {
        return {
            router: useRouter(),
            subcategories: undefined,
            subcategoryCount: 0
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            this.router.push("/admin/login")

        this.subcategories = (await fetchRequestToServer("GET", "/api/subcategories")).data
        this.subcategoryCount = this.subcategories.length
    }
}
</script>

<style scoped src="@/assets/styles/AdminMain.css">
</style>