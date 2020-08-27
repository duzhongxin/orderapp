<template>
  <div class="nav-box">
    <div class="top-box">
      <div class="logo">
        <img :src="merchantdata.avatar" />
        <div>
          <h3>
            <van-tag type="danger">品牌</van-tag>
            {{merchantdata.name}}
          </h3>
          <p>{{merchantdata.description}}/{{merchantdata.deliveryTime}}分钟送达</p>
          <span>
            <van-tag color="#fff" text-color="#f2826a">减</van-tag>单人套餐 VC无限橙果汁全..
            <van-tag
              color="#3C3C3C"
              text-color="#fff"
              round
              size="large"
              @click="show = true"
            >{{len}}个 ></van-tag>
          </span>
        </div>
      </div>
      <van-notice-bar
        left-icon="volume-o"
        :text="merchantdata.bulletin"
        color="#fff"
        background="rgba(155,155,155,0.5)"
      />
    </div>
    <div class="center-box">
      <router-link to="/">点餐</router-link>
      <router-link to="/rate">评论</router-link>
      <router-link to="/merchant">商家</router-link>
    </div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <div class="bottom-box">
      <div class="right_div">
        <van-icon name="smile-o" size="20" />
        <p>联系商家</p>
      </div>
      <div class="center_div">
        <div class="logo" :style="num?'background-color:#ffc300':'background-color:#c4c4c4'">
          <van-icon name="shopping-cart" size="25" @click="isshow=!isshow" :badge="num" />
        </div>
        <div>
          <h3>￥{{price}}</h3>
          <p>另需配送费￥4|支持自取</p>
        </div>
      </div>
      <div class="left_div">
        <p>去结算</p>
      </div>
    </div>
    <van-overlay :show="show" @click="show = false">
      <div class="top_div">
        <h2>{{merchantdata.name}}</h2>
        <van-rate
          v-model="merchantdata.score"
          :size="25"
          color="#ffd21e"
          void-icon="star"
          void-color="#eee"
        />
      </div>
      <div class="title_div">
        <span></span>
        <h3>优惠信息</h3>
        <span></span>
      </div>
      <div class="list_div" v-for="(itme,index) in merchantdata.supports" :key="index">
        <p>
          <van-tag color="#fff" text-color="#f2826a">减</van-tag>
          {{itme}}
        </p>
      </div>
      <div class="title_div">
        <span></span>
        <h3>商家公告</h3>
        <span></span>
      </div>
      <div class="end_div">
        <p>{{merchantdata.bulletin}}</p>
      </div>
    </van-overlay>
    <transition name="slide-fade">
      <div v-show="isshow" class="shopcar_div">
        <Shopcar></Shopcar>
      </div>
    </transition>
  </div>
</template>

<script>
import { shopseller } from "@/api/apis";
import Shopcar from "./nav/Shopcar";
export default {
  data() {
    return {
      merchantdata: {},
      len: 0,
      show: false,
      isshow: false,
      value: 0,
    };
  },
  async created() {
    let res = await shopseller();
    this.merchantdata = res.data.data;
    this.len = res.data.data.supports.length;
  },
  methods: {},
  components: {
    Shopcar,
  },
  computed: {
    shopcarlist_x() {
      return this.$store.getters.shopcarlist;
    },
    num() {
      var num = 0;
      for (var obj of this.shopcarlist_x) {
        num += obj.num;
      }
      return num;
    },
    price() {
      var price = 0;
      for (var obj of this.shopcarlist_x) {
        price += obj.price * obj.num;
      }
      return price.toFixed(2);
    },
  },
};
</script>

<style lang="less" scoped>
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(200px);
  opacity: 0;
}
.nav-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  .top-box {
    height: 160px;
    background-image: url(../assets/bg.jpg);
    color: #fff;
    img {
      width: 100px;
      border-radius: 10px;
    }
    .logo {
      display: flex;
      justify-content: space-around;
      line-height: 34px;
      padding: 9px;

      p {
        font-size: 16px;
      }
      span {
        font-size: 12px;
      }
    }
  }
  .van-tag {
    margin: 0 5px;
    font-weight: bold;
  }
  .center-box {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    font-weight: bold;
    a {
      color: #000;
    }
  }

  .bottom-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: #222222;
    position: fixed;
    bottom: 12px;
    border-radius: 30px;
    overflow: hidden;
    color: #ccc;
    font-size: 14px;
    z-index: 2;
    .right_div {
      height: 60px;
      text-align: center;
      padding: 0px 10px;
      border-right: 4px solid #fff;
      padding-top: 20px;
    }
    .center_div {
      display: flex;
      flex: 1;
      justify-content: space-around;
      .logo {
        text-align: center;
        line-height: 50px;
        width: 40px;
        height: 40px;
        color: #000;
        border-radius: 50%;
      }
      h3 {
        line-height: 20px;
      }
    }
    .left_div {
      color: #000;
      height: 60px;
      padding: 0 16px;
      line-height: 40px;
      background: #ffc300;
      line-height: 60px;
    }
  }
}
.van-overlay {
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
}
.top_div {
  text-align: center;
  line-height: 50px;
  margin-top: 30px;
}
.title_div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;

  span {
    display: block;
    width: 120px;
    border-bottom: 1px solid #ccc;
  }
  h3 {
    padding: 0 10px;
  }
}
.list_div {
  p {
    margin-left: 40px;
    line-height: 40px;
    .van-tag {
      padding: 4px;
    }
  }
}
.end_div {
  p {
    line-height: 28px;
    padding: 20px;
  }
}
.shopcar_div {
  padding-bottom: 20px;
  overflow: hidden;
  border-radius: 30px;
  z-index: 1;
  width: 100%;
  position: fixed;
  bottom: 70px;
  background-color: #fff;
}
</style>