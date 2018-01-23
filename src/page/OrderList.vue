<template>
  <div>
    <mall-header v-on:initscroll="scrollTop"></mall-header>
    <mall-bread>
    <span>订单列表</span>
    </mall-bread>
    <y-shelf title="我的订单">
      <div slot="content" style="min-height:300px;">
        <div v-if="orderList.length" style="min-height: 10vw; border-bottom:1px solid #ededed;">
          <div v-for="(item,index) in orderList" :key="i">
            <div class="gray-sub-title cart-title">
              <div class="first">
                <div>
                  <span class="date">{{item.createDate}}</span>
                  <span class="order-id"> 订单号： <a>{{item.orderId}}
                  </a> </span>
                </div>
                <div class="f-bc">
                  <span class="price">单价</span>
                  <span class="num">数量</span>
                  <span class="operation">商品操作</span>
                </div>
              </div>
              <div class="last">
                <span class="sub-total">实付金额</span>
                <span class="order-detail"> <a>查看详情 ><em class="icon-font"></em></a> </span>
              </div>
            </div>
            <div class="pr" style="position:relative;">
              <div class="cart" v-for="" :key="j">
                <div class="cart-l" :class="{bt:j>0}">
                  <div class="car-l-l">
                    <div class="img-box"><a><img  v-lazy="`static/${item.productImg}`" alt=""></a></div>
                    <div class="ellipsis"><a style="color: #626262;"></a></div>
                  </div>
                  <div class="cart-l-r">
                    <div>¥{{item.productPrice}}</div>
                    <div class="num">{{item.productNum}}</div>
                    <div class="type">
                      <button style="margin-left:20px" class="del-order" @click="delOrderList(item)">删除此订单</button>
                      <!-- <a @click="_delOrder(item.orderId,i)" href="javascript:;" v-if="j<1" class="del-order">删除此订单</a> -->
                    </div>
                  </div>
                </div>
                <div class="cart-r">
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div class="prod-operation pa" style="position:absolute; right: 0;top: 0;">
                <div class="total">¥ {{item.totalPrice}}</div>
                <div class="pay-content">
                  <button class="payBtn" @click="payOrder(item)" v-show="item.ifPay===0?true:false">现在付款</button>
                  <span class="alreadyPay" v-show="item.ifPay===0?false:true">已付款</span>
                </div>
                <div class="status">  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="no-info" v-if="!orderList.length">
          <div style="padding: 120px 0;text-align: center; font-size:16px; font-weight:500; color:#999;">
            你还未创建过订单!
          </div>
        </div>
      </div>
    </y-shelf>
    <!-- <div style="float:right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div> -->
    <pay-suc :mdShow="mdShow" v-on:close="closeModal">
      <!-- <p class="paySuc"slot="message"><i class="icon-check_circle"></i>付款成功！</p> -->
      <div class="pay-type" slot="message" v-if="payShow">
      <p style="font-size:14px; font-weight: 700; text-align:right;">*请注意,付款是不会发货的,视为自动捐赠,请勿轻易付款,该作者承担不起任何责任,谢谢配合!</p>
        <div class="p-title">支付方式</div> 
        <div class="pay-item">
          <div :class="{'active':selectType === index}" v-for="(item,index) in payList" @click="select(index)" >
            <img :src="item.imgUrl">
          </div> 
        </div>
        <div class="com-btn">
          <a class="yes" @click="yesPay">确认付款</a>
        </div>
      </div>
      <div class="pay-sao" slot="message" v-if="!payShow">
        <p class="title">扫一扫付款</p>
        <p class="money">{{totalPrice}}元</p>
        <div class="img-box">
          <img :src="payType" class="pic">
          <div class="explain">
            <img src="../../static/images/qr.png" alt="扫一扫标识" class="fn-left"> 
            <div class="fn-right">{{payTitle}}<br>扫一扫继续付款</div>
          </div>
        </div>
      </div>
    </pay-suc>
     <mall-footer></mall-footer>
  </div>
