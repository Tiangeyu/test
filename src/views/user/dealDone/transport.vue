<template>
    <div class="bg">
        <div class="transport">
            <ul class="clearfix">
                <li class="iconCar">
                    <i></i>
                </li>
                <li class="tranInfo">
                    <dl>
                        <dt class="clearfix ">承运来源 :<span class="tranName">申通快递</span><span class="orderNum">运单编号 : 3332586791220</span></dt>
                        <dd>物流状态 :<span class="orderPosition">北京市西三旗 已签收</span></dd>
                    </dl>
                </li>
                <li class="tranTime"><span>2017-06-20 16:14:53</span></li>  
            </ul>
        </div>
        </div>
</template>
<style lang="less" scoped>
    .bg{
        background: #fff;
    }
    .transport{
        margin-left: 30/200rem;
        border-bottom: 1px solid #e9e9e9;
        background: #fff;
        height: 148/200rem;
        .iconCar{
            height: 148/200rem;
            width: 8%;
            float: left;
            i{
                display: block;
                width: 32/200rem;
                height: 28/200rem;
                background: url(../../../common/imgs/wait-car.png) no-repeat center;
                background-size: 100%;
                margin-top: 60/200rem;
            }
        }
        .tranInfo{
            width: 92%;
            float: left;
            font-size: 26/200rem;
            color: #333;
            dt{
                margin-top: 15/200rem;
                .tranName{
                    margin-left: 20/200rem;
                }
                .orderNum{
                    float: right;
                    margin-right: 20/200rem;
                }
            }
            dd{
                margin-top: 15/200rem;
                .orderPosition{
                    margin: 0 20/200rem;
                }
            }
        }
         .tranTime{
            margin-top: 15/200rem;
            width: 90%;
            float: left;
            font-size: 26/200rem;
            color: #999999;
        }
    }
</style>
<script>
    export default {
        
    }
  
</script>