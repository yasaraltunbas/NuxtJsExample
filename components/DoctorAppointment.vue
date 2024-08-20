<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Mevcut Randevular</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-list>
          <v-list-item
            v-for="appointment in userAppointments"
            :key="appointment.id"
          >
            <v-list-item-content>
              <v-list-item-title>
                <strong>Hasta:</strong> {{ appointment.patient.firstName }} {{ appointment.patient.lastName }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <strong>Tarih:</strong> {{ appointment.formattedDate }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <strong>Şikayet:</strong> {{ appointment.reason }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn color="primary" block @click="viewDetails(appointment.patient.id)">
                Detay
              </v-btn>
              <v-btn color="secondary" block @click="addMedicalRecord(appointment.patient.id, appointment.id)">
                İşlem Ekle
              </v-btn>
              <v-btn color="error" block @click="goToAddAdmission(appointment.patientId)">
                Hasta İçin Yatış Ekleyin
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    userAppointments: {
      type: Array,
      required: true
    },
    doctorId: {
      type: Number,
      required: true
    },
    departmentId: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      appointments: [],
      patient: []
    }
  },
  methods: {
    viewDetails (patientId) {
      this.$router.push({ path: '/medicalrecord/get-medicalrecord', query: { patientId } })
    },
    addMedicalRecord (patientId, appointmentId) {
      this.$router.push({ path: '/medicalrecord/add-medicalrecord', query: { patientId, appointmentId } })
    },
    goToAddAdmission (patientId) {
      this.$router.push({
        path: '/admission/add-admission',
        query: { doctorId: this.doctorId, departmentId: this.departmentId, patientId }
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
