<template>
  <v-app>
    <HeaderComponent />
    <v-main app>
      <v-container class="pt-0 pb-10 pb-md-0 h-100">
        <nuxt />
      </v-container>
    </v-main>
    <FooterComponent />
  </v-app>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
export default {
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style scoped>
.default-c {
  padding: 0 ;
  margin: 0 ;
}

</style>
