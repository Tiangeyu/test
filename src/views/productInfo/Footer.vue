<template>
    <div class="footers clearfix">
        <div class="fl contect_pic" @click="tel"><p></p></div>
        <div class="button clearfix fr">
            <!-- <router-link to="/"> -->
                <p class="fl add_into_cart" @click="select">加入购物车</p>
            <!-- </router-link>
            <router-link to="/"> -->
                <p class="fl buy_now" @click="select">立即购买</p>
            <!-- </router-link> -->
        </div>
        <alert-b :title="title" v-show="isShow" @isOk="close"></alert-b>
    </div>
</template>
<style lang="less" scoped>
    .footers{
        display: box;
        position: fixed;
        bottom: 0;
        text-align: center;
        height: 104/200/1.17rem;
        width: 100%;
        line-height: 104/200/1.17rem;
        border-top: 2/200/1.17rem solid #e1e1e1;
        background: #fff;
        .contect_pic{
            width: 170/200/1.17rem;
            height: 104/200/1.17rem;
            p{
                margin: 0 auto;
                width: 61/200/1.17rem;
                height: 54/200/1.17rem;
                // width: 100%;
                // height: 100%;
                background: url(../../common/imgs/contect.png) no-repeat;
                background-size: 100%;
                // background-position: center center;
                // margin: 0 auto;
                // margin-left: 60/200/1.17rem;
                margin-top: 25/200/1.17rem;
            }
        }
        .button{
            width: 275*2/200/1.17rem;
            margin-right: 20/200/1.17rem;
            margin-top: 7/200/1.17rem;
            position: absolute;
            // right: 20/200/1.17rem;
            right: 0;
              .add_into_cart{
                width: 275/200/1.17rem;
                height: 90/200/1.17rem;
                line-height: 90/200/1.17rem;
                background: #1a191e;
                font-size: 34/200/1.17rem;
                color: #fff;
                border-radius: 4/200/1.17rem 0 0 4/200/1.17rem;
                // margin-top: 7/200/1.17rem;
            }
            .buy_now{
                width: 275/200/1.17rem;
                height: 90/200/1.17rem;
                line-height: 90/200/1.17rem;
                background: #e93b39;
                font-size: 34/200/1.17rem;
                color: #fff;
                border-radius: 0 4/200/1.17rem 4/200/1.17rem 0;
                // margin-top: 7/200/1.17rem;
            }
        }
    }
</style>
<script>
    import alertB from '../../components/alertB.vue'
    export default {
        components:{
            alertB
        },
        data(){
            return{
                title:"",
                isShow:false
            }
        },
        methods:{
            select(){
                this.$emit("child-info")
                //this.msg.isShow = 1;
                // this.$router.push("/orderDetail")
            },
            tel(){
                this.title = "400-951-7588";
                this.isShow = true;
            },
            close(){
                this.isShow = false;
            }
        }
    }
</script>
