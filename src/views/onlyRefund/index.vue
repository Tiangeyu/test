<template>
  <section>
    <p class="geduan"></p>
    <div class="header">商品信息</div>
    <dl class="clearfix">
        <dt class="fl" :style="{backgroundImage:'url('+picUrl+queryData.image +')'}"></dt>
        <dd class="fl">
            <h3>{{queryData.productName}}</h3>
        </dd>
    </dl>
    <div class="thingsState">
        <p class="reason">货物状态</p>
        <div class="clearfix">
            <button class="fl" :class="{active: isActive}" @click="isActive = true">未收到货</button>
            <button class="fl" :class="{active: !isActive}" @click="isActive = false">已收到货</button>
        </div>    
    </div>
    <ul class="theList">
        <li class="clearfix" @click="apply = !apply">
            <span class="fl">退款原因</span>
            <i class="fr rightNow"></i>
            <font class="fr reasons">{{reason}}</font>
        </li>
        <li class="clearfix">
            <span class="fl">退款金额</span>
            <font class="fr" style="color:#ff0000;">￥{{queryData.unitPrice}}</font>
        </li>
            <li class="clearfix">
            <span class="fl">退款说明</span>
            <input class="fr" placeholder="请在此处添加说明,可不填" v-model="remark">
        </li>
    </ul>
    <div class="uploadImg">
        <h5>上传凭证</h5>
        <div class="clearfix">
            <ul class="clearfix fl">
                <li class="fl" v-for="(item,index) in imgData" :key="index">
                    <img :src="item">
                </li>
            </ul>
            <div class="fl upGo" @click="upImage"></div>
        </div>
    </div>
    <footer>
        <button @click="submits">提交</button>
    </footer>
     <div class="gearArea" v-show="apply">
        <div class="applyReason">
            <ul v-for="(item, index) in reasonDetail" class="clearfix" :key="index">
                <li class="choose"><input type="radio" name="perherp" v-model="reason" :value="item"><span>{{item}}</span></li>
            </ul>
            <div class="underBtn" @click="apply = !apply">
                <a herf="javascript:;">完成</a>
            </div>
        </div>
      </div>
      <alert-d :title="titleC" v-show="isShowC"></alert-d>
  </section>
</template>

