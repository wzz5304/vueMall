<template>
    <div>
      <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdShow}">
        <div class="md-modal-inner">
          <div class="md-content">
            <div class="confirm-tips">
              <slot name="message"></slot>
            </div>
            <div class="btn-wrap">
              <slot name="btnGroup"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
    </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .md-show
    display:block
  .md-modal
    .md-modal-inner
      padding:50px 20px
</style>
<script>
    export default{
        props:["mdShow"],
        data(){
            return{
                msg:'hello vue'
            }
        },
        methods:{
          closeModal(){
            this.$emit("close");
          }
        }
    }
</script>
