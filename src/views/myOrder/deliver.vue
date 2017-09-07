<template>
    <div>
        <div class="marchBox" :marchId="item.id"  v-for="(item,index) in deliver" :key="index">
            <!--店铺名称-->
            <div class="head clearfix" >
                <img src="../../common/imgs/wait-panda.png" class="fl"/>
                <p class="fl">{{item.storeName}}</p>
                <span class="fr">待发货</span>
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
                 <!--代发货-->
                <div class="btn clearfix" v-show="item.status==6 && length[index] != isSaleAfter[index]">
                        <router-link :to="{name:'comeApply',query:{'orderId':item.id}}" class="fr">申请退款</router-link>
                </div>
            </div>
        </div>
         <infinite-loading :on-infinite="onInfiniteD" ref="infiniteLoading"  spinner='bubbles'>
             <div slot="no-results" class="information">
                    <img src="../../common/imgs/noOrder.png"/>
            </div>
            <span slot="no-more">
                没有更多数据
            </span>
        </infinite-loading>
        <alert-c :title="titC" v-show="isC"></alert-c>

    </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading';
import alertC from '../../components/alertC.vue'
export default {
    // props:['deliver'],
      data() {
            return {
                deliver:[],
                allPage:0,
                 titC:'',
                isC:false,
                picUrl:window.sessionStorage.getItem('picUrl'),
                wxCustomerId:window.sessionStorage.getItem('wxCustomerId'),
                length:[],
                isSaleAfter:[],
            };
        },
    methods: {
        onInfiniteD() {
                this.allPage=this.allPage+1
                this.$http.get('/eb-wxshop/wxshop/order/listOrdersApp',{params:{pageNum:this.allPage,numPerPage:10,customerId:this.wxCustomerId,status:6}}).then((res)=>{
                    var oldPage;
                    var json=res.body
                    if(json.result=='000'){
                        if(json.orders.length > 0 ){
                            for(var i=0;i<json.orders.length;i++){
                                var n=0;
                                this.deliver.push(json.orders[i])
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
            }

    },
    components: {
        InfiniteLoading,
        alertC

    },
}

</script>

<style lang="less">
@import '../../common/css/myOrder.less';
</style>