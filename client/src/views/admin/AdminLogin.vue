<template>
    <p>{{ message }}</p>
    <div class="flexbox middle">
        <div class="admin-form-content">
            <form v-on:submit.prevent="submit()">
                <div class="admin-form">
                    <p class="bold medium-text spacing-bottom-4">Log in</p>
                    <div class="spacing-bottom-1">
                        <p>Email</p>
                    </div>
                    <div>
                        <input class="text-input" v-model="login.email" type="text" required>
                    </div>
                    <div class="spacing-bottom-1 spacing-top-1">
                        <p>Password</p>
                    </div>
                    <div>
                        <input class="text-input" v-model="login.password" type="password" required>
                    </div>
                    <div class="flexbox spacing-top-2">
                        <div class="right">
                            <button class="btn-green" type="submit">Log in</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import clovershop from "@/assets/styles/Clovershop.css"
import { isUserAuthorized } from '@/common/functions.js';
import { credentialFetchRequestToServerWithBody } from '@/common/requests.js';
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
            const response = await credentialFetchRequestToServerWithBody("POST", "/auth/login", this.login);

            if(response.status == 401)
                this.message = response.data.err
            else
                await this.router.push("/admin/dashboard")
        }
    }
}
</script>

<style scoped src="@/assets/styles/Admin.css">
</style>