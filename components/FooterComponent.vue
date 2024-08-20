<template>
  <v-footer app color="primary" dark>
    <v-container>
      <v-row>
        <v-col class="text-center">
          <span>&copy; 2024 Hastane App. Tüm hakları saklıdır.</span>
        </v-col>
        <v-col class="text-center">
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
