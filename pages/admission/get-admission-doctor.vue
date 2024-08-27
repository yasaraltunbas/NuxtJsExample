<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h2>Yatış İşlemi Olan Hastalar</h2>
        <v-simple-table v-if="admissions.length" class="simple-table">
          <thead>
            <tr>
              <th class="text-left">
                Hasta Adı
              </th>
              <th class="text-left">
                Yatış Tarihi
              </th>
              <th class="text-left">
                Sebep
              </th>
              <th class="text-left">
                Durum
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="admission in admissions" :key="admission.id">
              <td>{{ admission.patientName }}</td>
              <td>{{ admission.date | formatDate }}</td>
              <td>{{ admission.reason }}</td>
              <td>{{ admission.status }}</td>
              <td>
                <v-btn color="red" @click="dischargePatient(admission.id)">
                  Taburcu Et
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      admissions: []
    }
  },
  created () {
    this.fetchPatients()
  },
  methods: {
    async fetchPatients () {
      try {
        const response = await this.$axios.get('/doctor/admissions')
        this.admissions = response.data.sort((a, b) => new Date(a.date) - new Date(b.date))

        this.admissions = response.data
      } catch (error) {
        console.error('Error fetching patients:', error)
      }
    },
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

.simple-table {
  width: 100%;
  border-collapse: collapse;
}
.v-btn {
  margin: 0;
}
</style>
