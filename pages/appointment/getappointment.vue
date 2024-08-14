<template>
  <div>
    <PatientAppointment v-if="role === 'Patient'" :user-appointments="userAppointments" />
    <DoctorAppointment v-else-if="role === 'Doctor'" :user-appointments="userAppointments" />
  </div>
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
            ...appointment,
            formattedDate: this.formatDate(appointment.date)
          }
        })
      } catch (error) {
        console.error('Error fetching user appointments:', error)
      }
    },
    formatDate (dateString) {
      const date = new Date(dateString)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      return `${day}.${month}.${year}${hours !== '00' || minutes !== '00' ? ` ${hours}:${minutes}` : ''}`
    }

  }
}
</script>
