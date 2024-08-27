<template>
  <v-container>
    <h2>Yeni Tıbbi Kayıt Ekle</h2>
    <v-form v-model="formValid" @submit.prevent="saveMedicalRecord">
      <v-text-field
        v-model="medicalRecord.diagnosis"
        label="Teşhis"
        :rules="[v => !!v || 'Bu alan zorunludur']"
        required
      />
      <v-text-field
        v-model="medicalRecord.treatment"
        label="Tedavi"
        :rules="[v => !!v || 'Bu alan zorunludur']"
        required
      />
      <v-text-field
        v-model="medicalRecord.medication"
        label="İlaç"
        :rules="[v => !!v || 'Bu alan zorunludur']"
        required
      />
      <v-textarea
        v-model="medicalRecord.notes"
        label="Notlar"
        :rules="[v => !!v || 'Bu alan zorunludur']"
        required
      />
      <v-btn type="submit" color="primary" :disabled="!formValid">
        Kaydet
      </v-btn>
      <back-button-for-detail />
    </v-form>
    <v-alert v-if="message" type="success" dismissible>
      {{ message }}
    </v-alert>
  </v-container>
</template>

<script>
import BackButtonForDetail from '~/components/BackButtonForDetail.vue'
export default {
  components: {
    BackButtonForDetail
  },
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
      message: '',
      formValid: false
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
        this.$router.push('/doctor/appointments/_aid')
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
