<template>
  <div class="bg">
      <div class="address clearfix">
        <ul>
            <li class="localIkon">
                <i></i>
            </li>
            <li class="addressDetail">
                <dl>
                    <dt class="clearfix">收货人 :<span class="buyerName">{{orderDetail.contact}}</span><span class="phoneNum">{{orderDetail.contactPhone}}</span></dt>
                    <dd>收货地址 :<span class="specificAddress">{{orderDetail.address}}</span></dd>
                </dl>
            </li>       
        </ul>
      </div>
  </div>
</template>
<style lang="less" scoped>
    .bg{
        background: #fff;
    }
    .address{
        margin-left: 30/200/1.17rem;
        background: #fff;
        // height: 150/200/1.17rem;
        .localIkon{
            width: 8%;
            float: left;
            i{
                display: block;
                width: 26/200/1.17rem;
                height: 31/200/1.17rem;
                background: url(../../../common/imgs/wait-location.png) no-repeat center;
                background-size: 100%;
                margin-top: 54.5/200/1.17rem;
            }
        }
        .addressDetail{
            width: 92%;
            float: left;
            font-size: 26/200/1.17rem;
            color: #666;
            dt{
                margin-top: 15/200/1.17rem;
                .buyerName{
                    margin-left: 20/200/1.17rem;
                }
                .phoneNum{
                    float: right;
                    margin-right: 20/200/1.17rem;
                }
            }
            dd{
                margin-right: 15/200/1.17rem;
                margin-top: 15/200/1.17rem;
                margin-bottom: 20/200/1.17rem;
                .specificAddress{
                    margin-left: 20/200/1.17rem;
                }
            }
        }
    }
</style>
<script>
    export default {
        data(){
            return{
                orderDetail:''
            }
        },
        created(){
            var orderId = this.$route.query.id
            this.$http.get('/eb-wxshop/wxshop/order/getOrderDetail',{params:{id:orderId}}).then(function(res){
            var orderDetail = JSON.parse(res.bodyText).order
                this.orderDetail = orderDetail
                // console.log(orderDetail.customerName)
            },function(res){

            })
        },
    }
  
</script>