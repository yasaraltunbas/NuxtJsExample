<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <span class="headline">Giriş Yap</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="form.email"
                label="E-posta"
                required
              />
              <v-text-field
                v-model="form.password"
                label="Şifre"
                type="password"
                required
              />
              <v-row>
                <v-col>
                  <v-btn type="submit" color="primary" block>
                    Giriş Yap
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn color="secondary" block @click="goToRegister">
                    Kayıt Ol
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
      errorMessage: ''
    }
  },

  methods: {
    async login () {
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
</style>
