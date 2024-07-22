<template>
    <div class="sidebar">
        <ul>
            <P class="sidebar-section-title">Quick links </P>
            <li>
                <a href="/admin/dashboard">
                    <div class="sidebar-button">
                        <button>Dashboard</button>
                    </div>
                </a>
            </li>
            <li>
                <a href="/admin/categories/new">
                    <div class="sidebar-button">
                        <button>New category</button>
                    </div>
                </a>
            </li>
            <li>
                <a href="/admin/products/new">
                    <div class="sidebar-button">
                        <button>New product</button>
                    </div>
                </a>
            </li>
            <p class="sidebar-section-title">Catalog</p>
            <li>
                <a href="/admin/categories">
                    <div class="sidebar-button">
                        <button>Categories</button>
                    </div>
                </a>
            </li>
            <li>
                <a href="/admin/subcategories">
                    <div class="sidebar-button">
                        <button>Subcategories</button>
                    </div>
                </a>
            </li>
            <li>
                <a href="/admin/products">
                    <div class="sidebar-button">
                        <button>Products</button>
                    </div>
                </a>
            </li>
            <p class="sidebar-section-title">Customers</p>
            <li>
                <a href="/admin/orders">
                    <div class="sidebar-button">
                        <button>Orders</button>
                    </div>
                </a>
            </li>
            <p class="sidebar-section-title">Account</p>
            <li>
                <div v-on:click="logout" class="sidebar-button">
                    <button>Log out</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { credentialFetchRequestToServer } from '@/common/requests';
import { useRouter } from 'vue-router';

export default {
    name: "AdminSidebarComponent",
    data() {
        return {
            router: useRouter() 
        }
    },
    methods: {
        async logout() {
            const request = await credentialFetchRequestToServer("GET", "/auth/logout")
            this.router.push("/admin/login")
        }
    }
}
</script>

<style scoped src="@/assets/styles/AdminMenu.css">
</style>