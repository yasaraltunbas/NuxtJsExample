<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Geçmiş Yatış Kayıt</h2>
      </v-col>
    </v-row>
    <v-row v-if="pastAdmissions.length">
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="pastAdmissions"
          :items-per-page="5"
          class="elevation-1"
        >
          <template #item.date="{ item }">
            {{ item.date | formatDate }}
          </template>
          <template #item.status="{ item }">
            {{ item.status | formatAdmissionStatus }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-alert type="info">
          Geçmiş yatış bulunamadı.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    patientId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      pastAdmissions: [],
      headers: [
        { text: 'Hasta Adı', value: 'patientName', align: 'start' },
        { text: 'Tarih', value: 'date' },
        { text: 'Bölüm', value: 'departmentName' },
        { text: 'Durum', value: 'status' },
        { text: 'Şikayet', value: 'reason' }
      ]
    }
  },

  async fetch () {
    const response = await this.$axios.get(`/admission/ex-admission/${this.patientId}`)
    if (response.status === 200) {
      this.pastAdmissions = response.data.sort((a, b) => new Date(a.date) - new Date(b.date))
    } else {
      console.error('Yatış bilgisi alınamadı.')
    }
  }
}
</script>

<style scoped>
.v-container {
  max-width: 800px;
  margin: 0 auto;
}
.elevation-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>
