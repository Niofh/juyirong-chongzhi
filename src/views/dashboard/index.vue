<template>
  <div class="dashboard-container container">
    <div class="account-money">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>账户总余额（元）</span>
        </div>
        <div class="body">23.66元</div>
        <el-button class="button" type="primary">充值</el-button>
      </el-card>
    </div>

    <el-dialog
      title="充值提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="form">
        <el-form-item label="充值金额：" :label-width="formLabelWidth">
          <el-input v-model="form.amount" autocomplete="off" />
        </el-form-item>
        <el-form-item label="特殊资源：" :label-width="formLabelWidth">
          <el-radio-group v-model="form.payType">
            <el-radio :label="1">个人网银</el-radio>
            <el-radio :label="4">企业网银</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.payType===1" label="提示：" :label-width="formLabelWidth">
          充值金额需包含手续费（充值金额*0.3%）<br>
          实际到账金额=充值金额-手续费
        </el-form-item>
        <el-form-item v-if="form.payType===4" label="提示：" :label-width="formLabelWidth">
          充值金额需包含手续费（充值金额包含手续费10元）<br>
          实际到账金额=充值金额-手续费
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">充值</el-button>
      </span>
    </el-dialog>
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
  data() {
    return {
      dialogVisible: true,
      form: {
        payType: 1,
        amount: ''
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getAccountWalletDetail()
  },
  methods: {
    getAccountWalletDetail() {
      getAccountWalletDetail().then(res => {

      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
        })
        .catch(_ => {
        })
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
