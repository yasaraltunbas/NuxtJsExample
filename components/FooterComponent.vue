<template>
  <v-footer app color="primary" dark>
    <div class="d-flex flex-wrap align-center">
      <span>&copy; 2024 Hastane App. Tüm hakları saklıdır.</span>

      <v-spacer />

      <v-btn text to="/privacy-policy">
        Gizlilik Politikası
      </v-btn>
      <v-btn text to="/terms-of-service">
        Hizmet Şartları
      </v-btn>
    </div>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>
