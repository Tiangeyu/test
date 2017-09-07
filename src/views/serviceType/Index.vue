<template>
  <section>
    <p class="geduan"></p>
    <div class="header">商品信息</div>
    <dl class="clearfix">
        <dt class="fl" :style="{backgroundImage:'url('+picUrl+queryData.image+')'}"></dt>
        <dd class="fl">
            <h3>{{queryData.productName}}</h3>
        </dd>
    </dl>
     <ul class="theList">
        <li class="clearfix">
            <router-link :to="{name:'onlyRefund', query:queryData}">
                <span class="fl">仅退款</span>
                <font class="fr rightNow"></font>
                <span class="fr describe">未收到货 (含未签收)</span>
            </router-link>        
        </li>
        <li class="clearfix">
            <router-link :to="{name:'returnRefund', query:queryData}">
                <span class="fl">退货退款</span>
                <font class="fr rightNow"></font>
                <span class="fr describe">已收到货，需要退已收到的货物</span>
            </router-link>
        </li>
        <!-- <li class="clearfix">
            <span class="fl">换货</span>
            <font class="fr rightNow"></font>
            <span class="fr describe">商品存在质量问题或规格不合适</span>
        </li> -->
     </ul>
  </section>
</template>

<style lang="less" scoped>
    .geduan{
        height: 20/200/1.17rem;
        background-color:#f4f4f4; 
    }
    .header{
        height: 88/200/1.17rem;
        font-size: 32/200/1.17rem;
        color: #333;
        line-height: 88/200/1.17rem;
        border-bottom: 1px solid #ccc;
        padding-left: 30/200/1.17rem;
    }
    dl{
        padding:30/200/1.17rem;
        border-bottom: 1px solid #ccc;
        dt{
            width: 128/200/1.17rem;
            height: 128/200/1.17rem;
            background-size: 100%; 
        }
        dd{
            padding-left: 40/200/1.17rem;
            padding-top: 20/200/1.17rem;
            h3{
                font-size: 30/200/1.17rem;
                color: #454545;
                padding-bottom: 30/200/1.17rem;
                width: 350/200/1.17rem;
                line-height: 44/200/1.17rem;
            }
            h4{
                font-size: 32/200/1.17rem;
                color: #a1a6aa;
            }
        }
    }
    .theList{
        li{
            padding-right: 40/200/1.17rem;
            padding-left: 30/200/1.17rem;
            height: 88/200/1.17rem;
            line-height: 88/200/1.17rem;
            color: #333;
            font-size: 30/200/1.17rem;
            border-bottom: 1px solid #ccc;
            .describe{
                font-size: 24/200/1.17rem;
                color: #999;
                margin-right: 20/200/1.17rem;
            }
            .rightNow{
                width: 13/200/1.17rem;
                height: 100%;
                background: url('../../common/imgs/right_arrow.png') no-repeat left center;
                background-size: 100%;               
            }
            input{
                height: 100%;
                font-size: 24/200/1.17rem;
                color: #999;
            }
        }
    }
</style>


<script>
    
    export default{
        data() {
            return {
                isActive: true,
                queryData:this.$route.query,
                picUrl: window.sessionStorage.getItem('picUrl')
            }
        },
        created(){
            document.body.style.backgroundColor = "#FFF";
            document.title = "选择售后类型";
           
        }
    }
</script>
