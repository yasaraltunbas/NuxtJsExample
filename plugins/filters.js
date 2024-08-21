import Vue from 'vue'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

Vue.filter('formatDate', (value) => {
  if (value) {
    return format(new Date(value), 'dd/MM/yyyy', { locale: tr })
  }
  return ''
})
