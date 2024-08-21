<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="mb-4">
          <v-card-title>
            Hastane Doluluk Oranı
          </v-card-title>
          <v-card-text>
            <v-progress-circular
              :value="occupancyRate"
              color="primary"
              size="100"
              width="15"
              class="mr-4"
            >
              {{ occupancyRate }}%
            </v-progress-circular>
            <span>Hastanenin doluluk oranı: {{ occupancyRate }}%</span>
          </v-card-text>
        </v-card>

        <v-card v-if="hasAppointmentToday" class="mb-4">
          <v-card-title>
            Bugünkü Randevunuz
          </v-card-title>
          <v-card-text>
            <v-alert type="info" border="left" colored-border>
              Bugün saat {{ appointmentTime }}'de randevunuz var.
            </v-alert>
          </v-card-text>
        </v-card>

        <v-card v-else class="mb-4">
          <v-card-title>
            Bugün Randevunuz Yok
          </v-card-title>
          <v-card-text>
            <v-alert type="success" border="left" colored-border>
              Bugün için herhangi bir randevunuz bulunmamaktadır.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      totalAppointments: 100,
      currentAppointments: 75,
      hasAppointmentToday: true,
      appointmentTime: '14:30'
    }
  },
  computed: {
    occupancyRate () {
      return ((this.currentAppointments / this.totalAppointments) * 100).toFixed(2)
    }
  }
}
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}
</style>
