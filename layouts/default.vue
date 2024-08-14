<template>
  <v-app>
    <v-app-bar app color="dark" dark>
      <v-toolbar-title>Hastane App</v-toolbar-title>
      <v-toolbar-items class="toolbar-items">
        <nuxt-link to="/">
          Ana Sayfa
        </nuxt-link>
        <nuxt-link to="/departments">
          Bölümler
        </nuxt-link>
        <nuxt-link to="/appointment/getappointment">
          Randevularım
        </nuxt-link>
        <nuxt-link to="/appointment/get-ex-appointment">
          Geçmiş Randevularım
        </nuxt-link>
        <nuxt-link to="/medicalrecord/get-ex-medicalrecord">
          Geçmiş Muayenelerim
        </nuxt-link>
        <nuxt-link to="/profile" class="profile">
          Profiliniz
        </nuxt-link>
      </v-toolbar-items>
      <v-spacer />

      <v-btn color="grey" @click="logout">
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
  name: 'DefaultLayout',
  data () {
    return {
      role: 'Patient'
    }
  },
  computed: {
    isAuthPage () {
      return this.$route.path === '/auth/login' || this.$route.path === '/auth/register'
    }
  },
  created () {
    this.fetchUserRole()
      .then(() => {
        this.fetchUserAppointments()
      })
  },

  methods: {
    async logout () {
      await this.$auth.logout()
      this.$router.push('/auth/login')
    },
    async fetchUserRole () {
      try {
        const response = await this.$axios.get('/auth/user')
        const role = response.data.role
        this.role = role
        return role
      } catch (error) {
        console.error('Error fetching user role:', error)
      }
    }

  }
}
</script>

<style scoped>
.toolbar-items {
  display: flex;
  align-items: center;
  color: white;
  margin-right: 16px;
  margin: 0 16px;
}

.toolbar-items a {
  color: white; /* Linklerin rengi beyaz olarak ayarlandı */
  margin-right: 16px; /* Linkler arasında boşluk bırakıldı */
  text-decoration: none; /* Linklerin altı çizili olmaması sağlandı */
}

.toolbar-items a:hover {
  text-decoration: underline; /* Linklerin üzerine gelindiğinde altı çizili olması sağlandı */
}
.profile {
  margin-left: auto;
  text-align: right;
}
</style>
