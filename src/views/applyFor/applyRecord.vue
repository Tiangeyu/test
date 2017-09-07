<template>
    <div class="item">
        <router-link :to="{name: 'service', query: {id: applyData.id}}">
            <p class="head clearfix">
                <span class="fl">服务单号: {{applyData.orderNo}}</span>
                <span class="fr">{{type[applyData.type]}}</span>
            </p>
            <dl>
                <dt :style="{backgroundImage:'url('+picUrl+ applyData.image +')'}"></dt>
                <dd>
                    <h3>{{applyData.productName}}</h3>                  
                    <h5>退款: <font style="color: #e93b39">￥{{applyData.unitPrice}}</font></h5>                              
                </dd>
            </dl>
            <div class="applyStatue clearfix">
                <i class="fl apply-ok"></i><font class="fl f1">{{status[applyData.status]}}</font><i class="fr right-go"></i><font class="fr f2">{{applyData.feedback}}</font>
            </div>
            <div class="clearfix btn" v-show="ShowButton[applyData.status]">
                <button v-on:click.prevent="plament(applyData.id)" v-if="applyData.status == 2 && isinterven != 1" class="fr">
                    平台介入
                </button>
                <button v-if="applyData.status == 2 && isinterven == 1" class="fr">
                    已介入
                </button>
                <router-link :to="{name:'addOrder', query: {id: applyData.id}}" v-if="applyData.status == 1" class="fr">
                    填写发货单
                </router-link>
            </div>
        </router-link>   
        <alert-c v-show="showC" :title="titleC"></alert-c>  
    </div>
</template>

<style lang="less" scoped>
    a{
        display: block;
    }
    .item {
        margin-top: 20/200/1.17rem;
        background: #fff;
    }

    .head {
        box-sizing: border-box;
        height: 70/200/1.17rem;
        font-size: 24/200/1.17rem;
        color: #333;
        line-height: 70/200/1.17rem;
        padding: 0 30/200/1.17rem;
        border-bottom: 1px solid #ccc;
    }

    dl {
        display: flex;
        margin-left: 30/200/1.17rem;
        padding: 20/200/1.17rem 0;
        border-bottom: 1px solid #ccc;
        dt {
            width: 148/200/1.17rem;
            height: 148/200/1.17rem;
            background-size: 100% 100%;
        }
        dd {
            flex: 1;
            padding-left: 30/200/1.17rem;
            h3 {
                padding-top: 30/200/1.17rem;
                font-size: 28/200/1.17rem;
                color: #454545;
            }        
            h4 {
                padding-top: 30/200/1.17rem;
                color: #333;
                font-size: 24/200/1.17rem;
            }
            h5 {
                padding-top: 30/200/1.17rem;
                font-size: 28/200/1.17rem;
                color: #454545;
            }    
        }
    }
    
    .applyStatue{
        height: 88/200/1.17rem;
        padding: 0 24/200/1.17rem 0 30/200/1.17rem;
        .apply-ok{
            width: 30/200/1.17rem;
            height: 100%;
            background: url('../../common/imgs/applyOk.png') no-repeat left center;
            background-size: 100%; 
        }
        .f1{
            padding-left: 20/200/1.17rem;
            font-size: 28/200/1.17rem;
            color: #333;
            line-height: 88/200/1.17rem;
        }
        .f2{
            padding-right: 30/200/1.17rem;
            font-size: 24/200/1.17rem;
            color: #333;
            line-height: 88/200/1.17rem;
        }
        .right-go{
            width: 13/200/1.17rem;
            height: 100%;
            background: url('../../common/imgs/right_arrow.png') no-repeat left center;
            background-size: 100%; 
        }
    }
    .btn{
        padding-top: 10/200/1.17rem;
        padding-bottom: 34/200/1.17rem;
        a,button{
            border: 1px solid #d9d9d9;
            width: 180/200/1.17rem;
            height: 56/200/1.17rem;
            line-height: 56/200/1.17rem;
            text-align: center;
            border-radius: 2/200/1.17rem;
            font-size: 24/200/1.17rem;
            color: #333;
            margin-right: 24/200/1.17rem;
        }
    }
</style>

<script>
    import alertC from '../../components/alertC.vue'
    export default{
        components:{
            alertC
        },
        props:['applyData'],
        data(){
            return{
                status:['等待商户审核','退款中','审核不通过','审核通过','物流中','退款完成','退款失败'],
                type:['仅退款','退货退款'],
                ShowButton:[false,false,true,true,false,false,false],
                picUrl: window.sessionStorage.getItem('picUrl'),
                isinterven: this.applyData.isinterven,
                showC: false,
                titleC: ""
            }
        },
        methods:{
            plament(id){              
                this.$http.get('/eb-wxshop/wxshop/order/platFormIntervention', {params:{id: id}}).then(function(res){
                    if(res.body.result == "000"){
                        this.isinterven = 1;
                        this.titleC = "平台介入成功"
                        this.showC = !this.showC;
                        let that = this;
                        setTimeout(function() {
                            that.showC = !that.showC
                        }, 2000);
                    }
                },function(res){
                    this.titleC = "平台介入服务请求失败"
                    this.showC = !this.showC;
                    let that = this;
                    setTimeout(function() {
                        that.showC = !that.showC
                    }, 2000);
                })
            }
        }
    }
</script>