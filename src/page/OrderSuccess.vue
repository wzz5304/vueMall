<template>
    <div>
      <mall-header></mall-header>
      <div class="container">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>确认</span>地址</li>
            <li class="cur"><span>查看</span>订单</li>
            <li class="cur"><span>创建</span>支付</li>
            <li class="cur"><span>订单</span>成功</li>
          </ul>
        </div>

        <div class="order-create">
          <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
          <div class="order-create-main">
            <h3>恭喜您~ <br>你的订单正在快速处理中，请耐心等待！</h3>
            <p>
              <span>订单号：{{orderId}}</span>
              <span>订单总价：¥{{totalPrice}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                <router-link to="/orderlist" class="btn btn--m">全部订单</router-link>
              </div>
              <div class="btn-r-wrap">
                <router-link to="/" class="btn btn--m">继续购物</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <mall-footer></mall-footer>
    </div>
</template>
<script>
import mallHeader from '../components/header.vue'
import mallFooter from '../components/footer.vue'
    export default{
        data(){
            return{
              orderId:'',
              totalPrice:''
            }
        },
        mounted() {
          this.init();
        },
        methods: {
          init() {
            this.orderId = Base64.decode(this.$route.query.m);
            this.totalPrice = Base64.decode(this.$route.query.n);
          }
        },
        components: {
          mallHeader,
          mallFooter
        }
    }
</script>
