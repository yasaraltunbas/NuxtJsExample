<template>
  <v-container fluid class="default-c">
    <v-app>
      <v-row aling="center" justify="center">
        <v-col cols="12" md="12">
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <HeaderComponent />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
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
.default-c {
  padding: 0 ;
  margin: 0 ;
}
</style>
