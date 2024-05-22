<template>
    <h2>Log in</h2>
    <p>{{ message }}</p>
    <form v-on:submit.prevent="submit()">
        <input v-model="login.email" type="email" placeholder="Email" required>
        <br>
        <input v-model="login.password" type="password" placeholder="Password" required>
        <br>
        <button type="submit">Log in</button>
    </form>
</template>

<script>
import { isUserAuthorized } from '@/modules/CommonModule';
import { credentialFetchRequestToServerWithBody } from '@/modules/FetchModule';
import { reactive } from 'vue';
import { useRouter } from "vue-router"

export default {
    name: "AdminLoginView",
    data() {
        return {
            router: useRouter(),
            message: "",
            login: reactive({email: '', password: ''}),
        }
    },
    async mounted() {
        if(await isUserAuthorized())
            await this.router.push("/admin/dashboard")
    },
    methods: {
        async submit() {
            const authResponse = await credentialFetchRequestToServerWithBody("POST", "/auth/login", this.login);
            
            if(authResponse.status == 401)
                this.message = authResponse.message
            else
                await this.router.push("/admin/dashboard")
        }
    }
}
</script>