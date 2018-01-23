<!--商品详情-->
<template>
<div>
  <mall-header v-on:initscroll="scrollTop"></mall-header>
  <mall-bread>
  <span>商品列表</span>
  </mall-bread>
  <div class="w store-content" v-for="item in goodsList">
    <div class="gray-box">
      <div class="gallery-wrapper">
        <div class="gallery">
          <div class="thumbnail">
            <ul>
              <li :class="{on:big===1}" @click="big=1">
                <img v-lazy="`static/${item.productImg}`" :alt="item.productName">
              </li>
              <li :class="{on:big===2}" @click="big=2">
                <img v-lazy="`static/${item.productImg}`" :alt="item.productName">
              </li>
              <li :class="{on:big===3}" @click="big=3">
                <img v-lazy="`static/${item.productImg}`" :alt="item.productName">
              </li>
              <li :class="{on:big===4}" @click="big=4">
                <img v-lazy="`static/${item.productImg}`" :alt="item.productName">
              </li>
              <li :class="{on:big===5}" @click="big=5">
                <img v-lazy="`static/${item.productImg}`" :alt="item.productName">
              </li>
              <!-- <li>
                <img src="../assets/img/1.png" alt="">
              </li> -->
            </ul>
          </div>
          <div class="thumb">
            <div class="big">
              <img v-lazy="`static/${item.productImg}`" :alt="item.productName">
            </div>
          </div>
        </div>
      </div>
      <!--右边-->
      <div class="banner">
        <div class="sku-custom-title">
          <h4>{{item.productDetails}}</h4>
          <h6>
            <span>{{item.sub_title}}</span>
            <span class="price">
              <em>¥</em><i>{{item.productPrice}}</i></span>
          </h6>
        </div>
        <div class="num">
          <span class="params-name">数量</span>
          <buy-num @edit-num="editNum" :limit="Number(item.limit_num)"></buy-num>
        </div>
        <div class="buy">
          <y-button text="加入购物车"
                    @btnClick="addCart(item)"
                    classStyle="main-btn"
                    style="width: 145px;height: 50px;line-height: 48px"></y-button>
          <y-button text="现在购买"
                    @btnClick="checkout(product.productId)"
                    style="width: 145px;height: 50px;line-height: 48px;margin-left: 10px"></y-button>
        </div>
      </div>
    </div>
    <!--产品信息-->
    <div class="item-info">
      <y-shelf title="产品信息">
        <div slot="content">
          <!-- <div class="img-item">
            <div></div>
          </div> -->
          <div class="no-info">
            <img v-lazy="`static/details-img/${item.descImg}`">
            <br>
            {{item.desc}}
          </div>
        </div>
      </y-shelf>
    </div>
  </div>
  <modal :mdShow="mdShow" v-on:close="closeModal">
          <p slot="message">{{showText}}</p>
          <div slot="btnGroup">
            <a href="javascript:;" class="btn btn--m" @click="mdShow=false" v-if="!ifCart">关闭</a>
            <a href="javascript:;" class="btn btn--m" @click="mdShow=false" v-if="ifCart">继续购物</a>
            <router-link to="/cart" class="btn btn--m" @click="mdShow=false" v-if="ifCart">去购物车</router-link> 
          </div>
        </modal>
  <mall-footer></mall-footer>
