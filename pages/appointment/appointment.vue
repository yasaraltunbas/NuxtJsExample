<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Randevu Al</h1>
      </v-col>
    </v-row>
    <v-alert v-if="message" type="error" dismissible @input="message = ''">
      {{ message }}
    </v-alert>
    <v-form ref="form" @submit.prevent="createAppointment">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="departmentName"
            label="Bölüm"
            disabled
          />
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="appointment.doctorId"
            label="Doktor"
            :items="doctors"
            item-text="fullName"
            item-value="id"
            required
            @change="validateForm"
          />
        </v-col>
        <v-col cols="12">
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
                @input="validateForm"
              />
            </template>
            <v-date-picker
              v-model="appointment.date"
              @input="menu = false; validateForm"
            />
          </v-menu>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="appointment.reason"
            label="Şikayet"
            required
            @input="validateForm"
          />
        </v-col>
        <v-col cols="12" class="text-right">
          <v-btn :disabled="!formValid" color="primary" type="submit">
            Randevu Al
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data () {
    const { departmentId } = this.$route.query
    const { departmentName } = this.$route.query

    return {
      formValid: false,
      appointment: {
        departmentId,
        doctorId: null,
        date: null,
        reason: ''
      },
      departmentName,
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
    },

    validateForm () {
      this.formValid = this.appointment.doctorId !== null &&
                       this.appointment.date !== null &&
                       this.appointment.reason.trim() !== ''
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
