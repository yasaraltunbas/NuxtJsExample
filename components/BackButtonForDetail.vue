<template>
  <v-btn color="primary" @click="goBack">
    Geri Dön
  </v-btn>
</template>

<script>
export default {
  name: 'BackButtonForDetail',

  data () {
    const { appointmentId } = this.$route.query

    return {
      appointmentId // appointmentId'yi doğrudan data'da sakla
    }
  },
  methods: {
    goBack () {
      this.$router.push(`/doctor/appointments/${this.appointmentId}`)
    }
  }
}
</script>

  <style scoped>
  .v-btn {
    margin: 10px;
  }
  </style>
