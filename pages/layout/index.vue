<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="/">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link to="/" class="nav-link">Home</nuxt-link>
          </li>
          <li class="nav-item" v-if="$store.state.user">
            <nuxt-link to="/artical" class="nav-link">
              <i class="ion-compose"></i>&nbsp;New Post
            </nuxt-link>
          </li>
          <template v-if="$store.state.user">
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="'/profile/'+$store.state.user.username">
                <img class="user-pic" :src="decodeURI($store.state.user.image)">
                {{$store.state.user.username}}
              </nuxt-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/sign/in">Sign in</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/sign/up">Sign up</nuxt-link>
            </li>
          </template>
          
        </ul>
      </div>
    </nav>
    <nuxt-child />
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'layout',
  mounted () {
  }
}
</script>

<style>

</style>