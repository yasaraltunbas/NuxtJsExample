<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="3">
        <h2>Yatış İşlemleriniz</h2>
        <v-list>
          <v-list-item v-for="admission in admissions" :key="admission.id">
            <v-list-item-content>
              <v-list-item-subtitle>
                <strong>Yatış Tarihi:</strong> {{ admission.date }} <br>
                <strong>Sebep:</strong> {{ admission.reason }} <br>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
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

    <style scoped>
    .container {
      padding: 20px;
    }
    </style>
