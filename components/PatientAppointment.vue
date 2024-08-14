<template>
  <v-container>
    <h2>Mevcut Randevularım</h2>
    <v-list>
      <v-list-item
        v-for="appointment in userAppointments"
        :key="appointment.id"
      >
        <v-list-item-content>
          <v-list-item-title>
            <strong>Bölüm:</strong> {{ appointment.department.departmentName }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <strong>Doktor:</strong> {{ appointment.doctor.firstName }} {{ appointment.doctor.lastName }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <strong>Tarih:</strong> {{ appointment.formattedDate }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <strong>Şikayet:</strong> {{ appointment.reason }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn class="ma-2" outlined color="primary" @click="onUpdated(appointment)">
            Randevunu güncelle
          </v-btn>
          <v-btn class="ma-2" outlined color="error" @click="onDeleted(appointment)">
            Randevunu iptal et
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: 'PatientAppointment',
  props: {
    userAppointments: {
      type: Array,
      required: true
    }
  },
  methods: {
    onUpdated (appointment) {
      this.$router.push({
        path: '/appointment/appointment-update',
        query: {
          appointmentId: appointment.id
        }
      })
    },
    onDeleted (appointment) {
      const confirmDelete = confirm('Randevuyu iptal etmek istediğinize emin misiniz?')
      if (confirmDelete) {
        this.$axios.delete(`/appointment/DeleteAppointment/${appointment.id}`)
          .then(() => {
            console.log('Randevu başarıyla iptal edildi')
            this.$emit('appointmentDeleted', appointment.id)
          })
          .catch((error) => {
            console.error('Randevu iptal edilirken hata oluştu:', error)
          })
      }
    }
  }
}
</script>

  <style scoped>
  .v-container {
    max-width: 800px;
    margin: 0 auto;
  }
  </style>