</template>
<script>
import YShelf from '../components/shelf.vue'
import mallHeader from '../components/header.vue'
import mallFooter from '../components/footer.vue'
import mallBread from '../components/navbread.vue'
import paySuc from '../components/paySuc.vue'
import axios from 'axios'
import $ from 'jquery'
  export default {
    data () {
      return {
        orderList:[],
        mdShow:false,
        payShow:true,
        selectType:0,
        payC:false,
        payType:'../../static/images/payali.png',
        payTitle:'打开支付宝',
        totalPrice:'',
        orId:'',
        payList:[
            {
              id:1,
              imgUrl:'../../static/images/alipay@2x.png'
            },
            {
              id:2,
              imgUrl:'../../static/images/weixinpay@2x.png'
            },
            {
              id:3,
              imgUrl:'../../static/images/qqpay.png'
            }]
      }
    },
    mounted() {
      this.getOrderData();
    },
    methods: {
      getOrderData() {
        axios.get('/api/users/getOrderData').then((res) => {
          res = res.data;
          if(res.status === '1') {
            this.orderList = res.result;
            console.log(this.orderList);
          }
        });
      },
      delOrderList(item) {
        var index = this.orderList.indexOf(item);
        var param = {
          orderId:item.orderId
        };
        axios.get('/api/users/delOrder', {
          params:param
        }).then((res) => {
          res = res.data;
          if(res.status === '1') {
            this.orderList.splice(index, 1);
          }
        });
      },
      payOrder(item) {
        this.mdShow = true;
        this.totalPrice = item.totalPrice;
        this.orId = item.orderId;
      },
      select(type) {
        this.selectType = type;
        if(type === 0) {
          this.payType = '../../static/images/payali.png';
          this.payTitle = '打开支付宝';
        } else {
          this.payType = '../../static/images/weixin.png';
          this.payTitle = '打开微信';
        }
      },
      yesPay() {
        this.payShow = false;
        this.pay();
      },
      pay() {
        var param = {
          orderId:this.orId
        };
        axios.get('/api/users/updateOrder', {
          params:param
        }).then((res) => {
          res = res.data;
          if(res.status === '1') {
            setTimeout(()=>{
              this.mdShow = false;
              this.$router.push({
                path:`/orderlist`
            });
            }, 6000);
          }
        });
      },
      closeModal() {
        this.mdShow = false;
        this.payC = false;
        this.payCtitle = '立即支付';
      },
      scrollTop() {
        var promise = new Promise(()=>{
          this.$router.push({
              path:`/`
          });
        }).then($('html,body').animate({scrollTop:480},500));
      }
    },
    components: {
      YShelf,
      mallHeader,
      mallFooter,
      mallBread,
      paySuc
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/style/mixin";
  body {
    font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Microsoft Yahei, \\5FAE\8F6F\96C5\9ED1, STHeiti, \\534E\6587\7EC6\9ED1, sans-serif;
    color: #666;
    font-size: 14px;
  }
  .gray-sub-title {
    height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
    display: flex;
    span {
      display: inline-block;
      height: 100%;
    }
    .first {
      display: flex;
      justify-content: space-between;
      flex: 1;
      .f-bc {
        > span {
          width: 112px;
          text-align: center;
        }
      }
    }
    .last {
      width: 230px;
      text-align: center;
      display: flex;
      border-left: 1px solid #ccc;
      span {
        flex: 1;
      }
    }
  }

  .bt {
    border-top: 1px solid #EFEFEF;
  }

  .date {
    padding-left: 0px;
  }

  .order-id {
    margin-left: 25px;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    &:hover {
      .del-order {
        display: block;
        background:#d1434a;
        padding:2px 6px;
        border-radius:6px;
        color:#fff;
        font-size:14px;
        margin-top:-3px;
      }
    }
    .del-order {
      display: none;
    }
    .cart-l {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 15px 0;
      justify-content: space-between;
      position: relative;
      &:before {
        position: absolute;
        content: ' ';
        right: -1px;
        top: 0;
        width: 1px;
        background-color: #EFEFEF;
        height: 100%;
      }
      .ellipsis {
        margin-left: 20px;
        width: 220px;
      }
      .img-box {
        border: 1px solid #EBEBEB;
      }
      img {
        display: block;
        @include wh(80px);
      }
      .cart-l-r {
        display: flex;
        height:24px;
        line-height: 24px;
        > div {
          text-align: center;
          width: 112px;
        }
      }
      .car-l-l {
        display: flex;
        align-items: center;
      }
    }
    .cart-r {
      width: 230px;
      display: flex;
      span {
        text-align: center;
        flex: 1;
      }
    }
  }

  .prod-operation {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 254px;
    .total{
      flex:0 0 100px;
      text-align: center;
      color:#d1434a;
    }
    .pay-content{
      flex:1;
      .payBtn {
        background:#20a0ff;
        padding:5px 10px;
        border-radius:6px;
        color:#fff;
        font-size:14px;
        margin: 0 auto;
      }
      .alreadyPay{
        font-size:14px;
        color:#999;
        text-align:center;
      }
    }
    div:last-child {
      padding-right: 24px;
    }
  }
</style>
