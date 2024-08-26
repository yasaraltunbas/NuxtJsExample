<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            <span class="headline">Kayıt Ol</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                label="Email"
                type="email"
                required
              />
              <v-text-field
                v-model="form.password"
                label="Şifre"
                type="password"
                required
              />
              <v-text-field
                v-model="form.firstName"
                label="İsim"
                type="text"
                required
              />
              <v-text-field
                v-model="form.lastName"
                label="Soy İsim"
                type="text"
                required
              />
              <v-select
                v-model="form.gender"
                :items="['Erkek', 'Kadın']"
                label="Cinsiyet"
                required
              />
              <v-text-field
                v-model="form.address"
                label="Adres"
                type="text"
                required
              />
              <v-text-field
                v-model="form.phoneNumber"
                :rules="phoneNumberRules"
                label="Telefon Numarası"
                type="text"
                required
              />
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.birthDay"
                    label="Doğum Tarihi"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="form.birthDay"
                  no-title
                  scrollable
                >
                  <v-spacer />
                  <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                  >
                    Kapat
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(form.birthDay)"
                  >
                    Tamam
                  </v-btn>
                </v-date-picker>
              </v-menu>
              <v-select
                v-model="form.bloodType"
                :items="bloodTypes"
                label="Kan Grubu"
                required
              />
              <v-text-field
                v-model="form.balance"
                label="Bütçe"
                type="number"
                required
              />
              <v-col cols="8" />
              <v-col>
                <v-btn type="submit" color="primary" block>
                  Kayıt ol
                </v-btn>
              </v-col>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <nuxt-link to="/auth/login">
              Giriş yap
            </nuxt-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: false,
  data () {
    return {
      form: {
        role: 'Patient',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: '',
        address: '',
        phoneNumber: '',
        birthDay: '',
        bloodType: '',
        balance: 0
      },
      menu: false,
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
  methods: {
    async register () {
      try {
        const response = await this.$axios.post('/auth/register', {
          email: this.form.email,
          password: this.form.password,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          gender: this.form.gender,
          address: this.form.address,
          phoneNumber: this.form.phoneNumber,
          birthDay: new Date(this.form.birthDay).toISOString(),
          bloodType: this.form.bloodType,
          balance: this.form.balance
        }, {
          params: { role: this.form.role === 'Patient' ? 0 : 1 }
        })
        console.log('Registration successful:', response.data)
        this.$router.push('/auth/login')
      } catch (error) {
        console.error('Registration failed:', error.response.data)
      }
    }
  }
}
</script>

  <style scoped>
  .headline {
    font-weight: bold;
  }
  </style>
