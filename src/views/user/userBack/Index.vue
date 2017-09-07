<template>
    <div class="bg">
        <div class="header">您要针对以下哪方面，提出宝贵建议</div>
        <div>
            <ul class="ul_css">
                <li v-for="(item,index) in types" class="fl" @click="selected(index,item)" :key="index">
                    <i class="ipt_text">{{item.name}}</i>
                    <i :class="['ipt_btn',{'ipt_btn_none':index === activeI}]"></i> 
                    <!-- {{item}} -->
                </li> 
            </ul>
            <div class="gap_f4_10"></div>
        
            <textarea maxlength="140" placeholder="请详细描述您的宝贵意见（140个字以内）" class="text_area" v-model="storeData.remark"></textarea>
            <!-- <p>{{storeData.remark}}</p> -->
        </div>
        <div class="gap_f4_330"></div>
        <div class="footer">
            <!-- <router-link to="/"> -->
            <p @click="back">提交</p>
            <!-- </router-link> -->
        </div>

        <alert-c :title="title" v-show="isShow"></alert-c>
        <!-- <alert-c :title="title" v-show="isremark"></alert-c> -->
    </div>
</template>
<style lang="less" scoped>
    // .bg{
    //     background: #f4f4f4;
    // }
    .header{
        height: 70/200/1.17rem;
        line-height: 70/200/1.17rem;
        background: #f4f4f4;
        font-size: 24/200/1.17rem;
        color: #333;
        padding-left: 30/200/1.17rem;
    }
    .gap_f4_10{
        height: 10/200/1.17rem;
        background: #f4f4f4;
    }
    .ul_css{
        margin-left: 30/200/1.17rem;
        background: #fff;
        height: 4*88/200/1.17rem;
        li{
            width: 100%;
            height: 88/200/1.17rem;
            line-height: 88/200/1.17rem;
            border-bottom: 2/200/1.17rem solid #e5e5e5;
            .ipt_text{
                line-height: 88/200/1.17rem;
                font-size: 26/200/1.17rem;
                color: #333;
            }
            .ipt_btn{
                width: 34/200/1.17rem;
                height: 36/200/1.17rem;
                background: url(../../../common/imgs/not-select.png) no-repeat;
                background-size: 100%;
                position: absolute;
                right: 40/200/1.17rem;
                margin-top: 27/200/1.17rem;
            }
            .ipt_btn_none{
                background: url(../../../common/imgs/select.png) no-repeat;
                background-size: 100%;
            }
        }
        li:last-child{
            border-bottom: 0;
        }
    }
    .text_area{
        font-family: 24/200/1.17rem;
        color: #999;
        height: 300/200/1.17rem;
        width: 690/200/1.17rem;
        padding-top: 30/200/1.17rem;
        margin-left: 30/200/1.17rem;
        background: #fff;
    }
    .gap_f4_330{
        width: 100%;
        height: 470/200/1.17rem;
        background: #f4f4f4;
    }
    .footer{
        width: 100%;
        height: 105/200/1.17rem;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        border-top: 2/200/1.17rem solid #e1e1e1;
        background: #fff;
        p{
            margin: 0 auto;
            text-align: center;
            width: 700/200/1.17rem;
            height: 89/200/1.17rem;
            line-height: 89/200/1.17rem;
            font-size: 34/200/1.17rem;
            color: #fff;
            background: #e93b39;
            border-radius: 4/200/1.17rem;
            margin-top: 8/200/1.17rem;
        }
    }
</style>
<script>
    import alertC from '../../../components/alertC.vue'
    export default {
        components:{
            alertC
        },
        data(){
            return{
                types:[],
                // isSelected:false,
                // back_text:"",
                activeI:-1,
                storeData:{
                    feedbackType: "",
                    remark: "",
                    customerId:""
                },
                title:"",
                // isType:false,
                // isremark:false,
                isShow:false,
                // picUrl: window.sessionStorage.getItem('picUrl'),
                wxCustomerId: window.sessionStorage.getItem('wxCustomerId')
            }
        },
        methods:{
            selected(index,item){
                if(this.activeI == index) {
                    this.activeI = -1;
                }else{
                    this.activeI = index;
                    this.storeData.feedbackType = item.id;  
                }
            },
            back(){
                if(this.storeData.feedbackType==""){
                    // alert("请选择意见类型");
                    this.title = "请选择意见类型";
                    this.isShow = true;
                    var that = this;
                    setTimeout(function() {       
                        that.isShow = false;
                    }, 3000);
                    return false;
                }
                if(this.storeData.remark==""){
                    // alert("请输入意见");
                    this.title = "请输入意见";
                    this.isShow = true;
                    var that = this;
                    setTimeout(function() {       
                        that.isShow = false;
                    }, 3000);
                    return false;
                }
                // this.$http.post("/eb-wxshop/wxshop/base/saveFeedBackMessage",{feedbackType:this.storeData.feedbackType,remark:this.storeData.remark,customerId:5}).then(function(res){
                this.$http.post("/eb-wxshop/wxshop/base/saveFeedBackMessage",{feedbackType:this.storeData.feedbackType,remark:this.storeData.remark,customerId:this.wxCustomerId},{emulateJSON: true}).then(function(res){
                    console.log(res)
                    var back = JSON.parse(res.bodyText);
                    if(back.result == "000"){
                        this.title = "意见反馈已提交";
                        this.isShow = true;
                        var that = this;
                        setTimeout(function() {       
                            that.isShow = false;
                            that.$router.push("/user")
                        }, 2000);
                    }
                },function(){
                    console.log('失败')
                })
            }
        },
        created() {
            document.body.style.backgroundColor = "#fff";
            document.title = "意见反馈";
            this.$http.get("/eb-wxshop/wxshop/base/queryAllFeedBackType").then(function(res){
                var data = JSON.parse(res.bodyText);
                // this.types.id = data.data.id;
                // this.types.name = data.data.name;
                this.types = data.data;
            })
        }
    }
</script>

