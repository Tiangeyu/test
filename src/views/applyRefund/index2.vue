<template>
  <section>
    <p class="geduan"></p>
    <div class="header">商品信息</div>
    <dl class="clearfix">
        <dt class="fl"></dt>
        <dd class="fl">
            <h3></h3>
            <h4></h4>
        </dd>
    </dl>
     <ul class="theList">
        <li class="clearfix">
            <span class="fl">申请服务</span>
            <font class="fr rightNow"></font>
        </li>
        <li class="clearfix">
            <span class="fl">退款服务</span>
            <font class="fr rightNow"></font>
        </li>
        <li class="clearfix">
            <span class="fl">退款金额</span>
            <font class="fr">￥</font>
        </li>
            <li class="clearfix">
            <span class="fl">退款说明</span>
            <input class="fr" placeholder="请在此处添加说明,可不填">
        </li>
     </ul>
    <div class="uploadImg">
        <h5>上传凭证</h5>
        <div class="clearfix">
            <ul class="clearfix fl">
                <li class="fl" v-for="(item,index) in imgData" :key="index"></li>
            </ul>
            <div class="fl upGo" @click="upImage"></div>
        </div>
    </div>
    <footer>
        <button>提交</button>
    </footer>
  </section>
</template>

<style lang="less" scoped>
    .geduan{
        height: 20/200rem;
        background-color:#f4f4f4; 
    }
    .header{
        height: 88/200rem;
        font-size: 32/200rem;
        color: #333;
        line-height: 88/200rem;
        border-bottom: 1px solid #ccc;
        padding-left: 30/200rem;
    }
    dl{
        padding:30/200rem;
        border-bottom: 1px solid #ccc;
        dt{
            width: 128/200rem;
            height: 128/200rem;
            background-size: 100%; 
        }
        dd{
            padding-left: 30/200rem;
            padding-top: 54/200rem;
            h3{
                font-size: 30/200rem;
                color: #454545;
                padding-bottom: 30/200rem;
            }
            h4{
                font-size: 32/200rem;
                color: #a1a6aa;
            }
        }
    }
    .theList{
       
        li{
            padding-right: 40/200rem;
            padding-left: 30/200rem;
            height: 88/200rem;
            line-height: 88/200rem;
            color: #333;
            font-size: 30/200rem;
            border-bottom: 1px solid #ccc;
            .rightNow{
                width: 13/200rem;
                height: 100%;
                background: url('../../common/imgs/right_arrow.png') no-repeat left center;
                background-size: 100%;               
            }
            input{
                height: 100%;
                font-size: 24/200rem;
                color: #999;
            }
        }
    }
    .uploadImg{
        padding-left: 30/200rem;
        h5{
            padding-top: 30/200rem;
            font-size: 30/200rem;
            color: #333;
            padding-bottom: 40/200rem;
        }
        li{
            width: 170/200rem;
            height: 170/200rem;
            background-size: 100%; 
        }
        .upGo{
            width: 170/200rem;
            height: 170/200rem;
            background: url('../../common/imgs/uploadImg.png') no-repeat;
            background-size: 100%; 
        }
    }
    footer{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        border-top: 1px solid #ccc;
        height: 104/200rem;
        padding: 8/200rem 30/200rem;
        button{
            display: block;
            width: 100%;
            background: #e93b3a;
            font-size: 34/200rem;
            color: #fff;
            text-align: center;
            line-height: 89/200rem;
            border-radius: 5/200rem; 
        }
    }
</style>


<script>
    
    export default{
        data() {
            return {
                isActive: true,
                imgData: []
            }
        },
        created(){
            document.body.style.backgroundColor = "#FFF";
            document.title = "申请退款";
         //   console.log(wx)
           
        },
        methods:{
            upImage(){
               
                //console.log(this.wx)
                this.wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        alert("ok");
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        alert(localIds[0])
                    }
                });
            }
        }
    }
</script>
