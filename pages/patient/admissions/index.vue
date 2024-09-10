<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h2>Yatış İşlemleriniz</h2>
        <v-data-table
          v-if="admissions.length"
          :headers="headers"
          :items="admissions"
          :items-per-page="5"
          class="elevation-1"
        >
          <template #item.date="{ item }">
            {{ item.date | formatDate }}
          </template>
          <template #item.status="{ item }">
            {{ item.status | formatAdmissionStatus }}
          </template>
        </v-data-table>
        <v-alert v-else type="info">
          Yatış işlemleriniz bulunmamaktadır.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      admissions: [],
      headers: [
        { text: 'Yatış Tarihi', value: 'date', align: 'start' },
        { text: 'Sebep', value: 'reason' },
        { text: 'Durum', value: 'status' }
      ]
    }
  },

  async fetch () {
    try {
      const admissionsResponse = await this.$axios.get('/api/patient/admissions')
      this.admissions = admissionsResponse.data.data.sort((a, b) => new Date(b.date) - new Date(a.date))
    } catch (error) {
      console.error('Veriler alınırken hata oluştu:', error)
    }
  }
}
</script>

<style scoped>
.elevation-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>
