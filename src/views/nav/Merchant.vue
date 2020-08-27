<template>
  <div>
    <div class="header">
      <div>
        <h4>{{merchantdata.name}}</h4>
        <van-rate
          v-model="merchantdata.score"
          :size="15"
          color="#ffd21e"
          void-icon="star"
          void-color="#eee"
          readonly
        />
        <span>(661) 月售1000单</span>
      </div>
      <div>
        <van-icon name="like" color="red" />
        <p>已收藏</p>
      </div>
    </div>
    <van-row type="flex" justify="space-around">
      <van-col span="6">
        <p>起步价</p>
        <b>{{merchantdata.minPrice}}</b>
        <span>元</span>
      </van-col>
      <van-col span="6">
        <p>商品配送</p>
        <b>{{merchantdata.deliveryPrice}}</b>
        <span>元</span>
      </van-col>
      <van-col span="6">
        <p>平均配送时间</p>
        <b>{{merchantdata.deliveryTime}}</b>
        <span>分钟</span>
      </van-col>
    </van-row>
    <div class="bac_div"></div>
    <div class="content">
      <h4>活动与广告</h4>
      <p>
        尊敬的客官，六一攻略：
        ①6月1日当天在评价区分享童年趣事赠6元无门槛红包
        ②下单时在订单备注处填写【六一儿童节快乐】随机赠送“回忆杀爆款玩具”，数量有限，送完即止。
        提前预祝大小宝宝节日开心。
      </p>
    </div>
    <div class="foot">
      <div class="list_div" v-for="(itme,index) in merchantdata.supports" :key="index">
        <p>
          <van-tag color="#ffc300" text-color="#fff">减</van-tag>
          {{itme}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { shopseller } from "@/api/apis";
export default {
  data() {
    return {
      merchantdata: {},
    };
  },
  async created() {
    let item = await shopseller();
    this.merchantdata = item.data.data;
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin: 0 20px;
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
  > div {
    h4 {
      line-height: 30px;
    }
    span {
      font-size: 12px;
    }
    p {
      line-height: 30px;
    }
  }
}
.van-col {
  text-align: center;
  padding: 10px 0;
  p {
    font-size: 14px;
    color: #ccc;
    font-weight: normal;
    line-height: 30px;
  }
  b {
    font-size: 18px;
  }
  span {
    font-size: 12px;
    color: #ccc;
  }
  border: none;
}
.bac_div {
  width: 100%;
  height: 20px;
  background: #f4f4f4;
  margin: 10px 0;
}
.content {
  padding: 20px;
  h4 {
    line-height: 30px;
  }
  p {
    font-size: 14px;
    color: #ee3a0c;
    line-height: 24px;
  }
}
.foot {
  padding-bottom: 70px;
  .list_div {
    p {
      margin-left: 120px;
      line-height: 50px;
      color: red;
      .van-tag {
        padding: 4px;
      }
    }
  }
}
</style>