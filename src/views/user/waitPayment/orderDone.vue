<template>
  <section class="canvas">
      <header>
        <div class="clearfix">
            <i class="succIcon"></i>
            <span>订单成功</span>
        </div>
      </header>
      <section class="mt">
        <transport></transport>
        <location></location>
        <productNum></productNum>
        <div class="bg" v-show="dealDone.remark != ''&& dealDone.remark != null">
            <div class="tellWords">
                <span>买家留言</span>
                <input v-model="dealDone.remark"></input>
            </div>
        </div>
        <orderNum></orderNum>
      <div class="returnBtn">
          <a href="javascript:;" @click="noticeShow =!noticeShow">删除订单</a>
      </div>
      <alertA :title="notice" :isShow="noticeShow" @isOk="toDelete" @isCancle="toClose"></alertA>
      </section>
  </section>
</template>
<style lang="less" scoped>
    .bg{
        background: #fff;
        .tellWords{
            margin-bottom: 20/200/1.17rem;
            background: #fff;
            font-size: 24/200/1.17rem;
            color: #666;
            height: 88/200/1.17rem;
            line-height: 88/200/1.17rem;
            border-top: 1px solid #e9e9e9;
            margin-left: 30/200/1.17rem;
        }
        .tellWords input{
            border: none;
            height: 100%;
            font-size: 26/200/1.17rem;
            color: #333;
            padding-left: 30/200/1.17rem;
        }
    }
    .canvas{
        background: #f4f4f4;
    }
    header{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 88/200/1.17rem;
        line-height: 88/200/1.17rem;
        background: #3c3c42;
        div{
            height: 88/200/1.17rem;
            color: #fff;
            font-size: 26/200/1.17rem;
            .succIcon{
                display: block;
                width: 33/200/1.17rem;
                height: 33/200/1.17rem;
                margin: 27.5/200/1.17rem 20/200/1.17rem 0 30/200/1.17rem;
                float: left;
                background: url(../../../common/imgs/wait-check.png) no-repeat center;
                background-size: 100%;
            }
            .succIcon1{
                display: block;
                width: 33/200/1.17rem;
                height: 33/200/1.17rem;
                margin: 27.5/200/1.17rem 20/200/1.17rem 0 30/200/1.17rem;
                float: left;
                background: url(../../../common/imgs/order-cancel.png) no-repeat center;
                background-size: 100%;
            }
        }
    }
    .returnBtn{
        width: 100%;
        float: left;
        margin-bottom: 200/200/1.17rem;
        a{
            display: block;
            width: 90%;
            height: 66/200/1.17rem;
            line-height: 66/200/1.17rem;
            border: 1px solid #999999;
            border-radius: 5px;
            text-align: center;
            font-size: 28/200/1.17rem;
            color: #333;
            margin-left: 40/200/1.17rem;
        }
    }
    .mt{
        margin-top: 88/200/1.17rem;
    }
</style>
<script>
    import transport from './transport.vue'
    import location from '../waitPayment/location.vue'
    import productNum from '../waitPayment/productNum.vue'
    import orderNum from './orderNum.vue'
    import alertA from '../../../components/alertA.vue'
    export default {
        data(){
            return{
                orderData:'',
                dealDone:'',
                notice:'是否删除订单？',
                noticeShow:false
            }
        },
        components:{
            transport,
            location,
            productNum,
            orderNum,
            alertA
        },
        methods:{
           toDelete:function(){
                var orderId = this.$route.query.id
                this.$http.get('/eb-wxshop/wxshop/order/deleteOrderById',{params:{id:orderId}}).then((res)=>{
                    // console.log(res.body)
                    if(res.body.result=='000'){
                        this.$router.push('/myOrder');
                    }else{
                        alert(res.body.resultMsg)
                    }
                }).catch((res)=>{

                })
            },
            toClose:function(){
                this.noticeShow = !this.noticeShow;
            }
        },
        created() {
            var orderId = this.$route.query.id
            this.$http.get('/eb-wxshop/wxshop/order/getOrderDetail',{params:{id:orderId}}).then(function(res){
                var dealDone = JSON.parse(res.bodyText).order
                    this.dealDone = dealDone
                
            },function(res){

            })
            document.body.style.backgroundColor = "#fff";
            document.body.style.paddingBottom = "1.0/1.17rem";
            document.title = "交易完成"
        }
    }
</script>

