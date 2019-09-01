// From表单统计操作
const formMixin = {
  props: {
    title: { // 弹出框名称
      type: String,
      default: ''
    },
    formObject: { // form表单属性
      type: Object,
      default() {
        return {
          type: [],
          name: ''
        }
      }
    },
    disabled: { // 是否禁止输入
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: { ...this.formObject },
      dialogFormVisible: false,
      loading: false,
      rules: {

      }
    }
  },
  methods: {
    // 设置loading状态
    setLoading(flag) {
      this.loading = flag
    },
    // 打开弹框
    openModal() {
      this.dialogFormVisible = true
    },
    closeModal() {
      this.dialogFormVisible = false
    },
    // 关闭后回调
    close(formName) {
      this.resetForm(formName)
      this.loading = false
    },
    // 重置表单属性
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 表单验证成功
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.loading = true
          this.$emit('submit', this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}

export default formMixin
