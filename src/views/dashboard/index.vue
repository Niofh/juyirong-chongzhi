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
    <div class="my-table">
      <el-table
        v-loading="dataListLoading"
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
        >
          <template slot-scope="scope">
            {{ scope.row.businessType | businessTypeFilter }}
          </template>
        </el-table-column>

        <el-table-column
          prop="amount"
          label="金额（元）"
        />
        <el-table-column
          prop="status"
          label="状态"
        >
          <template slot-scope="scope">
            {{ scope.row.status===1?'已完成':'' }}
          </template>
        </el-table-column>
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
    <InvestDialog ref="investDialog" title="充值提示" @submit="submitRechange" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAccountWalletDetail } from '../../api/account'
import InvestDialog from './components/InvestDialog'
import { accountDetailApi } from '@/api/account'
import tableMixin from '@/mixins/tableMixin'
export default {
  name: 'Dashboard',
  components: {
    InvestDialog
  },
  mixins: [tableMixin],
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      allAmount: 0,
      dataList: [],

      searchForm: {
        startTime: '',
        endTime: '',
        businessType: '',
        flag7Day: true
      }
    }
  },

  provide() {
    return {
      getAccountWalletDetail: this.getAccountWalletDetail
    }
  },
  created() {
    this.getAccountWalletDetail()
    this.getDataList()
  },
  methods: {
    getDataList() {
      this.dataListLoading = true
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
      }).finally(() => {
        this.dataListLoading = false
      })
    },
    getAccountWalletDetail() {
      getAccountWalletDetail().then(res => {
        if (res.status === this.$code) {
          const { allAmount, freezenAmount } = res.data
          this.allAmount = (allAmount - freezenAmount) / 100
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
