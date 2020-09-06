<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>
        <article-author :article="article"/>

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12">
          {{article.body}}
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <article-author :article="article"/>
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form" @submit.prevent="postComment">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="comment"></textarea>
            </div>
            <div class="card-footer">
              <nuxt-link :to="'/profile/' + user.username" class="comment-author-img">
                <img :src="user.image" class="comment-author-img" />
              </nuxt-link>
              <button class="btn btn-sm btn-primary">
              Post Comment
              </button>
            </div>
          </form>
          
          <div class="card" v-for="comment in comments" :key="comment.id">
            <div class="card-block">
              <p class="card-text">{{comment.body}}</p>
            </div>
            <div class="card-footer">
              <nuxt-link :to="'/profile/' + comment.author.username" class="comment-author">
                <img :src="comment.author.image" class="comment-author-img" />
              </nuxt-link>
              &nbsp;
              <nuxt-link :to="'/profile/' + comment.author.username" class="comment-author">
                {{comment.author.username}}
              </nuxt-link>
              <span class="date-posted">{{comment.createdAt | date('MMM DD')}}</span>
              <span class="mod-options"  v-if="user.username===comment.author.username">
                <i class="ion-trash-a" @click="deleteComment(comment)"></i>
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { getArticleBySlug, getComments, addComment, deleteComment } from '@/api/artical'
import { mapState } from 'vuex'
import ArticleAuthor from './components/article-author'
export default {
  name: 'detail',
  data () {
    return {
      comment: '',
      comments: []
    }
  },
  async mounted () {
    const {data} = await getComments(this.$route.params.slug)
    this.comments = data.comments
  },
  components: {
    ArticleAuthor
  },
  computed: {
    ...mapState(['user'])
  },
  async asyncData ({ query, params }) {
    const { data } = await getArticleBySlug(params.slug)
    return {
      article: data.article
    }
  },

  methods: {
    async postComment() {
      const {data} = await addComment(this.$route.params.slug, {
        comment: {
          body: this.comment
        }
      })
      this.comments.unshift(data.comment)
    },
    async deleteComment(comment) {
      await deleteComment(this.$route.params.slug, comment.id)
      this.comments = this.comments.filter(item => comment.id !== item.id)
    }
  }

}
</script>

<style>

</style>