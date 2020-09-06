<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link 
                  class="nav-link"
                  exact
                  :class="{active: tab === 'your_tab'}"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_tab'
                    }
                  }"
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link 
                  class="nav-link"
                  exact
                  :class="{active: tab === 'global_tab'}"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_tab'
                    }
                  }"
                >Global Feed</nuxt-link>
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
          <nav>
            <ul class="pagination">
              <li 
                class="page-item ng-scope" 
                :class="{active: pageNumber === page }" 
                v-for="pageNumber in Math.ceil(articlesCount/limit)" 
                :key="pageNumber">
                <nuxt-link class="page-link ng-binding"
                  :to="{
                    name: 'home',
                    query: {
                      page: pageNumber,
                      tag: $route.query.tag,
                      tab
                    }
                  }"
                >{{pageNumber}}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link 
                :to="{
                  name: 'home',
                  query: {
                    tag,
                    page: $route.query.page,
                    tab
                  }
                }"
                :key="idx" 
                class="tag-pill tag-default" 
                v-for="(tag, idx) in tags"
              >
                {{tag}}
              </nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getTags, getFeedArticles, likeArticle, unlikeArticle } from '@/api/artical'
import { mapState } from 'vuex'
export default {
  name: 'home',
  computed: {
    ...mapState(['user'])
  },
  async asyncData ({ query }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 20
    const tab = query.tab || 'global_tab'
    const loadArticals = tab === 'your_tab' ? getFeedArticles : getArticles
    const { data } = await loadArticals({
      limit,
      offset: (page - 1) * limit,
      tag: query.tag,
      tab,
    })
    const articles = data.articles.map(item => {
      item.disable = false
      return item
    })
    const { data: tags } = await getTags()
    return {
      articles,
      articlesCount: data.articlesCount,
      page,
      limit,
      tags: tags.tags,
      tab
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  methods: {
    async favorite (articale) {
      const fn = articale.favorited ? unlikeArticle : likeArticle
      articale.disable = true
      await fn(articale.slug)
      articale.disable = false
      articale.favoritesCount = articale.favorited ? articale.favoritesCount - 1 : articale.favoritesCount + 1
      articale.favorited = !articale.favorited 
    }
  }
}
</script>

<style>

</style>