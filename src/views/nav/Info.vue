<template>
  <div class="main">
    <img :src="shopdata.imgUrl" width="140px" />
    <div class="details">
      <h4>{{shopdata.name}}</h4>
      <p>
        <span>月售{{shopdata.sellCount}}份</span>&emsp;
        <span>好评率{{shopdata.rating}}%</span>
      </p>
      <div class="price">
        <p>
          <span class="new-price">￥{{shopdata.price}}</span>&emsp;
          <del>￥66.9</del>
        </p>
        <van-button round style="background-color:#ffc300;color:#fff">
          <van-icon name="cart" />&emsp;加入购物车
        </van-button>
      </div>
    </div>
    <!-- 商品介绍 -->
    <div class="introduce">
      <h5>商品介绍</h5>
      <p>{{shopdata.goodsDesc}}</p>
    </div>
    <!-- 商品评价 -->
    <div class="evaluate">
      <van-tabs type="card">
        <van-tab title="全部90">
          <div v-for="(item,index) in JSON.parse(shopdata.ratings)" :key="index" class="info_div">
            <div>
              <span>{{timestampToTime(item.rateTime)}}</span>
              <img :src="item.avatar" class="toux" />
            </div>
            <p>{{item.text}}</p>
          </div>
        </van-tab>
        <van-tab title="推荐50"></van-tab>
        <van-tab title="吐槽40"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopdata: {},
    };
  },
  methods: {
    timestampToTime(cjsj) {
      var date = new Date(cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
  },
  created() {
    this.$route.query.ratings = JSON.stringify(this.$route.query.ratings);
    this.shopdata = this.$route.query;
  },
};
</script>

<style lang="less" scoped>
.main {
  overflow: scroll;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.info_div {
  padding: 40px;
  div {
    display: flex;
    justify-content: space-between;
  }
  .toux {
    width: 50px;
    border-radius: 50%;
    margin: 0;
  }
}
.details {
  background-color: #ffffff;
  padding: 5px;
  box-sizing: border-box;
  h4 {
    line-height: 30px;
  }
  > p {
    line-height: 30px;
    color: #999999;
    font-size: 14px;
  }
  .price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .new-price {
      font-weight: bold;
      color: #ffc300;
      font-size: 20px;
    }
    del {
      font-size: 14px;
      color: #999999;
    }
  }
}
.introduce {
  padding: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
  margin-top: 20px;
  h5 {
    line-height: 30px;
  }
  p {
    font-size: 14px;
    line-height: 20px;
  }
}
.evaluate {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
  padding-bottom: 30px;
}
img {
  margin: 0 auto;
}
</style>
