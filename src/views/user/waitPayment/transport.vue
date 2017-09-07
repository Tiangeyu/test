<template>
    <div class="bg">
        <div class="transport">
            <ul class="clearfix">
                <li class="iconCar">
                    <i></i>
                </li>
                <li class="tranInfo">
                    <dl>
                        <dt class="clearfix ">承运来源 :<span class="tranName">{{ShipperCode}}</span><span class="orderNum">运单编号 : {{LogisticCode}}</span></dt>
                        <dd>物流状态 :<span class="orderPosition">{{AcceptStation}}</span></dd>
                    </dl>
                </li>
                <li class="tranTime"><span>{{AcceptTime}}</span></li>  
            </ul>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .bg{
        background: #fff;
    }
    .transport{
        margin-left: 30/200/1.17rem;
        border-bottom: 1px solid #e9e9e9;
        background: #fff;
        .iconCar{
            height: 148/200/1.17rem;
            width: 8%;
            float: left;
            i{
                display: block;
                width: 32/200/1.17rem;
                height: 28/200/1.17rem;
                background: url(../../../common/imgs/wait-car.png) no-repeat center;
                background-size: 100%;
                margin-top: 60/200/1.17rem;
            }
        }
        .tranInfo{
            width: 92%;
            float: left;
            font-size: 26/200/1.17rem;
            color: #333;
            dt{
                margin-top: 15/200/1.17rem;
                .tranName{
                    margin-left: 20/200/1.17rem;
                }
                .orderNum{
                    float: right;
                    margin-right: 20/200/1.17rem;
                }
            }
            dd{
                margin-top: 15/200/1.17rem;
                .orderPosition{
                    margin: 0 20/200/1.17rem;
                }
            }
        }
         .tranTime{
            margin-top: 15/200/1.17rem;
            width: 90%;
            float: left;
            font-size: 26/200/1.17rem;
            color: #999999;
        }
    }
</style>
<script>
    export default {
        data(){
            return{
                orderDetail:'',
                logisticsNo:'',
                LogisticCode:'',
                AcceptTime:'',
                AcceptStation:'',
                ShipperCode:''
            }
        },
        created(){
            var orderId = this.$route.query.id
            this.$http.get('/eb-wxshop/wxshop/order/getOrderDetail',{params:{id:orderId}}).then((res)=>{
                if(res.body.result=='000'){
                    var orderDetail = res.body.order
                    // console.log(orderDetail)
                    this.$http.get('/eb-wxshop/wxshop/order/getOrderLogisticsInfo',{params:{logisticsNo:orderDetail.logisticsNo,logisticsCode:orderDetail.logisticsCode}}).then((response)=>{
                        // console.log(response)
                        if(response.body.Success==true){  
                            var ShipperCode = response.body.ShipperCode
                            this.ShipperCode = ShipperCode
                            var LogisticCode = response.body.LogisticCode
                            this.LogisticCode = LogisticCode
                            var AcceptStation = response.body.Traces.AcceptStation
                            this.AcceptStation = AcceptStation 
                            var AcceptTime = response.body.Traces.AcceptTime
                            this.AcceptTime = AcceptTime 
                        }else{
                            alert(response.body.Reason)
                        }

                    }).catch((response)=>{

                    })
                }else{
                    alert(res.body.resultMsg)
                }
                
            }).catch((res)=>{

            })
            
        }
    }
  
</script>