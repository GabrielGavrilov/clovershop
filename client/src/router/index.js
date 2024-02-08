import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue"
import AdminLoginView from "@/views/AdminLoginView"
import AdminDashboardView from "@/views/AdminDashboardView"
import CategoryView from "@/views/CategoryView"

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView
    },
    {
        path: "/:categoryName",
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
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router