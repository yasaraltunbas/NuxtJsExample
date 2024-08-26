<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Randevu Detayları</h2>
      </v-col>
    </v-row>
    <v-row v-if="appointment">
      <v-col cols="12">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <strong>Bölüm:</strong> {{ appointment.departmentName }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <strong>Hasta Adı:</strong> {{ appointment.patientName }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <strong>Randevu Tarihi:</strong> {{ appointment.date | formatDate }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <strong>Randevu Durumu:</strong> {{ appointment.status }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <strong>Şikayet:</strong> {{ appointment.reason }}
              </v-list-item-subtitle>
              <v-list-item-action>
                <v-btn color="secondary" block @click="addMedicalRecord(appointment.patientId, appointment.id)">
                  İşlem Ekle
                </v-btn>
                <v-btn color="error" block @click="goToAddAdmission(appointment.patientId)">
                  Hasta İçin Yatış Ekleyin
                </v-btn>
              </v-list-item-action>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <GetExAppointment :patient-id="appointment.patientId" />

        <GetAllMedicalRecord :patient-id="appointment.patientId" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-alert type="error">
          Randevu bilgisi bulunamadı.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GetExAppointment from '~/components/GetExAppointment.vue'
import GetAllMedicalRecord from '~/components/GetAllMedicalRecord.vue'

export default {
  components: {
    GetExAppointment,
    GetAllMedicalRecord
  },
  data () {
    return {
      appointment: null
    }
  },
  created () {
    this.fetchAppointmentDetails()
  },
  methods: {
    async fetchAppointmentDetails () {
      const appointmentId = this.$route.params.aid
      try {
        const response = await this.$axios.get(`/appointment/detail/${appointmentId}`)
        if (response.status === 200) {
          this.appointment = response.data
        } else {
          console.error('Randevu bilgisi alınamadı.')
        }
      } catch (error) {
        console.error('Bir hata oluştu:', error)
      }
    },
    addMedicalRecord (patientId, appointmentId) {
      this.$router.push({ path: '/medicalrecord/add-medicalrecord', query: { patientId, appointmentId } })
    },
    goToAddAdmission (patientId) {
      this.$router.push({
        path: '/admission/add-admission',
        query: { patientId }
      })
    }
  }
}
</script>

<style scoped>
.v-container {
  max-width: 800px;
  margin: 0 auto;
}
.v-btn {
  min-width: 150px;
  margin-bottom: 5px;
}
.v-list-item-action {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
