<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a :href="slides[nowIndex].href">
        <transition name="slide-trans">
          <img v-if="isShow" :src="slides[nowIndex].src">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].src">
        </transition>
      </a>
    </div>
    <h2>{{ slides[nowIndex].title }}</h2>
    <ul class="slide-pages">
      <li @click="goto(prevIndex)">&lt;</li>
      <li v-for="(item, index) in slides"
      @click="goto(index)"
      >
        <a :class="{on: index === nowIndex}" class="slide-icon"></a>
      </li>
      <li @click="goto(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default: []
    },
    inv: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      nowIndex: 0,
      isShow: true
    }
  },
  computed: {
    prevIndex () {
      if (this.nowIndex === 0) {
        return this.slides.length - 1
      }
      else {
        return this.nowIndex - 1
      } 
    },
    nextIndex () {
      if (this.nowIndex === this.slides.length - 1) {
        return 0
      }
      else {
        return this.nowIndex + 1
      }
    }
  },
  methods: {
    goto (index) {
      this.isShow = false
      setTimeout(() => {
        this.isShow = true
        this.nowIndex = index
      }, 10)
    },
    runInv () {
      this.invId = setInterval(() => {
        this.goto(this.nextIndex)
      }, this.inv)
    },
    clearInv () {
      clearInterval(this.invId)
    }
  },
  mounted () {
    this.runInv();
  }
}
</script>

<style scoped>
.slide-trans-enter-active {
  transition: all .5s;
}
.slide-trans-enter {
  transform: translateX(940px);
}
.slide-trans-old-leave-active {
  transition: all .5s;
  transform: translateX(-940px);
}
.slide-show {
  position: relative;
  width: 940px;
  height: 300px;
  overflow: hidden;
  margin: 0 auto;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  height: 30px;
  text-align: left;
  padding-left: 15px;
}
.slide-img {
  width: 100%;
}
.slide-img img {
  width: 100%;
  min-height:200px;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  bottom: 5px;
  right: 15px;
}
.slide-pages .slide-icon {
  width:12px;
  height:12px;
  display: block;
  border-radius: 6px;
  background: #fff;
}
.slide-pages .slide-icon:hover{
  background: #c91623;
}
.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
}
.slide-pages li .on {
  text-decoration: underline;
  background: #c91623;
}
@media only screen and (max-width: 1080px){
  .slide-trans-enter {
    transform: translateX(100%);
  }
  .slide-trans-old-leave-active {
    transition: all .5s;
    transform: translateX(-100%);
  }
  .slide-show {
    position: relative;
    width: 100%;
    margin-top:-15px;
  }
}
@media only screen and (max-width: 767px){
  .slide-show {
    position: relative;
    width: 100%;
    height:200px;
  }
}
</style>
