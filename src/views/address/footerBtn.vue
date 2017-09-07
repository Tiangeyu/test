<template>
  <section>
    <div class="underBtn" @click="toPath">
        <!--<router-link :to="{name:'addAddress', query:{customerId:wxCustomerId}}" tag="div">-->
            <button>新增添加收货地址</button>
        <!--</router-link>-->
    </div>
  </section>
</template>
<script>
export default {
    data(){
        return{
            wxCustomerId:window.sessionStorage.getItem('wxCustomerId'),
            userInfo:[]
        }
        
    },
    methods:{
        toPath(){
            if(this.$route.query.numbers){
                this.$router.push({name: 'addAddress', query: {numbers : this.$route.query.numbers, productId: this.$route.query.productId}})
            }else if(this.$route.query.ids){
                this.$router.push({name: 'addAddress', query: {ids :this.$route.query.ids}})
            }else{
                this.$router.push({name: 'addAddress'})
            }
        }
    },
    created(){
        // var userId = this.$route.query.customerId
        document.body.style.backgroundColor = "#f4f4f4";
        document.body.style.paddingBottom = "0.52rem";
        
        this.$http.get("/eb-wxshop/wxshop/customer/queryAddress",{params:{customerId:this.wxCustomerId}}).then(function(res){
            var userInfo = JSON.parse(res.bodyText).addressList
                this.userInfo = userInfo
                // console.log(userInfo)
        },function(){

        })
    }
}
</script>
<style lang="less" scoped>
    .underBtn{ 
        height: 96/200/1.17rem;
        background-color: #fff;
        padding-top: 7/200/1.17rem;
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        border-top: 1px solid #e9e9e9;
        button{  
            margin: 0 auto;
            display: block;
            width: 700/200/1.17rem;
            height: 88/200/1.17rem;
            line-height: 88/200/1.17rem;
            background-color: #e93b39;
            color: #fff;
            font-size: 34/200/1.17rem; 
            text-align: center; 
            border-radius: 4px;
        }
    }
</style>
