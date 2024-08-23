<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h2>Yatış İşlemleriniz</h2>
        <v-simple-table v-if="admissions.length" class="simple-table">
          <thead>
            <tr>
              <th class="text-left">
                Yatış Tarihi
              </th>
              <th class="text-left">
                Sebep
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="admission in admissions" :key="admission.id">
              <td>{{ admission.date | formatDate }}</td>
              <td>{{ admission.reason }}</td>
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
        const response = await this.$axios.get('/patient/admissions')
        this.admissions = response.data
      } catch (error) {
        console.error('Error fetching patients:', error)
      }
    }
  }
}
</script>

<style>
.simple-table {
  width: 100%;
  border-collapse: collapse;
}
</style>
