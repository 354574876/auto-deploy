import { request } from '@/plugins/request'


export const login = data => {
  return request({
    url: '/api/users/login',
    method: 'post',
    data
  })
}

export const register = data => request({
  url: '/api/users',
  method: 'post',
  data
})

export const updateUser = data => request({
  url: '/api/user',
  method: 'put',
  data
})

/**
 * 关注
 * @param {string} username 
 */
export const followUser = username => request({
  url: `/api/profiles/${username}/follow`,
  method: 'post'
})

/**
 * 取消关注
 * @param {string} username 
 */
export const unFollowUser = username => request({
  url: `/api/profiles/${username}/follow`,
  method: 'delete'
})



/**
 * 获取用户信息
 * @param {string} username 
 */
export const getProfile = username => request({
  url: '/api/profiles/' + username
})