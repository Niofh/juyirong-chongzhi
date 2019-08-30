<template>
  <div class="dashboard-container container">
    name: {{ name }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAccountWalletDetail } from '../../api/account'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getAccountWalletDetail()
  },
  methods: {
    getAccountWalletDetail() {
      getAccountWalletDetail().then(res => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {

    }
  }
</style>
