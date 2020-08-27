<template>
  <div class="order-box">
    <div class="order-left">
      <div>
        <van-sidebar v-model="index">
          <van-sidebar-item
            :title="item.name"
            v-for="(item,index) in goodslist_x"
            :key="index"
            @click="tablebtn(index)"
            :id="'0'+index"
          />
        </van-sidebar>
      </div>
    </div>
    <div class="order-right">
      <div>
        <div class="content" v-for="(item,index) in goodslist_x" :key="index" :id="index">
          <p>{{item.name}}</p>
          <van-card
            v-for="(res,indexs) in item.foods"
            :key="indexs"
            :price="(res.price).toFixed(2)"
            :title="res.name"
            :desc="'月售'+res.sellCount+'份' + '好评率'+ res.rating+'%'"
            :thumb="res.imgUrl"
          >
            <template #tags>
              <van-tag plain type="danger" @click="changebtn(res)">详情</van-tag>
            </template>
            <template #footer>
              <van-stepper v-model="res.num" theme="round" button-size="22" min="0" disable-input />
            </template>
          </van-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { goodslist } from "@/api/apis";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      index: 0,
    };
  },
  async created() {
    let res = await goodslist();
    for (var obj of res.data.goodsList) {
      for (var child of obj.foods) {
        child.num = 0;
      }
    }
    this.$store.commit("setgoodslist", res.data.goodsList);
  },
  methods: {
    changebtn(item) {
      this.$router.push({ path: "/info", query: item });
    },
    tablebtn(index) {
      this.rightscroll.scrollToElement(document.getElementById(index), 600);
    },
  },
  computed: {
    getheight() {
      let arr = [];
      let lotal = 0;
      for (var i = 0; i < this.goodslist_x.length; i++) {
        var curheight = document.getElementById(i).offsetHeight;
        arr.push({
          startcoord: lotal,
          endcoord: (lotal += curheight),
          index: i,
        });
        lotal + curheight;
      }
      return arr;
    },
    goodslist_x() {
      return this.$store.state.goodslist;
    },
    shopcarlist_x() {
      return this.$store.getters.shopcarlist;
    },
  },
  mounted() {
    this.leftscroll = new BScroll(document.querySelector(".order-left"), {
      click: true,
    });
    this.leftscroll;
    this.rightscroll = new BScroll(document.querySelector(".order-right"), {
      probeType: 3,
      click: true,
    });
    this.rightscroll.on("scroll", (obj) => {
      let _y = Math.abs(obj.y) + 1;
      for (var objs of this.getheight) {
        if (_y >= objs.startcoord && _y < objs.endcoord) {
          this.index = objs.index;
          this.leftscroll.scrollToElement(
            document.getElementById("0" + objs.index),
            600
          );
          break;
        }
      }
    });
  },
};
</script>

<style lang="less" scoped>
.order-box {
  display: flex;
  height: 100%;
  overflow: hidden;
  .order-left {
    height: 85%;
    overflow-y: auto;
    width: 80px;
  }
  .order-right {
    height: 85%;
    flex: 1;
    overflow-y: auto;
  }
}
.content {
  p {
    line-height: 28px;
    background: #f4f4f4;
    border-left: 4px solid #ccc;
    text-indent: 1em;
  }
}
.van-card {
  background-color: #fff;
}
.van-card__price {
  font-size: 18px;
  line-height: 30px;
  color: red;
  font-weight: bold;
}
</style>