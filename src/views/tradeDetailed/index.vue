<template>
  <div class="tradeDetailed-container container">
    <div class="my-tip">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="业务类型">
          <el-select v-model="searchForm.businessType" placeholder="请选择业务类型">
            <el-option label="全部" value="shanghai" />
            <el-option label="体现" value="shanghai" />
            <el-option label="交租" value="beijing" />
            <el-option label="充值" value="beijing" />
          </el-select>
        </el-form-item>

        <el-form-item label="时间段">
          <el-date-picker
            v-model="searchForm.startTime"
            :picker-options="startPickerOptions"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="开始时间"
            @blur="changeDate(searchForm.startTime,searchForm.endTime)"
          />
          <span>至</span>
          <el-date-picker
            v-model="searchForm.endTime"
            :picker-options="endTimePickerOptions"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="结束时间"
            @blur="changeDate(searchForm.startTime,searchForm.endTime)"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onSubmit">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="my-table">
      <el-table
        :data="dataList"
        border
        style="width: 100%"
      >
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180"
        />
        <el-table-column
          prop="orderId"
          label="交易订单号"
        />
        <el-table-column
          prop="businessType"
          label="业务类型"
        />

        <el-table-column
          prop="amount"
          label="金额（元）"
        />
        <el-table-column
          prop="status"
          label="状态"
        />
      </el-table>
      <div class="my-page">
        <el-pagination
          :page-sizes="pageSizeList"
          :current-page="page.pageIndex"
          :page-size="page.pageSize"
          :total="page.total"
          background
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { endTimePickerOptions, startPickerOptions } from '@/utils/datePick'
import dayjs from 'dayjs'
import tableMixin from '@/mixins/tableMixin'
import { accountDetailApi } from '@/api/account'

export default {
  name: 'TradeDetailed',
  mixins: [tableMixin],
  data() {
    return {
      searchForm: {
        startTime: '',
        endTime: '',
        businessType: ''
      },
      startPickerOptions: {
        disabledDate: (time) => {
          return startPickerOptions(this.searchForm.endTime, time)
        }
      },
      endTimePickerOptions: {
        disabledDate: (time) => {
          return endTimePickerOptions(this.searchForm.startTime, time)
        }
      },
      dataList: []
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    getDataList() {
      accountDetailApi({ ...this.searchForm, ...this.page }).then(res => {
        if (res.status === this.$code) {
          this.page.total = res.data.totalElements
          this.dataList = res.data.content.map(item => {
            return {
              ...item,
              amount: item.amount / 100
            }
          })
        }
      })
    },
    onSubmit() {
      console.log('submit!')
    },
    changeDate(start, end) {
      if (start && dayjs(start).valueOf() > dayjs(end).valueOf()) {
        this.searchForm.startTime = end
      }
    }
  }
}
</script>

<style scoped>

</style>
