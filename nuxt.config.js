import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    titleTemplate: '%s - VuetifyExample',
    title: 'VuetifyExample',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
  ],

  plugins: [
    '~/plugins/filters.js'
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'

  ],

  axios: {
    baseURL: 'http://localhost:5114/api'
  },
  build: {
    extend (config, { isDev, isClient }) {
      if (isClient) {
        config.module.rules.push({
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        })
      }
    }
  },
  auth: {
    redirect: {
      login: '/auth/login',
      logout: '/',
      home: '/'
    },
    strategies: {
      local: {
        schema: 'local',
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: false,
          user: { url: '/auth/user', method: 'get' }
        },
        token: {
          property: 'data'

        },
        user: {
          property: false
        }
      }
    }
  },
  router: {
    middleware: ['auth']

  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  }

}
