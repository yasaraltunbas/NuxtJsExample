<template>
  <v-container>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="departments"
        :items-per-page="5"
        class="elevation-1"
      >
        <template #item.action="{ item }">
          <v-btn color="primary" class="btn" @click="makeAppointment(item)">
            Randevu Al
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: 'DepartmentPage',
  data () {
    return {
      departments: [],
      headers: [
        { text: 'Bölüm', value: 'departmentName', align: 'start' },
        { text: 'Konum', value: 'location' },
        { text: 'Ücret', value: 'fee' },
        { text: 'İşlem', value: 'action', sortable: false, width: '100px' }
      ]
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.$get('/api/departments/all')
      this.departments = response.data
    } catch (error) {
      console.error('Error fetching departments:', error)
    }
  },
  methods: {
    makeAppointment (department) {
      this.$router.push({
        path: '/patient/appointments/create',
        query: {
          departmentId: department.id,
          departmentName: department.departmentName
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
