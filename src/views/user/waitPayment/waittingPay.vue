<template> 
  <section class="comSum">
      <header>
        <div class="clearfix" v-show="waitPay">
            <i class="topHeader"></i>
            <span v-model="orderData">待付款</span>
            <span class="rest-timer clearfix">
                <span class="fl timeLimit">付款剩余时间</span>
                <font class="fl">{{dealTimer.m}}</font>
                <span class="fl flags">:</span>
                <font class="fl">{{dealTimer.s}}</font>
            </span>
        </div>
        <div class="cancelDiv clearfix" v-show="headerDiv">
            <i class="topHeader"></i>
            <span>订单取消</span>
        </div>
      </header>
      <section class="mt">
        <location></location>
        <productNum :productData="orderDetail"></productNum>
        <div class="bg" v-show="orderDetail.remark != ''&& orderDetail.remark !=null">
            <div class="tellWords">
                <span>买家留言</span>
                <input v-model="orderDetail.remark"></input>
            </div>
        </div>
        <detail></detail>
        <div class="underBtn"  v-show="cancelDiv">
          <ul>
              <li @click="isShow=!isShow"><button>取消订单</button></li>
              <li><button @click="goPay()">付款</button></li>
          </ul>
      </div>
        <div class="returnBtn"  v-show="deleteDiv">
            <a href="javascript:;" @click="noticeShow =!noticeShow">删除订单</a>
        </div>
        <alertA :title="notice" :isShow="noticeShow" @isOk="toDelete" @isCancle="toClose"></alertA>
        <div class="alertA" v-show="isShow">
            <div class="al-block">
                <h3>{{title}}</h3>
                <div class="al-button clearfix">
                    <button class="fl" @click="goPay()">去支付</button>
                    <button class="fl" @click="okCancle" style="background:#000">确认</button>
                </div>
            </div>
        </div>
      </section>
      <alert-c :title="cancel" v-show="toShow"></alert-c>
  </section>
