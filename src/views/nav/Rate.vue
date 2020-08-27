<template>
  <div>
    <div class="header">
      <div>
        <b>{{merchantdata.score}}</b>
        <p>综合统计</p>
        <span>高于周边商家{{merchantdata.sellCount}}%</span>
      </div>
      <div>
        <p>
          服务态度
          <van-rate
            v-model="merchantdata.score"
            :size="15"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
            readonly
          />
          <span>{{merchantdata.score}}</span>
        </p>
        <p>
          菜品质量
          <van-rate
            v-model="merchantdata.score"
            :size="15"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
            readonly
          />
          <span>{{merchantdata.score}}</span>
        </p>
        <p>
          送达时间
          <span>{{merchantdata.deliveryTime}}分钟</span>
        </p>
      </div>
    </div>
    <div class="bac_div"></div>
    <van-tabs type="card" color="#ffc300" title-active-color="#000">
      <van-tab :title="'全部'+String(list.length)">
        <div v-for="(item,index) in list" :key="index" class="content">
          <img :src="item.avatar" alt />
          <div class="details">
            <div class="title">
              <h4>{{item.username}}</h4>
              <span>{{timestampToTime(item.rateTime)}}</span>
            </div>
            <div class="delivery">
              <van-rate
                v-model="item.score"
                :size="12"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                readonly
              />
              <span class="time">{{item.deliveryTime}}分钟送达</span>
            </div>
            <p>{{item.text}}</p>
            <div class="give">
              <van-icon name="good-job" color="#ffc300" />
              <span v-for="(item,index) in item.recommend" :key="index">{{item}}</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab :title="'满意'+String(goodlist.length)">
        <div v-for="(item,index) in goodlist" :key="index" class="content">
          <img :src="item.avatar" alt />
          <div class="details">
            <div class="title">
              <h4>{{item.username}}</h4>
              <span>{{timestampToTime(item.rateTime)}}</span>
            </div>
            <div class="delivery">
              <van-rate
                v-model="item.score"
                :size="12"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                readonly
              />
              <span class="time">{{item.deliveryTime}}分钟送达</span>
            </div>
            <p>{{item.text}}</p>
            <div class="give">
              <van-icon name="good-job" color="#ffc300" />
              <span v-for="(item,index) in item.recommend" :key="index">{{item}}</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab :title="'不满意'+String(badlist.length)">
        <div v-for="(item,index) in badlist" :key="index" class="content">
          <img :src="item.avatar" alt />
          <div class="details">
            <div class="title">
              <h4>{{item.username}}</h4>
              <span>{{timestampToTime(item.rateTime)}}</span>
            </div>
            <div class="delivery">
              <van-rate
                v-model="item.score"
                :size="12"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                readonly
              />
              <span class="time">{{item.deliveryTime}}分钟送达</span>
            </div>
            <p>{{item.text}}</p>
            <div class="give">
              <van-icon name="good-job" color="#ffc300" />
              <span v-for="(item,index) in item.recommend" :key="index">{{item}}</span>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { shopratings } from "@/api/apis";
import { shopseller } from "@/api/apis";

export default {
  data() {
    return {
      value: 4.5,
      list: [],
      merchantdata: {},
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
  async created() {
    let res = await shopratings();
    this.list = res.data.data;
    let item = await shopseller();
    this.merchantdata = item.data.data;
  },
  computed: {
    goodlist() {
      let list = this.list.filter((obj) => obj.score >= 3);
      return list;
    },
    badlist() {
      let list = this.list.filter((obj) => obj.score < 3);
      return list;
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  > div:first-child {
    text-align: center;
    border-right: 1px solid #f4f4f4;
    padding-right: 20px;
    line-height: 24px;
    b {
      font-size: 30px;
      color: #ffc300;
    }
    span {
      font-size: 12px;
      color: #ccc;
    }
  }
  > div:last-child {
    margin-left: 20px;
    p {
      font-size: 12px;
      line-height: 24px;
    }
    div {
      padding-right: 10px;
    }
    span {
      color: #ffc300;
    }
  }
}
.bac_div {
  width: 100%;
  height: 20px;
  background: #f4f4f4;
  margin: 10px 0;
}
.van-tabs {
  padding-bottom: 70px;
}
.content {
  display: flex;
  justify-content: flex-start;
  padding-bottom: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid #f4f4f4;
  padding: 20px;
  div {
    padding: 10px 0;
    p {
      line-height: 30px;
    }
  }
  .details {
    width: 100%;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      span {
        font-size: 12px;
      }
    }
    .delivery {
      display: flex;
      align-items: center;
      .time {
        color: #ccc;
        margin-left: 10px;
      }
    }
    .give {
      span {
        color: #ccc;
        display: inline-block;
        border: 1px solid #f4f4f4;
        padding: 1px;
        margin-left: 6px;
        margin-bottom: 6px;
      }
    }
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
    vertical-align: middle;
  }
}
</style>