<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Hastane App</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text>
          <nuxt-link to="/">
            Ana Sayfa
          </nuxt-link>
        </v-btn>
        <v-btn text>
          <nuxt-link to="/department/departments">
            Bölümler
          </nuxt-link>
        </v-btn>
        <v-btn text>
          <nuxt-link to="/services">
            Hizmetler
          </nuxt-link>
        </v-btn>
        <v-btn text>
          <nuxt-link to="/contact">
            İletişim
          </nuxt-link>
        </v-btn>
      </v-toolbar-items>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <v-btn color="secondary" @click="logout">
        Çıkış Yap
      </v-btn>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    async logout () {
      await this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.v-application--is-ltr .v-app-bar {
  height: 64px;
}
</style>
