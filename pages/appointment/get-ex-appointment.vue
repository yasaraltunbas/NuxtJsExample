<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8" md="6">
        <h1>Geçmiş Randevular</h1>
        <v-simple-table v-if="appointments.length" class="ex-table">
          <thead>
            <tr>
              <th class="text-left">
                Tarih
              </th>
              <th class="text-left">
                Doktor
              </th>
              <th class="text-left">
                Bölüm
              </th>
              <th class="text-left">
                Ücret
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in appointments" :key="appointment.id">
              <td>{{ formatDate(appointment.date) }}</td>
              <td>{{ appointment.doctorName }}</td>
              <td>{{ appointment.departmentName }}</td>
              <td>{{ appointment.fee }}</td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-alert v-else type="info">
          Geçmiş randevularınız bulunmamaktadır.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      appointments: []
    }
  },
  created () {
    this.fetchAppointments()
  },
  methods: {
    async fetchAppointments () {
      try {
        const response = await this.$axios.get('/patient/exappointment')
        console.log('API Response:', response.data)
        this.appointments = response.data || []
        console.log('Appointments:', this.appointments)
      } catch (error) {
        console.error('Veriler alınırken hata oluştu:', error)
      }
    },
    formatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
      return new Date(date).toLocaleDateString(undefined, options)
    }
  }
}
</script>

  <style scoped>
  .v-container {
    max-width: 800px;
    margin: 0 auto;
  }
  .ex-table {
    margin-top: 20px;
  }
  </style>
