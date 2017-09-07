<template>
    <div>
        <!-- <div class="header clearfix">
            <router-link to="/user">
                <i class="fl"></i>
            </router-link>
            <div class="fl"><p>修改手机</p></div>
        </div> -->
        <div class="gap_f4_20"></div>
        <ul class="ul_css">
            <li>
                <input type="text" placeholder="手机号" class="ipt_text phone" v-model="tel"/>
            </li>
            <li>
                <input type="text" placeholder="请输入验证码" class="ipt_text verify" v-model="iptVerifyCode"/>
                <!-- <input type="button" value="获取验证码" class="ipt_btn" @click="getVerify()"/> -->
                <button @click="getVerify" class="ipt_btn" :disabled="isDisabled">
                    <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                    <span v-if="!sendMsgDisabled">获取验证码</span>
                </button>            
            </li>
        </ul>
        <div class="footer">
            <!-- <router-link to="/"> -->
            <p @click="bind">修改</p>
            <!-- </router-link> -->
        </div>

        <alert-c :title="title" v-show="isShow"></alert-c>
    </div>
</template>
<style lang="less" scoped>
    .header{
        // width: 100%;
        // height: 88/200/1.17rem;
        i{
            display: block;
            width: 13/200/1.17rem;
            height: 88/200/1.17rem;
            background: url(../../../common/imgs/right_arrow.png) no-repeat;
            background-size: 100%;
            background-position: left center;
            transform: scaleX(-1);
            position: absolute;
            left: 30/200/1.17rem;
        }
        div{
            width: 100%;
            p{
                height: 88/200/1.17rem;
                line-height: 88/200/1.17rem;
                font-size: 34/200/1.17rem;
                color: #333;
                text-align: center;
            }
        }
    }
    .gap_f4_20{
        height: 20/200/1.17rem;
        background: #f4f4f4;
    }
    .ul_css{
        margin-left: 30/200/1.17rem;
        li{
            height: 88/200/1.17rem;
            line-height: 88/200/1.17rem;
            border-bottom: 2/200/1.17rem solid #e5e5e5;
            .ipt_text{
                height: 88/200/1.17rem;
                font-size: 28/200/1.17rem;
                color: #999;
            }
            .phone{
                width: 100%;
            }
            .verify{
                width: 440/200/1.17rem;
            }
            .ipt_btn{
                width: 180/200/1.17rem;
                height: 50/200/1.17rem;
                font-size: 24/200/1.17rem;
                color: #969696;
                background: #efefef;
                border-radius: 25/200/1.17rem;
                position: absolute;
                right: 40/200/1.17rem;
                margin-top: 17/200/1.17rem;
            }
        }
    }
    .footer{
        width: 100%;
        height: 105/200/1.17rem;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        border-top: 2/200/1.17rem solid #e1e1e1;
        p{
            margin: 0 auto;
            text-align: center;
            width: 700/200/1.17rem;
            height: 89/200/1.17rem;
            line-height: 89/200/1.17rem;
            font-size: 34/200/1.17rem;
            color: #fff;
            background: #e93b39;
            border-radius: 4/200/1.17rem;
            margin-top: 8/200/1.17rem;
        }
    }
</style>
<script>
    import alertC from '../../../components/alertC.vue'
    import Vue from 'vue'
    export default {
        components:{
            alertC
        },
        data(){
            return{
                tel:"",
                // title: "手机号码有误，请重填",
                title: "",
                isShow: false,
                verifyCode:"",
                iptVerifyCode:"",
                time:60,
                sendMsgDisabled:false,
                // picUrl: window.sessionStorage.getItem('picUrl'),
                wxCustomerId: window.sessionStorage.getItem('wxCustomerId'),
                isDisabled:false
            }
        },
        methods:{
            bind(){
                if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.tel))){ 
                    this.title = "手机号码有误，请重填";
                    this.isShow = true;
                    var that = this;
                    setTimeout(function() {       
                        that.isShow = false;
                    }, 3000);
                    return false;
                }
                if(this.iptVerifyCode == ""){
                    this.title = "验证码为空，请输入验证码";
                    this.isShow = true;
                    var that = this;
                    setTimeout(function() {       
                        that.isShow = false;
                    }, 3000);
                    return false;
                }
                
                this.$http.post("/eb-wxshop/wxshop/customer/modifyMobile",{customerId:this.wxCustomerId,mobile:this.tel,verifyCode:this.iptVerifyCode},{emulateJSON: true}).then(function(res){
                    var back = JSON.parse(res.bodyText);
                    if(back.resultMsg == "验证码输入有误"){
                        this.title = "验证码输入有误，请核对后重填";
                        this.isShow = true;
                        var that = this;
                        setTimeout(function() {       
                            that.isShow = false;
                        }, 3000);
                        return false;
                    }else if(back.result == "000"){
                        this.title = "手机号码修改成功";
                        window.sessionStorage.setItem("wxUserPhone", this.tel );
                        this.isShow = true;
                        var that = this;
                        setTimeout(function() {       
                            that.isShow = false;
                            that.$router.push("/user")
                        }, 2000);
                    }else{
                        return false;
                    }
                },function(){
                    console.log('失败')
                }) 
            },
            getVerify(){
                if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.tel))){ 
                    this.title = "手机号码有误，请重填";
                    this.isShow = true;
                    var that = this;
                    setTimeout(function() {       
                        that.isShow = false;
                    }, 3000);
                    return false;
                }
                let me = this;
                me.sendMsgDisabled = true;
                let interval = window.setInterval(function() {
                    me.isDisabled = true;
                    console.log(me.isDisabled)
                    if ((me.time--) <= 0) {
                        me.time = 60;
                        me.sendMsgDisabled = false;
                        me.isDisabled = false;
                        window.clearInterval(interval);
                    }
                }, 1000);
                this.$http.post("/eb-wxshop/wxshop/customer/verifyCode",{mobile:this.tel},{emulateJSON: true}).then(function(res){
                    var verify = JSON.parse(res.bodyText);
                    this.verifyCode = verify.verifyCode;
                },function(){
                    console.log('失败')
                }) 
            },
            //customer/verifyCode?mobile=15810884279
        },
        created() {
            document.body.style.backgroundColor = "#fff";
            document.title = "修改手机"
        }
    }
</script>

