<template>
  <v-container>
    <h1>Geçmiş Muayene Kayıtları</h1>
    <v-simple-table v-if="medicalRecords.length">
      <thead>
        <tr>
          <th class="text-left">
            Tarih
          </th>
          <th class="text-left">
            Doktor
          </th>
          <th class="text-left">
            Teşhis
          </th>
          <th class="text-left">
            Tedavi
          </th>
          <th class="text-left">
            Notlar
          </th>
          <th class="text-left">
            İlaç
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ms in medicalRecords" :key="ms.id">
          <td>{{ formatDate(ms.date) }}</td>
          <td>{{ ms.doctorName }}</td>
          <td>{{ ms.diagnosis }}</td>
          <td>{{ ms.treatment }}</td>
          <td>{{ ms.notes }}</td>
          <td>{{ ms.medication }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-alert v-else type="info">
      Geçmiş muayene kaydınız bulunmamaktadır.
    </v-alert>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      medicalRecords: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      try {
        const response = await this.$axios.get('/patient/account')
        console.log('API Response:', response.data)
        this.medicalRecords = response.data || []
        console.log('Medical Records:', this.medicalRecords)
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