<style lang="less" scoped>
    .geduan{
        height: 20/200/1.17rem;
        background-color:#f4f4f4; 
    }
    .header{
        height: 88/200/1.17rem;
        font-size: 32/200/1.17rem;
        color: #333;
        line-height: 88/200/1.17rem;
        border-bottom: 1px solid #ccc;
        padding-left: 30/200/1.17rem;
    }
    dl{
        padding:30/200/1.17rem;
        border-bottom: 1px solid #ccc;
        dt{
            width: 128/200/1.17rem;
            height: 128/200/1.17rem;
            background-size: 100%; 
        }
        dd{
            padding-left: 40/200/1.17rem;
            padding-top: 30/200/1.17rem;
            h3{
                font-size: 30/200/1.17rem;
                color: #454545;
                padding-bottom: 30/200/1.17rem;
                width: 350/200/1.17rem;
                line-height: 36/200/1.17rem;
            }
            h4{
                font-size: 32/200/1.17rem;
                color: #a1a6aa;
            }
        }
    }
    .thingsState{
        padding-left: 30/200/1.17rem;
        padding-top: 30/200/1.17rem;
        border-bottom: 1px solid #ccc;
        .reason{
            font-size: 30/200/1.17rem;
            color: #333;
            padding-bottom: 26/200/1.17rem;
        }
        button{
            width: 160/200/1.17rem;
            height: 60/200/1.17rem;
            border-radius: 5/200/1.17rem;
            border: 1px solid #ccc;
            font-size: 26/200/1.17rem;
            color: #333;
            line-height: 60/200/1.17rem;
            text-align: center;
            margin-right: 30/200/1.17rem;
            margin-bottom: 26/200/1.17rem;
        }
        .active{
            color: #fefefe;
            background-color: #aa9874;
            border: 0; 
        }
    }
    .theList{      
        li{
            padding-right: 40/200/1.17rem;
            padding-left: 30/200/1.17rem;
            height: 88/200/1.17rem;
            line-height: 88/200/1.17rem;
            color: #333;
            font-size: 30/200/1.17rem;
            border-bottom: 1px solid #ccc;
            .rightNow{
                width: 13/200/1.17rem;
                height: 100%;
                background: url('../../common/imgs/right_arrow.png') no-repeat left center;
                background-size: 100%;               
            }
            input{
                height: 100%;
                font-size: 24/200/1.17rem;
                color: #999;
            }
            .reasons{
                padding-right: 20/200/1.17rem;
                color: #999;
            }
        }
    }
    .uploadImg{
        padding-left: 30/200/1.17rem;
        padding-bottom: 150/200/1.17rem;
        h5{
            padding-top: 30/200/1.17rem;
            font-size: 30/200/1.17rem;
            color: #333;
            padding-bottom: 40/200/1.17rem;
        }
        li{
            width: 170/200/1.17rem;
            height: 170/200/1.17rem;
            margin-right: 20/200/1.17rem;
            margin-bottom: 20/200/1.17rem;
           img{
               display: block;
               width: 100%;
               height: 100%;
           } 

        }
        .upGo{
            width: 170/200/1.17rem;
            height: 170/200/1.17rem;
            background: url('../../common/imgs/uploadImg.png') no-repeat;
            background-size: 100%; 
        }
    }
    footer{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        border-top: 1px solid #ccc;
        height: 104/200/1.17rem;
        padding: 8/200/1.17rem 30/200/1.17rem;
        background: #fff;
        button{
            display: block;
            width: 100%;
            background: #e93b3a;
            font-size: 34/200/1.17rem;
            color: #fff;
            text-align: center;
            line-height: 89/200/1.17rem;
            border-radius: 5/200/1.17rem; 
        }
    }
    .applyReason{
        width: 100%;
        position: fixed;
        bottom: 0;
        background: #fff;
        padding-bottom: 100/200/1.17rem;
        .choose{
            margin: 30/200/1.17rem 0 30/200/1.17rem 30/200/1.17rem;
        }
        input{
            margin-right: 30/200/1.17rem;
            float: right;
            width: 30/200/1.17rem;
            height: 30/200/1.17rem;
        }
        .underBtn{ 
            height: 96/200/1.17rem;
            background-color: #fff;
            padding-top: 8/200/1.17rem;
            position: fixed;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            border-top: 1px solid #e9e9e9;
            a{  
                margin: 0 auto;
                display: block;
                width: 700/200/1.17rem;
                height: 89/200/1.17rem;
                line-height: 89/200/1.17rem;
                background-color: #e93b39;
                color: #fff;
                font-size: 34/200/1.17rem; 
                text-align: center; 
                border-radius: 4/200/1.17rem;
            }
        }
    }
    .gearArea {
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        font-size: 26/200/1.17rem;
        background-color: rgba(0, 0, 0, 0.5);
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9900;
        overflow: hidden;
        -webkit-animation-fill-mode: both;
                animation-fill-mode: both
    }
</style>


