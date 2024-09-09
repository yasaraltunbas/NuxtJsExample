<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8" md="6">
        <h1>Geçmiş Randevular</h1>
        <v-data-table
          v-if="appointments.length"
          :headers="headers"
          :items="appointments"
          :items-per-page="5"
          class="elevation-1"
        >
          <template #item.date="{ item }">
            {{ item.date | formatDate }}
          </template>
          <template #item.status="{ item }">
            {{ item.status | formatStatus }}
          </template>
          <template #item.action="{ item }">
            <v-btn color="primary" @click="goToDetails(item.id)">
              Detay
            </v-btn>
          </template>
        </v-data-table>
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
      appointments: [],
      headers: [
        { text: 'Tarih', value: 'date', align: 'start' },
        { text: 'Doktor', value: 'doctorName' },
        { text: 'Bölüm', value: 'departmentName' },
        { text: 'Ücret', value: 'fee' },
        { text: 'Durum', value: 'status' },
        { text: 'Detay', value: 'action', sortable: false, width: '100px' }
      ]
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get('/patient/exappointment')
      this.appointments = response.data.data.sort((a, b) => new Date(a.date) - new Date(b.date))
      console.log('Appointments:', this.appointments)
    } catch (error) {
      console.error('Error fetching appointments:', error)
    }
  },
  methods: {
    goToDetails (appointmentId) {
      this.$router.push({ path: `/patient/appointments/${appointmentId}` })
    }
  }
}
</script>

<style scoped>
.elevation-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>
