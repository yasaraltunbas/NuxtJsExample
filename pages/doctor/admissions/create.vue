<template>
  <v-container>
    <h1>Add Admission</h1>
    <v-form v-model="formValid" @submit.prevent="submitAdmission">
      <v-text-field
        v-model="admission.reason"
        label="Sebep"
        :rules="[v => !!v || 'Bu alan zorunludur']"
        required
      />
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
            v-model="admission.dischargeDate"
            label="Yatış Tarihi"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            :rules="[v => !!v || 'Bu alan zorunludur']"
            required
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="admission.dischargeDate"
          @input="menu = false"
        />
      </v-menu>
      <v-btn type="submit" color="primary" :disabled="!formValid">
        Onayla
      </v-btn>
      <back-button-for-detail />
    </v-form>
  </v-container>
</template>

<script>
import BackButtonForDetail from '~/components/BackButtonForDetail.vue'
export default {
  components: {
    BackButtonForDetail
  },
  data () {
    const { doctorId, departmentId, patientId, appointmentId } = this.$route.query
    return {
      admission: {
        doctorId,
        departmentId,
        patientId,
        reason: '',
        dischargeDate: '',
        appointmentId
      },
      formValid: false,
      menu: false

    }
  },
  methods: {
    submitAdmission () {
      this.$axios.post('/api/admission/create', this.admission)
        .then((response) => {
          console.log('Admission added:', response.data)
          this.$router.push(`/doctor/appointments/${this.admission.appointmentId}`)
        })
        .catch((error) => {
          console.error('Error adding admission:', error)
        })
    }
  }
}
</script>

  <style scoped>
  .admission-form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  h1 {
    text-align: center;
    color: #333;
  }

  .submit-button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  .submit-button:hover {
    background-color: #0056b3;
  }
  </style>
