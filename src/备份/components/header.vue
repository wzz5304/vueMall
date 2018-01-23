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
          <div class="search-btn">
          	<div class="el-autocomplete" minlength="1" maxlength="100">
	          	<div class="el-input"><!---->
		          	<i class="el-input__icon el-icon-search is-clickable" @click="search()"></i>
		          	<input placeholder="请输入商品信息" icon="search" type="text" rows="2" class="el-input__inner" v-model="secContent">
	          	</div>
          	</div>
          </div>
          <div class="navbar-right-container" style="display: flex;">
            <div class="navbar-menu-container">
              <span class="navbar-link"></span>
              <div v-on:mouseover="userShow" v-on:mouseout="userHidden">
                <a class="navbar-link navbar-user" @click="loginModal"></a>
                <div class="nav-user-info pa" v-show="infoShow && ifLogin">
                  <div class="nav-info-list">
                    <ul>
                      <li class="nav-user-avatar">
                        <div>
                          <img class="avatar" src="../../static/images/user-avatar.png">
                        </div>
                        <p class="name">{{myName}}</p>
                      </li>
                      <li class="user-li-style">
                        <router-link to="/orderlist">我的订单</router-link>
                      </li>
                      <li class="user-li-style">
                        <router-link to="/user/information">账号资料</router-link>
                      </li>
                      <li class="user-li-style">
                        <router-link to="/addresslist">收货地址</router-link>
                      </li>
                      <!-- <li class="user-li-style">
                        <router-link to="/user/support">售后服务</router-link>
                      </li> -->
                      <li class="user-li-style">
                        <router-link to="/user/coupon">我的优惠</router-link>
                      </li>
                      <li class="user-li-style">
                        <a href="javascript:;" @click="logout">退出</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="navbar-cart-container" v-on:mouseover="cartShow" v-on:mouseout="cartHidden">
                <router-link to='/cart' class="navbar-link navbar-cart-link">
                  <!-- <i class="icon-shopping_cart"></i> -->
                </router-link>
                <span class="navbar-cart-count">{{cartCount}}</span>
                <!--购物车显示块-->
                <div class="nav-user-wrapper pa active" v-show="showCart">
                  <div class="nav-user-list">
                    <div class="full" v-show="haveLen">
                      <!--购物列表-->
                      <div class="nav-cart-items">
                        <ul>
                          <li class="clearfix" v-for="(item,index) in cartList" v-on:mouseover="delShowIndex=index">
                            <div class="cart-item">
                              <div class="cart-item-inner">
                                <a @click="goDetail(item)">
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
                                </a>
                                <div class="del-btn del" @click="delCartList(item)" :class="{'showDel':delShowIndex==index?true:false}">删除</div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="nav-cart-total">
                        <p>共<strong>{{cartCount}}</strong> 件商品</p>
                        <h5>合计：<span class="price-icon">¥</span><span class="price-num">{{totalPrice}}</span  ></h5> 
                        <h6 >
                        <router-link to='/cart'>
                          <input type="button" readonly="readonly" class="main-btn" value="去购物车" style="height: 40px; width: 100%; margin: 0px; color: rgb(255, 255, 255); font-size: 14px; line-height: 38px;">
                        </router-link>
                        </h6>
                      </div>
                    </div>
                    <div class="cart-con" v-show="!haveLen" style="height: 313px; text-align: center;">
                      <p>您的购物车竟然是空的!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="md-modal modal-msg md-modal-transition md-login-modal" v-bind:class="{'md-show':loginShow}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">
                <!-- <img src="../../static/logo.png" alt="" style="height:100%;"> -->
              </div>
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
                    <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="用户账号" data-type="loginname" @blur="login">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tabindex="2"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="密码" @keyup.enter="login" @blur="login">
                  </li>
                  <li class="check-btn">
                    <label class="el-checkbox auto-login"><span class="el-checkbox__input">
                      <span class="el-checkbox__inner"></span>
                      <input type="checkbox" class="el-checkbox__original" value="">
                      </span><span class="el-checkbox__label">记住密码<!----></span>
                    </label> 
                    <a href="javascript:;" class="register acolor" @click="ifRegister">立即注册</a> 
                    <a style="padding: 1px 0px 0px 10px;" class="acolor">忘记密码 ?</a>
                  </li>
                </ul>
              </div>
              <div class="login-wrap">
                <a href="javascript:;" class="btn-login" @click="login">登  录</a>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-show="loginShow"></div>
        <register :registShow="registShow" v-on:close="registShow = false" v-on:showlogin="registShow=false,loginShow=true"></register>
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
import register from '../components/register.vue'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      loginShow: false,
      errTip: false,
      errTip2: false,
      errTip3: false,
      userName: '',
      userPwd: '',
      nameShow: true,
      mdShow:false,
      showText:'',
      showCart:false,
      infoShow:false,
      delShowIndex:'',
      ifLogin:false,
      registShow:false,
      secContent:'',
      secDataList:[],
      page:1,
      pageSize:8
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
      this.cartList.forEach((item, index) => {
          Money+=item.productPrice*item.productNum;
      });
      return Money;
    },
    ...mapState(['myName','cartCount','cartList','haveLen'])
    // myName() {
    //   return this.$store.state.myName;
    // },
    // cartCount() {
    //   return this.$store.state.cartCount;
    // },
    // cartList() {
    //   return this.$store.state.cartList;
    // }
  },
  methods: {
    checklogin() {
      axios.get('/users/checkLogin').then((res) => {
        res = res.data;
        if(res.status === '1') {
          this.nameShow = false;
          this.ifLogin = true;
          this.$store.commit('updateUser', res.result);
          this.getCartData();
          this.$store.commit('updateHaveProduct', true);
        } else if(res.status === '10001') {
          let routeName = 'GoodsDetails';
          let currentUrl = this.$route.name;
          this.$store.commit('updateHaveProduct', false);
          if(currentUrl == routeName) {
            return;
          } else {
            this.$router.push({
              path:`/`
            });
          }
        } else {
          this.nameShow = true;
          this.$store.commit('updateHaveProduct', false);
        }
      });
    },
    cartShow() {
      this.showCart = true;
    },
    cartHidden() {
      this.showCart = false;
    },
    userShow() {
      this.infoShow = true;
    },
    userHidden() {
      this.infoShow = false;
    },
    loginModal() {
      if(this.myName == '') {
        this.loginShow = true;
      } else {
        this.loginShow = false;
        this.$router.push({path:'/orderlist'});
      }
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
        axios.get('/users/login', {
          params:param //将参数传递给后台
        }).then((res) => {
          res = res.data;
          if(res.status==='1') {
            //this.myName = res.result[0].userName;
            this.$store.commit('updateUser', res.result[0].userName);
            this.nameShow = false;
            this.ifLogin = true;
            this.getCartData();
            //this.checklogin();
            this.close();
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
      axios.get('/users/logout').then((res) => {
        res = res.data;
        if(res.status === '1') {
          this.$store.commit('updateUser', '');
          this.$store.commit('initCartCount', 0);
          this.$store.commit('updateCartList', {});
          this.$store.commit('updateHaveProduct', false);
          this.ifLogin = false;
          this.$router.push({
            path:'/'
          });
        }
      });
    },
    getCartData() {
      axios.get('/users/getCartData').then((res) => {
        res = res.data;
        if(res.status==='1'){
          this.$store.commit('initCartCount', res.result.length);
          this.$store.commit('initCartList', res.result);
          if(res.result.length>0) {
            this.$store.commit('updateHaveProduct', true);
            // console.log(res.result.length);
            // console.log('1111');
          } else {
            this.$store.commit('updateHaveProduct', false);
          }
          
        }else if(res.status==='0'){
          console.log('没有数据,请添加');
        }else{
          console.log('请先登录');
        }
      });
    },
    delCartList(item) {
      var index = this.cartList.indexOf(item);
      var param = {
        productId:item.productId
      };
      axios.get('/users/delProduct', {
        params:param
      }).then((res) => {
        res = res.data;
        if(res.status === '1') {
          this.cartList.splice(index, 1);
          this.$nextTick(() => {
            this.getCartData();
          });
        }
      });
    },
    goDetail(item) {
      this.$router.push({
          path:`/goodsdetails?m=${Base64.encode(item.productId)}}`
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
    },
    ifRegister() {
      this.loginShow = false;
      this.registShow = true;
    },
    search() {
    	var param = ({
    		secContent:this.secContent,
    		page:this.page,
            pageSize:this.pageSize,
            sort:1
    	});
      this.$emit("initscroll");
    	axios.get('/searchData', {
    		params:param
    	}).then((res) => {
    		res = res.data;
    		if(res.status === '1') {
    			if(!res.result.length) {
    				this.$store.commit('checkGoodLen', false);
    			} else {
    				this.$store.commit('updateGoodslist', res.result);
    			    this.$store.commit('checkGoodLen', true);
    			}
    			
    		}
    	});
    }
  },
  components: {
    modal,
    register
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
        .search-btn
        	position:absolute
        	top:15px
        	right:30vw
        	@media (max-width:768px)
        	    right:32vw
        	.el-autocomplete
        		display:inline-block
        		position:relative
        		width:17vw
        		@media (max-width:768px)
        		    width:33vw
        		.el-input
        			position:relative
        			font-size:14px
        			@media (max-width:768px)
        			    font-size:12px
        			.el-input__icon
        				position:absolute
        				width:35px
        				height:100%
        				right:0
        				top:0
        				text-align:center
        				color:#bfcbd9
        				transition:all 0.3s
        .navbar-right-container
          position:relative
          .navbar-user
            &:before
              content:''
              position: absolute
              right:30px
              margin-right:20px
              top: 21px
              width: 20px
              height: 20px
              background: url('../../static/images/icon.png') -155px 0
              background-size: 240px 107px
              transition: none
          .nav-user-info
            position: absolute
            z-index: 30
            padding-top: 18px
            //opacity: 0
            //visibility: hidden
            top: 38px
            width: 168px
            transform: translate(-70%)
            left: 38%
            .nav-info-list
              position: relative;
              padding-top: 20px;
              background: #fff;
              border: 1px solid #d6d6d6;
              border-color: rgba(0, 0, 0, 0.08);
              border-radius: 8px;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
              z-index: 10;
              &:before
                position: absolute
                content: " "
                background: url('../../static/images/icon.png') no-repeat -49px -43px
                background-size: 240px 107px
                width: 20px
                height: 8px
                top: -8px
                left: 50%
                transform: translateX(-50%)
              .nav-user-avatar
                div 
                  position: relative
                  margin: 0 auto 8px
                  width: 46px
                  height: 46px
                  text-align: center
                  &:before
                    content: ""
                    position: absolute
                    left: 0
                    right: 0
                    top: 0
                    bottom: 0
                    border-radius: 50%
                    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06)
                  .avatar
                    width:100%
                    height:100%
                    border-radius: 50%
                .name
                  margin-bottom: 16px
                  font-size: 12px
                  line-height: 1.5
                  text-align: center
                  color: #757575
              .user-li-style
                text-align: center
                position: relative
                border-top: 1px solid #f5f5f5
                line-height: 44px
                height: 44px
                color: #616161
                font-size: 12px
                &:hover
                  background:#f7f7f7
                a 
                  display: block
                  color: #616161
          .navbar-cart-container
            position:relative
            .navbar-cart-link
              vertical-align:middle
              &:before
                content:''
                position: absolute
                right: 0
                top: 1px
                width: 30px
                height: 20px
                background: url('../../static/images/icon.png') -22px 0
                background-size: 240px 107px
                background-position: -150px -22px;
                transition: none
            .navbar-cart-count
              top: 0px;
              right: -20px; 
            .nav-user-wrapper
              position:absolute
              top: 18px
              right:-30px
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
      .md-login-modal
        width:480px
        .regi_form_input
          border-radius:6px
        .check-btn
          position:relative
          text-align: right;
          .auto-login
            position: absolute
            top: 0px
            left: 2px
            color: #999
            .el-checkbox__input
              cursor: pointer;
              display: inline-block
              position: relative
              white-space: nowrap
              outline: 0
              line-height: 1
            .el-checkbox__label
              font-size: 14px
              padding-left: 5px
        .acolor 
          color:#d1434a
        .register
          padding: 1px 10px 0
          border-right: 1px solid #ccc
        .login-wrap
          .btn-login
            border-radius:6px
            height: 40px
            line-height: 40px
            border: 2px solid #db0611
            background: #db0611
            &:hover
              border: 2px solid #d1434a
              background: #d1434a
              
              
</style>
