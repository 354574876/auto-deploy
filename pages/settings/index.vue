<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
                <fieldset class="form-group">
                  <input class="form-control" type="text" placeholder="URL of profile picture" v-model="userForm.image">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="userForm.username">
                </fieldset>
                <fieldset class="form-group">
                  <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="userForm.bio"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="userForm.email">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="userForm.password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { updateUser } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'settings',
  middleware: 'authenticated',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['user']),
    userForm (data) {
      return {
        ...data.user
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        const {email, username, password, image, bio} = this.userForm
        const {data} = await updateUser({
          user: {
            email, username, password, image, bio
          }
        })
        Cookie.set('user', data.user)
        this.$store.commit('setUser', data.user)
        this.$router.push('/profile/' + username)
      } catch (error) {
        console.dir(error)
      }
      
    }
  }
}
</script>

<style>

</style>