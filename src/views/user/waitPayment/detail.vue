<template>
  <section class="orderInfo clearfix">
      <div class="orderPrice">
          <ul class="clearfix">
              <li>
                  <span>商品总额</span>
                  <span>￥{{detailData.productCost}}</span>
              </li>
              <!--<li>
                  <span>优惠</span>
                  <span>+￥0</span>
              </li>-->
              <li>
                  <span>运费 </span>
                  <span>+￥0</span>
              </li>
              <li class="realPay">
                  <span>实付款</span>
                  <span>￥{{detailData.gathering}}</span>
              </li> 
          </ul>
      </div>
      <div class="orderNum">
          <ul>
              <li>
                  <P>订单编号: 
                    <span id="bar">{{detailData.orderNo}}</span> 
                    <!--<a href="javascript:;" class="btn copyBtn" data-clipboard-target="#bar">复制</a>-->
                  </P>
              </li>
              <li>
                  <P>微信交易号: {{detailData.onlinePayNo}}</P>
              </li>
              <li>
                  <P>创建时间: {{detailData.orderDate}}</P>
              </li>
              <li v-show="detailData.status==6">
                  <P>付款时间: {{detailData.payTime}}</P>
              </li>
          </ul>
      </div>
  </section>

</template>
<style lang="less" scoped>
    .orderInfo{
        background: #fff;
        margin-top: 20/200/1.17rem;
        .orderPrice{
            // height: 192/200/1.17rem;
            padding: 30/200/1.17rem 0 0 30/200/1.17rem; 
            border-bottom: 1px solid #e9e9e9;
            li{
                font-size: 24/200/1.17rem;
                color: #666;
                margin-bottom: 15/200/1.17rem;
                span:nth-child(2){
                    float: right;
                    margin-right: 20/200/1.17rem;
                }
                
            }
            .realPay{
                font-size: 28/200/1.17rem;
                color: #333;
                span:nth-child(2){
                    font-size: 28/200/1.17rem;
                    color: #e93b39;
                }
            }
        }
    }
    .copyBtn{
        display: block;
        width: 90/200/1.17rem;
        height: 35/200/1.17rem;
        line-height: 35/200/1.17rem;
        border: 1px solid #e9e9e9;
        border-radius: 2px;
        text-align: center;
        float: right;
    }
    .orderNum{
        height: 276/200/1.17rem;
        margin: 30/200/1.17rem 20/200/1.17rem 0 30/200/1.17rem;
        li{
            font-size: 24/200/1.17rem;
            color: #666;
            margin-bottom: 20/200/1.17rem; 
        }
    }
    .returnBtn{
        width: 100%;
        float: left;
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
</style>
<script>
    import alertA from '../../../components/alertA.vue'
    import $ from 'jquery'
    // import Clipboard from 'clipboard'
    // new Clipboard('.btn');
    export default {
        components:{
            alertA
        },
        data(){
            return{
                cancelOrder:[],
                detailData:''
            }
        },
        methods:{
            timerDetail() {
                Date.prototype.format = function (format) {
                    let date = {
                        "M+": this.getMonth() + 1,
                        "d+": this.getDate(),
                        "h+": this.getHours(),
                        "m+": this.getMinutes(),
                        "s+": this.getSeconds(),
                        "q+": Math.floor((this.getMonth() + 3) / 3),
                        "S+": this.getMilliseconds()
                    };
                    if (/(y+)/i.test(format)) {
                        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
                    }
                    for (var k in date) {
                        if (new RegExp("(" + k + ")").test(format)) {
                            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                        }
                    }
                    return format;
                }
                
            },
            
        },
        created(){
            //订单详情
            var orderId = this.$route.query.id
            this.$http.get('/eb-wxshop/wxshop/order/getOrderDetail',{params:{id:orderId}}).then((res)=>{
                var detailData = JSON.parse(res.bodyText).order
                    this.timerDetail()
                    this.detailData = detailData
                    // console.log(detailData)
                    let turnTime = detailData.orderDate;
                    let turnPay = detailData.payTime
                    
                    let newDate = new Date();
                    if(turnTime != null&&turnTime !=''){
                        newDate.setTime(turnTime);
                        detailData.orderDate = newDate.format('yyyy-MM-dd hh:mm:ss')
                    }
                    if(turnPay != null&&turnPay !=''){
                        newDate.setTime(turnPay);
                        detailData.payTime = newPay.format('yyyy-MM-dd hh:mm:ss')
                    }
            }).catch((res)=>{

            })
            // //申请售后接口
            // this.$http.get('/eb-wxshop/wxshop/order/listPaidOrders?customerId=1').then(function(res){
            //     var cancelOrder = JSON.parse(res.bodyText).orders[0]
            //     this.cancelOrder = cancelOrder
            // },function(res){

            // })
            
        }
    }
</script>