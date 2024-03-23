<template>
  <div class="container">
    <NavBar></NavBar>
    <div class="view">
        <div class="left" v-show="unfold">
            <div class="top">
                 <el-table
    :data="tableData"
    height="100%"
    border
    highlight-current-row
    style="width: 100%">
    <el-table-column
      prop="date"
      label="代码/名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="name"
      label="最新价"
      width="70">
    </el-table-column>
    <el-table-column
      prop="address"
      label="涨跌幅">
    </el-table-column>

    </el-table>
            </div>
            <div class="bottom">
                <el-descriptions title="盘口数据" style="font-size: 10.5px;" >
    <el-descriptions-item label="今开">1.2786</el-descriptions-item>
    <el-descriptions-item label="最高" contentStyle="color:red;">1.2804</el-descriptions-item>
    <el-descriptions-item label="买入价">1.2661</el-descriptions-item>
    <el-descriptions-item label="昨收">1.2744</el-descriptions-item>
    <el-descriptions-item label="最低">1.2442</el-descriptions-item>
    <el-descriptions-item label="卖出价">1.2744</el-descriptions-item>
</el-descriptions>

            </div>
        </div>
        <div class="right">
            <div class="chartWrap">
                <div class="chartHead">
                    <div class="one">
                        <h3>英镑兑瑞士法郎</h3>
                        <div>1.266200-0.10124-0.9700%</div>
                    </div>
                    <div class="two">
                        <span>GBP/CHF </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>交易中 </span>
                    </div>
                    <div class="three">
                        <img v-show="unfold" src="/static/img/rate/折叠.png" alt="" @click="left" >
                        <img  v-show="fold" src="/static/img/rate/展开.png" alt="" @click="right" >
                         <div style="margin-left:0.2rem;">
    <el-radio-group v-model="radio" size="small" >
      <el-radio-button label="分时" ></el-radio-button>
      <el-radio-button label="日K"></el-radio-button>
      <el-radio-button label="周k"></el-radio-button>
      <el-radio-button label="月k"></el-radio-button>
    </el-radio-group>
  </div>
                    </div>
                </div>
                <div class="chartContent">
                    <RateCh></RateCh>
                </div>
            </div>

        </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import RateCh from '@/components/RateCh.vue'
export default {
  components: {
    NavBar,
    RateCh
  },

  data () {
    return {
      radio: '分时',
      unfold: true,
      fold: false,
      tableData: [{
        date: '英镑兑瑞士法郎',
        name: '1.1377',
        address: '⬆0.3100%'
      }, {
        date: '英镑兑瑞士法郎',
        name: '1.1377',
        address: '⬆0.3100%'
      }, {
        date: '英镑兑瑞士法郎',
        name: '1.1377',
        address: '⬆0.3100%'
      }, {
        date: '英镑兑瑞士法郎',
        name: '1.1377',
        address: '⬆0.3100%'
      }, {
        date: '英镑兑瑞士法郎',
        name: '1.1377',
        address: '⬆0.3100%'
      }, {
        date: '英镑兑瑞士法郎',
        name: '1.1377',
        address: '⬆0.3100%'
      }, {
        date: '英镑兑瑞士法郎',
        name: '1.1377',
        address: '⬆0.3100%'
      }, {
        date: '英镑兑瑞士法郎',
        name: '1.1377',
        address: '⬆0.3100%'
      }, {
        date: '英镑兑瑞士法郎',
        name: '1.1377',
        address: '⬆0.3100%'
      }]
    }
  },
  methods: {
    left () {
      this.unfold = false
      this.fold = true
    },
    right () {
      this.unfold = true
      this.fold = false
    }
  }
}
</script>

<style lang="less" scoped>
.container{
    width:100%;
    height:100%;
    .view{
    width:100%;
    height:100vh;
    background-color:#f8f8f8;
    display:flex;
    .left{
        flex:2;

        box-sizing: border-box;

        .top{
            width:90%;
            height:70%;
            background-color: #fff;
            margin:0 auto;
            border-radius:0.1rem;

        }
        .bottom{
            height:20%;
            width:90%;
            background-color: #fff;
            margin:0 auto;
            margin-top:0.06rem;
            border-radius:0.1rem;
            padding:0.1rem;
            box-sizing:border-box;
        }

    }
    .right{
        flex:7;
        background-color:#fff;
        border-radius:0.1rem;
        box-sizing:border-box;
        padding:0.2rem;
        height:91%;
        .chartWrap{
            width:95%;
            margin:0 auto;
            .chartHead{
                .one{
                    display:flex;
                    align-items: center;
                    h3{
                        padding:0;
                        margin:0;
                    }
                    div{
                        margin-left:0.1rem;
                        color:aqua;
                    }
                }
                .two{
                    margin-top:0.02rem;
                    color:grey;
                }
                .three{
                    width:100%;
                    display:flex;
                    align-items: center;
                     margin-top:0.06rem;
                    img{
                        width:0.2rem;
                        height:0.2rem;
                        margin-left:-0.02rem;
                        cursor: pointer;
                    }

                }
            }
            .chartContent{
                width:100%;
                height:80vh;

            }

        }

    }

}
}

</style>
