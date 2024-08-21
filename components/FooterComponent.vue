<template>
  <v-footer app color="primary" dark>
    <v-container>
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12" md="6">
          <span>&copy; 2024 Hastane App. Tüm hakları saklıdır.</span>
        </v-col>
        <v-col class="text-center" cols="12" md="6">
          <v-btn text to="/privacy-policy">
            Gizlilik Politikası
          </v-btn>
          <v-btn text to="/terms-of-service">
            Hizmet Şartları
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>
