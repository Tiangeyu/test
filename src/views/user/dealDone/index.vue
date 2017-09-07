<template>
  <section class="canvas">
      <header>
        <div class="clearfix">
            <i class="succIcon" v-show="dealDone.status == 5"></i>
            <i class="succIcon1" v-show="dealDone.status == 8"></i>
            <span v-show="orderData == '订单成功'">{{orderData}}</span>
        </div>
      </header>
      <section>
        <transport></transport>
        <location></location>
        <productNum></productNum>
        <div class="bg">
            <div class="tellWords">
                <span>买家留言</span>
                <input placeholder="请卖家检查好包装">
            </div>
        </div>
        <orderNum></orderNum>
      </section>
  </section>
</template>
<style lang="less" scoped>
    .bg{
        background: #fff;
        .tellWords{
            margin-bottom: 20/200rem;
            background: #fff;
            font-size: 24/200rem;
            color: #666;
            height: 88/200rem;
            line-height: 88/200rem;
            border-top: 1px solid #e9e9e9;
            margin-left: 30/200rem;
        }
        .tellWords input{
            border: none;
            height: 100%;
            font-size: 26/200rem;
            color: #333;
            padding-left: 30/200rem;
        }
    }
    .canvas{
        background: #f4f4f4;
    }
    header{
        height: 88/200rem;
        line-height: 88/200rem;
        background: #3c3c42;
        div{
            height: 88/200rem;
            color: #fff;
            font-size: 26/200rem;
            .succIcon{
                display: block;
                width: 33/200rem;
                height: 33/200rem;
                margin: 27.5/200rem 20/200rem 0 30/200rem;
                float: left;
                background: url(../../../common/imgs/wait-check.png) no-repeat center;
                background-size: 100%;
            }
            .succIcon1{
                display: block;
                width: 33/200rem;
                height: 33/200rem;
                margin: 27.5/200rem 20/200rem 0 30/200rem;
                float: left;
                background: url(../../../common/imgs/order-cancel.png) no-repeat center;
                background-size: 100%;
            }
        }
    }
    
</style>
<script>
    import transport from './transport.vue'
    import location from '../waitPayment/location.vue'
    import productNum from '../waitPayment/productNum.vue'
    import orderNum from './orderNum.vue'
    export default {
        data(){
            return{
                orderData:'',
                dealDone:''
            }
        },
        components:{
            transport,
            location,
            productNum,
            orderNum
        },
        created() {
            this.$http.get('/eb-wxshop/wxshop/order/getOrderDetail?id=1').then(function(res){
                var dealDone = JSON.parse(res.bodyText).order
                this.dealDone = dealDone
                if(dealDone.status==1){
                    this.orderData = '待收货'             
                }
            },function(res){

            })
            document.body.style.backgroundColor = "#fff";
            document.title = "交易完成"
        }
    }
</script>
