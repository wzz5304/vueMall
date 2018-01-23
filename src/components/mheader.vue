<template>
  <div>
    <header class="header">
        <symbol id="icon-cart" viewBox="0 0 38 32">
          <title>cart</title>
        </symbol>
        <div class="navbar">
          <div class="navbar-left-container">
            <a href="/">
              <img class="navbar-brand-logo" src="static/logo.png">
              </a>
          </div>
          <div class="navbar-right-container" style="display: flex;">
            <div class="navbar-menu-container">
              <!--<a href="/" class="navbar-link">我的账户</a>-->
              <span class="navbar-link"></span>
              <a href="javascript:void(0)" class="navbar-link" v-if="nameShow" @click="loginShow = true">Login</a>
              <span v-else-if="!nameShow">{{myName}}</span>
              <a href="javascript:void(0)" class="navbar-link" v-if="!nameShow" @click="logout">Logout</a>
              <div class="navbar-cart-container" v-on:mouseover="cartShow" v-on:mouseout="cartHidden">
                <a class="navbar-link navbar-cart-link">
                  <i class="icon-shopping_cart"></i>
                </a>
                <span class="navbar-cart-count">{{totalNum}}</span>
                <!--购物车显示块-->
                <div class="nav-user-wrapper pa active" v-show="showCart">
                  <div class="nav-user-list">
                    <div class="full" v-show="isFull">
                      <!--购物列表-->
                      <div class="nav-cart-items">
                        <ul>
                          <li class="clearfix" v-for="(item,index) in cartNumList" v-on:mouseover="delShowIndex=index">
                            <div class="cart-item">
                              <div class="cart-item-inner">
                                <router-link to="">
                                  <div class="item-thumb">
                                      <img v-lazy="`../../static/${item.productImg}`">
                                  </div>
                                  <div class="item-desc">
                                      <div class="cart-cell">
                                        <h4>
                                          <a href="">{{item.productName}}</a>
                                        </h4>
                                        <!-- <p class="attrs"><span>白色</span> </p>-->
                                        <h6><span class="price-icon">¥</span><span
                                          class="price-num">{{item.productPrice}}</span><span
                                          class="item-num">x{{item.productNum}}</span>
                                        </h6>
                                      </div>
                                  </div>
                                </router-link>
                                <div class="del-btn del" @click="delCartList(item)" :class="{'showDel':delShowIndex==index?true:false}">删除</div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="nav-cart-total">
                        <p>共<strong>{{totalNum}}</strong> 件商品</p>
                        <h5>合计：<span class="price-icon">¥</span><span class="price-num">{{totalPrice}}</span  ></h5> 
                        <h6 >
                        <router-link to='/cart'>
                          <input type="button" readonly="readonly" class="main-btn" value="去购物车" style="height: 40px; width: 100%; margin: 0px; color: rgb(255, 255, 255); font-size: 14px; line-height: 38px;">
                        </router-link>
                        </h6>
                      </div>
                    </div>
                    <div class="cart-con" v-show="!isFull" style="height: 313px; text-align: center;">
                      <p>您的购物车竟然是空的!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':loginShow}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">Login in</div>
              <button class="md-close" @click="close">Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show" v-show="errTip">用户名或者密码错误</span>
                  <span class="error error-show" v-show="errTip1">用户名不存在</span>
                  <span class="error error-show" v-show="errTip2">用户名或密码不能为空</span>

                </div>
                <ul>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname" @blur="login">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tabindex="2"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password" @keyup.enter="login" @blur="login">
                  </li>
                </ul>
              </div>
              <div>
                <label class="el-checkbox auto-login"><span class="el-checkbox__input">
                  <span class="el-checkbox__inner"></span>
                  <input type="checkbox" class="el-checkbox__original" value="">
                  </span><span class="el-checkbox__label">记住密码<!----></span>
                </label> 
                <a href="javascript:;" class="register">注册 XMall 账号</a> 
                <a style="padding: 1px 0px 0px 10px;">忘记密码 ?</a>
              </div>
              <div class="login-wrap">
                <a href="javascript:;" class="btn-login" @click="login">登  录</a>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-show="loginShow"></div>
      </header>
      <modal :mdShow="mdShow" v-on:close="closeModal">
        <p slot="message">{{showText}}</p>
        <div slot="btnGroup">
            <a href="javascript:;" class="btn btn--m" @click="mdShow=false">关闭</a>
          </div>
      </modal>
  </div>
