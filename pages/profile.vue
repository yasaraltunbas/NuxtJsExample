<template>
  <v-container class="profile-container">
    <v-row>
      <v-col cols="8">
        <h1>Profil</h1>
      </v-col>
    </v-row>
    <v-form v-if="profileUpdated" class="profile-form">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.firstName"
            label="İsim"
            readonly
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.lastName"
            label="Soy İsim"
            readonly
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.email"
            label="Email"
            readonly
          />
        </v-col>
        <v-col v-if="form.role === 'Patient'" cols="12" md="4">
          <v-text-field
            v-model="form.gender"
            label="Cinsiyet"
            readonly
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.phoneNumber"
            label="Telefon Numarası"
            readonly
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.address"
            label="Adres"
            readonly
          />
        </v-col>
        <v-col v-if="form.role === 'Patient'" cols="12" md="4">
          <v-text-field
            v-model="form.bloodType"
            label="Kan Grubu"
            readonly
          />
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" @click="isUpdate">
            Profili Güncelle
          </v-btn>
          <v-btn color="error" @click="deleteProfile">
            Profili Sil
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-form v-if="!profileUpdated" class="profile-form">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.firstName"
            label="İsim"
            required
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.lastName"
            label="Soy İsim"
            required
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.email"
            label="Email"
            required
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.gender"
            label="Cinsiyet"
            required
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.phoneNumber"
            label="Telefon Numarası"
            required
          />
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" @click="updateProfile">
            Güncelle
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      form: {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        gender: '',
        phoneNumber: '',
        address: '',
        bloodType: '',
        role: 'Patient'
      },
      profileUpdated: true
    }
  },
  async mounted () {
    try {
      const response = await this.$axios.get('/auth/user')
      this.form = response.data
    } catch (error) {
      console.error('Profile yüklenirken hata oluştu:', error)
    }
  },
  methods: {
    async updateProfile () {
      try {
        await this.$axios.put('/auth/UpdateUser', this.form)
        alert('Profile updated successfully')
      } catch (error) {
        console.error('Profile güncellenirken hata oluştu:', error)
      }
    },
    async deleteProfile () {
      const confirmDelete = confirm('Profilinizi silmek istediğinizden emin misiniz?')
      if (confirmDelete) {
        try {
          await this.$axios.delete('/auth/DeleteMe')
          alert('Profile deleted successfully')
          this.$auth.logout()
            .then(() => {
              this.$router.push('/login')
            })
        } catch (error) {
          console.error('Profile silinirken hata oluştu:', error)
        }
      }
    },
    isUpdate () {
      this.profileUpdated = !this.profileUpdated
    }
  }
}
</script>

  <style scoped>
  .profile-container {
    max-width: 800px;
    margin: 0 auto;
  }
  .profile-form {
    margin-top: 20px;
  }
  </style>
