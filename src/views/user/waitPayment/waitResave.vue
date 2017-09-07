<template>
  <section class="canvas">
      <header>
        <div class="clearfix">
            <i class="succIcon"></i>
            <span>待收货</span>
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
        </div>
        <orderNum></orderNum>
        <div class="underBtn bg" v-show="productChild.isSaleAfter == 0">
          <ul>
              <li @click="toApply"><button>申请退款</button></li>
              <li @click="noticeShow=!noticeShow"><button>确认收货</button></li>
          </ul>
        </div>
        <div class="getBtn" v-show="productChild.isSaleAfter == 1">
          <button @click="noticeShow=!noticeShow">确认收货</button>
        </div>
      </section>
      <alertA :title="notice" :isShow="noticeShow" @isOk="makeSure" @isCancle="toClose"></alertA>
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
    .underBtn{
        padding-bottom: 200/200/1.17rem;
        li{
            float: left;
            margin-left: 6/200/1.17rem;
            button{
                display: block;
                width: 310/200/1.17rem;
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
    }
    .getBtn{
        width: 100%;
        float: left;
        margin-bottom: 200/200/1.17rem;
        button{
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
                notice:'是否确认收货？',
                noticeShow:false,
                productChild:[]
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
            //申请退款
            toApply(){
                var orderId = this.$route.query.id
                this.$router.push({name: 'comeApply', query:{orderId: orderId}})
            },
            //确认收货
            toClose:function(){
                this.noticeShow = !this.noticeShow;
            },
            makeSure(){
                var orderId = this.$route.query.id
                var orderStatus = 5
                this.$http.get('/eb-wxshop/wxshop/order/changeOrderStatus',{params:{orderId:orderId,orderStatus:orderStatus}}).then((res)=>{
                    if(res.body.result=='000'){
                        this.$router.push('/myOrder');
                        // this.$router.push({path: '/waitPayment', query: {id:orderId,status:orderStatus}})
                        
                    }else{
                        alert(res.body.resultMsg)
                    }
                }).catch((res)=>{

                })
            }
        },
        created() {
            var orderId = this.$route.query.id;
            this.$http.get('/eb-wxshop/wxshop/order/getOrderDetail',{params:{id:orderId}}).then(function(res){
                var dealDone = JSON.parse(res.bodyText).order
                this.dealDone = dealDone
                var productChild = dealDone.childList[0]
                this.productChild = productChild
            },function(res){

            })
            document.body.style.backgroundColor = "#fff";
            document.body.style.paddingBottom = "1.0/1.17rem";
            document.title = "待收货"
        }
    }
</script>

