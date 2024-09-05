<template>
  <v-app>
    <v-card color="primary">
      <v-container class="py-0 my-0">
        <v-app-bar v-if="!isAuthPage" color="primary" dark flat>
          <v-app-bar-title class="title-hospital">
            Hastane App
          </v-app-bar-title>

          <v-spacer />

          <template v-if="$vuetify.breakpoint.lgAndDown">
            <v-btn v-for="(menuItem, $index) in menuItems" :key="$index" text :to="menuItem.to" class="menu-item">
              <v-icon left>
                {{ menuItem.icon }}
              </v-icon>
              {{ menuItem.title }}
            </v-btn>

            <span>
              {{ userRole === 'Doctor' ? 'Doktor' : 'Hasta' }}
            </span>

            <v-btn color="grey" class="btn-out" @click="logout">
              <v-icon left>
                mdi-logout
              </v-icon>
            </v-btn>
          </template>
          <template v-else>
            mobil menu gelmesi lazım
          </template>
        </v-app-bar>
      </v-container>
    </v-card>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  computed: {
    userRole () {
      return this.$auth.user ? this.$auth.user.role : null
    },
    doctorMenuItems () {
      return [
        { title: 'Randevular', to: '/doctor/appointments', icon: 'mdi-calendar-clock' },
        { title: 'Yatışta Olan Hastalar', to: '/doctor/admissions', icon: 'mdi-calendar-clock' },
        { title: 'Profil', to: '/profile', icon: 'mdi-account' }
      ]
    },
    patientMenuItems () {
      return [
        { title: 'Bölümler', to: '/patient/departments', icon: 'mdi-hospital-building' },
        { title: 'Randevular', to: '/patient/appointments', icon: 'mdi-calendar-check' },
        { title: 'Geçmiş Randevular', to: '/patient/appointments/history', icon: 'mdi-calendar-clock' },
        { title: 'Yatış Bilgileri', to: '/patient/admissions', icon: 'mdi-calendar-clock' },
        { title: 'Profil', to: '/profile', icon: 'mdi-account' }
      ]
    },
    menuItems () {
      if (!this.userRole) {
        return []
      }

      const menuItems = {
        Doctor: this.doctorMenuItems,
        Patient: this.patientMenuItems
      }[this.userRole]

      return [
        { title: 'Anasayfa', to: '/', icon: 'mdi-home' },
        ...menuItems
      ]
    },
    isAuthPage () {
      return this.$route.path === '/auth/login' || this.$route.path === '/auth/register'
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
