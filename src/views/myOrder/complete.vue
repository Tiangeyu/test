<template>
    <div>
        <div class="marchBox" :marchId="item.id"  v-for="(item,index) in complete" :key="index">
            <!--店铺名称-->
            <div class="head clearfix" >
                <img src="../../common/imgs/wait-panda.png" class="fl"/>
                <p class="fl">{{item.storeName}}</p>
                <span class="fr">已完成</span>
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
                 <!--成功-->
                <div class="btn clearfix" v-show="item.status==5" @click="deleteOrder(item.id,index)">
                        <span  class="fr">删除订单</span>
                </div>
             </div>
        </div>
         <infinite-loading :on-infinite="onInfiniteC" ref="infiniteLoading"  spinner='bubbles'>
           
                <div slot="no-results" class="information">
                    <img src="../../common/imgs/noOrder.png"/>
                </div>
            
            <span slot="no-more">
               没有更多数据
            </span>
        </infinite-loading>
         <alert-a :title="titleD" :isShow="isDelete" @isOk='deletes' @isCancle='hide'></alert-a>
         <alert-c :title="titC" v-show="isC"></alert-c>
    </div>
</template>



<script>
import InfiniteLoading from 'vue-infinite-loading';
import alertA from '../../components/alertA.vue'
import alertC from '../../components/alertC.vue'

export default {
      data() {
            return {
                complete:[],
                allPage:0,
                isDelete:false,
                titleD:'',
                deleteId:'',
                deleteIndex:'',
                titC:'',
                isC:false,
                picUrl:window.sessionStorage.getItem('picUrl'),
                wxCustomerId:window.sessionStorage.getItem('wxCustomerId')
            };
        },
    methods: {
        onInfiniteC() {
                this.allPage=this.allPage+1
                this.$http.get('/eb-wxshop/wxshop/order/listOrdersApp',{params:{pageNum:this.allPage,numPerPage:10,customerId:this.wxCustomerId,status:5}}).then((res)=>{
                    var oldPage;
                    var json=res.body
                    if(json.result=='000'){
                        if(json.orders.length > 0 ){
                            for(var i=0;i<json.orders.length;i++){
                                this.complete.push(json.orders[i])
                            }
                            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                        }else{
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
             deleteOrder(id,index){
                this.titleD='是否删除订单？';
                this.isDelete=true;
                this.deleteId=id;
                this.deleteIndex=index;
            },
            deletes(){
                this.$http.get('/eb-wxshop/wxshop/order/deleteOrderById',{params:{id:this.deleteId}}).then((res)=>{
                    if(res.body.result=='000'){
                        this.complete.splice(this.deleteIndex,1)
                    }else{
                        this.titC='服务器网络链接中断，请稍后再试！'
                        this.isC=true;
                        var that=this
                        setTimeout(function(){
                             that.isC=false;
                        },3000)
                    }
                })
                this.isDelete=false;
            },
            hide(){
                this.isDelete=false;
                
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