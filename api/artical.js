import { request } from '@/plugins/request'
import qs from 'qs'
/**
 * 查询文章列表
 * @param {} data 
 * @tag
 * @author
 * @favorited
 * @limit
 * @offset
 */
export const getArticles = filters => {
  return request({
    url: '/api/articles?' + qs.stringify(filters)
  })
}

export const getArticleBySlug = slug => {
  return request({
    url: '/api/articles/' + slug
  })
}

/**
 * 发表文章
 * @param {title, description, body, tagList} data 
 */
export const createArticle = data => {
  return request({
    url: '/api/articles/',
    method: 'post',
    data
  })
}


/**
 * 更新文章
 * @param {title, description, body, tagList} data 
 */
export const updateArticle = (slug, data) => {
  return request({
    url: '/api/articles/' + slug,
    method: 'put',
    data
  })
}

/**
 * 删除文章
 * @param {slug} data 
 */
export const deleteArticle = (slug) => {
  return request({
    url: '/api/articles/' + slug,
    method: 'delete'
  })
}


/**
 * 添加评论
 * @param {body} data 
 */
export const addComment = (slug, data) => {
  return request({
    url: `/api/articles/${slug}/comments`,
    method: 'post',
    data
  })
}


/**
 * 查询评论
 * @param {slug} data 
 */
export const getComments = (slug) => {
  return request({
    url: `/api/articles/${slug}/comments`,
    method: 'get'
  })
}

/**
 * 删除评论
 * @param {slug, id} data 
 */
export const deleteComment = (slug, id) => {
  return request({
    url: `/api/articles/${slug}/comments/${id}`,
    method: 'delete'
  })
}


/**
 * 点赞
 * @param {slug, id} data 
 */
export const likeArticle = (slug) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: 'post'
  })
}

/**
 * 取消点赞
 * @param {slug, id} data 
 */
export const unlikeArticle = (slug, id) => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: 'delete'
  })
}


/**
 * 标签
 * @param  data 
 */
export const getTags = () => {
  return request({
    url: `/api/tags`
  })
}



export const getFeedArticles = params => {
  return request({
    url: '/api/articles/feed',
    params
  })
}