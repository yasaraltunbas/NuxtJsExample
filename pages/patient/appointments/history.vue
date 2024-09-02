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
                Böl
              </th>
              <th class="text-left">
                Ücret
              </th>
              <th class="text-left">
                Durum
              </th>
              <th class="text-left">
                Detay
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in appointments" :key="appointment.id">
              <td>{{ appointment.date | formatDate }}</td>
              <td>{{ appointment.doctorName }}</td>
              <td>{{ appointment.departmentName }}</td>
              <td>{{ appointment.fee }}</td>
              <td>{{ appointment.status | formatStatus }}</td>
              <td>
                <v-btn color="primary" @click="goToDetails(appointment)">
                  Detay
                </v-btn>
              </td>
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
        this.upcomingAppointments = response.data.sort((a, b) => new Date(a.date) - new Date(b.date))

        this.appointments = response.data
        console.log('Appointments:', this.appointments)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      }
    },
    goToDetails (appointment) {
      this.$router.push({ path: '/medicalrecord/get-ex-medicalrecord', query: { appointmentId: appointment.id } })
    }

  }
}
</script>
