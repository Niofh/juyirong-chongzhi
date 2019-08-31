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
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
      </el-table>
      <div class="my-page">
        <el-pagination
          :page-sizes="page.pageSizeList"
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

export default {
  name: 'TradeDetailed',
  mixins: [tableMixin],
  data() {
    return {
      page: {
        pageIndex: 0,
        pageSize: 10,
        total: 100
      },
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
      dataList: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
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