<script
    import alertD from '../../components/alertD.vue'
    const wx = require('weixin-js-sdk');
    export default{
        components:{
            alertD
        },
        data() {
            return {
                isActive: true,
                // 选择相册
                imgData: [],
                reasonDetail:['我不想买了','信息填写错误，重新拍','卖家缺货','其他原因'],
                apply:false,
                reason: "",
                // 弹窗           
                queryData: this.$route.query,
                imgString: [],
                remark: '',
                isShowC: false,
                titleC: '',
                wx: {},
                url: location.href.split("#")[0],    // 签名路径
                picUrl: window.sessionStorage.getItem('picUrl')
            }
        },
        created(){
            document.body.style.backgroundColor = "#FFF";
            document.title = "仅退款";
            //   console.log(wx)
            // 微信签名
            // alert(window.__wxjs_is_wkwebview)
            this.$http.get('/eb-wxshop/wxshop/wx/queryAppParams',{params:{url: this.url}}).then((res)=>{
                // alert(1)
                // console.log(res.body);
                this.wx = wx;
                this.wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.body.appid, // 必填，公众号的唯一标识
                    timestamp: res.body.jsapi_timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.body.jsapi_nonceStr, // 必填，生成签名的随机串
                    signature: res.body.signature,// 必填，签名，见附录1
                    jsApiList: ['chooseImage','uploadImage','getLocalImgData'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                this.wx.error(function(res){
                    this.title="签名失败"
                    this.isShow = !this.isShow;
                    var that = this
                    setTimeout(function() {
                        that.isShow = !that.isShow
                    }, 2000);
                })
            })
        },
        methods:{
            //  上传图片
            upImage(){
                let images = {
                    localId:[],
                    serverId: ""
                };
                
                //console.log(this.wx)
                var that = this;
                this.wx.chooseImage({
                    count: 3, // 默认9
                    sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        // alert("ok");
                        images.localId = res.localIds;  
                        var j = 0,  i = 0, length = images.localId.length; 
                        // alert('已选择 ' + res.localIds.length + ' 张图片'); 
                        //  ios系统判定
                        if(window.__wxjs_is_wkwebview == true){
                            getLocalImgDatas();                   
                        }else{
                            that.imgData = res.localIds;
                        }
                        function getLocalImgDatas() {
                            that.wx.getLocalImgData({
                                localId: images.localId[j],
                                success: function (resp) {
                                        
                                    // alert('chenggong');
                                    that.imgData.splice(j,1,resp.localData); // localData是图片的base64数据，可以用img标签显示
                                    j++;
                                    if(j < length){
                                        getLocalImgDatas();
                                    }
                                }
                            })
                        }
                        if (images.localId.length == 0) {  
                            that.isShowC = true;
                            that.titleC = "请选择图片"
                            setTimeout(function(){
                                that.isShowC = false;
                            },2000)
                            return;  
                        }     

                        images.serverId = "";     
                         
                        function wxuploadImage() {                
                            that.wx.uploadImage({  
                                localId: images.localId[i], // 需要上传的图片的本地ID，由chooseImage接口获得  
                                isShowProgressTips: 1, // 默认为1，显示进度提示  
                                success: function(res) {  
                                    i++;  
                                    images.serverId += res.serverId + ',';  
                                    if (i < length) {  
                                        wxuploadImage();  
                                    }else{                                    
                                        that.$http.get("/eb-wxshop/wxshop/order/uploadImage",{params:{imageId: images.serverId}}).then((res)=>{
                                            if(res.body.result == "000"){
                                                that.imgString = res.body.imgPath;
                                            }                                           
                                        },(res)=>{
                                            that.titleC = "服务器异常,请稍后再试";
                                            that.isShowC = true;
                                            setTimeout(function(){
                                                that.isShowC = false;
                                            },2000)  
                                        })
                                    }
                                    
                                }  
                             });  
                        }                    
                        wxuploadImage();
                    }               
                });
                 
            },
            submits(){
                   // 处理事件
                let jsonData = this.queryData;
                let that = this;
                jsonData.reason = this.reason;
                jsonData.remark = this.remark;
                jsonData.type = 0;
                jsonData.customerId = window.sessionStorage.getItem('wxCustomerId');
                jsonData.customerName = window.sessionStorage.getItem('customerName');
                if(this.imgString.length == 0){
                    this.titleC = '完善上传凭证'
                    this.isShowC = !this.isShowC;
                    setTimeout(function () {                   
                        that.isShowC = !that.isShowC;
                    }, 2000)
                    return
                }                       
                jsonData = JSON.stringify(jsonData);
                this.titleC = "正在提交...";
                this.isShowC = !this.isShowC;          
                this.$http.get('/eb-wxshop/wxshop/order/saveOrderAfterSales',{params:{refundInfos:jsonData, feedbackimg1: this.imgString[0], feedbackimg2: this.imgString[1],feedbackimg3: this.imgString[3]}}).then((res)=>{
                    if(res.body.result == "000"){
                        this.titleC = '提交完成';
                    }else{
                        this.titleC = "提交失败"
                    }                      
                    setTimeout(function () {
                        if(that.titleC == "提交完成"){
                            that.$router.push("/applyFor")
                        }
                        that.isShowC = !that.isShowC;
                    }, 300)    
                },(res)=>{
                    this.titleC = "请求服务失败"
                    setTimeout(function () {                      
                        that.isShowC = !that.isShowC;
                    }, 300)  
                })             
            }
        }
    }
</script>
