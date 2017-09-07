<template>
  <section>
    <p class="geduan"></p>
    <div class="header_title">{{service_type}} - {{service_status}}</div>
    <div>
        <!-- 服务单号：{{applyNo}} 申请时间：{{applyTime}} -->
        <p class="header_text">服务单号：{{applyNo}}</p>
        <p class="header_text">申请时间：{{applyTime}}</p> 
    </div>
    <p class="geduan"></p>
    <div class="schedule">
        <p class="tit">退款进度</p>
        <!--退货退款进度  -->
        <div class="schedule_details" v-show="!or_nor">
            <ul class="clearfix">
                <li class="fl">
                    <i class="pic01" :class="{red01:isRed01}"></i>
                    <i class="line01"></i>
                    <i class="X" v-show="isX"></i>
                    <p class="pic_text01" :class="{text01_nor:!isX}">等待商户审核</p>
                </li>
                <i class="line"></i>
                <li  class="fl">
                    <i class="pic02"  :class="{red02:isRed02}"></i>
                    <i class="line02"></i>
                    <p class="pic_text02">等待物流</p>
                </li>
                <i class="line"></i>
                <li  class="fl">
                    <i class="pic03"  :class="{red03:isRed03}"></i>
                    <i class="line03"></i>
                    <p class="pic_text03">退款处理中</p>
                </li>
                <i class="line"></i>
                <li  class="fl">
                    <i class="pic04"  :class="{red04:isRed04}"></i>
                    <p class="pic_text04">完成</p>
                </li>
            </ul>
        </div>
        <!--仅退款进度  -->
        <div class="schedule_details" v-show="or_nor">
            <ul class="clearfix">
                <li class="fl">
                    <i class="pic01" :class="{red01:isRed01}"></i>
                    <i class="line04"></i>
                    <i class="X X_or"  v-show="isX"></i>
                    <p class="pic_text01 text01_or" :class="{text01_nor:!isX}">等待商户审核</p>
                </li>
                <i class="line"></i>
                <li  class="fl">
                    <i class="pic03 pic03_or"  :class="{red03:isRed03}"></i>
                    <i class="line05"></i>
                    <p class="pic_text03 text03_or">退款处理中</p>
                </li>
                <i class="line"></i>
                <li  class="fl">
                    <i class="pic04 pic04_or"  :class="{red04:isRed04}"></i>
                    <p class="pic_text04 text04_or">完成</p>
                </li>
            </ul>
        </div>
        <p class="text isX_css" v-show="isXTitle">审核留言</p>
        <p class="text">{{scheduleText}}</p>
    </div>
    <p class="geduan" v-show="isTrans"></p>
    <div class="back_info" v-show="isTrans">
        <p class="tit">商品寄回信息</p>
        <p>承运来源：{{ShipperCode}} &nbsp&nbsp&nbsp&nbsp&nbsp运单编号：{{logisticsNo}}</p>
        <p>物流状态：{{AcceptStation}}</p>
        <p>{{AcceptTime}}</p>
    </div>
    <p class="geduan" v-show="isBackInfo"></p>
    <ul class="theList" v-show="isBackInfo">
        <li class="clearfix">
            <span class="fl">商品回寄信息</span>
            <router-link :to="{name:'addOrder',query:{id:id}}">
                <p class="fr">{{inputTrans}}发货单</p>
            </router-link>
        </li>
        <li class="clearfix">
            <span class="fl">回寄地址：{{backSendAddress}}</span>
            <!-- <font class="fr">￥</font> -->
        </li>
        <li class="clearfix">
            <span class="fl">联系人：{{backSendMan}}</span>
        </li>
        <li class="clearfix">
            <span class="fl">联系电话：{{backSendMobile}}</span>
        </li>
    </ul>
  </section>
