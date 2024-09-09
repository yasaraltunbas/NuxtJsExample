<template>
  <v-container>
    <v-row>
      <v-col>
        <DoctorAppointment :user-appointments="userAppointments" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import DoctorAppointment from '~/components/DoctorAppointment.vue'
export default {
  components: {
    DoctorAppointment
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
      this.role = userRoleResponse.data.data.role

      const userAppointmentsResponse = await this.$axios.get('/doctor/appointments')
      this.userAppointments = userAppointmentsResponse.data.data.sort((a, b) => new Date(a.date) - new Date(b.date))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

}

</script>
