<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="2">
        <h2>Hastanın Tıbbi Kayıtları</h2>

        <v-list>
          <v-list-item v-for="record in medicalRecords" :key="record.id">
            <v-list-item-content>
              <v-list-item-title>
                <strong>Tarih:</strong> {{ record.date }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <strong>Teşhis:</strong> {{ record.diagnosis }} <br>
                <strong>Tedavi:</strong> {{ record.treatment }} <br>
                <strong>İlaç:</strong> {{ record.medication }} <br>
                <strong>Notlar:</strong> {{ record.notes }}
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
    const { patientId } = this.$route.query
    return {
      medicalRecords: [],
      patientId
    }
  },
  created () {
    this.fetchMedicalRecords()
  },
  methods: {
    async fetchMedicalRecords () {
      try {
        const response = await this.$axios.get(`/medicalrecord/patient/${this.patientId}/medicalrecords`)
        this.medicalRecords = response.data
      } catch (error) {
        console.error('Error fetching medical records:', error)
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
