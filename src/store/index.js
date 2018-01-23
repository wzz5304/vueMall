import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  myName:'',
  cartCount:0,
  goodsList:[],
  cartList:[],
  haveLen:false,
  totalPrice:0,
  checkGoodsLen:true
}

export default new Vuex.Store({
  state,
  mutations: {
  // 保存用户名
  	updateUser(state,myName) { 
  		state.myName = myName;
  	},
  // 更新商品商品列表
    updateGoodslist(state,goodsList) { 
      state.goodsList = goodsList;
    },
  // 初始化商品列表
    initGoodslist(state,goodsList) { 
      state.goodsList = goodsList;
    },
  // 判断goodsList是否为空
    checkGoodLen(state,ifLen) { 
      state.checkGoodsLen = ifLen;
    },
  // 更新购物车商品数量
  	updateCartCount(state,cartNum) { 
  		var cart = state.cartList;
  		state.cartCount = cart.length;
  	},
  // 初始化购物车商品数量
  	initCartCount(state,cartNum) { 
  		state.cartCount = cartNum;
  	},
  //更新购物车列表
  	updateCartList(state,{productId, productPrice,checked,productName, productImg, productNum = 1}) {
  		let cart = state.cartList; // 购物车
  		let falg = true;
	    let goods = {
		    productId,
		    productPrice,
		    productName,
		    productImg
		    };
	    if (cart.length) {        // 有内容
	      cart.forEach(item => {
	        if (item.productId === productId) {
	          if (item.productNum >= 0) {
	            falg = false;
	            item.productNum += productNum;
	          }
	        }
	      })
	    }
	    if (!cart.length || falg) {
	      goods.productNum = productNum;
	      goods.checked = '1';
	      cart.push(goods);
	    }
	    state.cartList = cart;
  	},
  // 删除购物车商品
  	delCartList(state,{productId}) {
  		let cart = state.cartList;
	    cart.forEach((item, i) => {
	      if (item.productId === productId) {
	      	cart.splice(i, 1);
	      }
	    });
	    state.cartList = cart;
	},
 // 初始化购物车
	initCartList(state,cartList) {
  		state.cartList = cartList;
  	},
  updateHaveProduct(state, flag) {
  		state.haveLen = flag;
  	},
  // 判断购物车是为空
  	checkCartLen(state,flag) {
  		let len = state.cartCount; // 购物车
  		if(len<=0) {
  			state.haveLen = false;
  		} else{
  			state.haveLen = true;
  		}
  	}
  }
})
