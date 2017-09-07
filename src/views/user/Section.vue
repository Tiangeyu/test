<template>
    <div class="section">
        <div class="top_box">
            <div class="user_base_info">
                <div class="user_pic_box">
                    <p :style="{backgroundImage:'url('+imgsrc+')'}" class="user_pic"></p>
                </div>
                <p>{{user_name}}</p>
                <router-link to="/bindTel" v-show="isBind">
                    <div class="bind_tel">绑定手机号</div>
                </router-link>
            </div>
            <ul class="oder_types clearfix">
                <router-link :to="{name: 'myOrder', query: {state: 0}}">
                    <li class="fl">
                        <i class="to_pay"></i>
                        <p>待付款</p>
                        <div class="numbers num_to_pay" v-show="numToPayShow">{{numToPay}}</div>
                    </li>
                </router-link>
                <router-link :to="{name: 'myOrder', query: {state: 6}}">
                    <li class="fl">
                        <i class="to_send"></i>
                        <p>待发货</p>
                        <div class="numbers num_to_send" v-show="numToSendShow">{{numToSend}}</div>
                    </li>
                </router-link>
                <router-link :to="{name: 'myOrder', query: {state: 8}}">
                    <li class="fl">
                        <i class="to_take"></i>
                        <p>待收货</p>
                        <div class="numbers num_to_take" v-show="numToTakeShow">{{numToTake}}</div>
                    </li>
                </router-link>
                <router-link to="/applyFor">
                    <li class="fl">
                        <i class="go_back"></i>
                        <p>退货/售后</p>
                    </li>
                </router-link>
            </ul>
        </div>
        
        <div class="gap_f4_90"> </div>
        <ul class="user_other_info">
            <router-link :to="{name: 'myOrder', query: {state: 'null'}}">
                <li class="clearfix">
                    <i class="all_orders fl"></i>
                    <p class="fl">全部订单</p>
                    <i class="arrow"></i>
                </li>
            </router-link>
            <router-link to="/address">
                <li class="clearfix">
                    <i class="address fl"></i>
                    <p class="fl">收货地址</p>
                    <i class="arrow"></i>
                </li>
            </router-link>
            <!-- <router-link to="/changeTel"> -->
                <li class="clearfix" @click="tel">
                    <i class="user_tel fl"></i>
                    <i class="user_tel_text">{{userTel}}</i>
                    <p class="fl">修改手机号</p>
                    <i class="arrow"></i>
                </li>
            <!-- </router-link> -->
            <router-link to="/userBack">
                <li class="clearfix">
                    <i class="user_back fl"></i>
                    <p class="fl">反馈意见</p>
                    <i class="arrow"></i>
                </li>
            </router-link>
            <!-- <router-link to="/"> -->
                <li class="clearfix">
                    <i class="service_tel fl"></i>
                    <p class="fl">客服电话：</p>
                    <i class="red">400-951-7588</i>
                </li>
            <!-- </router-link> -->
        </ul>
    </div>
