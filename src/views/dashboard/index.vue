<template>
  <div class="dashboard-container container">
    <div class="account-money">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>账户总余额（元）</span>
        </div>
        <div class="body">{{ allAmount.toLocaleString('en-US') }}元</div>
        <el-button class="button" type="primary" @click="onOpen">充值</el-button>
      </el-card>
    </div>
    <InvestDialog ref="investDialog" title="充值提示" @submit="submitRechange" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAccountWalletDetail } from '../../api/account'
import InvestDialog from './components/InvestDialog'
export default {
  name: 'Dashboard',
  components: {
    InvestDialog
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      allAmount: 0
    }
  },

  provide() {
    return {
      getAccountWalletDetail: this.getAccountWalletDetail
    }
  },
  created() {

    this.getAccountWalletDetail()
  },
  methods: {
    getAccountWalletDetail() {
      getAccountWalletDetail().then(res => {
        if (res.status === this.$code) {
          const { allAmount } = res.data
          this.allAmount = allAmount / 100
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    onOpen() {
      this.$refs.investDialog.openModal()
    },
    submitRechange() {
      this.$refs.investDialog.accountRecharge()
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      .box-card {
        padding: 10px 0;
      }

      .account-money {
        width: 500px;
      }

      .body {
        font-weight: bold;
        font-size: 30px;
        color: #F56C6C;
      }

      .button {
        float: right;
      }
    }
  }
</style>