</template>

<script>
import axios from 'axios'
import "../assets/css/icomoon/style.css"
import modal from '../components/modal.vue'
export default {
  data() {
    return {
      loginShow: false,
      errTip: false,
      errTip2: false,
      errTip3: false,
      userName: '',
      userPwd: '',
      myName: '',
      nameShow: true,
      mdShow:false,
      showText:'',
      showCart:false,
      cartNumList:[],
      isFull:true,
      delShowIndex:''
    }
  },
  created() {
    this.checklogin();
  },
  mounted() {
    this.checklogin();
  },
  computed: {
    totalPrice() {
      var Money = 0;
      this.cartNumList.forEach((item, index) => {
          Money+=item.productPrice*item.productNum;
        // console.log(_this.totalMoney);
      });
      return Money;
    },
    totalNum() {
      var num = 0;
      this.cartNumList.forEach((item, index) => {
          num+=item.productNum;
        // console.log(_this.totalMoney);
      });
      return num;
    }
  },
  methods: {
    checklogin() {
      axios.get('/api/users/checkLogin').then((res) => {
        res = res.data;
        if(res.status === '1') {
          this.nameShow = false;
          this.myName = res.result;
          this.getCartData();
          this.isFull = true;
        } else if(res.status === '10001') {
          let routeName = 'GoodsDetails';
          let currentUrl = this.$route.name;
          this.isFull = false;
          if(currentUrl == routeName) {
            return;
          } else {
            this.$router.push({
              path:`/`
            });
          }
        } else {
          this.nameShow = true;
          this.isFull = false;
        }
      });
    },
    cartShow() {
      this.showCart = true;
    },
    cartHidden() {
      this.showCart = false;
    },
    login() {
      if(!this.userName || !this.userPwd) {
        this.errTip2 = true;
        return;
      }else {
        var param = {
          userId: this.userName,
          userPw: this.userPwd
          };
        axios.get('/api/users/login', {
          params:param //将参数传递给后台
        }).then((res) => {
          res = res.data;
          //console.log(res.msg[0].userName);
          if(res.status==='1') {
            this.myName = res.result[0].userName;
            this.nameShow = false;
            this.getCartData();
            this.close();
            // alert(`${res.msg}`);
          } else if(res.status === '404') {
            this.errTip1 = true;
            this.errTip = false;
            this.errTip2 = false;
          } else if(res.status === '-2') {
            this.errTip = true;
            this.errTip1 = false;
            this.errTip2 = false;
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    logout() { // 注销
      axios.get('/api/users/logout').then((res) => {
        res = res.data;
        if(res.status === '1') {
          this.myName = '';
          this.nameShow = true;
        }
      });
    },
    getCartData() {
      axios.get('/api/users/getCartData').then((res) => {
        res = res.data;
        if(res.status==='1'){
          if(res.result.length>0) {
            this.cartNumList = res.result;
            this.isFull = true;
            // console.log(this.cartNumList);
            // console.log('1111');
          } else {
            this.isFull = false;
          }
          
        }else if(res.status==='0'){
          console.log('没有数据,请添加');
        }else{
          console.log('请先登录');
        }
      });
    },
    delCartList(item) {
      var index = this.cartNumList.indexOf(item);
            // console.log(index);
            var param = {
              productId:item.productId
            };
            axios.get('/api/users/delProduct', {
              params:param
            }).then((res) => {
              res = res.data;
              if(res.status === '1') {
                this.cartNumList.splice(index, 1);
                this.$nextTick(() => {
                  this.getCartData();
                });
              }
            });
    },
    close() {
      this.loginShow = false;
      this.userName = '';
      this.userPwd = '';
      this.errTip = false;
      this.errTip1 = false;
      this.errTip2 = false;
    },
    closeModal() {
      this.mdShow = false;
    }
  },
  components: {
    modal
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .header 
      position:fixed
      margin-top: -1px
      z-index:999
      .navbar
        padding:5px 40px 10px 20px
        .navbar-brand-logo
          width:120px
          vertical-align:middle
        .navbar-right-container
          .navbar-cart-container
            position:relative
            .navbar-cart-link
              vertical-align:middle
            .navbar-cart-count
              top: 0px;
              right: -20px; 
            .nav-user-wrapper
              position:absolute
              top: 18px
              right:-35px
              width:360px
              padding-top:18px
              visibility: visible
              opacity: 1
              transition: opacity .15s ease-out
              z-index:99
              .nav-user-list
                position: relative;
                background: #fff;
                border: 1px solid #d6d6d6;
                border-color: rgba(0, 0, 0, 0.08);
                border-radius: 8px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                z-index: 10;
                &:before
                  content:''
                  position: absolute
                  right:33px
                  background:url('../../static/images/icon.png') no-repeat -49px -43px
                  background-size: 240px 107px
                  width: 20px
                  height: 8px
                  top: -8px
                  margin-left: -10px
                .full
                  border-radius: 8px;
                  overflow: hidden;
                  .nav-cart-items
                    overflow-x: hidden;
                    overflow-y: auto;
                    @media (max-height:1080px)
                      max-height:620px
                    @media (max-height:900px)
                      max-height:744px
                    @media (max-height:768px)
                      max-height:423px
                    .clearfix
                      &:hover
                        background:#f7f7f7
                      .cart-item
                        height: 120px;
                        width: 100%;
                        overflow: hidden;
                        border-top: 1px solid #f0f0f0;
                        &:first-child
                          border-top:none
                          border-radius: 8px 8px 0 0
                        .cart-item-inner
                          padding: 20px
                          position: relative
                          .item-thumb
                            position: relative
                            float: left
                            width: 80px
                            height: 80px
                            border-radius: 3px
                            img 
                              display: block
                              width: 100%
                              height: 100%
                              border-radius: 3px
                              overflow: hidden
                          .item-desc
                            margin-left: 98px
                            display: table
                            width: 205px
                            height: 80px
                            .cart-cell
                              display: table-cell
                              vertical-align: middle
                              h4
                                color: #000
                                width: 185px
                                overflow: hidden
                                word-break: keep-all
                                white-space: nowrap
                                text-overflow: ellipsis
                                font-size: 14px
                                line-height: 16px
                                margin-bottom: 10px
                              h6
                                color: #cacaca
                                font-size: 12px
                                line-height: 14px
                                margin-top: 20px
                                span 
                                  display: inline-block
                                  font-weight: 700
                                  color: #cacaca
                                .price-icon
                                  color:#d44d44
                                .price-num
                                  margin-left: 5px
                                  font-size: 14px
                                  color: #d44d44
                                .item-num
                                  margin-left: 10px                 
                          .del-btn
                            display: block
                            cursor: pointer
                            width: 20px
                            height: 20px
                            background: url('../../static/images/icon.png') -50px -60px no-repeat;
                            background-size: 240px 107px
                            text-indent: -9999em
                          .del 
                            display: none
                            overflow: hidden
                            position: absolute
                            right: 20px
                            top: 50%
                            transform: translateY(-50%)
                          .showDel
                            display:block
                  .nav-cart-total
                    box-sizing: content-box
                    position: relative
                    padding: 20px
                    height: 40px
                    background: #fafafa
                    border-top: 1px solid #f0f0f0
                    border-radius: 0 0 8px 8px
                    box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.5), 0 -3px 8px rgba(0, 0, 0, 0.04)
                    background: linear-gradient(#fafafa, #f5f5f5)
                    p 
                      margin-bottom: 4px
                      line-height: 16px
                      font-size: 12px
                      color: #c1c1c1
                    h5
                      line-height: 20px
                      font-size: 14px
                      color: #6f6f6f
                      span 
                        font-size: 18px
                        color: #de4037
                        display: inline-block
                        font-weight: 700
                        &:first-child
                          font-size: 12px
                          margin-right: 5px
                    h6
                      position: absolute
                      right: 20px
                      top: 20px
                      width: 108px
                      input
                        display: inline-block
                        cursor: pointer
                        text-align: center
                        user-select: none
                        display: inline-block
                        width: 100%
                        height: 100%
                      .main-btn
                        border: 1px solid rgb(209, 67, 74)
                        border-radius: 4px
                        font-size: 12px
                        color: #fff
                        background-color: rgb(209, 67, 74)
                        background-image: linear-gradient(180deg, rgb(209, 67, 74), rgb(209, 67, 74))
                        vertical-align: middle  
                .cart-con
                  text-align: center
                  position: relative
                  background:url('../../static/images/cart-empty-new.png') no-repeat center
                  p 
                    padding-top: 190px
                    color: #333333
                    font-size: 16px   
              
              
</style>