</template>
<style lang="less" scoped>
    .section{
        margin-bottom: 98/200/1.17rem;
    }
    .top_box{
        width: 100%;
        height: 516/200/1.17rem;
        background: #f4f4f4 url('../../common/imgs/user_bg.png') no-repeat;
        background-size: 100%;
        padding-bottom: 30/200/1.17rem;
    }
    .user_base_info{
        width: 100%;
        text-align: center;
        .user_pic_box{
            width: 100%;
            height: 193/200/1.17rem; 
            padding-top: 54/200/1.17rem;
            .user_pic{
                margin: 0 auto;
                width: 192/200/1.17rem;
                height: 193/200/1.17rem;
                background-size: 100%;
                border-radius: 100%;
                background-position: center;
            }
        }
        p{
            height: 34/200/1.17rem;
            font-size: 34/200/1.17rem;
            color: #333;
            margin-top: 30/200/1.17rem;
            margin-bottom: 78/200/1.17rem;
        }
        .bind_tel{
            position: absolute;
            top: 50/200/1.17rem;
            right: 50/200/1.17rem;
            font-size: 26/200/1.17rem;
            color: #b8a47f;
            width: 170/200/1.17rem;
            height: 53/200/1.17rem;
            line-height: 53/200/1.17rem;
            border: 2/200/1.17rem solid #b8a47f;
            border-radius: 26/200/1.17rem;
        }
    }
    .oder_types{
        margin: 0 auto;
        width: 166*4/200/1.17rem;
        height: 127/200/1.17rem;
        // margin-left: 44/200/1.17rem;
        // margin-right: 44/200/1.17rem;
        // margin-bottom: 30/200/1.17rem;
        text-align: center;
        // padding-bottom: 34/200/1.17rem;
        // background: #fff;
        li{
            width: 166/200/1.17rem;
            // margin-right: 44/200/1.17rem;
            i{
                margin: 0 auto;
                display: block;
            }
            .numbers{
                position: absolute;
                top: 380/200/1.17rem;
                width: 24/200/1.17rem;
                height: 24/200/1.17rem;
                border-radius: 100%;
                background: #ff0000;
                font-size: 18/200/1.17rem; 
                text-align: center;
                color: #fff;
                line-height: 24/200/1.17rem;
            } 
            .num_to_pay{
                left: 18%;
            }
            .num_to_send{
                left: 40%;
            }
            .num_to_take{
                left: 62%;
            }
            .to_pay{
                width: 40/200/1.17rem;
                height: 40/200/1.17rem;
                background: url('../../common/imgs/to_pay.png') no-repeat;
                background-size: 100%;
            }
            .to_send{
                width: 54/200/1.17rem;
                height: 40/200/1.17rem;
                background: url('../../common/imgs/to_send.png') no-repeat;
                background-size: 100%;
            }
            .to_take{
                width: 40/200/1.17rem;
                height: 40/200/1.17rem;
                background: url('../../common/imgs/to_take.png') no-repeat;
                background-size: 100%;
            }
            .go_back{
                width: 40/200/1.17rem;
                height: 40/200/1.17rem;
                background: url('../../common/imgs/go_back.png') no-repeat;
                background-size: 100%;
            }
            p{
                font-size: 26/200/1.17rem;
                color: #131313;
                margin-top: 24/200/1.17rem;
                margin-bottom: 34/200/1.17rem;
            }
        }
    }
    // .gap_f4_90{
    //     height: 90/200/1.17rem;
    //     background: #f4f4f4;
    //     position: relative;
    //     top: -60/200/1.17rem;
    //     z-index: -1;
    // }
    .user_other_info{
        margin-left: 34/200/1.17rem;
        // padding-right: 44/200/1.17rem;
        // margin-top: -60/200/1.17rem;
        li{
            height: 88/200/1.17rem;
            line-height: 88/200/1.17rem;
            border-bottom: 2/200/1.17rem solid #e9e9e9;
            .all_orders{
                display: block;
                width: 30/200/1.17rem;
                height: 100%;
                background: url('../../common/imgs/all_orders.png')no-repeat;
                background-size: 100%;
                background-position: left center;
                margin-left: 16/200/1.17rem;
            }
            .address{
                display: block;
                width: 30/200/1.17rem;
                height: 100%;
                background: url('../../common/imgs/address.png')no-repeat;
                background-size: 100%;
                background-position: left center;
                margin-left: 16/200/1.17rem;
            }
            // .left_holder{
            //     display: block;
            //     width: 4/200/1.17rem;
            //     height: 100%;
            // }
            .user_tel{
                display: block;
                width: 30/200/1.17rem;
                height: 100%;
                background: url('../../common/imgs/user_tel.png')no-repeat;
                background-size: 100%;
                background-position: center;
                margin-left: 16/200/1.17rem;
            }
            .user_tel_text{
                font-size: 24/200/1.17rem;
                color: #131313;
                // margin-right: 20/200/1.17rem;
                position: absolute;
                right: 80/200/1.17rem;
            }
            .user_back{
                display: block;
                width: 30/200/1.17rem;
                height: 100%;
                background: url('../../common/imgs/user_back.png') no-repeat;
                background-size: 100%;
                background-position: left center;
                margin-left: 16/200/1.17rem;
            }
            .service_tel{
                display: block;
                width: 30/200/1.17rem;
                height: 100%;
                background: url('../../common/imgs/service_tel.png') no-repeat;
                background-size: 100%;
                background-position: left center;
                margin-left: 16/200/1.17rem;
            }
            p{
                font-size: 26/200/1.17rem;
                color: #131313;
                line-height: 88/200/1.17rem;
                margin-left: 30/200/1.17rem;
            }
            .arrow{
                display: block;
                width: 13/200/1.17rem;
                // height: 100%;
                height: 88/200/1.17rem;
                background: url('../../common/imgs/right_arrow.png') no-repeat;
                background-size: 100%;
                background-position: left center;
                position: absolute;
                right: 40/200/1.17rem;
            }
            .red{
                font-size: 26/200/1.17rem;
                color: #e93b39;
            }
        }
    }
