<template>
  <div>
    <mall-header></mall-header>
    <mall-bread>
        <span>查看订单</span>
    </mall-bread>
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-add" viewBox="0 0 32 32">
          <title>add2</title>
          <path class="path1" d="M15 17h-13.664c-0.554 0-1.002-0.446-1.002-1 0-0.552 0.452-1 1.002-1h13.664v-13.664c0-0.554 0.446-1.002 1-1.002 0.552 0 1 0.452 1 1.002v13.664h13.664c0.554 0 1.002 0.446 1.002 1 0 0.552-0.452 1-1.002 1h-13.664v13.664c0 0.554-0.446 1.002-1 1.002-0.552 0-1-0.452-1-1.002v-13.664z"></path>
        </symbol>
        <symbol id="icon-ok" viewBox="0 0 39 32">
          <title>ok</title>
          <path class="path1" d="M14.084 20.656l-7.845-9.282c-1.288-1.482-3.534-1.639-5.016-0.351s-1.639 3.534-0.351 5.016l10.697 12.306c1.451 1.669 4.057 1.623 5.448-0.096l18.168-22.456c1.235-1.527 0.999-3.765-0.528-5.001s-3.765-0.999-5.001 0.528l-15.573 19.337z"></path>
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path class="path1" d="M25.599 11.292l-4.892-4.892 3.825-3.825 4.892 4.892-3.825 3.825zM4.732 23.308l3.959 3.959-5.939 1.98 1.98-5.939zM10.666 26.225l-4.892-4.892 13.425-13.425 4.892 4.892-13.425 13.425zM31.687 6.713l-6.4-6.4c-0.417-0.417-1.091-0.417-1.508 0l-20.267 20.267c-0.114 0.115-0.191 0.25-0.242 0.393-0.003 0.009-0.012 0.015-0.015 0.025l-3.2 9.6c-0.128 0.383-0.029 0.806 0.257 1.091 0.203 0.204 0.476 0.313 0.754 0.313 0.112 0 0.227-0.017 0.337-0.054l9.6-3.2c0.011-0.003 0.017-0.013 0.027-0.016 0.142-0.052 0.276-0.128 0.39-0.242l20.267-20.267c0.417-0.416 0.417-1.091 0-1.508v0z"></path>
        </symbol>
        <symbol id="icon-delete" viewBox="0 0 26 32">
          <title>delete</title>
          <path class="path1" d="M17.723 28c0.543 0 0.984-0.448 0.984-1v-12c0-0.552-0.441-1-0.984-1s-0.985 0.448-0.985 1v12c0 0.552 0.441 1 0.985 1v0zM7.877 28c0.543 0 0.984-0.448 0.984-1v-12c0-0.552-0.441-1-0.984-1s-0.985 0.448-0.985 1v12c0 0.552 0.441 1 0.985 1v0zM12.8 28c0.543 0 0.985-0.448 0.985-1v-12c0-0.552-0.441-1-0.985-1s-0.984 0.448-0.984 1v12c0 0.552 0.441 1 0.984 1v0zM23.631 4h-5.908v-2c0-1.104-0.882-2-1.969-2h-5.908c-1.087 0-1.969 0.896-1.969 2v2h-5.908c-1.087 0-1.969 0.896-1.969 2v2c0 1.104 0.882 2 1.969 2v18c0 2.208 1.765 4 3.939 4h13.784c2.174 0 3.938-1.792 3.938-4v-18c1.087 0 1.969-0.896 1.969-2v-2c0-1.104-0.882-2-1.969-2v0zM9.846 3c0-0.552 0.441-1 0.984-1h3.938c0.544 0 0.985 0.448 0.985 1v1h-5.908v-1zM21.662 28c0 1.104-0.882 2-1.969 2h-13.784c-1.087 0-1.97-0.896-1.97-2v-18h17.723v18zM22.646 8h-19.692c-0.543 0-0.985-0.448-0.985-1s0.441-1 0.985-1h19.692c0.543 0 0.984 0.448 0.984 1s-0.441 1-0.984 1v0z"></path>
        </symbol>
        <symbol id="icon-clock" viewBox="0 0 32 32">
          <title>clock</title>
          <path class="path1" d="M29.333 16c0-7.364-5.97-13.333-13.333-13.333s-13.333 5.97-13.333 13.333c0 7.364 5.97 13.333 13.333 13.333s13.333-5.97 13.333-13.333v0 0 0 0 0 0zM0 16c0-8.837 7.163-16 16-16s16 7.163 16 16c0 8.837-7.163 16-16 16s-16-7.163-16-16zM14.667 14.667v1.333h2.667v-10.667h-2.667v9.333zM24 18.667h1.333v-2.667h-10.667v2.667h9.333z"></path>
        </symbol>
      </defs>
    </svg>
    <div class="container">
      <div class="checkout-order">
        <!-- process step -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>确认</span>地址</li>
            <li class="cur"><span>查看</span>订单</li>
            <li><span>创建</span>支付</li>
            <li><span>订单</span>成功</li>
          </ul>
        </div>

        <!-- order list -->
        <div class="page-title-normal checkout-title">
          <h2><span>订单内容</span></h2>
        </div>
        <div class="item-list-wrap confirm-item-list-wrap">
          <div class="cart-item order-item">
            <div class="cart-item-head">
              <ul>
                <li>Order contents</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="item in cartList" v-if="item.checked=='1'">
                <div class="cart-tab-1">
                  <div class="cart-item-pic">
                    <img :src="`/static/${item.productImg}`" alt="XX">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.productName}}</div>

                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.productPrice | formatMoney('')}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self">
                      <div class="select-self-area">
                        <span class="select-ipt">x{{item.productNum}}</span>
                      </div>
                    </div>
                    <div class="item-stock item-stock-no">有货</div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{item.productPrice*item.productNum | formatMoney('')}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Price count -->
        <div class="price-count-wrap">
          <div class="price-count">
            <ul>
              <li>
                <span>商品价格:</span>
                <span>{{itemPrice | formatMoney('')}}</span>
              </li>
              <li>
                <span>配送费用:</span>
                <span>{{this.shipPrice | formatMoney('')}}</span>
              </li>
              <li>
                <span>店铺优惠:</span>
                <span>{{this.discount | formatMoney('')}}</span>
              </li>
              <li>
                <span>运费险:</span>
                <span>{{this.freightRisk | formatMoney('')}}</span>
              </li>
              <li class="order-total-price">
                <span>合计:</span>
                <span>{{totalPrice | formatMoney('')}}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="order-foot-wrap">
          <div class="prev-btn-wrap">
            <router-link class="btn btn--m" :to="{path:'address'}">上一步</router-link>
          </div>
          <div class="next-btn-wrap">
            <button class="btn btn--m btn--red" :class="{'btn--pay':payC}" @click="holdPay">{{payCtitle}}</button>
          </div>
        </div>
      </div>
    </div>
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
import mallHeader from '../components/header.vue'
import mallFooter from '../components/footer.vue'
import mallBread from '../components/navbread.vue'
import paySuc from '../components/paySuc.vue'
import axios from 'axios'
  export default{
      data(){
          return{
            cartList:[],
            discount:13.2,
            shipPrice:0,
            freightRisk:5,
            mdShow:false,
            selectType:0,
            payShow:true,
            payC:false,
            payCtitle:'立即支付',
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
            }],
            payType:'../../static/images/payali.png',
            payTitle:'打开支付宝'

          }
      },
      mounted() {
        this.getCartData();
      },
      computed:{
        itemPrice(){
          var money = 0;
          this.cartList.forEach((item)=>{
            if(item.checked=='1'){
              money += parseFloat(item.productPrice)*parseInt(item.productNum);
            }
          })
          return money;
        },
        totalPrice() {
          return parseFloat(this.itemPrice-this.discount-this.shipPrice+this.freightRisk);
        }
      },
      filters:{
        formatMoney: function(value,type) {
          return "¥" + value.toFixed(2) + type;
        }
      },
      methods: {
        getCartData() {
          axios.get('/api/users/getCartData').then((res) => {
            res = res.data;
            if(res.status === '1') {
              this.cartList = res.result;
            }
          });
        },
        closeModal() {
          this.mdShow = false;
          this.payC = false;
          this.payCtitle = '立即支付';
        },
        holdPay() {
          this.payC = true;
          this.payCtitle = '...跳转中';
          setTimeout(() => {
            this.mdShow = true;
          },2000);

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
          var addressId = this.$route.query.addressId;
          var param = {
            addressId:addressId,
            itemPrice:this.itemPrice,
            totalPrice:this.totalPrice,
            discount:this.discount,
            shipPrice:this.shipPrice,
            freightRisk:this.freightRisk

          };
          axios.get('/api/users/payOrder', {
            params:param
          }).then((res) => {
            res = res.data;
            if(res.status === '1') {
              setTimeout(()=>{
                this.mdShow = false;
                this.$router.push({
                  path:`/orderinfo?m=${Base64.encode(res.result)}&n=${Base64.encode(this.totalPrice)}`
              });
              }, 6000);
            }
          });
        },
      },
      components: {
        mallHeader,
        mallBread,
        mallFooter,
        paySuc
      }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .pay-type
    margin: 0 auto
    width: 100%
    .p-title
      font-size: 18px
      font-weight:500
      line-height: 40px
      padding: 0 10px
      text-align:left
      position: relative
      &:before
        content: ' '
        position: absolute
        bottom: 0
        left: 0
        right: 0
        border-bottom: 1px solid #ccc
    .pay-item
      display: flex
      align-items: center
      padding:10px 0
      position:relative
      left:50%
      transform:translateX(-50%)
      div
        margin-top: 20px
        width: 140px
        height: 50px
        display: flex;
        align-items: center
        justify-content: center
        border: 1px solid #E5E5E5
        cursor: pointer
        border-radius: 6px
        margin-right: 10px
        background: #FAFAFA
        &:last-child
          margin-right:0
        @media (max-width:767px)
          width:90px
          height:40px
          margin-right:15px
          &:last-child
            margin-right:0
        img 
          display: block
          height: 34px
          margin: 8px auto
          @media (max-width:767px)
            width:100%
            height:100%
      .active
        border-color: #6A8FE5
        background: #fff
    .com-btn
      width:350px
      line-height:30px
      margin:0px auto
      margin-top:50px
      @media (max-width:767px)
        width:280px
      .yes
        display:block
        height:100%
        background:rgb(209, 67, 74)
        color:#fff
        border-radius:6px
  .pay-sao
    width:100%
    .title 
      text-align: center
      line-height: 24px
      font-size: 14px
      color: #999
    .money
      text-align: center
      font-size: 30px
      color: #d44d44
      font-weight: 700
    .img-box
      position: relative
      width: 180px
      height: auto
      min-height: 168px
      margin: 0 auto
      border: 1px solid #d3d3d3
      box-shadow: 1px 1px 1px #ccc
      display: inline-block
      .pic 
        width:168px
        height:168px
      .explain
        display:flex
        padding:5px 10px
        img 
          flex:0 0 38px
          height:38px
        .fn-right
          font-size:12px
          line-height:16px
          margin-left:30px
  .btn--pay
    background-color: #999
    border-color: #999
</style>
