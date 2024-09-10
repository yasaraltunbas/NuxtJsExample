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
            :rules="emailRules"
            label="Email"
            required
          />
        </v-col>
        <v-col v-if="form.role === 'Patient'" cols="12" md="4">
          <v-select
            v-model="form.gender"
            :items="genders"
            label="Cinsiyet"
            required
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.phoneNumber"
            :rules="phoneNumberRules"
            label="Telefon Numarası"
            required
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.address"
            label="Adres"
            required
          />
        </v-col>
        <v-col v-if="form.role === 'Patient'" cols="12" md="4">
          <v-select
            v-model="form.bloodType"
            :items="bloodTypes"
            label="Kan Grubu"
            required
          />
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" @click="confirmUpdate">
            Güncelle
          </v-btn>
          <back-button-for-detail />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import BackButtonForDetail from '~/components/BackButtonForDetail.vue'

export default {
  components: {
    BackButtonForDetail
  },
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
      profileUpdated: true,
      genders: ['Erkek', 'Kadın'],
      bloodTypes: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-'],
      emailRules: [
        value => !!value || 'Required.',
        value => (value || '').length <= 20 || 'Max 20 characters',
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      ],
      phoneNumberRules: [
        value => !!value || 'Required.',
        value => /^\d+$/.test(value) || 'Yalnızca sayı giriniz',
        value => value.startsWith('5') || 'Telefon numaranız 5 ile başlamalı',
        value => (value || '').length === 10 || '10 Karakterden oluşmalı'
      ]
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.get('/api/auth/user')
      this.form = response.data.data
    } catch (error) {
      console.error('Profile yüklenirken hata oluştu:', error)
    }
  },
  methods: {
    async updateProfile () {
      try {
        await this.$axios.put('/api/auth/UpdateUser', this.form)
        alert('Profil başarıyla güncellendi')
        this.profileUpdated = true
      } catch (error) {
        console.error('Profile güncellenirken hata oluştu:', error)
      }
    },
    async deleteProfile () {
      const confirmDelete = confirm('Profilinizi silmek istediğinizden emin misiniz?')
      if (confirmDelete) {
        try {
          await this.$axios.delete('/api/auth/DeleteMe')
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
    },
    confirmUpdate () {
      const confirmUpdate = confirm('Güncellemek istediğinize emin misiniz?')
      if (confirmUpdate) {
        this.updateProfile()
      }
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
