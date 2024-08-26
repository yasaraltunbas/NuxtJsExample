<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Geçmiş Randevular</h2>
      </v-col>
    </v-row>
    <v-row v-if="appointments.length">
      <v-col cols="12">
        <v-simple-table class="ex-table">
          <thead>
            <tr>
              <th class="text-left">
                Tarih
              </th>

              <th class="text-left">
                Bölüm
              </th>

              <th class="text-left">
                Durum
              </th>
              <th class="text-left">
                Şikayet
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in appointments" :key="appointment.id">
              <td>{{ appointment.date | formatDate }}</td>
              <td>{{ appointment.departmentName }}</td>
              <td>{{ appointment.status | formatStatus }}</td>
              <td>{{ appointment.reason }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-alert type="info">
          Geçmiş randevu bulunamadı.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    patientId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      appointments: []
    }
  },
  created () {
    console.log('Patient ID:', this.patientId)
    this.fetchAppointments()
  },
  methods: {
    async fetchAppointments () {
      try {
        const response = await this.$axios.get(`patient/${this.patientId}/appointments`)
        if (response.status === 200) {
          this.appointments = response.data.sort((a, b) => new Date(a.date) - new Date(b.date))
        } else {
          console.error('Randevu bilgisi alınamadı.')
        }
      } catch (error) {
        console.error('Bir hata oluştu:', error)
      }
    },
    translateStatus (status) {
      const statusMap = {
        pending: 'Beklemede',
        confirmed: 'Onaylandı',
        cancelled: 'İptal Edildi'
      }
      return statusMap[status] || status
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
