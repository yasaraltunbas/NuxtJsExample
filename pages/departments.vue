<template>
  <v-container>
    <v-col cols="12">
      <v-simple-table height="530px">
        <template #default>
          <thead>
            <tr>
              <th class="text-left">
                Bölüm
              </th>
              <th class="text-left">
                Konum
              </th>
              <th class="text-left">
                Ücret
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in departments"
              :key="item.id"
            >
              <td>{{ item.departmentName }}</td>
              <td>{{ item.location }}</td>
              <td>{{ item.fee }}</td>
              <td align="right">
                <v-btn color="primary" class="btn" @click="makeAppointment(item)">
                  Randevu Al
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: 'DepartmentPage',
  data () {
    return {

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
        path: '/appointment/appointment',
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
