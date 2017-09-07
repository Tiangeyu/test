<template>
    <div class="item">
        <p class="head clearfix">
            <span class="fl">订单编号: {{applyData.orderNo}}</span>
            <!--<span class="fr">下单时间: {{time}}</span>-->
        </p>
        <ul>
            <li v-for="(it, i) in applyData.childList" :key="i">
                <dl>
                    <dt :style="{backgroundImage:'url('+picUrl+ it.smallImage +')'}"></dt>
                    <dd>
                        <h3>{{it.productName}}</h3>
                        <div class="clearfix">
                            <div class="fl">
                                <h5>X {{it.quantity}}</h5>
                            </div>
                            <p class="fr"><router-link :to="{name:'serviceType', query:{image: it.smallImage, productName: it.productName, unitPrice: it.unitPrice, quantity: it.quantity, orderNo : applyData.orderNo, productId: it.productId, productNo: it.productNo, orderDetailId: it.id, storeName: applyData.storeName, storeId: applyData.storeId, receiver:applyData.contact, orderTime: applyData.orderDate, receiverPhone: applyData.contactPhone}}">申请售后</router-link></p>
                        </div>
                    </dd>
                </dl>
            </li>
        </ul>
    </div>
</template>

<style lang="less" scoped>
    
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

    li {
        margin-left: 30/200/1.17rem;
        padding: 20/200/1.17rem 0;
        border-top: 1px solid #ccc;
        dl {
            height: 148/200/1.17rem;
            display: flex;
            dt {
                width: 148/200/1.17rem;
                background-size: 100% 100%;
            }
            dd {
                flex: 1;
                padding-left: 30/200/1.17rem;
                padding-top: 10/200/1.17rem;
                h3 {
                    font-size: 28/200/1.17rem;
                    color: #454545;
                    width: 350/200/1.17rem;
                    line-height: 36/200/1.17rem;
                }
                .fl {
                    color: #333;
                    font-size: 24/200/1.17rem;
                    h4 {
                        padding-top: 20/200/1.17rem;
                    }
                    h5 {
                        padding-top: 20/200/1.17rem;
                    }
                }
                .fr {
                    a {
                        display: block;
                        width: 160/200/1.17rem;
                        height: 60/200/1.17rem;
                        color: #333;
                        font-size: 26/200/1.17rem;
                        border: 1px solid #999;
                        border-radius: 5px;
                        line-height: 60/200/1.17rem;
                        text-align: center;
                        margin-right: 30/200/1.17rem;
                    }
                }
            }
        }
    }

    li:first-child {
        border: 0;
    }

</style>



<script>
    export default{
        props:['applyData'],
        data(){
            return{
               time: '',
               picUrl: window.sessionStorage.getItem('picUrl')
            }
        },
        created(){
            // console.log(this.picUrl)
            // console.log(this.picForUrl) 
            Date.prototype.Format = function (fmt) { //author: meizz 
                var o = {
                    "M+": this.getMonth() + 1, //月份 
                    "d+": this.getDate(), //日 
                    "H+": this.getHours(), //小时 
                    "m+": this.getMinutes(), //分 
                    "s+": this.getSeconds(), //秒 
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                    "S": this.getMilliseconds() //毫秒 
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }

            var dateTimeJsonStr = '\/Date('+this.applyData.orderDate+')\/'; // C# DateTime类型转换的Json格式
            var msecStr = dateTimeJsonStr.toString().replace(/\/Date\(([-]?\d+)\)\//gi, "$1"); // => '1419492640000' ：通过正则替换，获取毫秒字符串
            var msesInt = Number.parseInt(msecStr); // 毫秒字符串转换成数值
            var dt = new Date(msesInt); // 初始化Date对象

            this.time = dt.Format("yyyy-MM-dd HH:mm:ss"); 

        }
    }
</script>