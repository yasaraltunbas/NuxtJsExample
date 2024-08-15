<template>
  <v-container>
    <h2>Yeni Tıbbi Kayıt Ekle</h2>
    <v-form @submit.prevent="saveMedicalRecord">
      <v-text-field
        v-model="medicalRecord.diagnosis"
        label="Teşhis"
        required
      />
      <v-text-field
        v-model="medicalRecord.treatment"
        label="Tedavi"
        required
      />
      <v-text-field
        v-model="medicalRecord.medication"
        label="İlaç"
        required
      />
      <v-textarea
        v-model="medicalRecord.notes"
        label="Notlar"
        required
      />
      <v-btn type="submit" color="primary">
        Kaydet
      </v-btn>
    </v-form>
    <v-alert v-if="message" type="success" dismissible>
      {{ message }}
    </v-alert>
  </v-container>
</template>

<script>
export default {
  data () {
    const { patientId, appointmentId } = this.$route.query

    return {
      medicalRecord: {
        patientId,
        doctorId: null,
        appointmentId,
        diagnosis: '',
        treatment: '',
        medication: '',
        notes: '',
        date: new Date().toISOString().slice(0, 16)
      },
      message: ''
    }
  },
  created () {
    this.medicalRecord.doctorId = this.$auth.user.id
  },
  methods: {
    async saveMedicalRecord () {
      try {
        console.log('medicalRecord:', this.medicalRecord)
        await this.$axios.post('/medicalrecord/AddMedicalRecord', this.medicalRecord)
        this.message = 'Tıbbi kayıt başarıyla kaydedildi!'
        this.$router.push('/components/DoctorAppointment')
      } catch (error) {
        this.message = 'Tıbbi kayıt kaydedilirken hata oluştu: ' + error.response.data.message
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
