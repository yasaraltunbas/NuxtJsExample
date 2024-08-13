<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Bölümler</h1>
        <v-data-table
          :headers="headers"
          :items="departments"
          item-key="id"
          class="elevation-1"
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>Bölümler</v-toolbar-title>
              <v-divider class="mx-4" inset vertical />
              <v-spacer />
            </v-toolbar>
          </template>
          <template #item="{ item }">
            <v-btn color="primary" @click="makeAppointment(item)">
              Randevu Al
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DepartmentPage',
  data () {
    return {
      headers: [
        { text: 'Bölüm Adı', value: 'departmentName' },
        { text: 'Konum', value: 'location' },
        { text: 'Ücret', value: 'fee' },
        { text: 'İşlem', value: 'action', sortable: false }
      ],
      departments: []
    }
  },
  fetch () {
    return this.fetchDepartment()
  },
  methods: {
    fetchDepartment () {
      return this.$axios.$get('/departments/all')
        .then((response) => {
          this.departments = response.data
          return response
        })
    },
    makeAppointment (department) {
      this.$router.push({
        path: '/appointment',
        query: {
          departmentId: department.id
        }
      })
    }
  }
}
</script>

  <style scoped>
  .elevation-1 {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  </style>
