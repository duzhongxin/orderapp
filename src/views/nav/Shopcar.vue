<template>
  <div>
    <div class="title">购物车</div>
    <div v-if="!this.shopcarlist_x.length">
      <h3>你还没有选择的商品</h3>
    </div>
    <div class="lists" v-for="(item,index) in this.shopcarlist_x" :key="index">
      <p class="van-ellipsis">{{item.name}}</p>
      <b>￥{{(item.price*item.num).toFixed(2)}}</b>
      <van-stepper v-model="item.num" theme="round" button-size="22" disable-input min="0" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isshow: true,
    };
  },
  computed: {
    shopcarlist_x() {
      return this.$store.getters.shopcarlist;
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  width: 100%;
  height: 30px;
  background-color: #ffc300;
  text-align: center;
  line-height: 30px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px 0;
}
.lists {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  p {
    width: 200px;
  }
}
h3 {
  text-align: center;
  line-height: 50px;
}
</style>