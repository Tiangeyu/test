<template>
  <div>
      <div style="height:0.32rem; margin-bottom: 0.1rem;"> </div>
      <header>
          <ul class="box">
              <li @click="stateFn('null')" :class="{'active': this.state=='null'}">全部</li>
              <li @click="stateFn(0)" :class="{'active': this.state==0}">待付款</li>
              <li @click="stateFn(6)" :class="{'active': this.state==6}">待发货</li>
              <li @click="stateFn(8)" :class="{'active': this.state==8}">待收货</li>
              <li @click="stateFn(5)" :class="{'active': this.state==5}">已完成</li>
          </ul>
      </header>
      <section>
            <all  v-if="state=='null'"></all>
            <payment  v-else-if="state=='0'"></payment>
            <deliver  v-else-if="state=='6'"></deliver>
            <receipt  v-else-if="state=='8'"></receipt>
            <complete v-else-if="state=='5'"></complete>
      </section>
  </div>
</template>
<script>
//import InfiniteLoading from 'vue-infinite-loading';
import all from './all.vue';
import payment from './payment.vue'; //付款
import deliver from './deliver.vue';//发货
import receipt from './receipt.vue';//待收货
import complete from './complete.vue';//已完成

export default {
      data() {
            return {
                state:'',
            };
        },
    methods: {
        stateFn(state){
            this.state=state;
        }
    },
    components: {
        all,
        payment,
        deliver,
        receipt,
        complete
    },
    created(){
        document.body.style.backgroundColor='#f4f4f4';
        document.title = "所有订单";
        if(this.$route.query.state==undefined){
            this.state='null';
        }else{
            this.state=this.$route.query.state;
        }
        
    }
}
</script>
<style lang="less">
@import '../../common/css/myOrder.less';
</style>