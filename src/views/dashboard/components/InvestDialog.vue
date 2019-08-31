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
        <el-button @click="closeModal('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">充值</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formMixin from '@/mixins/formMixin'

export default {
  name: 'InvestDialog',
  mixins: [formMixin],
  data() {
    return {
      rules: {
        amount: []
      },
      form: {
        payType: 1,
        amount: ''
      },
      formLabelWidth: '120px'
    }
  }
}
</script>

<style scoped>

</style>
