<template>
    <div class="big">
        <NavBar></NavBar>
        <h3>美国国内生产总值(GDP)报告</h3>
            <div class="table">
               <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="time"
      label="时间"
      width="180"
        align="center">
    </el-table-column>
    <el-table-column
      prop="now"
      label="今值"
      width="180"
        align="center">
    </el-table-column>
    <el-table-column
      prop="pre"
      label="预测值"
        align="center">
    </el-table-column>
     <el-table-column
      prop="qian"
      label="前值"
        align="center">
    </el-table-column>
  </el-table>
        </div>
    </div>
</template>

<script>
import NavBar from './NavBar.vue'
import axios from 'axios'
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
    async getTable () {
      try {
        const res = await axios.get('/GDP/getGDP', {
          headers: {
            Authourization: this.$store.state.token // 确保使用正确的头字段名，并添加Bearer前缀
          }
        })
        if (res.data !== null) {
          console.log(res.data.data)
          // 直接赋值可能不会触发响应式更新，可以使用 Vue.set 或其他方法
          this.tableData = res.data.data
          // 使用 Vue.nextTick 来确保 DOM 更新完成后调用 updateChart
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  components: {
    NavBar
  },
  mounted () {
    this.getTable()
  }
}
</script>

<style scoped lang="less">
.container{
    height:0.4rem;
}
.big{
        width:100%;

    background-color: #eceff7;

    h3{
    text-align: center;
    }
    .table{
        width:80%;
        margin:0 auto;
    }

}
</style>