</div>
</template>
<script>
  import { productDet, addCart } from '../api/goods.js'
  import { mapMutations, mapState } from 'vuex'
  import YShelf from '../components/shelf'
  import BuyNum from '../components/buynum'
  import YButton from '../components/YButton'
  import mallHeader from '../components/header.vue'
  import mallFooter from '../components/footer.vue'
  import mallBread from '../components/navbread.vue'
  import modal from '../components/modal.vue'
  // import { getStore } from '/utils/storage'
  import axios from 'axios'
  import $ from 'jquery'
  export default {
    data () {
      return {
        productMsg: {},
        small: [],
        goodsList:[],
        big: 1,
        product: {},
        productNum: 1,
        userId: '',
        mdShow:false,
        showText:'',
        ifCart:false,
        productId:''
      }
    },
    computed: {
      // ...mapState(['login', 'showMoveImg', 'showCart'])
    },
    mounted() {
      this.getdata();
    },
    methods: {
      getdata(){
        var m = Base64.decode(this.$route.query.m);
        // alert(m);
        var param = ({
          productId:m
        });
        axios.get('/api/getDetails', {
          params:param
        }).then((res) => {
          res = res.data;
          if(res.status === '1') {
            this.goodsList = res.result;
            console.log(this.goodsList);
          }
        });
      },
      editNum (num) {
        this.productNum = num
        //console.log(this.productNum);
      },
      addCart(value) {
          this.productId = value.productId;
          var param = {
            productId:this.productId,
            productNum:this.productNum
          };
          //console.log(this.productNum)
          axios.get('/api/addCart', {
            params:param //将productId传给后台
          }).then((res) => {
            res = res.data;
            // console.log(res.status);
            if(res.status === '1'){
              var setData = ({
                productId: value.productId,
                productPrice: value.productPrice,
                checked:1,
                productName: value.productName,
                productImg: value.productImg,
                productNum: this.productNum
                });
              this.$store.commit('updateCartList', setData);
              this.$store.commit('updateCartCount', 1);
              this.$store.commit('updateHaveProduct', true);
              this.showText = res.msg;
              this.mdShow = true;
              this.ifCart = true;
            }else if(res.status === '10001'){
                    //alert(`${res.msg}`);
                    this.showText = res.msg;
                    this.mdShow = true;
            }else{
              console.log('faile!');
            }
          }).catch((error) => {
            console.log('error');
          });
        },
        closeModal() {
          this.mdShow = false;
        },
      checkout (productId) {
        axios.get('/api/users/checkLogin').then((res) => {
            res = res.data;
            if(res.status === '1') {
             this.$router.push({
                    path: '/checkout', query: {productId, num: this.productNum}
                  });
            } else if(res.status === '10001'){
                    //alert(`${res.msg}`);
                    this.showText = res.msg;
                    this.mdShow = true;
           }
          });
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
      BuyNum, 
      YButton,
      mallHeader,
      mallFooter,
      mallBread,
      modal
    },
    //created () {
      //let id = this.$route.query.productId
      //this._productDet(id)
      //this.userId = getStore('userId')
    //}
  }
</script>
<style lang="scss" scoped>
  @import '../assets/style/mixin.scss';
  .store-content {
    clear: both;
    width: 1220px;
    min-height: 600px;
    padding: 0 0 25px;
    margin: 0 auto;
  }

  .gray-box {
    display: flex;
    padding: 60px;
    margin: 20px 0;
    .gallery-wrapper {
      .gallery {
        display: flex;
        width: 540px;
        .thumbnail {
          li:first-child {
            margin-top: 0px;
          }
          li {
            @include wh(80px);
            margin-top: 10px;
            padding: 12px;
            border: 1px solid #f0f0f0;
            border: 1px solid rgba(0, 0, 0, .06);
            border-radius: 5px;
            cursor: pointer;
            &.on {
              padding: 10px;
              border: 3px solid #ccc;
              border: 3px solid rgba(0, 0, 0, .2);
            }
            img {
              display: block;
              @include wh(100%);
            }
          }
        }
        .thumb {
          .big {
            margin-left: 20px;
          }
          img {
            display: block;
            @include wh(440px)
          }
        }
      }
    }
    // 右边
    .banner {
      width: 580px;
      margin-left: 10px;
      h4 {
        font-size: 16px;
        font-weight:700;
        line-height: 1.25;
        color: #000;
        margin-bottom: 13px;
      }
      h6 {
        font-size: 14px;
        line-height: 1.5;
        color: #bdbdbd;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .sku-custom-title {
        overflow: hidden;
        padding: 8px 8px 18px 10px;
        position: relative;
      }
      .params-name {
        padding-right: 20px;
        font-size: 14px;
        color: #8d8d8d;
        line-height: 36px;
      }
      .num {
        padding: 29px 0 8px 10px;
        border-top: 1px solid #ebebeb;
        display: flex;
        align-items: center;
      }
      .buy {
        position: relative;
        border-top: 1px solid #ebebeb;
        padding: 30px 0 0 10px;
      }
    }
  }

  .item-info {

    .gray-box {
      padding: 0;
      display: block;
    }
    .img-item {
      width: 1220px;
      // padding: 1vw;
      text-align: center;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
  }

  .no-info {
    padding: 200px 0;
    text-align: center;
    font-size: 30px;
  }

  .price {
    display: block;
    color: #d44d44;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: right;
    i {
      padding-left: 2px;
      font-size: 24px;
    }
  }
</style>
