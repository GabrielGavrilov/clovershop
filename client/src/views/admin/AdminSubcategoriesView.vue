<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <a v-bind:href="$router.resolve({name: 'New subcategory'}).href">
            <button>Create a new Subcategory</button>
        </a>
        <div v-if="subcategories !== undefined">
            <div v-if="subcategories.length > 0">
                <ul>
                    <li v-for="subcategory in subcategories">
                        <a v-bind:href="$router.resolve({name: 'Update subcategory', params: {subcategoryId: subcategory._id}}).href">
                            {{ subcategory.subcategoryName }}
                        </a>
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
    </main>
</template>

<script>
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
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            this.router.push("/admin/login")

        this.subcategories = await fetchRequestToServer("GET", "/api/subcategories")
        console.log(this.subcategories)
    }
}
</script>
