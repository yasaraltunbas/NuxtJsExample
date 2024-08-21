<template>
  <v-container fluid>
    <v-app>
      <v-app-bar v-if="!isAuthPage" app color="primary" dark>
        <v-row align="center" justify="center" class="app-row">
          <v-col cols="auto">
            <v-toolbar-title class="title-hospital">
              Hastane App
            </v-toolbar-title>
          </v-col>
          <v-col cols="auto">
            <v-toolbar-items class="toolbar-items">
              <v-btn text to="/" class="menu-item">
                <v-icon left>
                  mdi-home
                </v-icon>
                Ana Sayfa
              </v-btn>
              <v-btn v-if="userRole === 'Patient'" text to="/departments" class="menu-item">
                <v-icon left>
                  mdi-hospital-building
                </v-icon>
                Bölümler
              </v-btn>
              <v-btn text to="/appointment/getappointment" class="menu-item">
                <v-icon left>
                  mdi-calendar-check
                </v-icon>
                Randevularım
              </v-btn>
              <v-btn v-if="userRole === 'Patient'" text to="/appointment/get-ex-appointment" class="menu-item">
                <v-icon left>
                  mdi-calendar-clock
                </v-icon>
                Geçmiş Randevularım
              </v-btn>

              <v-btn v-if="userRole === 'Doctor'" text to="/admission/get-admission-doctor" class="menu-item">
                <v-icon left>
                  mdi-calendar-clock
                </v-icon>
                Yatışta Olan Hastalarınız
              </v-btn>
              <v-btn v-if="userRole === 'Patient'" text to="/admission/get-admission-patient" class="menu-item">
                <v-icon left>
                  mdi-calendar-clock
                </v-icon>
                Yatış Bilgileriniz
              </v-btn>
              <v-btn text to="/profile" class="menu-item">
                <v-icon left>
                  mdi-account
                </v-icon>
                Profiliniz
              </v-btn>
            </v-toolbar-items>
          </v-col>
          <v-text class="menu-item">
            {{ userRole === 'Doctor' ? 'Doktor' : 'Hasta' }}
          </v-text>

          <v-col cols="auto">
            <v-btn color="grey" class="btn-out" @click="logout">
              <v-icon left>
                mdi-logout
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-app-bar>

      <v-main>
        <nuxt />
      </v-main>
    </v-app>
  </v-container>
</template>

<script>
export default {
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
  flex-wrap: wrap;
}

.menu-item {
  margin-right: 16px;
}

.title-hospital {
  font-size: 1.25rem;
}

.v-btn {
  font-size: 1rem;
}

@media (max-width: 600px) {
  .title-hospital {
    font-size: 1rem;
  }
  .v-btn {
    font-size: 0.875rem;
  }
}
</style>
