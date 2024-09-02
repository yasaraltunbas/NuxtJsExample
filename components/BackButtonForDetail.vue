<template>
  <v-btn color="primary" @click="goBack">
    Geri Dön
  </v-btn>
</template>

<script>
export default {
  name: 'BackButtonForDetail',

  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

  <style scoped>
  .v-btn {
    margin: 10px;
  }
  </style>
