<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{profile.username}}</h4>
            <p>
              {{profile.bio}}
            </p>
            <template v-if="profile.username === user.username">
              <button class="btn btn-sm btn-primary btn-left" @click="onLogout">
                  Logout
                </button>
              <nuxt-link to="/settings">
                <button class="btn btn-sm btn-outline-secondary action-btn">
                  Edit Profile Settings
                </button>
              </nuxt-link>
            </template>
            <template v-else>
              <button class="btn btn-sm btn-outline-secondary action-btn">
                {{profile.following ? 'UnFollow' : 'Follow'}}
              </button>
            </template>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <span class="nav-link" :class="{active: nav==='my'}" @click="nav = 'my'">My Articles</span>
              </li>
              <li class="nav-item">
                <span class="nav-link" :class="{active: nav==='fa'}" @click="nav = 'fa'">Favorited Articles</span>
              </li>
            </ul>
          </div>

          

          <div 
            class="article-preview"
            v-for="articale in articles"
            :key="articale.slug"
          >
            <div class="article-meta">
              <nuxt-link :to="`/profile/${articale.author.username}`">
                <img :src="articale.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link class="author" :to="`/profile/${articale.author.username}`">
                  {{articale.author.username}}
                </nuxt-link>
                <span class="date">{{articale.createdAt | date('MMM DD, YYYY')}}</span>
              </div>
              <button 
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :disabled="articale.disable"
                :class="{active: articale.favorited}"
                @click.prevent.stop="favorite(articale)"
              >
                <i class="ion-heart"></i> {{articale.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="`/artical/${articale.slug}`" class="preview-link">
                <h1>{{articale.title}}</h1>
                <p>{{articale.description}}</p>
                <span>Read more...</span>
            </nuxt-link>
          </div>


        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {getProfile} from '@/api/user'
import { getArticles, getFeedArticles } from '@/api/artical'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  middleware: 'authenticated',
  name: 'profile',
  data () {
    return {
      profile: {},
      articles: [],
      faArticles: [],
      nav: 'my'
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted () {
    this.getProfile()
    this.getMyArticles()
  },

  methods: {
    async getProfile () {
      const {name} = this.$route.params
      try {
        const { data } = await getProfile(name)
        this.profile = data.profile
      } catch (error) {
        console.dir(error)
      }
    }, 
    onLogout () {
      Cookie.remove('user')
      this.$store.commit('setUser', null)
      this.$router.push('/sign/in')
    },
    async getMyArticles() {
      const {data} = await getFeedArticles({})
      this.articles = data.articles
    },
    async getMyFa() {
      const {data} = await getArticles({favorited: this.user.username})
      this.articles = data.articles
    }
  },
  watch: {
    nav(newVal) {
      if (newVal === 'my') {
        this.getMyArticles()
      } else {
        this.getMyFa()
      }
    }
  }
}
</script>

<style>
  .btn-left{
    float: left;
  }
</style>