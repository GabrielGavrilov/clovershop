import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue"
import CategoryView from "@/views/CategoryView"
import AdminLoginView from "@/views/AdminLoginView"
import AdminDashboardView from "@/views/AdminDashboardView"
import AdminCategoriesView from "@/views/AdminCategoriesView"
import AdminSubcategoriesView from "@/views/AdminSubcategoriesView"
import AdminProductsView from "@/views/AdminProductsView"

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView
    },
    {
        path: "/:category",
        name: "Category",
        component: CategoryView
    },
    {
        path: "/admin/login",
        name: "Log in",
        component: AdminLoginView
    },
    {
        path: "/admin/dashboard",
        name: "Dashboard",
        component: AdminDashboardView
    },
    {
        path: "/admin/categories",
        name: "Categories",
        component: AdminCategoriesView
    },
    {
        path: "/admin/subcategories",
        name: "Subcategories",
        component: AdminSubcategoriesView
    },
    {
        path: "/admin/products",
        name: "Products",
        component: AdminProductsView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router