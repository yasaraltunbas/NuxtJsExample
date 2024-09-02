<template>
  <v-container>
    <h1>Randevu Güncelle</h1>
    <v-form @submit.prevent="updateAppointment">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            v-model="appointment.date"
            label="Tarih "
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            required
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="appointment.date"
          @input="menu = false"
        />
      </v-menu>
      <v-text-field
        v-model="appointment.reason"
        label="Şikayet"
        required
      />
    </v-form>
    <v-alert v-if="message" type="info">
      {{ message }}
    </v-alert>
    <v-row>
      <v-col cols="12" class="text-right">
        <v-btn color="primary" @click="showDialog = true">
          Randevuyu Güncelle
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="showDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">
          Randevuyu Güncellemek İstiyor Musunuz?
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="confirmUpdate">
            Evet
          </v-btn>
          <v-btn color="red darken-1" text @click="showDialog = false">
            Hayır
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data () {
    const { appointmentId } = this.$route.query

    return {
      appointment: {
        doctorId: '',
        date: null,
        reason: '',
        appointmentId
      },
      message: '',
      menu: false,
      showDialog: false
    }
  },
  created () {
    this.fetchAppointmentDetails()
  },
  methods: {
    updateAppointment () {
      if (new Date(this.appointment.date) <= new Date()) {
        this.message = 'Geçerli bir tarih giriniz.'
        return
      }
      this.showDialog = true
    },

    async confirmUpdate () {
      this.showDialog = false
      try {
        const response = await this.$axios.put(`/appointment/AppointmentUpdate/${this.$route.query.appointmentId}`, this.appointment)
        console.log('Appointment updated:', response.data)

        this.message = 'Randevu başarıyla güncellendi!'
        this.$router.push('/getappointment')
      } catch (error) {
        this.message = 'Randevu güncellenirken hata oluştu: ' + error.response.data.message
      }
    },

    async fetchAppointmentDetails () {
      try {
        const response = await this.$axios.get(`/appointment/${this.$route.query.appointmentId}`)
        const appointmentData = response.data.data
        this.appointment.date = appointmentData.date.split('T')[0]
        this.appointment.reason = appointmentData.reason
      } catch (error) {
        console.error('Error fetching appointment details:', error)
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
