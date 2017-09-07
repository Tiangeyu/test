<template>
    <div>
        <div class="marchBox" :marchId="item.id"  v-for="(item,index) in orders" :key="index">
            <!--店铺名称-->
            <div class="head clearfix" :id='item.status'>
                <img src="../../common/imgs/wait-panda.png" class="fl"/>
                <p class="fl">{{item.storeName}}</p>
                <span class="fr" v-show="item.status==8">待收货</span>
                <span class="fr" v-show="item.status==0">待付款</span>
                <span class="fr" v-show="item.status==6">待发货</span>
                <span class="fr" v-show="item.status==5">订单成功</span>
                <span class="fr" v-show="item.status==9">订单取消</span>
                
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
                 <!--代付款-->
                <div class="btn clearfix"  v-show="item.status==0">
                        <button @click="toPay(item.parentId, item.totalCost, item.id)" class="fr">付款</button>
                        <span class="fr" @click="cancel(item.id,index)">取消订单</span>
                </div>
                 <!--代发货--> 
                <div class="btn clearfix" v-show="item.status==6 && length[index] != isSaleAfter[index]">
                        <router-link :to="{name:'comeApply',query:{'orderId':item.id}}" class="fr">申请退款</router-link>
                </div>
                 <!--成功-->
                <div class="btn clearfix" v-show="item.status==5" @click="deleteOrder(item.id,index)">
                     <span  class="fr">删除订单</span>
                </div>
                 <!--订单取消-->
                <div class="btn clearfix" v-show="item.status==9" @click="deleteOrder(item.id,index)">
                        <span  class="fr">删除订单</span>
                </div>
                 <!--已退款-->
                <div class="btn clearfix" v-show="item.status==2" @click="deleteOrder(item.id,index)">
                        <span  class="fr">删除订单</span>
                </div>
            </div>
        </div>
        <infinite-loading :on-infinite="onInfiniteA" ref="infiniteLoading" spinner='bubbles'>
            <div slot="no-results" class="information">
                    <img src="../../common/imgs/noOrder.png"/>
            </div>
            <span slot="no-more">
                没有更多数据  
            </span>
        </infinite-loading>
        <alert-a :title="titleD" :isShow="isDelete" @isOk='deletes' @isCancle='hide'></alert-a>
        <alert-a :title="titleT" :isShow="isTrue" @isOk='trueFn' @isCancle='hide'></alert-a>
        <alert-a :title="titleC" :isShow="isCancel" @isOk='trueCancel' @isCancle='hide'></alert-a>
        <alert-c :title="titC" v-show="isC"></alert-c>
        
    </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading';
import alertA from '../../components/alertA.vue'
import alertC from '../../components/alertC.vue'

export default {
    // props:['orders'],
      data() {
            return {
                orders: [],
                allPage:0,
                //订单id和index
                id:'',
                index:'',
                //删除订单
                isDelete:false,
                titleD:'',
                // 确认收货
                titleT:'',
                isTrue:false,
                //取消订单
                isCancel:false,
                titleC:'',
                titC:'',
                isC:false,
                picUrl:window.sessionStorage.getItem('picUrl'),
                wxCustomerId:window.sessionStorage.getItem('wxCustomerId'),
                length:[],
                isSaleAfter:[],
            };
        },
    methods: {
        onInfiniteA() {

            this.allPage=this.allPage+1
            // var _this=this
            this.$http.get('/eb-wxshop/wxshop/order/listOrdersApp',{params:{pageNum:this.allPage,numPerPage:10,customerId:this.wxCustomerId}}).then((res)=>{
                var oldPage;
                var json=res.body
                if(json.result=='000'){
                    if(json.orders.length > 0 ){
                        for(var i=0;i<json.orders.length;i++){
                            var n=0;
                            this.orders.push(json.orders[i])
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
                        //  this.allPage=0;
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');      
                    }
                    
                }else{
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                }
            },(res)=>{
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                    this.titC='服务器网络链接中断，请稍后再试！'
                    this.isC=true;
                    var that=this
                    setTimeout(function(){
                            that.isC=false;
                    },3000)
            })
        },
        // changeFilter() {
        //     this.orders = [];
        //     this.$nextTick(() => {
        //         this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
        //         this.allPage=0;
        //     });
        //  },
  

        deleteOrder(id,index){
            this.titleD='是否删除订单？';
            this.isDelete=true;
            this.id=id;
            this.index=index;
        },
        deletes(){
            this.$http.get('/eb-wxshop/wxshop/order/deleteOrderById',{params:{id:this.id}}).then((res)=>{
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
            this.isDelete=false;
        },
        hide(){
            this.isDelete=false;
            this.isTrue=false;
            this.isCancel=false;
            
            
        },
        trueOrder(id,index){
            this.titleT='确认收货后，将不能申请退款,是否确认收货'
            this.isTrue=true;
            this.id=id;
            this.index=index;
        },
        trueFn(){
            this.$http.get('/eb-wxshop/wxshop/order/changeOrderStatus',{params:{orderId:this.id,orderStatus:'5'}}).then((res)=>{
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
        cancel(id,index){
            this.titleC='是否取消订单'
            this.isCancel=true;
            this.id=id;
            this.index=index;
        },
        trueCancel(){
            this.$http.get('/eb-wxshop/wxshop/order/changeOrderStatus',{params:{orderId:this.id,orderStatus:'9'}}).then((res)=>{
                if(res.body.result=='000'){
                    this.orders.splice(this.index,1)
                    this.isCancel=false;
                    // this.$router.go(0)
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
        toPay(id,totalCost,orderId){
            window.location.href = "../smallShop/pay.html?orderAmount="+totalCost+"&bussOrderNo="+id+"&orderIdList="+orderId;
        }

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