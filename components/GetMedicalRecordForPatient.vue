<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <h2 class="text-center">
          Hastanın Tıbbi Kayıtları
        </h2>
        <v-list two-line>
          <v-list-item v-for="record in medicalRecords" :key="record.id" class="mb-4">
            <v-list-item-content>
              <v-list-item-title>
                <strong>Tarih:</strong> {{ record.date | formatDate }}
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
  props: {
    appointmentId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      medicalRecords: []
    }
  },
  created () {
    this.fetchMedicalRecords()
  },
  methods: {
    async fetchMedicalRecords () {
      try {
        const response = await this.$axios.get(`/medicalrecord/appointment/${this.appointmentId}`)
        this.medicalRecords = response.data
      } catch (error) {
        console.error('Error fetching medical records:', error)
      }
    }
  }
}
</script>

<style scoped>
.v-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.text-center {
  text-align: center;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>
