<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Geçmiş Muayene Kayıtları</h2>
      </v-col>
    </v-row>
    <v-row v-if="medicalRecords.length">
      <v-col cols="12">
        <v-simple-table class="ex-table">
          <thead>
            <tr>
              <th class="text-left">
                Hasta Adı
              </th>
              <th class="text-left">
                Tanı
              </th>
              <th class="text-left">
                Tedavi
              </th>
              <th class="text-left">
                İlaç
              </th>
              <th class="text-left">
                Not
              </th>
              <th class="text-left">
                Tarih
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in medicalRecords" :key="record.id">
              <td>{{ record.patientName }}</td>
              <td>{{ record.diagnosis }}</td>
              <td>{{ record.treatment }}</td>
              <td>{{ record.medication }}</td>
              <td>{{ record.notes }}</td>
              <td>{{ record.date | formatDate }}</td>
            </tr>
          </tbody>
        </v-simple-table>
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
      medicalRecords: []
    }
  },

  async fetch () {
    try {
      const response = await this.$axios.get(`patient/${this.patientId}/exmedicalrecord`)
      if (response.status === 200) {
        this.medicalRecords = response.data
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
  </style>
