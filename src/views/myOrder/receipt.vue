<template>
    <div>
        <div class="marchBox" :marchId="item.id"  v-for="(item,index) in receipt" :key="index">
            <!--店铺名称-->
            <div class="head clearfix" >
                <img src="../../common/imgs/wait-panda.png" class="fl"/>
                <p class="fl">{{item.storeName}}</p>
                <span class="fr">待收货</span>
            </div>
            <!--商品列表-->
            <router-link :to="{name:'waitPayment',query:{'id':item.id,'status':item.status}}"   >
                <ul class="marchList">
                    <li v-for="(view,i) in item.childList" :key="i" :orderId="item.id" class="box" >
                        <img  :src=picUrl+view.smallImage />
                        <div class="cen item ">
                            <p>{{view.productName}}</p>
                            <div class="clearfix">
                                <p class="fl">￥{{view.unitPrice}}</p>
                                <!--<p class="fl">规格：80/袋</p>-->
                                <p class="fr">X{{view.quantity}}</p>
                            </div>
                        
                        </div>
                    </li>
                </ul>
             </router-link>
            <div class="marchFoot">
                <div class="clearfix text">
                    <p class="fr money">合计：<font>￥{{item.totalCost}}</font></p>
                    <p class="fr sum">共{{item.childList.length}}件商品</p>
                </div>
                <!--待收货-->
                <div class="btn clearfix" v-show="item.status==8" >
                        <span class="fr" @click="trueOrder(item.id,index)">确认收货</span>
                        <router-link :to="{name:'comeApply',query:{'orderId':item.id}}" class="fr" v-show="length[index] != isSaleAfter[index]">申请退款</router-link>
                </div>
            </div>
        </div>
         <infinite-loading :on-infinite="onInfiniteR" ref="infiniteLoading"  spinner='bubbles'>
             <div slot="no-results" class="information">
                    <img src="../../common/imgs/noOrder.png"/>
                </div>
            <div slot="no-more">
                没有更多数据
            </div>
        </infinite-loading>
        <alert-a :title="titleT" :isShow="isTrue" @isOk='trueFn' @isCancle='hide'></alert-a>
        <alert-c :title="titC" v-show="isC"></alert-c>
    </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading';
import alertA from '../../components/alertA.vue';
import alertC from '../../components/alertC.vue';


export default {
    // props:['receipt'],
      data() {
            return {
                receipt:[],
                allPage:0,
                id:'',
                index:'',
                titleT:'',
                isTrue:false,
                titC:'',
                isC:false,
                picUrl:window.sessionStorage.getItem('picUrl'),
                wxCustomerId:window.sessionStorage.getItem('wxCustomerId'),
                length:[],
                isSaleAfter:[],
            };
        },
    methods: {
        onInfiniteR() {
                this.allPage=this.allPage+1
                this.$http.get('/eb-wxshop/wxshop/order/listOrdersApp',{params:{pageNum:this.allPage,numPerPage:10,customerId:this.wxCustomerId,status:8}}).then((res)=>{
                    var oldPage;
                    var json=res.body
                    if(json.result=='000'){
                        if(json.orders.length > 0 ){
                            for(var i=0;i<json.orders.length;i++){
                                var n=0;
                                this.receipt.push(json.orders[i])
                                this.length.push(json.orders[i].childList.length);
                                for(var s=0;s<json.orders[i].childList.length;s++){
                                    if(json.orders[i].childList[s].isSaleAfter==1){
                                        n++;
                                    }else{
                                        n--;
                                    }
                                }
                                this.isSaleAfter.push(n);
                            }
                            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                        }else{
                            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');      
                        }
                      
                    }else{
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                    }
                },(res)=>{
                        this.titC='服务器网络链接中断，请稍后再试！'
                        this.isC=true;
                        var that=this
                        setTimeout(function(){
                             that.isC=false;
                        },3000)
                })
            },
             hide(){
                this.isDelete=false;
                this.isTrue=false;
                this.isCancel=false;
                
                
            },
            trueOrder(id,index){
                this.titleT='确认收货后，将不能申请退款'
                this.isTrue=true;
                this.id=id;
                this.index=index;
            },
            trueFn(){
                this.$http.get('/eb-wxshop/wxshop/order/changeOrderStatus',{params:{orderId:this.id,orderStatus:'5'}}).then((res)=>{
                    console.log(res)
                    if(res.body.result=='000'){
                        this.orders.splice(this.index,1)
                    }else{
                       this.titC='服务器网络链接中断，请稍后再试！'
                        this.isC=true;
                        var that=this
                        setTimeout(function(){
                             that.isC=false;
                        },3000)
                    }
                },(res)=>{
                        this.titC='服务器网络链接中断，请稍后再试！'
                        this.isC=true;
                        var that=this
                        setTimeout(function(){
                             that.isC=false;
                        },3000)
                })
                this.isTrue=false;
            },

    },
    components: {
        InfiniteLoading,
        alertA,
        alertC
    },
}

</script>

<style lang="less">
@import '../../common/css/myOrder.less';
</style>