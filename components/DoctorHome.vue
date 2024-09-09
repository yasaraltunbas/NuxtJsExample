<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1>Anasayfa</h1>
        <div v-if="upcomingAppointments.length">
          <v-alert
            v-for="appointment in upcomingAppointments"
            :key="appointment.id"
            type="info"
            class="mb-3"
          >
            <strong>Tarih:</strong> {{ appointment.date | formatDate }}<br>
            <strong>Hasta:</strong> {{ appointment.patientName }}<br>
          </v-alert>
        </div>
        <v-alert v-else type="info">
          Yaklaşan randevunuz bulunmamaktadır.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      upcomingAppointments: []
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get('/appointment/doctorcurrentweek')
      this.upcomingAppointments = response.data.data.sort((a, b) => new Date(a.date) - new Date(b.date))
      console.log('Upcoming Appointments:', this.upcomingAppointments)
    } catch (error) {
      console.error('Error fetching upcoming appointments:', error)
    }
  }

}
</script>

  <style scoped>
  .mb-3 {
    margin-bottom: 1rem;
  }
  </style>
