<template>
    <div>
        <!-- <div class="header clearfix">
            <router-link to="/user">
                <i class="fl"></i>
            </router-link>
            <div class="fl"><p>修改密码</p></div>
        </div> -->
        <div class="gap_f4_20"></div>
        <ul class="ul_css">
            <li>
                <i>手机号</i>
                <input type="text" placeholder="请输入您的手机号码" class="ipt_text" v-model="tel"/>
            </li>
            <li>
                <i>验证码</i>
                <input type="text" placeholder="请输入短信验证码" class="ipt_text"/>
                <input type="button" value="获取验证码" class="ipt_btn"/>
            </li>
            <li>
                <i>新密码</i>
                <input type="text" placeholder="请输入6-20位字母和数字的组合" class="ipt_text" v-model="pass"/>
            </li>
        </ul>
        <div class="footer">
            <!-- <router-link to="/"> -->
            <p @click="bind">确定提交</p>
            <!-- </router-link> -->
        </div>
    </div>
</template>
<style lang="less" scoped>
    // .header{
    //     // width: 100%;
    //     // height: 88/200/1.17rem;
    //     i{
    //         display: block;
    //         width: 13/200/1.17rem;
    //         height: 88/200/1.17rem;
    //         background: url(../../../common/imgs/right_arrow.png) no-repeat;
    //         background-size: 100%;
    //         background-position: left center;
    //         transform: scaleX(-1);
    //         position: absolute;
    //         left: 30/200/1.17rem;
    //     }
    //     div{
    //         width: 100%;
    //         p{
    //             margin: 0 auto;
    //             width: 136/200/1.17rem;
    //             height: 88/200/1.17rem;
    //             line-height: 88/200/1.17rem;
    //             font-size: 34/200/1.17rem;
    //             color: #333;
    //         }
    //     }
    // }
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
            i{
                font-size: 28/200/1.17rem;
                color: #333;
                margin-right: 40/200/1.17rem;
            }
            .ipt_text{
                font-size: 28/200/1.17rem;
                color: #999;
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
    export default {
        data(){
            return{
                tel:"",
                pass:""
            }
        },
        methods:{
            bind(){
                if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.tel))){ 
                    alert("手机号码有误，请重填");  
                    return false; 
                }else if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(this.pass))){
                    alert("密码有误，请重填");  
                    return false;
                } 
            }
        },
        created() {
            document.body.style.backgroundColor = "#fff";
            document.title = "修改密码"
        }
    }
</script>

