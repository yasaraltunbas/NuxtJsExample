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
                <strong>Doktor Adı:</strong> {{ appointment.doctorName }}
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
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <GetMedicalRecordForPatient :appointment-id="appointment.id" />
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
import GetMedicalRecordForPatient from '~/components/GetMedicalRecordForPatient.vue'

export default {
  components: {
    GetMedicalRecordForPatient
  },
  data () {
    return {
      appointment: null,
      medicalRecords: []
    }
  },
  async fetch () {
    const appointmentId = this.$route.params.aid

    try {
      const [medicalRecordsResponse, appointmentDetailsResponse] = await Promise.all([
        this.$axios.get(`/api/medicalrecord/appointment/${appointmentId}`),
        this.$axios.get(`/api/appointment/detail/${appointmentId}`)
      ])

      this.medicalRecords = medicalRecordsResponse.data.data || []
      this.appointment = appointmentDetailsResponse.data.data
    } catch (error) {
    }
  }
}
</script>
