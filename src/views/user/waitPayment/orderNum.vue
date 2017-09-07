<template>
  <section class="orderInfo">
      <div class="orderPrice">
          <ul class="clearfix">
              <li>
                  <span>商品总额</span>
                  <span>￥{{orderNum.productCost}}</span>
              </li>
              <li>
                  <span>运费 </span>
                  <span>+￥0</span>
              </li>
              <li class="realPay">
                  <span>实付款</span>
                  <span>￥{{orderNum.gathering}}</span>
              </li> 
          </ul>
      </div>
      <div class="orderNum">
          <ul>
              <li>
                  <P>订单编号: 
                    <span id="bar">{{orderNum.orderNo}}</span> 
                    <!--<a href="javascript:;" class="btn copyBtn" data-clipboard-target="#bar">复制</a>-->
                  </P>
              </li>
              <li>
                  <P>微信交易号: {{orderNum.onlinePayNo}}</P>
              </li>
              <li>
                  <P>创建时间: {{orderNum.orderDate}}</P>
              </li>
              <li>
                  <P>付款时间: {{orderNum.payTime}}</P>
              </li>
              <li>
                  <P>发货时间: 2017-6-27 14:20:15</P>
              </li>
              <li v-show="orderNum.status == 5">
                  <P>成交时间: {{orderNum.validateTime}}</P>
              </li>
          </ul>
      </div>
      <!--<div class="underBtn" v-show="orderNum.status == 8">
          <ul>
              <li><a href="javascript:;">申请退款</a></li>
              <li><a href="javascript:;">确认收货</a></li>
          </ul>
      </div>-->
  </section>
</template>
<style lang="less" scoped>
    .orderInfo{
        background: #fff;
        margin-top: 20/200/1.17rem;
        .orderPrice{
            // height: 140/200/1.17rem;
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
            height: 326/200/1.17rem;
            margin: 30/200/1.17rem 20/200/1.17rem 0 30/200/1.17rem;
            li{
                font-size: 24/200/1.17rem;
                color: #666;
                margin-bottom: 20/200/1.17rem; 
            }
        }
        
            
    }
</style>
<script>
    import Clipboard from 'clipboard'
    new Clipboard('.btn');
    export default {
        data(){
            return{
                orderNum:''
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
            var orderId = this.$route.query.id
            this.$http.get('/eb-wxshop/wxshop/order/getOrderDetail',{params:{id:orderId}}).then((res)=>{
                var orderNum = JSON.parse(res.bodyText).order
                    this.timerDetail()
                    this.orderNum = orderNum
                
                    let turnorderTime = orderNum.orderDate;
                    let turnorderPay = orderNum.payTime
                    let turnorderDone = orderNum.validateTime
                    let newDate = new Date();
                    if(turnorderTime != null && turnorderTime !=''){
                        newDate.setTime(turnorderTime);
                        orderNum.orderDate = newDate.format('yyyy-MM-dd hh:mm:ss')
                    }
                    if(turnorderPay != null && turnorderPay !=''){
                        newDate.setTime(turnorderPay);
                        orderNum.payTime = newDate.format('yyyy-MM-dd hh:mm:ss')
                    }
                    if(turnorderDone != null && turnorderDone !=''){
                        newDate.setTime(turnorderDone);
                        orderNum.validateTime = newDate.format('yyyy-MM-dd hh:mm:ss')
                    }
            }).catch((res)=>{

            })
        }
    }
</script>
