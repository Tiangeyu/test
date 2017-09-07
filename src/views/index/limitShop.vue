<template>
    <!--限时购-->
    <section class="index-limitShop">
        <div class="index-timer">
            <div class="clearfix" style="display: inline-block; margin: 0 auto;">
                <span class="fl timeLimit">{{activeName}}</span>
                <font class="fl hour">{{dealTimer.h}}</font>
                <span class="fl flags">:</span>
                <font class="fl">{{dealTimer.m}}</font>
                <span class="fl flags">:</span>
                <font class="fl">{{dealTimer.s}}</font>
            </div>        
        </div>
        <div class="limit-buy" v-for="(limintItem, index) in activeList" :key="index">
            <nav :style="{backgroundImage:'url('+picUrl+limintItem.categoryImg+')'}"></nav>
            <ul class="limit-hot">
                <li v-for="(hotItem, hotIndex) in limintItem.hotProductList" :key="hotIndex">
                    <router-link :to="{name:'productInfo', query:{productId: hotItem.id, shoppingId: shoppingId}}" :style="{backgroundImage:'url('+picUrl+hotItem.bigPicture+')'}"></router-link>
                </li>
            </ul>
            <ul class="limit-common clearfix">
                <li v-for="(comItems, comIndex) in limintItem.productList" :key="comIndex">
                    <router-link :to="{name:'productInfo', query:{productId: comItems.id, shoppingId: shoppingId}}">
                        <dl>
                            <dd :style="{backgroundImage:'url('+picUrl+comItems.bigPicture+')'}"></dd>
                            <dt>
                                <h4>{{comItems.name}}</h4>
                                <p>￥{{comItems.shoppingPrice}}</p>
                            </dt>                      
                        </dl>
                    </router-link>
                </li>
            </ul>
        </div>
        <alert-c :title="title" v-show="isShow"></alert-c>
    </section>
</template>

<style lang="less" scoped>
    .index-limitShop{
        margin-top: 20/200/1.17rem;
        padding-bottom: 70/200/1.17rem;
        .index-timer{
            margin-top: 20/200/1.17rem;
            height: 54/200/1.17rem;
            background-color:#fff;
            padding-top: 16/200rem/1.17rem;
            text-align: center; 
            line-height: 35/200/1.17rem; 
            font{
                width: 80/200/1.17rem;
                height: 35/200/1.17rem;
                background-color: #313132;
                border-radius: 8px; 
                color: #fff;                       
            }
            span{
                height: 35/200/1.17rem;
                line-height: 35/200/1.17rem;
            }
            .timeLimit{
                font-size: 30/200/1.17rem;
                color:#333;
                letter-spacing: 2px;
            }
            .hour{
                margin-left: 20/200/1.17rem;               
            }
            .flags{
                width: 20/200/1.17rem;
                height: 35/200/1.17rem;
            }
        }
        .limit-buy{
            background: #fff;
            margin-bottom: 20/200/1.17rem;
            nav{
                height: 165/200/1.17rem;
                background-size: 100% 100%; 
                margin-bottom: 20/200/1.17rem;
            }
            .limit-hot{
                a{
                    display: block;
                    height: 422/200/1.17rem;
                    background-size: 100% 100%;
                    margin-bottom: 20/200/1.17rem;
                }     
            }
            .limit-common{
                background: #fff;
                li{
                  
                    width: 345/200/1.17rem;
                    a{
                        display: block;
                        dd{
                            background-size: 100% 100%;
                            height: 345/200/1.17rem; 
                            margin-bottom: 36/200/1.17rem;
                        }
                        dt{
                            height: 144/200/1.17rem;                          
                            color: #333;
                            padding-left: 20/200/1.17rem;
                            h4{
                                font-size: 26/200/1.17rem;
                                line-height: 36/200/1.17rem;
                                height: 72/200/1.17rem;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                            }
                            p{
                                padding-top: 15/200/1.17rem;
                                font-size: 32/200rem/1.17rem;
                                font-weight: 500;
                            }
                        }
                        
                    }
                }
                li:nth-child(even){
                    margin-right: 20/200/1.17rem;
                    float: right;
                }
                li:nth-child(odd){
                    margin-left: 20/200/1.17rem;
                    float: left;
                }
            }
        }
    }
</style>

<script>
    import alertC from '../../components/alertC.vue'
    export default{
        components:{
            alertC
        },
        data(){
            return {
                 //timer
                timer: '', 
                activeName:'',  
                dealTimer:{
                    h:'',
                    m:'',
                    s:''
                },          
                activeList:[],
                title:'',             
                isShow: false,
                shoppingId: 0,
                picUrl: window.sessionStorage.getItem('picUrl')
            }
        },
        methods:{
            timerDetail() {
                let arr = this.timer.split("-");
                let that = this;
                setInterval(function() {
                    // 目标时间
                    let oDate=new Date();
                    oDate.setFullYear(arr[0], arr[1], arr[2]);
                    oDate.setHours(arr[3], arr[4], arr[5], 0);
                    
                    // 当期时间
                    let oNow=new Date();
                    
                    // 总秒数
                    let total=parseInt((oDate.getTime()-oNow.getTime())/1000);

                    

                    // 算时间
                    that.dealTimer.d=parseInt(total/86400);
                    total%=86400;
                    
                    that.dealTimer.h=parseInt(total/3600) + 24 * that.dealTimer.d;
                    total%=3600;
                    
                    that.dealTimer.m=parseInt(total/60);
                    total%=60;
                    
                    that.dealTimer.s=total;
                }, 1000);
            }
        },
        created() {
            

            this.$http.get("/eb-wxshop/wxshop/product/productList").then((res)=>{
                this.activeList = res.body.list;
                this.shoppingId = res.body.shoppingId;
                this.timer = res.body.endTime;
                this.activeName = res.body.name;
                this.timerDetail();
            },(res)=>{
                this.title = "服务器异常"
                this.isShow = !this.isShow
                var that = this
                setTimeout(function(){
                    that.isShow = !that.isShow
                },2000)
            })
          
        }
    }
</script>
