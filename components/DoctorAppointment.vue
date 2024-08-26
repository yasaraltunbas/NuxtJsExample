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
            v-for="appointment in sortedAppointments"
            :key="appointment.id"
          >
            <v-list-item-content>
              <v-list-item-title>
                <strong>Hasta:</strong> {{ appointment.patient.firstName }} {{ appointment.patient.lastName }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <strong>Tarih:</strong> {{ appointment.date | formatDate }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <strong>Şikayet:</strong> {{ appointment.reason }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <strong>Durum:</strong> {{ appointment.status | formatStatus }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn color="primary" block @click="viewDetails(appointment.id)">
                Detay
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
    }
  },
  computed: {
    sortedAppointments () {
      return this.userAppointments.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
    }
  },
  methods: {
    viewDetails (appointmentId) {
      this.$router.push({ path: `/doctor/appointments/${appointmentId}` })
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