</style>
<script>
    // import imgsrc from '../../common/imgs/user_pic.png'
    import alertC from '../../components/alertC.vue'
    import Vue from 'vue'
    export default {
        components:{
            alertC
        },
        data(){
            return{
                user_name:"",
                imgsrc:"",
                isBind:false,
                userTel:"",
                numToPay:"0",
                numToSend:"0",
                numToTake:"0",
                picUrl: window.sessionStorage.getItem('picUrl'),
                wxCustomerId: window.sessionStorage.getItem('wxCustomerId'),
                title: "",
                isShow: false,
                numToPayShow: false,
                numToSendShow: false,
                numToTakeShow: false
            }
        },
        methods:{
            tel(){
                if(this.userTel == "未绑定"){
                    this.$router.push({path: '/bindTel'});
                }else{
                    this.$router.push({path: '/changeTel'});
                }
            }
        },
        created(){
            // var that = this;
            this.titC='服务器网络链接中断，请稍后再试！'
            this.$http.get("/eb-wxshop/wxshop/customer/zongLan",{params:{customerId:this.wxCustomerId}}).then(function(res){
                var user = JSON.parse(res.bodyText);
                this.user_name = user.customer.nickName;
                window.sessionStorage.setItem('wxUserName', user.customer.nickName);
                this.imgsrc = this.picUrl+user.customer.headImage;
                this.userTel = user.customer.phone;
                if(user.customer.phone == ""|user.customer.phone == undefined){
                    this.userTel = "未绑定";
                }
                this.numToPay = user.waitPay;
                this.numToSend = user.payOK;
                this.numToTake = user.waitGet;
                if(this.numToPay == ""|this.numToPay == undefined){
                    this.numToPay = 0;
                }
                if(this.numToPay > 0){
                    this.numToPayShow = true;
                }
                if(this.numToSend == ""|this.numToSend == undefined){
                    this.numToSend = 0;
                }
                if(this.numToSend > 0){
                    this.numToSendShow = true;
                }
                if(this.numToTake == ""|this.numToTake == undefined){
                    this.numToTake = 0;
                }
                if(this.numToTake > 0){
                    this.numToTakeShow = true;
                }
                // this.product_org_price = product.product.listPrice;
                // this.product_org_price = product.product.listPrice;
                // this.product_org_price = product.product.listPrice;
                if(user.customer.phone == ""|user.customer.phone == undefined){
                    this.isBind = true;
                }
            },(res)=>{
                this.title='服务器网络链接中断，请稍后再试！'
                this.isShow=true;
                var that=this
                setTimeout(function(){
                        that.isShow=false;
                },3000)
            })
        }
    }
</script>
