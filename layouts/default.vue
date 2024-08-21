<template>
  <v-container fluid class="no-padding">
    <v-app>
      <v-row justify="center" class="no-padding">
        <v-col cols="12" md="12" class="no-padding">
          <v-container fluid class="no-padding">
            <v-row class="no-padding">
              <v-col cols="12" class="no-padding">
                <HeaderComponent />
              </v-col>
            </v-row>
            <v-row class="no-padding">
              <v-col cols="12" class="no-padding">
                <FooterComponent />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-app>
  </v-container>
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
.no-padding {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
