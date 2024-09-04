<template>
  <v-container>
    <v-row>
      <v-col>
        <PatientAppointment :user-appointments="userAppointments" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import PatientAppointment from '~/components/PatientAppointment.vue'

export default {
  components: {
    PatientAppointment
  },
  data () {
    return {
      userAppointments: [],
      message: '',
      role: ''
    }
  },
  async fetch () {
    try {
      const userRoleResponse = await this.$axios.get('/auth/user')
      this.role = userRoleResponse.data.role

      const userAppointmentsResponse = await this.$axios.get('/patient/appointments')
      this.userAppointments = userAppointmentsResponse.data.sort((a, b) => new Date(a.date) - new Date(b.date))
    } catch (error) {
      console.error('Veriler alınırken hata oluştu:', error)
    }
  }
}
</script>