</template>
<style lang="less" scoped>
    .cancelDiv{
        height: 88/200/1.17rem;
        color: #fff;
        font-size: 26/200/1.17rem;
        .topHeader{
            display: block;
            width: 33/200/1.17rem;
            height: 34/200/1.17rem;
            margin: 27.5/200/1.17rem 20/200/1.17rem 0 30/200/1.17rem;
            float: left;
            background: url(../../../common/imgs/order-cancel.png) no-repeat center;
            background-size: 100%;
        }
        span{
            float: left;
        }
        .rest-timer{
            margin-left: 100/200/1.17rem;
        }
    }
    .bg{
        background: #fff;
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
            .topHeader{
                display: block;
                width: 33/200/1.17rem;
                height: 33/200/1.17rem;
                margin: 27.5/200/1.17rem 20/200/1.17rem 0 30/200/1.17rem;
                float: left;
                background: url(../../../common/imgs/wait-time.png) no-repeat center;
                background-size: 100%;
            }
            span{
                float: left;
            }
            .rest-timer{
                margin-left: 100/200/1.17rem;
            }
        }
    }
    .m20{
        margin-top: 20/200/1.17rem;
    }
    .comSum{
        background: #f4f4f4;
    }
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
    .underBtn{
        margin-bottom: 200/200/1.17rem;
        margin-right: 20/200/1.17rem;
        li{
            float: left;
            margin-left: 6/200/1.17rem;
            button{
                display: block;
                width: 300/200/1.17rem;
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
    .alertA{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 99999;
        background: rgba(0, 0, 0, 0.3);
        .al-block{
            width: 580/200/1.17rem;
            height: 400/200/1.17rem;
            background: #fff;
            border-radius: 20/200/1.17rem; 
            margin: 0 auto;
            margin-top: 25vh;
        }
        h3{
            padding-top: 90/200/1.17rem;
            font-size: 32/200/1.17rem;
            color: #333;
            text-align: center;
        }
        .al-button{
            margin-top: 120/200/1.17rem;
            margin-left: 70/200/1.17rem;   
            button{
                background: #e93b39;
                width: 190/200/1.17rem;
                height: 80/200/1.17rem;
                font-size: 35/200/1.17rem;
                line-height: 80/200/1.17rem;
                text-align: center;
                margin-right: 46/200/1.17rem;
                color: #fff;
            }
           
        }
    }
</style>
<script>
    import alertA from '../../../components/alertA.vue'
    import productNum from './productNum.vue'
    import location from './location.vue'
    import detail from './detail.vue'
    import alertC from '../../../components/alertC.vue'
    export default {
        components:{
            productNum,
            location,
            detail,
            alertA,
            alertC
        },
        data(){
            return{
                toShow:false,
                cancel:'',
                waitPay:true,
                headerDiv:false,
                noticeShow:false,
                notice:'是否删除订单？',
                deleteDiv:false,
                cancelDiv:true,
                timer: '',
                orderData:"",  
                orderDetail:'',
                dealTimer:{
                    m:0,
                    s:0
                },
                isShow:false,
                title:'确认取消订单？',
                parentId: "",
                totalCost: "",
                orderId: ""
            }
        },
        methods:{
             //删除订单
            toDelete:function(){
                var orderId = this.$route.query.id
                this.$http.get('/eb-wxshop/wxshop/order/deleteOrderById',{params:{id:orderId}}).then((res)=>{
                    // console.log(res.body)
                    if(res.body.result=='000'){
                        this.$router.push('/myOrder');
                    }else{
                        this.toShow = !this.toShow;
                        this.cancel = '删除订单失败'
                        var that = this;
                        setTimeout(function() {            
                            that.toShow = false;                                                     
                        }, 3000);
                    }
                }).catch((res)=>{

                })
            },
            toClose:function(){
                this.noticeShow = !this.noticeShow;
            },
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

                //  设置倒计时
                // this.orderDetail.orderDate 
                
                let testTime = this.orderDetail.orderDate  +( 15 * 60*1000);
                // console.log(testTime)
                let newDate = new Date();
                newDate.setTime(testTime );
                //console.log(newDate)
                let formatTime = newDate.format('yyyy-MM-dd-h-m-s')
                //  console.log(formatTime)
                let arr = formatTime.split("-");
                
                let that = this;
                let fifteen = setInterval(function() {
                    // 目标时间
                    
                    let oDate=new Date();
                    oDate.setFullYear(arr[0], arr[1], arr[2]);
                    oDate.setHours(arr[3], arr[4], arr[5]);
                    //  当期时间
                    let oNow=new Date();
                    
                    //  总秒数
                    let total=parseInt((oDate.getTime()-oNow.getTime())/1000);
                    
                    // 算时间
                    // that.dealTimer.d=parseInt(total/86400);
                    total%=86400;
                    
                    // that.dealTimer.h=parseInt(total/3600);
                    total%=3600;
                    
                    that.dealTimer.m=parseInt(total/60);
                    total%=60;
                    
                    that.dealTimer.s=total;
                    if( that.dealTimer.m == 0 && that.dealTimer.s == 0){
                        clearInterval(fifteen);
                        that.cancelDiv = false;
                        that.deleteDiv = true;
                        that.waitPay = false;
                        that.headerDiv = true;
                        var orderId = this.$route.query.id
                        var orderStatus = 9
                        that.$http.get('/eb-wxshop/wxshop/order/changeOrderStatus',{params:{orderId:orderId,orderStatus:9}}).then((res)=>{
                            // console.log(res)
                            if(res.body.result=='000'){
                                this.cancel = '订单超时，已取消'
                                this.toShow = !this.toShow;
                                var that = this;
                                setTimeout(function() {            
                                    that.toShow = false;                                                     
                                }, 3000);
                                    // alert("订单超时，已取消")
                                // this.$router.push('/myOrder');
                            }else{
                                this.toShow = !this.toShow;
                                this.cancel = '改变订单状态失败'
                                var that = this;
                                setTimeout(function() {            
                                    that.toShow = false;                                                     
                                }, 3000);
                                // alert(res.body.resultMsg)
                            }
                        }).catch((res)=>{

                        })   
                    }
                }, 1000);
            },
            //取消订单
            okCancle(){
                var orderId = this.$route.query.id
                // var orderStatus = 9
                this.$http.get('/eb-wxshop/wxshop/order/changeOrderStatus',{params:{orderId:orderId,orderStatus:9}}).then((res)=>{
                    console.log(res)
                    if(res.body.result=='000'){
                        this.$router.push('/myOrder');
                    }else{
                        this.toShow = !this.toShow;
                            this.cancel = '取消订单失败'
                            var that = this;
                            setTimeout(function() {            
                                that.toShow = false;                                                     
                            }, 3000);
                        // alert(res.body.resultMsg)
                    }
                }).catch((res)=>{

                })
            },
            goPay(){
                window.location.href = "../smallShop/pay.html?orderAmount="+this.totalCost+"&bussOrderNo="+ this.parentId+"&orderIdList="+this.orderId;
            }
        },
        created(){
            var orderId = this.$route.query.id
            this.$http.get('/eb-wxshop/wxshop/order/getOrderDetail',{params:{id:orderId}}).then((res)=>{
                var orderDetail = JSON.parse(res.bodyText).order
                    this.orderDetail = orderDetail;
                    this.parentId = orderDetail.parentId;
                    this.totalCost = orderDetail.totalCost;
                    this.orderId = orderDetail.id;
            //    console.log(orderDetail.orderDate)
                // orderDetail.createTime = newDate.format('yyyy-MM-dd hh:mm:ss')
                if( Date.parse(new Date()) - this.orderDetail.orderDate < (15 * 60 *1000)){
                    // this.orderData = '待付款',
                    this.timerDetail();
                }else{
                    this.cancelDiv = false,
                    this.deleteDiv = true
                    this.waitPay = false,
                    this.headerDiv = true  
                    var orderId = this.$route.query.id
                    // var orderStatus = 9
                    this.$http.get('/eb-wxshop/wxshop/order/changeOrderStatus',{params:{orderId:orderId,orderStatus:9}}).then((res)=>{
                        if(res.body.result=='000'){
                             this.toShow = !this.toShow;
                             this.cancel = '订单超时，已取消'
                                var that = this;
                                setTimeout(function() {            
                                    that.toShow = false;                                                     
                                }, 3000);
                                // alert("订单超时，已取消")
                            // this.$router.push('/myOrder');
                        }else{
                                this.toShow = !this.toShow;
                                this.cancel = '改变订单状态失败'
                                var that = this;
                                setTimeout(function() {            
                                    that.toShow = false;                                                     
                                }, 3000);
                            // alert(res.body.resultMsg)
                        }
                    }).catch((res)=>{

                    })          
                }
                
            }).catch((res)=>{

            })
            document.body.style.backgroundColor = "#fff";
            document.body.style.paddingBottom = "1.0/1.17rem";
            document.title = "等待买家付款"
            
        }
    }
  
</script>