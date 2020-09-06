export default {
  server: {
    host: '0.0.0.0' // default: localhost
  },
  plugins: ['~/plugins/request.js', '~/plugins/dayjs.js'],
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // 删除默认的路由表
      routes.splice(0)
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout'),
          children: [
            {
              path: '/',
              name: 'home',
              exact: true,
              component: resolve(__dirname, 'pages/home'),
            }, {
              path: '/sign/:type',
              name: 'sign',
              component: resolve(__dirname, 'pages/signup'),
            }, {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings'),
            }, {
              path: '/profile/:name',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile'),
            }, {
              path: '/artical',
              name: 'artical',
              component: resolve(__dirname, 'pages/artical')
            }, {
              path: '/detail/:slug',
              name: 'detail',
              component: resolve(__dirname, 'pages/artical/detail'),
            }
          ]
        }
      ])
    }
  }
}