</template>
<style lang="less" scoped>
    .geduan{
        height: 20/200/1.17rem;
        background-color:#f4f4f4; 
    }
    .header_title{
        height: 88/200/1.17rem;
        font-size: 32/200/1.17rem;
        color: #333;
        line-height: 88/200/1.17rem;
        border-bottom: 1px solid #e1e1e1;
        padding-left: 30/200/1.17rem;
    }
    .header_text{
        height: 88/200/1.17rem;
        font-size: 28/200/1.17rem;
        color: #333;
        line-height: 88/200/1.17rem;
        padding-left: 30/200/1.17rem;
    }
    .schedule{
        .tit{
            margin-top: 34/200/1.17rem;
            margin-left: 30/200/1.17rem;
            font-size: 32/200/1.17rem;
            color: #333;
        }
        .text{
            height: 88/200/1.17rem;
            line-height: 88/200/1.17rem;
            margin-left: 30/200/1.17rem;
            font-size: 32/200/1.17rem;
            color: #333;
        }
        .isX_css{
            margin-bottom: -22/200/1.17rem;
        }
        .schedule_details{
            border-bottom: 1px solid #e1e1e1;
            ul{
                margin: 0 auto;
                width: 576/200/1.17rem;
                margin-top: 48/200/1.17rem;
                li{
                    position: relative;
                    .pic01{
                        display: block;
                        height: 55/200/1.17rem;
                        width: 55/200/1.17rem;
                        background: url(../../common/imgs/service_check.png) no-repeat;
                        background-size: 100%;
                    }
                    .pic02{
                        margin-left: 29/200/1.17rem;
                        display: block;
                        height: 55/200/1.17rem;
                        width: 55/200/1.17rem;
                        background: url(../../common/imgs/service_wating.png) no-repeat;
                        background-size: 100%;
                    }
                    .pic03{
                        margin-left: 82/200/1.17rem;
                        display: block;
                        height: 55/200/1.17rem;
                        width: 55/200/1.17rem;
                        background: url(../../common/imgs/service_return.png) no-repeat;
                        background-size: 100%;
                    }
                    .pic04{
                        margin-left: 118/200/1.17rem;
                        display: block;
                        height: 55/200/1.17rem;
                        width: 55/200/1.17rem;
                        background: url(../../common/imgs/service_finish.png) no-repeat;
                        background-size: 100%;
                    }
                    .red01{
                        background: url(../../common/imgs/service_check_red.png) no-repeat;
                        background-size: 100%;
                    }
                    .red02{
                        background: url(../../common/imgs/service_wating_red.png) no-repeat;
                        background-size: 100%;
                    }
                    .red03{
                        background: url(../../common/imgs/service_return_red.png) no-repeat;
                        background-size: 100%;
                    }
                    .red04{
                        background: url(../../common/imgs/service_finish_red.png) no-repeat;
                        background-size: 100%;
                    }
                    .pic03_or{
                        margin-left: 56/200/1.17rem;
                    }
                    .pic04_or{
                        margin-left: 114/200/1.17rem;
                    }
                    p{
                        font-size: 24/200/1.17rem;
                        color: #333;
                    }
                    .pic_text01{
                        position: absolute;
                        left: -46/200/1.17rem;
                        margin-top: 2/200/1.17rem;
                        margin-bottom: 47/200/1.17rem;
                        width: 230/200/1.17rem;
                    }
                    .text01_nor{
                        margin-top: 20/200/1.17rem;
                    }
                    .pic_text02{
                        position: relative;
                        left: 8/200/1.17rem;
                        margin-top: 20/200/1.17rem;
                        margin-bottom: 47/200/1.17rem;
                    }
                    .pic_text03{
                        position: relative;
                        left: 52/200/1.17rem;
                        margin-top: 20/200/1.17rem;
                        margin-bottom: 47/200/1.17rem;
                    }
                    .pic_text04{
                        width: 60/200/1.17rem;
                        position: relative;
                        left: 122/200/1.17rem;
                        margin-top: 20/200/1.17rem;
                        margin-bottom: 47/200/1.17rem;
                    }
                    .text03_or{
                        left: 26/200/1.17rem;
                    }
                    .text04_or{
                        left: 118/200/1.17rem;
                    }
                    .X{
                        display: block;
                        width: 19/200/1.17rem;
                        height: 19/200/1.17rem;
                        background: url(../../common/imgs/service_X.png) no-repeat;
                        background-size: 100%;
                        position: relative;
                        top: -40/200/1.17rem;
                        left: 104/200/1.17rem;
                    }
                    .X_or{
                        left: 146/200/1.17rem;
                    }
                    .line01{
                        display: block;
                        position: relative;
                        left: 55/200/1.17rem;
                        top: -28/200/1.17rem;
                        width: 102/200/1.17rem;
                        height: 1px;
                        border-top: 1px solid #000;
                        margin-left: 8/200/1.17rem;
                        margin-right: 34/200/1.17rem;
                    }
                    .line02{
                        display: block;
                        position: relative;
                        left: 84/200/1.17rem;
                        top: -28/200/1.17rem;
                        width: 102/200/1.17rem;
                        height: 1px;
                        border-top: 1px solid #000;
                        margin-left: 8/200/1.17rem;
                        margin-right: 8/200/1.17rem;
                    }
                    .line03{
                        display: block;
                        position: relative;
                        left: 138/200/1.17rem;
                        top: -28/200/1.17rem;
                        width: 102/200/1.17rem;
                        height: 1px;
                        border-top: 1px solid #000;
                        margin-left: 8/200/1.17rem;
                        margin-right: 8/200/1.17rem;
                    }
                    .line04{
                        display: block;
                        position: relative;
                        left: 56/200/1.17rem;
                        top: -28/200/1.17rem;
                        width: 186/200/1.17rem;
                        height: 1px;
                        border-top: 1px solid #000;
                        margin-left: 8/200/1.17rem;
                        margin-right: 8/200/1.17rem;
                    }
                    .line05{
                        display: block;
                        position: relative;
                        left: 112/200/1.17rem;
                        top: -28/200/1.17rem;
                        width: 186/200/1.17rem;
                        height: 1px;
                        border-top: 1px solid #000;
                        margin-left: 8/200/1.17rem;
                        margin-right: 8/200/1.17rem;
                    }
                }
            }
        }
    }
    .back_info{
        p{
            font-size: 26/200/1.17rem;
            color: #333;
            margin-top: 20/200/1.17rem;
            margin-left: 30/200/1.17rem;
        }
        p:last-child{
            margin-bottom: 20/200/1.17rem;
        }
        .tit{
            margin-top: 34/200/1.17rem;
            margin-bottom: 4/200/1.17rem;
            font-size: 32/200/1.17rem;
        }
    }
    .theList{
        li{
            padding-right: 40/200/1.17rem;
            padding-left: 30/200/1.17rem;
            line-height: 88/200/1.17rem;
            color: #333;
            font-size: 30/200/1.17rem;
            border-bottom: 1px solid #e1e1e1;
            p{
                text-align: center;
                width: 180/200/1.17rem;
                height: 56/200/1.17rem;
                line-height: 56/200/1.17rem;
                border: 1px solid #333;
                border-radius: 3px;
                margin-top: 14/200/1.17rem;
            }
        }
    }
