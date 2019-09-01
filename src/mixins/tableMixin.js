// 分页表格mixin

const tableMixin = {
  data() {
    return {
      pageSizeList: [10, 20, 50, 100],
      page: {
        pageSize: 10,
        pageIndex: 1,
        total: 0
      },
      dataList: [],
      searchForm: {},
      dataListLoading: false
    }
  },
  methods: {
    getDataList() {
      this.dataListLoading = false
    },
    // 分页, 每页条数
    handleSizeChange(size) {

      this.page.pageSize = size
      this.page.pageIndex = 1
      this.getDataList()
    },
    handleCurrentChange(index) {
      this.page.pageIndex = index
      this.getDataList()
    },
    sortChange(column, prop, order) {
      console.log(column, prop, order)
    },
    // 刷新
    handleRefresh() {
      this.handleSearch()
    },
    // 查询事件
    handleSearch() {
      this.dataListLoading = true
      this.page.pageIndex = 1
      this.getDataList()
    },
    // 重置表单
    handleReset(cb) {
      this.dataListLoading = true
      this.page.pageIndex = 1
      this.getDataList()
      // 新增回调
      if (cb && typeof (cb) === 'function') {
        cb()
      }
    }
  }
}

export default tableMixin
