<template>
  <div class="tradeDetailed-container container">
    <div class="tip">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="业务类型">
          <el-select v-model="formInline.region" placeholder="请选择业务类型">
            <el-option label="全部" value="shanghai" />
            <el-option label="体现" value="shanghai" />
            <el-option label="交租" value="beijing" />
            <el-option label="充值" value="beijing" />
          </el-select>
        </el-form-item>

        <el-form-item label="时间段" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                v-model="formInline.date1"
                type="datetime"
                placeholder="开始时间"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">至</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                v-model="formInline.date2"
                type="datetime"
                placeholder="结束时间"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onSubmit">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TradeDetailed',
  data() {
    return {
      formInline: {
        user: '',
        region: '',
        date1: '',
        date2: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style scoped>

</style>
