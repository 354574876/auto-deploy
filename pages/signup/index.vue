<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{isLogin ? 'Sign in' : 'Sign up'}}</h1>
          <p class="text-xs-center" v-if="!isLogin">
            <nuxt-link to="/sign/in">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(error, field) in errors">
              <li v-for="(msg, idx) in error" :key="idx">
                {{field}} {{msg}}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input 
                class="form-control form-control-lg" 
                type="text" 
                placeholder="Your Name"
                v-model="user.username"
                required
                >
            </fieldset>
            <fieldset class="form-group">
              <input 
                class="form-control form-control-lg" 
                type="email" 
                v-model="user.email"
                placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input 
                class="form-control form-control-lg" 
                type="password"
                required
                minlength="8"
                v-model="user.password"
                placeholder="Password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{isLogin ? 'Sign in' : 'Sign up'}}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'login',
  middleware: 'notAuthenticated',
  data () {
    return {
      errors: null,
      user: {
        username: '',
        email: '',
        password: ''
      },
      isLogin: this.$route.params?.type === 'in'
    }
  },
  methods: {
    async onSubmit () {
      try {
        const {data} = this.isLogin ? await login({user: this.user}) : await register({user: this.user})
        Cookie.set('user', data.user)
        this.$store.commit('setUser', data.user)
        this.$router.push('/')
      } catch (error) {
        this.errors = error.response.data.errors
      }
      
    }
  }
}
</script>

<style>

</style>