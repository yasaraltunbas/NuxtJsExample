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
            <strong>Tarih:</strong> {{ appointment.date | formatDate }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <strong>Şikayet:</strong> {{ appointment.reason }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn class="ma-2" block outlined color="primary" @click="onUpdated(appointment)">
            Randevunu güncelle
          </v-btn>
          <v-btn class="ma-2" block outlined color="error" @click="showDeleteDialog(appointment)">
            Randevunu iptal et
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">
          Randevuyu iptal etmek istediğinize emin misiniz?
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="confirmDelete">
            Evet
          </v-btn>
          <v-btn color="red darken-1" text @click="deleteDialog = false">
            Hayır
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  data () {
    return {
      deleteDialog: false,
      appointmentToDelete: null
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
    showDeleteDialog (appointment) {
      this.appointmentToDelete = appointment
      this.deleteDialog = true
    },

    confirmDelete () {
      this.deleteDialog = false
      if (this.appointmentToDelete) {
        this.$axios.delete(`/appointment/DeleteAppointment/${this.appointmentToDelete.id}`)
          .then(() => {
            console.log('Randevu başarıyla iptal edildi')
            this.$emit('appointmentDeleted', this.appointmentToDelete.id)
            this.appointmentToDelete = null
          })
          .catch((error) => {
            console.error('Randevu iptal edilirken hata oluştu:', error)
            this.appointmentToDelete = null
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
  .ma-2 {
    margin: 0.5rem;
    min-width: 150px;
  }
  </style>
