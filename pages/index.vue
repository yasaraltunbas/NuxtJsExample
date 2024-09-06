<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <component :is="role === 'Patient' ? 'patient-home' : (role === 'Doctor' ? 'doctor-home': '')" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PatientHome from '~/components/PatientHome.vue'
import DoctorHome from '~/components/DoctorHome.vue'

export default {
  components: {
    PatientHome,
    DoctorHome
  },
  data () {
    return {
      role: ''
    }
  },

  async fetch () {
    try {
      const userRoleResponse = await this.$axios.get('/auth/user')
      this.role = userRoleResponse.data.data.role
    } catch (error) {
      console.error('Veriler alınırken hata oluştu:', error)
    }
  }
}
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}
</style>
