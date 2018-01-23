<template>
    <div>
      <div class="md-modal modal-msg md-modal-transition" id="showModalw" v-bind:class="{'md-show':insertShow}">
          <div class="md-modal-inner">
            <div class="md-top">
              <button class="md-close" @click="closeModal">关闭</button>
            </div>
            <span><i style="color:#ee7a23;">*</i>为必填项</span>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="md-form-item">
                  <label class="md-form-item__label" style="width: 80px;">
                    收货人<i style="color:#ee7a23;">*</i>
                  </label>
                  <div class="md-form-item__content" style="margin-left: 80px;">
                    <div  class="el-input">
                      <input type="text" autocomplete="off" class="md-input__inner" v-model="newName">
                    </div>
                  </div>
                </div>
                <div class="md-form-item">
                  <label class="md-form-item__label" style="width: 80px;">
                    所在地址<i style="color:#ee7a23;">*</i>
                  </label>
                  <div class="md-form-item__content" style="margin-left: 80px;">
                    <div  class="el-input">
                      <input type="text" autocomplete="off" class="md-input__inner" v-model="newAddress" placeholder="建议您如实填写收货信息:例如省/市/区/街道地址/门牌号" title="建议您如实填写收货信息:例如省/市/区/街道地址/门牌号">
                    </div>
                  </div>
                </div>
                <div class="md-form-item">
                  <label class="md-form-item__label" style="width: 80px;">
                    电话号码<i style="color:#ee7a23;">*</i>
                  </label>
                  <div class="md-form-item__content" style="margin-left: 80px;">
                    <div  class="el-input">
                      <input type="text" autocomplete="off" class="md-input__inner" v-model="newTel">
                    </div>
                  </div>
                </div>
                <div class="md-form-item">
                  <label class="md-form-item__label" style="width: 80px;">
                    邮政编码<i style="color:#ee7a23;">*</i>
                  </label>
                  <div class="md-form-item__content" style="margin-left: 80px;">
                    <div  class="el-input">
                      <input type="text" autocomplete="off" class="md-input__inner" v-model="newPostCode">
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn-wrap col-2">
                <button class="btn btn--s" id="btnModalConfirms" @click="saveVue">保存</button>
                <button class="btn btn--s btn--red" id="btnModalCancels" @click="closeModal">取消</button>
              </div>
              <slot></slot>
            </div>
          </div>
        </div>
        <div :class="{'md-overlay':insertShow}" id="showOverLay" @click="closeModal"></div>
    </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .md-show
    display:block
</style>
<script>
import "../assets/css/modal.css"
    export default{
        props:["insertShow"],
        data(){
            return{
                msg:'hello vue',
                newName:'',
                newAddress:'',
                newTel:'',
                newPostCode:''
            }
        },
        methods:{
          closeModal(){
            this.$emit("close");
          },
          saveVue() {
            this.$emit("insertNewAdr",{'userName':this.newName,'streetName':this.newAddress,'tel':this.newTel,'postCode':this.newPostCode});
          }
        }
    }
</script>
