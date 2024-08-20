<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <HeaderComponent />

          <FooterComponent />
        </v-col>
      </v-row>
    </v-container>
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
