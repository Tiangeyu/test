<template>
    <div class="header">
        <ul class="clearfix">
            <router-link to="/index">
                <li class="fl home_img"></li>
            </router-link>
            <router-link to="/user">
                <li class="fr ml_50 user_img"></li>
            </router-link>
            <router-link to="/car">
                <li class="fr ml_50 cart_img"></li>
                <div class="numbers" v-show="childMsg.numberShow">{{childMsg.numberss}}</div>
            </router-link>
            <!-- <router-link to="/">
                <li class="fr follow_img"></li>
            </router-link> -->
        </ul> 
    </div>
</template>
<style lang="less" scoped>
    .header{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999;
        background: #fff;
        ul{
            height: 88/200/1.17rem;
            .numbers{
                position: absolute;
                left: 84%;
                top: 14/200/1.17rem;
                width: 24/200/1.17rem;
                height: 24/200/1.17rem;
                border-radius: 100%;
                background: #ff0000;
                font-size: 18/200/1.17rem; 
                text-align: center;
                color: #fff;
                line-height: 24/200/1.17rem;
            }  
            .home_img{
                background: url(../../common/imgs/home_smalllogo.png) no-repeat;
                width: 46/200/1.17rem;
                height: 100%;
                background-size: 100%;
                margin-left: 30/200/1.17rem;
                background-position: left center;
            }
            .follow_img{
                background: url(../../common/imgs/follow.png) no-repeat;
                width: 40/200/1.17rem;
                height: 100%;
                background-size: 100%;
                background-position: left center;
                }
            .cart_img{
                background: url(../../common/imgs/shopping_cart.png) no-repeat;
                width: 43/200/1.17rem;
                height: 100%;
                background-size: 100%;
                background-position: left center;
            }
            .user_img{
                background: url(../../common/imgs/user.png) no-repeat;
                width: 29/200/1.17rem;
                height: 100%;
                background-size: 100%;
                margin-right: 30/200/1.17rem;
                background-position: left center;
            }
        }
    }
    .ml_50{
        margin-left: 50/200/1.17rem;
    }
</style>
<script>
export default {
    props:['childMsg'],
    data(){
        return{
            // numberss:0,
            picUrl: window.sessionStorage.getItem('picUrl'),
            wxCustomerId: window.sessionStorage.getItem('wxCustomerId')
        }
    },
    created(){
        console.log(this.childMsg+this.childMsg.numberss+this.childMsg.numberShow)
        // this.$http.get('/eb-wxshop/wxshop/customer/queryShopCarNum',{params:{customerId: this.wxCustomerId}}).then(function(res){
        //     this.numberss = res.body.shopCarNum;
        // })
    }
}
</script>
