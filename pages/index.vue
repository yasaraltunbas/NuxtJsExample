<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <component :is="userRole === 'Patient' ? 'patient-home' : 'doctor-home'" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PatientHome from '~/components/PatientHome.vue'
import DoctorHome from '~/components/DoctorHome.vue'

export default {
  components: {
    PatientHome,
    DoctorHome
  },
  data () {
    return {
      userRole: 'Patient'
    }
  }
}
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}
</style>
