<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h2>Yatış İşlemi Olan Hastalar</h2>
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
            {{ item.status }}
          </template>
          <template #item.action="{ item }">
            <v-btn color="red" @click="dischargePatient(item.id)">
              Taburcu Et
            </v-btn>
          </template>
        </v-data-table>
        <v-alert v-else type="info">
          Yatış işlemi olan hastalar bulunmamaktadır.
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
        { text: 'Hasta Adı', value: 'patientName', align: 'start' },
        { text: 'Yatış Tarihi', value: 'date' },
        { text: 'Sebep', value: 'reason' },
        { text: 'Durum', value: 'status' },
        { text: 'İşlem', value: 'action', sortable: false, width: '100px' }
      ]
    }
  },

  async fetch () {
    try {
      const admissionsResponse = await this.$axios.get('/doctor/admissions')
      this.admissions = admissionsResponse.data.sort((a, b) => new Date(b.date) - new Date(a.date))
    } catch (error) {
      console.error('Error fetching patients:', error)
    }
  },
  methods: {
    async dischargePatient (admissionId) {
      try {
        await this.$axios.delete(`/admission/discharge/${admissionId}`)
        this.admissions = this.admissions.filter(admission => admission.id !== admissionId)
      } catch (error) {
        console.error('Error discharging patient:', error)
      }
    }
  }
}
</script>

<style scoped>
.elevation-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.v-btn {
  margin: 0;
}
</style>
