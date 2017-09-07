<template>
    <div class="bg">
        <div class="header">
            <p class="sucess">下单成功</p>
            <!-- <p class="finish">完成</p> -->
        </div>
        <div class="top_msg_box">
            <div class="text clearfix">
                <i class="fl"></i>
                <p class="fl">包裹正在快马加鞭，飞到亲爱的主人身边~</p>
            </div>
            <div class="button_top clearfix">
                <p class="fl home" @click="home">返回首页</p>              
                <p class="fl order" @click="order">查看订单</p>
            </div>
        </div>
        <div class="ad"></div>
        <div class="bottom_box clearfix">
            <!-- <router-link to="/"> -->
                <p class="fl poster"  @click="showPoster">点击生产分享海报</p>
            <!-- </router-link> -->
            <!-- <router-link to="/"> -->
                <p class="fl invite">点击邀请好友</p>
            <!-- </router-link> -->
        </div>

        <div class="poster_box" v-show="isPoster" @click="hide">
            <div class="close_box">
                <!-- <p class="close_circle"></p>
                <p class="close_line"></p> -->
            </div>
            <img class="poster_pic"  src="../../../common/imgs/share_poster.png" @click.stop="share"/>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .bg{
        position: fixed;
        width: 100%;
        height: 100%;
        // height: 1334/200/1.17rem;
        background: #f6f6f6;
        z-index: -1;
        .header{
            width: 100%;
            height: 88/200/1.17rem;
            text-align: center;
            background: #fff;
            .sucess{
                line-height: 88/200/1.17rem;
                font-size: 32/200/1.17rem;
                color: #333;
            }
            .finish{
                line-height: 88/200/1.17rem;
                position: absolute;
                top: 0;
                right: 24/200/1.17rem;
                font-size: 26/200/1.17rem;
                color: #333;
            }
        }
        .top_msg_box{
            width: 100%;
            // margin-top: -106/200/1.17rem;
            .text{
                // height: 100%;
                margin: 0 auto;
                width: 670/200/1.17rem;
                 i{
                    display: block;
                    width: 120/200/1.17rem;
                    height: 120/200/1.17rem;
                    background: url(../../../common/imgs/package.png) no-repeat;
                    background-size: 100%;
                    // margin-left: 80/200/1.17rem;
                    margin-top: 60/200/1.17rem;
                }
                p{
                    font-size: 24/200/1.17rem;
                    color: #666;
                    margin-left: 20/200/1.17rem;
                    margin-top: 106/200/1.17rem;
                    margin-bottom: 94/200/1.17rem;
                }
            }
            .button_top{
                margin: 0 auto;
                width: 500/200/1.17rem;;
                margin-top: 36/200/1.17rem;
                margin-bottom: 60/200/1.17rem;
                // margin-left: 135/200/1.17rem;
                .order,.home{
                    text-align: center;
                    width: 200/200/1.17rem;
                    height: 70/200/1.17rem;
                    line-height: 70/200/1.17rem;
                    border: 2/200/1.17rem solid #ddd;
                    border-radius: 10/200/1.17rem;
                }
                .order{
                    margin-left: 80/200/1.17rem;
                }
            }
        }
        .ad{
            margin: 0 auto;
            width: 700/200/1.17rem;
            height: 381/200/1.17rem;
            background: url(../../../common/imgs/ad_pic.png) no-repeat;
            background-size: 100%;
        }
        .bottom_box{
            margin: 0 auto;
            width: 660/200/1.17rem;
            margin-top: 120/200/1.17rem;
            .poster{
                text-align: center;
                width: 300/200/1.17rem;
                height: 80/200/1.17rem;
                line-height: 80/200/1.17rem;
                border: 2/200/1.17rem solid #e93b39;
                border-radius: 10/200/1.17rem;
                font-size: 28/200/1.17rem;
                color: #e93b39;
                // margin-left: 8/200/1.17rem;
            }
            .invite{
                text-align: center;
                width: 300/200/1.17rem;
                height: 80/200/1.17rem;
                line-height: 80/200/1.17rem;
                border: 2/200/1.17rem solid #e93b39;
                border-radius: 10/200/1.17rem;
                font-size: 28/200/1.17rem;
                color: #fff;
                background: #e93b39;
                margin-left: 42/200/1.17rem;
            }
        }
    }
    .poster_box{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.6);
    }
    .poster_pic{
        margin: 0 auto;
        // margin-top: 150/200/1.17rem;
        z-index: 99;
        display: block;
        width: 750*0.7/200/1.17rem;
        height: 1334*0.7/200/1.17rem;
        // background: url(../../../common/imgs/share_poster.png) no-repeat;
        // background-size: 100%;
    }
    .close_box{
        width: 80/200/1.17rem;
        height: 80/200/1.17rem;
        background: url(../../../common/imgs/close_with_line.png) no-repeat;
        margin-left: 520/200/1.17rem;
        margin-top: 80/200/1.17rem;
        background-size: 100%;
        // .close_circle{

        // }
        // .close_line{
        //     // position: absolute;
        //     // left: 500/200/1.17rem;
        //     margin-left: 550/200/1.17rem;
        //     margin-top: 100/200/1.17rem;
        //     height: 50/200/1.17rem;
        //     border-left: 1px solid #fff;
        // }
    }
</style>
<script>
    const wx = require('weixin-js-sdk');
    export default {
        data(){
            return{
                isPoster:false,
                wx: {},
                url: location.href.split("#")[0]
            }
        },
        methods:{
            showPoster(){
                this.isPoster=true;
            },
            hide(){
                this.isPoster=false;
            },
            share(){
                this.wx.onMenuShareAppMessage({
                    title: '微商城购物狂欢', // 分享标题
                    desc: '11111', // 分享描述
                    link: 'http://shop.ryhx.com.cn/eb-wxshop/smallShop/index.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: '', // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () { 
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () { 
                        // 用户取消分享后执行的回调函数
                    }
                });
            },
            home(){
                window.sessionStorage.setItem("orderSuccess", "0");
                this.$router.push("/index")
            },
            order(){
                window.sessionStorage.setItem("orderSuccess", "0");
                this.$router.push("/myOrder")
            }
        },
        created() {
            document.body.style.backgroundColor = "#fff";
            document.title = "订单完成";
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
                    jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
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
        }
    }
</script>

