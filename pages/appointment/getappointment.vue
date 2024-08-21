<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8" md="4">
        <PatientAppointment v-if="role === 'Patient'" :user-appointments="userAppointments" />
        <DoctorAppointment v-else-if="role === 'Doctor'" :user-appointments="userAppointments" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PatientAppointment from '../../components/PatientAppointment.vue'
import DoctorAppointment from '../../components/DoctorAppointment.vue'

export default {
  components: {
    PatientAppointment,
    DoctorAppointment
  },

  data () {
    return {
      userAppointments: [],
      message: '',
      role: ''

    }
  },
  created () {
    this.fetchUserRole()
      .then(() => {
        this.fetchUserAppointments()
      })
  },
  methods: {
    async fetchUserRole () {
      try {
        const response = await this.$axios.get('/auth/user')
        const role = response.data.role
        this.role = role
        return role
      } catch (error) {
        console.error('Error fetching user role:', error)
      }
    },
    async fetchUserAppointments () {
      try {
        const endpoint = this.role === 'Doctor' ? '/doctor/appointments' : '/patient/appointments'
        const response = await this.$axios.get(endpoint)
        this.userAppointments = response.data.map((appointment) => {
          return {
            ...appointment
          }
        })
      } catch (error) {
        console.error('Error fetching user appointments:', error)
      }
    }

  }
}
</script>
