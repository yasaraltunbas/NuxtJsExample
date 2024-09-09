<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Geçmiş Muayene Kayıtları</h2>
      </v-col>
    </v-row>
    <v-row v-if="medicalRecords.length">
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="medicalRecords"
          :items-per-page="5"
          class="elevation-1"
        >
          <template #item.date="{ item }">
            {{ item.date | formatDate }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-alert type="info">
          No medical records found.
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
      medicalRecords: [],
      headers: [
        { text: 'Hasta Adı', value: 'patientName', align: 'start' },
        { text: 'Tanı', value: 'diagnosis' },
        { text: 'Tedavi', value: 'treatment' },
        { text: 'İlaç', value: 'medication' },
        { text: 'Not', value: 'notes' },
        { text: 'Tarih', value: 'date' }
      ]
    }
  },

  async fetch () {
    try {
      const response = await this.$axios.get(`patient/${this.patientId}/exmedicalrecord`)
      if (response.status === 200) {
        this.medicalRecords = response.data.data
      } else {
        console.error('Medical records could not be retrieved.')
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }
}
</script>

<style scoped>
.v-container {
  max-width: 800px;
  margin: 0 auto;
}
.elevation-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>
