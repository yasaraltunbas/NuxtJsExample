<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Randevu Al</h1>
      </v-col>
    </v-row>
    <v-form @submit.prevent="createAppointment">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="appointment.departmentId"
            label="Bölüm"
            disabled
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="appointment.doctorId"
            label="Doktor"
            :items="doctors"
            item-text="fullName"
            item-value="id"
            required
          />
        </v-col>
        <v-col cols="12" md="6">
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
                label="Tarih"
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
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="appointment.reason"
            label="Sebep"
            required
          />
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" type="submit">
            Randevu Al
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-alert v-if="message" type="info">
      {{ message }}
    </v-alert>
  </v-container>
</template>

<script>
export default {
  data () {
    const { departmentId } = this.$route.query

    return {
      appointment: {

        departmentId,
        date: null,
        reason: ''
      },
      doctors: [],
      message: '',
      menu: false
    }
  },
  created () {
    this.fetchDoctors()
  },
  methods: {
    async createAppointment () {
      if (new Date(this.appointment.date) <= new Date()) {
        this.message = 'Geçerli bir tarih giriniz.'
        return
      }

      try {
        const response = await this.$axios.post('/appointment/create', this.appointment)
        console.log('Appointment created:', response.data)

        this.message = 'Randevu başarıyla oluşturuldu!'
        this.$router.push('/appointment/getappointment')
      } catch (error) {
        this.message = 'Randevu oluşturulurken hata oluştu: ' + error.response.data.message
      }
    },

    async fetchDoctors () {
      try {
        const response = await this.$axios.get(`/departments/${this.appointment.departmentId}/doctors`)
        this.doctors = response.data.map(doctor => ({
          ...doctor,
          fullName: `${doctor.firstName} ${doctor.lastName}`
        }))
      } catch (error) {
        console.error('Error fetching doctors:', error)
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
