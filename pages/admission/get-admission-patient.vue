<template>
  <v-container>
    <h2>Yatış İşlemi Olan Hastalar</h2>
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
