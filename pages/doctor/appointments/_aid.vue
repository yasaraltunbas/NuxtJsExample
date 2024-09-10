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
                <strong>Randevu Durumu:</strong> {{ appointment.status | formatStatus }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <strong>Şikayet:</strong> {{ appointment.reason }}
              </v-list-item-subtitle>
              <v-list-item-action>
                <v-row justify="end">
                  <v-col cols="2">
                    <v-btn color="primary" block @click="addMedicalRecord(appointment.patientId, appointment.id)">
                      İşlem Ekle
                    </v-btn>
                  </v-col>
                  <v-col cols="2">
                    <v-btn color="primary" block @click="goToAddAdmission(appointment.patientId, appointment.id)">
                      Hasta İçin Yatış Ekleyin
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item-action>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <GetExAppointment :patient-id="appointment.patientId" />

        <GetAllMedicalRecord :patient-id="appointment.patientId" />
        <GetExAdmissionByDoctor :patient-id="appointment.patientId" />
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
import GetExAdmissionByDoctor from '~/components/GetExAdmissionByDoctor.vue'

export default {
  components: {
    GetExAppointment,
    GetAllMedicalRecord,
    GetExAdmissionByDoctor
  },
  data () {
    return {
      appointment: null
    }
  },
  async fetch () {
    const appointmentId = this.$route.params.aid
    try {
      const response = await this.$axios.get(`/api/appointment/detail/${appointmentId}`)
      if (response.status === 200) {
        this.appointment = response.data.data
      } else {
        console.error('Randevu bilgisi alınamadı.')
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error)
    }
  },
  methods: {
    addMedicalRecord (patientId, appointmentId) {
      this.$router.push({ path: '/doctor/medical-records/create', query: { patientId, appointmentId } })
    },
    goToAddAdmission (patientId, appointmentId) {
      this.$router.push({
        path: '/doctor/admissions/create',
        query: { patientId, appointmentId }
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
</style>