</style>
<script>
    export default{
        data() {
            return {
                id:"",
                service_type:"退货退款1",//售后服务类型
                service_status:"物流中1",//售后服务状态
                applyNo:352116545,//服务单号
                applyTime:"2016-12-5 13:20:30",//申请时间
                isTrans:false,//是否显示物流信息
                isBackInfo:false,//是否显示回寄信息
                or_nor:true,//退款或退货退款
                isX:false,//商户审核是否通过
                isRed01:false,//是否处于等待商户审核状态
                isRed02:false,//是否处于等待物流状态
                isRed03:false,//是否处于退款处理中状态
                isRed04:false,//是否处于完成状态
                isXTitle:false,//是否显示审核不通过标题
                scheduleText:"您的商品正寄回商家，请耐心等待",//进度提示语
                ShipperCode:"申通快递",//物流公司
                logisticsCode:"",//物流公司code
                logisticsNo:"127658685656885469",//物流单号
                AcceptStation:"北京市西二旗 已签收",//物流状态
                AcceptTime:"2017-7-7 16:12:14",//物流时间
                inputTrans:"修改",//物流单修改/填写状态
                storeId:"1",
                backSendAddress:"北京市海淀区上地六街",//回寄地址
                backSendMan:"黄小小",//回寄联系人
                backSendMobile:18515152386,//回寄联系电话
                picUrl: window.sessionStorage.getItem('picUrl'),
                wxCustomerId: window.sessionStorage.getItem('wxCustomerId')
            }
        },
        created(){
            document.body.style.backgroundColor = "#FFF";
            document.title = "服务单详情";
            this.id = this.$route.query.id;
            this.$http.get("/eb-wxshop/wxshop/order/getOrderAfterSalesDetail",{params:{id:this.id}},{emulateJSON: true}).then(function(res){
                // 申请处理状态(0:等待商户审核 1:退款中 2:审核不通过 3:审核通过 4:物流中 5:退款完成  6:退款失败)
                // 申请售后类型(0:仅退款 1:退货退款 2:换货)
                var orderAfterSale = JSON.parse(res.bodyText);
                this.applyNo = orderAfterSale.orderAfterSale.applyNo;
                this.applyTime = formatDate(new Date(orderAfterSale.orderAfterSale.applyTime));
                this.status = orderAfterSale.orderAfterSale.status;
                this.imgSrc = this.picUrl+orderAfterSale.orderAfterSale.bigPicture;
                this.productId = orderAfterSale.orderAfterSale.id;
                this.productDes = orderAfterSale.orderAfterSale.description;
                this.storeName = orderAfterSale.orderAfterSale.storeName;
                this.quantity = orderAfterSale.orderAfterSale.quantity;
                this.logisticsNo = orderAfterSale.orderAfterSale.logisticsNo;
                this.logisticsCode = orderAfterSale.orderAfterSale.logisticsCode;
               // console.log(orderAfterSale.orderAfterSale.logisticsCode+"@@@@@@")
                this.storeId = orderAfterSale.orderAfterSale.storeId
                // this.product_org_price = orderAfterSale.orderAfterSale.listPrice;
                switch(orderAfterSale.orderAfterSale.type){
                    case 0:
                    this.service_type="仅退款";
                    this.or_nor=true;
                    break;
                    case 1:
                    this.service_type="退货退款";
                    this.or_nor=false;
                    break;
                }

                switch (orderAfterSale.orderAfterSale.status){
                    case 0: 
                    this.service_status="等待商户审核";
                    this.scheduleText="您的申请已提交，请耐心等待";
                    this.isRed01=true;
                    break;
                    case 1:
                    this.service_status="退款中";
                    this.scheduleText="系统正在退款中，请注意查收";
                    this.isRed03=true;
                    break;
                    case 2:
                    this.service_status="审核不通过";
                    if(orderAfterSale.orderAfterSale.type==0){
                        this.scheduleText=orderAfterSale.orderAfterSale.feedback;
                        this.isXTitle=true;
                        this.isX=true;
                        this.isRed01=true;
                        return false;
                    }
                    this.scheduleText=orderAfterSale.orderAfterSale.feedback;
                    this.isXTitle=true;
                    this.isX=true;
                    this.isRed01=true;
                    break;
                    case 3:
                    this.service_status="审核通过";
                    if(orderAfterSale.orderAfterSale.type==0){
                        this.scheduleText="审核通过，请等待退款";
                        return false;
                    }
                    this.scheduleText="审核通过，请尽快邮寄商品";
                    this.isBackInfo=true;
                    this.isRed02=true;
                    this.inputTrans="填写";
                    break;
                    case 4:
                    this.service_status="物流中";
                    this.scheduleText="您的商品正寄回商家，请耐心等待";
                    this.isTrans=true;
                    this.isBackInfo=true;
                    this.isRed02=true;
                    break;
                    case 5:
                    this.service_status="退款完成";
                    this.scheduleText="您的退款已完成";
                    this.isRed04=true;
                    break;
                    case 6:
                    this.service_status="退款中";
                    this.scheduleText="系统正在退款中，请注意查收";
                    this.isRed03=true;
                    break;
                }


                this.$http.get("/eb-wxshop/wxshop/order/getOrderLogisticsInfo",{params:{logisticsNo:this.logisticsNo,logisticsCode:this.logisticsCode}},{emulateJSON: true}).then(function(res){
                    var transInfo = JSON.parse(res.bodyText);
                    //  console.log(this.logisticsNo+"####"+this.logisticsCode)
                    //  console.log(transInfo)
                    this.ShipperCode = transInfo.ShipperCode;
                    this.AcceptStation = transInfo.Traces.AcceptStation;
                    this.AcceptTime = transInfo.Traces.AcceptTime;
                })


                this.$http.get("/eb-wxshop/wxshop/customer/backSendInfo",{params:{storeId:this.storeId}},{emulateJSON: true}).then(function(res){
                    var backSendInfo = JSON.parse(res.bodyText);
                    this.backSendAddress = backSendInfo.backSendAddress;
                    this.backSendMan = backSendInfo.backSendMan;
                    this.backSendMobile = backSendInfo.backSendMobile;
                })
            })
           
          
            function formatDate(now) { 
                var year=now.getFullYear(); 
                var month=now.getMonth()+1; 
                var date=now.getDate(); 
                var hour=now.getHours(); 
                var minute=now.getMinutes(); 
                var second=now.getSeconds(); 
                return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
            }
        },
        methods:{
        }
    }
</script>
