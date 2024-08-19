<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            <span class="headline">Giriş Yap</span>
            <v-spacer />
            <nuxt-link to="/auth/register">
              Kayıt Ol
            </nuxt-link>
          </v-card-title>
          <v-card-text>
            <v-alert
              v-if="alert"
              :value="alert"
              type="error"
              outlined
            >
              {{ errorMessage }}
            </v-alert>
            <v-form @submit.prevent="login">
              <v-text-field v-model="form.email" label="E-posta" required />
              <v-text-field v-model="form.password" label="Şifre" type="password" required />
              <v-row>
                <v-col cols="8" />
                <v-col>
                  <v-btn type="submit" color="primary" block>
                    Giriş Yap
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      errorMessage: '',
      alert: false,
      alertMessage: ''
    }
  },

  methods: {
    async login () {
      if (!this.form.email || !this.form.password) {
        this.errorMessage = 'Lütfen tüm alanları doldurun.'
        this.alert = true
        return
      }
      this.alert = false
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password
          }
        })
        this.$router.push('/')
      } catch (e) {
        console.error(e)
        this.errorMessage = 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.'
      }
    },
    goToRegister () {
      this.$router.push('/auth/register')
    }
  }
}
</script>

<style scoped>
.headline {
  font-weight: bold;
}
.register-link {
  text-decoration: none;
  color: #1976D2;
  font-weight: bold;
}
</style>
