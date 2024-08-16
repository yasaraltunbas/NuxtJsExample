<template>
  <v-app>
    <v-app-bar v-if="!isAuthPage" app color="primary" dark>
      <v-toolbar-title>Hastane App</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text to="/">
          <v-icon left>
            mdi-home
          </v-icon>
          Ana Sayfa
        </v-btn>
        <v-btn v-if="userRole === 'Patient'" text to="/departments">
          <v-icon left>
            mdi-hospital-building
          </v-icon>
          Bölümler
        </v-btn>
        <v-btn text to="/appointment/getappointment">
          <v-icon left>
            mdi-calendar-check
          </v-icon>
          Randevularım
        </v-btn>
        <v-btn v-if="userRole === 'Patient'" text to="/appointment/get-ex-appointment">
          <v-icon left>
            mdi-calendar-clock
          </v-icon>
          Geçmiş Randevularım
        </v-btn>
        <v-btn v-if="userRole === 'Patient'" text to="/medicalrecord/get-ex-medicalrecord">
          <v-icon left>
            mdi-file-document-box
          </v-icon>
          Geçmiş Muayenelerim
        </v-btn>
        <v-btn v-if="userRole === 'Doctor'" text to="/admission/get-admission-doctor">
          <v-icon left>
            mdi-calendar-clock
          </v-icon>
          Yatışta Olan Hastalarınız
        </v-btn>
        <v-btn v-if="userRole === 'Patient'" text to="/admission/get-admission-patient">
          <v-icon left>
            mdi-calendar-clock
          </v-icon>
          Yatış Bilgileriniz
        </v-btn>
        <v-btn text to="/profile">
          <v-icon left>
            mdi-account
          </v-icon>
          Profiliniz
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-btn color="grey" @click="logout">
        <v-icon left>
          mdi-logout
        </v-icon>
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
  computed: {
    isAuthPage () {
      return this.$route.path === '/auth/login' || this.$route.path === '/auth/register'
    },
    userRole () {
      return this.$auth.user ? this.$auth.user.role : null
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
      this.$router.push('/auth/login')
    }
  }
}
</script>

<style scoped>
.toolbar-items {
  display: flex;
  align-items: center;
}

.profile {
  margin-left: auto;
}
</style>
