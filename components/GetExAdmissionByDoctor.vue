<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Geçmiş Yatış Kayıt</h2>
      </v-col>
    </v-row>
    <v-row v-if="pastAdmissions.length">
      <v-col cols="12">
        <v-simple-table class="ex-table">
          <thead>
            <tr>
              <th class="text-left">
                Hasta Adı
              </th>
              <th class="text-left">
                Tarih
              </th>
              <th class="text-left">
                Bölüm
              </th>
              <th class="text-left">
                Durum
              </th>
              <th class="text-left">
                Şikayet
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="admission in pastAdmissions" :key="admission.id">
              <td>{{ admission.patientName }}</td>
              <td>{{ admission.date | formatDate }}</td>
              <td>{{ admission.departmentName }}</td>
              <td>{{ admission.status | formatAdmissionStatus }}</td>
              <td>{{ admission.reason }}</td>
            </tr>
          </tbody>
        </v-simple-table>
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
      pastAdmissions: []
    }
  },
  created () {
    this.fetchPastAdmissions()
  },
  methods: {
    async fetchPastAdmissions () {
      try {
        const response = await this.$axios.get(`/admission/ex-admission/${this.patientId}`)
        if (response.status === 200) {
          this.pastAdmissions = response.data.sort((a, b) => new Date(a.date) - new Date(b.date))
        } else {
          console.error('Yatış bilgisi alınamadı.')
        }
      } catch (error) {
        console.error('Bir hata oluştu:', error)
      }
    },
    formatStatus (status) {
      const statusMap = {
        pending: 'Beklemede',
        confirmed: 'Onaylandı',
        cancelled: 'İptal Edildi'
      }
      return statusMap[status] || status
    }
  }
}
</script>

  <style scoped>
  .v-container {
    max-width: 800px;
    margin: 0 auto;
  }

  </style>
