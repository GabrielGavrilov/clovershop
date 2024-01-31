<template>
    <h2>Log in</h2>
    <form v-on:submit.prevent="submit()">
        <input v-model="login.email" type="email" placeholder="Email" required>
        <br>
        <input v-model="login.password" type="password" placeholder="Password" required>
        <br>
        <button type="submit">Log in</button>
    </form>
</template>

<script>
import router from '@/router';
import { reactive } from 'vue';
import { useRouter } from "vue-router"

// TODO: Check if already logged in

export default {
    name: "AdminLoginView",
    setup() {
        const router = useRouter()
        const login = reactive({
            email: '',
            password: ''
        })

        async function submit() {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: 'include',
                body: JSON.stringify(login)
            })

            // TODO: Validation

            await router.push("/admin/dashboard")
        }

        return {
            login,
            submit
        }
    }
}
</script>