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
        const response = await this.$axios.get('/doctor/appointments')
        this.upcomingAppointments = response.data.sort((a, b) => new Date(a.date) - new Date(b.date))

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
