<template>
    <section>
        <div class="clearfix">
            <label class="fl">快递单号 :</label>
            <input class="fl" v-model="orderAddress" placeholder="请输入快递单号">
        </div>
        <div class="clearfix">
            <label class="fl">快递公司 :</label>
            <select class="fl" v-model="selected">
                <option v-for="(option,index) in options" v-bind:value="option.value" :key="index">{{option.text}}</option>
            </select>
        </div>
        <p>温馨提示: 尊敬的用户,很抱歉出现这样的情况,退款运费将由您自行承担.</p>
        <div class="underBtn">
            <button @click="present">提交</button>
        </div>
        <alert-c :title="title" v-show="isShow"></alert-c>
    </section>
</template>

<style lang="less" scoped>
    section{
        div.clearfix{
            height: 88/200/1.17rem;
            font-size: 30/200/1.17rem;
            color: #333;
            line-height: 88/200/1.17rem;
            border-bottom: 1px solid #e9e9e9;
            padding-left: 30/200/1.17rem;
            label{
                width: 150/200/1.17rem;
            }
            input,select{
                font-size: 28/200/1.17rem;
                line-height: 88/200/1.17rem;
                height: 100%;
                padding-left: 30/200/1.17rem;
                width: 500/200/1.17rem;
            }
        }
        p{
            font-size: 24/200/1.17rem;
            color: #999;
            padding: 30/200/1.17rem;
            line-height: 36/200/1.17rem;
        }
        .underBtn{
            height: 0.48/1.17rem;
            background: #fff;
            padding-top: 0.04/1.17rem;
            position: fixed;
            left: 0;
            bottom: 0;
            right: 0;
            border-top: 1px solid #e9e9e9;
            button{
                display: block;
                width: 3.5/1.17rem;
                margin: 0 auto;
                height: 0.445/1.17rem;
                line-height: 0.445/1.17rem;
                background: #e93b39;
                color: #fff;
                font-size: 0.17/1.17rem;
                text-align: center;
                border-radius: 4/200/1.17rem;
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
            return{
                orderAddress: '',
                selected: "zero",
                options:[
                    {text: '请选择快递公司', value: 'zero'},
                    {text: '国内邮政', value: "YZPY"},
                    {text: 'EMS', value: 'EMS'},
                    {text: '全峰快递', value: 'QFKD'},
                    {text: '申通', value: 'STO'},
                    {text: '顺丰', value: 'SF'},
                    {text: '圆通速递', value: 'YTO'},
                    {text: '韵达快运', value: 'YD'},
                    {text: '运通快递', value: 'YTKD'},
                    {text: '中通速递', value: 'ZTO'},
                    {text: '百世汇通', value: 'HTKY'},
                    {text: '国通快递', value: 'GTO'},
                    {text: '天天快递', value: 'HHTT'},
                    {text: '德邦', value: 'DBL'},
                    {text: '如风达快递', value: 'RFD'},
                    {text: '中铁快运', value: 'ZTKY'},
                    {text: '增益快递', value: 'ZENY'},
                    {text: '全一快递', value: 'UAPEX'},
                    {text: '盛辉物流', value: 'SHWL'},
                    {text: '宅急送', value: 'ZJS'},
                ],
                isShow:false,
                title: ""

            }
        },
        created(){
            document.title = "填写发货单";
            document.body.style.background = '#fff';
        },
        methods:{
            present(){
                var that = this
                if(this.orderAddress !== "" && this.selected !== 'zero'){
                    this.$http.get('/eb-wxshop/wxshop/order/addExpressInfo',{params:{id:this.$route.query.id, logisticsNo: this.orderAddress, logisticsCode: this.selected}}).then(function(res){
                        if(res.body.result == "000"){
                            this.title = "提交成功";
                        }else{
                            this.title = "提交失败";
                        }
                        this.isShow = !this.isShow
                        setTimeout(function () {
                            if(that.title == "提交成功"){
                                that.$router.push("/applyFor")
                            }
                            that.isShow = !that.isShow;
                        }, 3000)
                    }, function(res){
                        this.title = "服务器异常";
                        this.isShow = !this.isShow              
                        setTimeout(function () {                         
                            that.isShow = !that.isShow;
                        }, 3000)
                    })
                }else{
                    this.title = "请填写完整";
                    this.isShow = !this.isShow
                    setTimeout(function () {                         
                        that.isShow = !that.isShow;
                    }, 3000)
                }
            }
        }
    }
</script>
