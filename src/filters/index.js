import Vue from 'vue'
import { BUSINESS_TYPE } from '@/utils/constant'

Vue.filter('businessTypeFilter', function(value) {
  return BUSINESS_TYPE[value] || ''
})
