<template>
  <v-container>
    <h1>Randevu Güncelle</h1>
    <v-form @submit.prevent="updateAppointment">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            v-model="appointment.date"
            label="Tarih"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            required
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="appointment.date"
          @input="menu = false"
        />
      </v-menu>
      <v-text-field
        v-model="appointment.reason"
        label="Sebep"
        required
      />
      <v-btn color="primary" type="submit">
        Randevuyu Güncelle
      </v-btn>
    </v-form>
    <v-alert v-if="message" type="info">
      {{ message }}
    </v-alert>
  </v-container>
</template>

<script>
export default {
  data () {
    const { departmentId, appointmentId } = this.$route.query

    return {
      appointment: {
        doctorId: '',
        departmentId,
        date: null,
        reason: '',
        appointmentId
      },
      doctors: [],
      message: '',
      menu: false
    }
  },
  created () {
    this.fetchDoctors()
    this.fetchAppointmentDetails()
  },
  methods: {
    async updateAppointment () {
      if (new Date(this.appointment.date) <= new Date()) {
        this.message = 'Geçerli bir tarih giriniz.'
        return
      }

      try {
        const response = await this.$axios.put(`/appointment/update/${this.$route.query.appointmentId}`, this.appointment)
        console.log('Appointment updated:', response.data)

        this.message = 'Randevu başarıyla güncellendi!'
        this.$router.push('/getappointment')
      } catch (error) {
        this.message = 'Randevu güncellenirken hata oluştu: ' + error.response.data.message
      }
    },

    async fetchDoctors () {
      try {
        const response = await this.$axios.get(`/departments/${this.appointment.departmentId}/doctors`)
        this.doctors = response.data.map(doctor => ({
          ...doctor,
          fullName: `${doctor.firstName} ${doctor.lastName}`
        }))
      } catch (error) {
        console.error('Error fetching doctors:', error)
      }
    },

    async fetchAppointmentDetails () {
      try {
        const response = await this.$axios.get(`/appointment/${this.$route.query.appointmentId}`)
        this.appointment = response.data
      } catch (error) {
        console.error('Error fetching appointment details:', error)
      }
    }
  }
}
</script>

  <style scoped>
  .v-container {
    max-width: 800px;
    margin: 0 auto;
  }
  </style>
