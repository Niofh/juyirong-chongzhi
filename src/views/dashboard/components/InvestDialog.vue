<template>
  <div class="invest-dialog">
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="700px"
      @close="close('ruleForm')"
    >
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item label="特殊资源：" :label-width="formLabelWidth">
          <el-radio-group v-model="form.payType">
            <el-radio :label="1">个人网银</el-radio>
            <el-radio :label="4">企业网银</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="充值金额：" :label-width="formLabelWidth" prop="amount">
          <el-input v-model="form.amount" autocomplete="off" />
        </el-form-item>
        <template v-if="fee>0">
          <el-form-item label="提示：" :label-width="formLabelWidth">
            充值金额需包含手续费（<span style="color: red">{{ fee }}元</span>）<br>
            实际到账金额=充值金额-手续费
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item v-if="form.payType===1" label="提示：" :label-width="formLabelWidth">
            充值金额需包含手续费（充值金额*0.3%）<br>
            实际到账金额=充值金额-手续费
          </el-form-item>
          <el-form-item v-if="form.payType===4" label="提示：" :label-width="formLabelWidth">
            充值金额需包含手续费（充值金额包含手续费10元）<br>
            实际到账金额=充值金额-手续费
          </el-form-item>
        </template>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModal('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">充值</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formMixin from '@/mixins/formMixin'
import { numberReg } from '@/utils/validate'
import { accountRechargeApi, rechargeTrialApi } from '@/api/account'
import { Debounce } from '@/utils'

export default {
  name: 'InvestDialog',
  mixins: [formMixin],
  data() {
    return {
      rules: {
        amount: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          { validator: numberReg, trigger: 'blur' }
        ]
      },
      form: {
        payType: 1,
        amount: '',
        frontUrl: window.location.href
      },
      formLabelWidth: '120px',
      fee: 0 // 手续费
    }
  },
  inject: ['getAccountWalletDetail'],
  watch: {
    'form.amount'(val) {
      if (val) {
        this.rechargeTrial()
      } else {
        this.fee = 0
      }
    },
    'form.payType'(val, old) {
      if (val !== old) {
        if (this.form.amount > 0) {
          this.rechargeTrial()
        }
      }
    }
  },
  methods: {
    // 充值
    accountRecharge() {
      accountRechargeApi(this.form).then(res => {
        if (res.status === this.$code) {
          window.open(res.data)
          this.$confirm('是否充值成功?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '再次充值',
            type: 'warning'
          }).then(() => {
            this.closeModal('ruleForm')
            this.getAccountWalletDetail()
          }).catch(() => {

          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    // 充值试算
    rechargeTrial: Debounce(function() {
      rechargeTrialApi(this.form).then(res => {
        if (res.status === this.$code) {
          this.fee = res.data / 100
        }
      })
    }, 500)
  }
}
</script>

<style scoped>

</style>
