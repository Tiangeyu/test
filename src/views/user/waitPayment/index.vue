<template> 
  <section class="comSum">
      <!--待付款-->
      <waittingPay v-if="orderDetail.status == 0"></waittingPay>
      <!--待发货-->
      <waitTran v-else-if="orderDetail.status == 6"></waitTran>
      <!--待收货-->
      <waitResave v-else-if="orderDetail.status == 8"></waitResave>
      <!--订单取消-->
      <orderCanceled v-else-if="orderDetail.status == 9"></orderCanceled>
      <!--订单完成-->
      <orderDone v-else-if="orderDetail.status == 5"></orderDone>
  </section>
</template>
<style lang="less" scoped>
    .comSum{
        background: #f4f4f4;
    }
</style>
<script>
    import orderDone from './orderDone.vue'
    import waittingPay from './waittingPay.vue'
    import waitResave from './waitResave.vue'
    import waitTran from './waitTran.vue'
    import orderCanceled from './orderCanceled.vue'
    export default {
        components:{
            orderDone,
            waittingPay,
            waitResave,
            waitTran,
            orderCanceled
        },
        data(){
            return{
                orderDetail:'',
                wait:false,
                done:false,
                resave:false,
                tran:false,
                cancel:false
            }
        },
        created(){
            var orderId = this.$route.query.id
            this.$http.get('/eb-wxshop/wxshop/order/getOrderDetail',{params:{id:orderId}}).then((res)=>{
                var orderDetail = JSON.parse(res.bodyText).order
                    this.orderDetail = orderDetail
                
                // if( Date.parse(new Date()) - this.orderDetail.orderDate > 900 * 1000 && orderDetail.status == 0){
                //     this.orderData = '待付款',
                //     this.timerDetail();
                // }else{
                //     this.orderData = '订单取消'             
                // }
                // if(orderDetail.status==6){
                //     this.orderData = '待发货'
                // }
            }).catch((res)=>{

            })
            document.body.style.backgroundColor = "#fff";
            document.title = "等待买家付款"
        }
    }
  
</script>