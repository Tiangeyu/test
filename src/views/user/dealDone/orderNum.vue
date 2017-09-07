<template>
  <section class="orderInfo">
      <div class="orderPrice">
          <ul class="clearfix">
              <li>
                  <span>商品金额</span>
                  <span>￥{{orderNum.childList[0].basePrice}}</span>
              </li>
              <li>
                  <span>运费 </span>
                  <span>+￥0</span>
              </li>
              <li class="realPay">
                  <span>实付款</span>
                  <span>￥{{orderNum.childList[0].unitPrice}}</span>
              </li> 
          </ul>
      </div>
      <div class="orderNum">
          <ul>
              <li>
                  <P>订单编号: 
                    <span id="bar">{{orderNum.orderNo}}</span> 
                    <a href="javascript:;" class="btn copyBtn" data-clipboard-target="#bar">复制</a>
                  </P>
              </li>
              <li>
                  <P>微信交易号: {{orderNum.acNo}}</P>
              </li>
              <li>
                  <P>创建时间: {{orderNum.createTime}}</P>
              </li>
              <li>
                  <P>付款时间: {{orderNum.payTime}}</P>
              </li>
              <li>
                  <P>发货时间: 2017-6-27 14:20:15</P>
              </li>
              <li>
                  <P>成交时间: {{orderNum.validateTime}}</P>
              </li>
          </ul>
      </div>
      <div class="underBtn" v-show="orderNum.status == 8">
          <ul>
              <li><a href="javascript:;">申请退款</a></li>
              <li><a href="javascript:;">确认收货</a></li>
          </ul>
      </div>
  </section>
</template>
<style lang="less" scoped>
    .orderInfo{
        background: #fff;
        margin-top: 20/200rem;
        .orderPrice{
            // height: 140/200rem;
            padding: 30/200rem 0 0 30/200rem; 
            border-bottom: 1px solid #e9e9e9;
            li{
                font-size: 24/200rem;
                color: #666;
                margin-bottom: 15/200rem;
                span:nth-child(2){
                    float: right;
                    margin-right: 20/200rem;
                }
                
            }
            .realPay{
                font-size: 28/200rem;
                color: #333;
                span:nth-child(2){
                    font-size: 28/200rem;
                    color: #e93b39;
                }
            }
        }
        .copyBtn{
                    display: block;
                    width: 90/200rem;
                    height: 35/200rem;
                    line-height: 35/200rem;
                    border: 1px solid #e9e9e9;
                    border-radius: 2px;
                    text-align: center;
                    float: right;
                }
        .orderNum{
            height: 326/200rem;
            margin: 30/200rem 20/200rem 0 30/200rem;
            li{
                font-size: 24/200rem;
                color: #666;
                margin-bottom: 20/200rem; 
            }
        }
        .underBtn{
            padding-bottom: 200/200rem;
            li{
                float: left;
                margin-left: 6/200rem;
                a{
                    display: block;
                    width: 310/200rem;
                    height: 66/200rem;
                    line-height: 66/200rem;
                    border: 1px solid #999999;
                    border-radius: 5px;
                    text-align: center;
                    font-size: 28/200rem;
                    color: #333;
                    margin-left: 40/200rem;
                }
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
            // var orderId = id
            this.$http.get('/eb-wxshop/wxshop/order/getOrderDetail?id=1').then((res)=>{
                var orderNum = JSON.parse(res.bodyText).order
                this.orderNum = orderNum
               
                let turnorderTime = orderNum.createTime;
                let turnorderPay = orderNum.payTime
                let turnorderDone = orderNum.validateTime
                let newDate = new Date();
                newDate.setTime(turnorderTime);
                newDate.setTime(turnorderPay);
                newDate.setTime(turnorderDone);
                // console.log(newDate)
                orderNum.createTime = newDate.format('yyyy-MM-dd hh:mm:ss')
                orderNum.payTime = newDate.format('yyyy-MM-dd hh:mm:ss')
                orderNum.validateTime = newDate.format('yyyy-MM-dd hh:mm:ss')
                // console.log(orderNum.createTime)
                this.timerDetail()
            }).catch((res)=>{

            })
        }
    }
</script>
