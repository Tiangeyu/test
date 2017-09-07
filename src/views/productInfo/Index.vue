<template>
    <div class="whole_box">
        <headers :child-msg="num"></headers>
        <sections @child-info="get" :child-com="tochild.isShow">
            <!-- <Child :msg="tochild"></Child> -->
            <!-- <slot>{{tochild.isShow}}</slot>     -->
        </sections>    
        <choice v-show="tochild.isShow" :child-com="tochild.isShow" @hideBlock="hid" @numRefresh="number"></choice> 
        <footers @child-info="get" :child-com="tochild.isShow"></footers>  
    </div>
</template>
<script>
    import headers from './Header.vue'
    import sections from './Section.vue'
    import footers from './Footer.vue'
    import choice from './Choice.vue'
    export default {
        data(){
            return{
                tochild:{
                    isShow:0,
                    // numberss:9
                },
                num:{
                    numberss:0,
                    numberShow: false
                },
                picUrl: window.sessionStorage.getItem('picUrl'),
                wxCustomerId: window.sessionStorage.getItem('wxCustomerId')
            }
        },
        methods:{
            get(){
                this.tochild.isShow = 1;
            },
            hid(){
                this.tochild.isShow = 0;
            },
            number(){
                console.log("111111111")
                this.$http.get('/eb-wxshop/wxshop/customer/queryShopCarNum',{params:{customerId: this.wxCustomerId}}).then(function(res){
                    this.num.numberss = res.body.shopCarNum;
                    if(res.body.shopCarNum ==""|res.body.shopCarNum == undefined){
                        this.num.numberss = 0;
                    }
                    if(this.num.numberss > 0){
                        this.num.numberShow = true;
                    }
                })
            }
        },
        components:{
            headers,
            sections,
            footers,
            choice
        },
        created() {
            document.body.style.backgroundColor = "#fff";
            document.title = "商品详情";

            this.$http.get('/eb-wxshop/wxshop/customer/queryShopCarNum',{params:{customerId: this.wxCustomerId}}).then(function(res){
                this.num.numberss = res.body.shopCarNum;
                if(res.body.shopCarNum ==""|res.body.shopCarNum == undefined){
                    this.num.numberss = 0;
                }
                if(this.num.numberss > 0){
                    this.num.numberShow = true;
                }
            })
        }
    }
</script>
<style lang="less">
    .whole_box{
        // position: absolute;
    }
</style>

