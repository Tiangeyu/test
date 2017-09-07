<template>
  <div>
        <div class="tisp clearfix" v-show="tisp">
            <i class="phoneClose fl"  @click='tispFn()'></i>
            <p class="fl">绑定手机号可更好的保护账户安全</p>
            <router-link to='/bindTel' class="fr" >
                <span>立即绑定</span>
            </router-link>
        </div>
        <section class="has" v-show="none">
            <div class="editMarch" v-show="sum == 0 ? false :true" >
                <span @click="editMarch()" v-text="!bflage ? '完成' : '编辑'" >编辑</span>
            </div>
        <div class="marchBox" v-for="(item,i) in march" :key="i">
            <!--店铺名称-->
            <div class="head clearfix">
                <div class="all  fl" :class="['all  fl',{'check' : listCheckA[i] }]">
                    <input type="checkbox" @click="listCheckAll(i)" :checked='listCheckA[i]' />
                </div>
                <p class="fl">{{item.storeName}}</p>
            </div>
            <!--商品列表-->
            <ul class="marchList">
                <li class="box" v-for='(view,index) in item.shopCarList' :key="index" :id=view.id>
                    <div class="select" :class="['all  fl',{'check' : check[i][index]}]">
                        <input type="checkbox" @click="checked(i,index)" :checked='check[i][index]'/>
                    </div>
                    <router-link :to="{name:'productInfo',query:{'productId':view.productId,'shoppingId':view.shoppingId}}" class="box item"  v-show="bflage">
                    <img  :src=picUrl+view.imageUrl />
                    <div class="cen item ">
                        <p>{{view.productName}}</p>
                        <div class="clearfix">
                            <!--<p class="fl">规格：</p>-->
                            <p class="fl">￥{{view.productPrice}}</p>
                            <p class="fr">X{{inputVal[i][index]}}</p>
                        </div>
                       
                    </div>
                    </router-link>
                    <!--编辑状态下的规格--> 
                    <img  :src=picUrl+view.imageUrl  v-show="!bflage"/>
                    <div class="editTit item" v-show="!bflage">
                        <div class="num clearfix">
                            <i class="fl" @click.stop='reduce(i,index,view.id)'>-</i>
                            <p class="fl">{{inputVal[i][index]}}</p>
                            <i class="fl" @click.stop='add(i,index,view.id)'>+</i>
                        </div>
                         <!--<div class="clearfix">
                           <p class="fl">规格：80/袋</p>-->
                            <!--<i class="spec fl"></i>
                        </div>-->
                        <p>￥{{view.productPrice}}</p>
                    </div> 
                
                </li>
                
            </ul>
        </div>

        <!--失效商品-->
        <div class="invalid" ref='aaaa' v-show="invSum ==0 ? false : true">
            <!--店铺名称-->
            <div class="head clearfix icon" >
                <span class="" @click="editInvalid()" v-text="invalid ? '编辑' : '完成'">编辑</span>
            </div>
        <ul class="invalidList">
            <li class="box" v-for="(item,index) in invalidList" :key="index">
                <div class="invalidCion">
                        <!--<input type="checkbox"/>-->
                    </div>
                    <img  :src=picUrl+item.imageUrl />
                    <div class="invalidCen item">
                        <p >{{item.productName}}</p>
                        <p>{{item.productDes}}</p>
                        
                    </div>
                    <!--删除按钮-->
                    <div class="delete" v-show="!invalid" @click="delProduct(index,item.id)">
                        <p> 删除</p>
                    </div>
            </li>
        </ul>
        </div>

        <!--结算-->
        <div style="height: 0.52rem;margin-top:0.2rem;"></div>
        <footer class="settle fl">
            <div class="select" :class="['select',{'check' : checkSum}]">
                <input type="checkbox"  @click="checkAll()" :checked='checkSum'/>
            </div>
            <span class="fl">全选</span>
            <div class="fr">
                <font>合计:<span>￥{{total}}</span></font>
                <span>不含运费</span>
                <button @click="goTo">结算（{{num}}）</button>
            </div>
        </footer>

        <!--编辑底部-->
        <footer class="settle clearfix"  v-show="!bflage" >
                <div class="select" :class="['select ',{'check' : checkSum}]">
                    <input type="checkbox" @click="checkAll()" :checked='checkSum'/>
                </div>
                <span class="fl">全选</span>
                <div class="fr">
                    <!--<font>合计:<span>￥299</span></font>-->
                    <!--<span>不含运费</span>-->
                    <button @click="delMarch()">删除</button>
                </div>
        </footer>

        <footer class="settle invSettle clearfix" @click="delAll()"  style="display:none" v-show="!invalid">
                <div>
                    <button>清除失效商品</button>
                </div>
        </footer>
      </section>

      <section class="none" v-show="!none">
                <img src="../../common/imgs/noneMarch.png"/>
      </section>
    <alert-c :title="titC" v-show="isC"></alert-c>
  </div>
</template>
<script>
import Vue from 'vue'
import $ from 'jquery'
import alertC from '../../components/alertC.vue'
export default {
    data(){
        return{
            bflage:true, //商品的结算底部显示 true为隐藏，删除全部显示
            invalid:true,//清除商品底部
            inputVal:[],//控制所有商品的数量[[1,1],[1,-1,1]]
            check:[],//所有的商品[[true,true],[false,false,false]]
            listCheckA:[],//商铺全选[true,false]
            total:0,
            money:[],//所有商品的价钱
            checkSum:false,
            marchNum:0,//所有商品数量
            num:0,//结算
            sum:0,//所有商户数量
            invSum:0,//失效商品的数量
            tisp:true,//头部提示框显示
            march:'',
            invalidList:'',
            none:true,
            titC:'',
            isC:false,
            picUrl:window.sessionStorage.getItem('picUrl'),
            wxCustomerId:window.sessionStorage.getItem('wxCustomerId'),
            wxUserPhone:window.sessionStorage.getItem('wxUserPhone'),
            shoppingId:''
        }
    },
    methods:{
        //编辑商品
        editMarch(){
            this.bflage=!this.bflage;
            this.invalid=true;
        },
        //编辑失效商品
        editInvalid(e){
             this.invalid=!this.invalid;
             if(this.invalid==false){
                 this.bflage=true;
             }
        },
        //减少
        reduce(i,index,shopCarId){
            if(this.inputVal[i][index]<=1){
                this.$http.get('/eb-wxshop/wxshop/customer/updateShopCar',{params:{shopCarId:shopCarId,num:1}}).then((res)=>{
                    if(res.body.result == '000'){
                        this.inputVal[i][index]=1;
                         this.titC='商品数量不能小于1！'
                        this.isC=true;
                        var that=this
                        setTimeout(function(){
                                that.isC=false;
                        },3000)
                    }else{
                         this.titC='删除商品失败，请稍后再试！'
                        this.isC=true;
                        var that=this
                        setTimeout(function(){
                                that.isC=false;
                        },3000)
                    }
                })
               if(this.check[i][index]==true){
                    this.total=parseFloat(this.total)-parseFloat(this.money[i][index])
                }
                return;
            }
            var r=parseFloat(this.inputVal[i][index])-1
            var _this=this;
            this.$http.get('/eb-wxshop/wxshop/customer/updateShopCar',{params:{shopCarId:shopCarId,num:r}}).then((res)=>{
                console.log(res)
                if(res.body.result == '000'){
                    _this.inputVal[i].splice(index,1,r);
                }else{
                     this.titC='减少商品失败，请稍后再试！'
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
             if(this.check[i][index]==true){
                this.total=parseFloat(this.total)-parseFloat(this.money[i][index])
            }
            this.total=Math.round(this.total*100)/100;
        },
        //增加
        add(i,index,shopCarId){
             var a=parseFloat(this.inputVal[i][index])+1
              //this.inputVal[i].splice(index,1,a);
              var _this=this;
            this.$http.get('/eb-wxshop/wxshop/customer/updateShopCar',{params:{shopCarId:shopCarId,num:a}}).then((res)=>{
                console.log(res)
                if(res.body.result == '000'){
                    _this.inputVal[i].splice(index,1,a)
                }else{
                     this.titC='增加商品失败，请稍后再试！'
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

            console.log(this.inputVal[i][index])
            if(this.check[i][index]==true){
                this.total=parseFloat(this.total)+parseFloat(this.money[i][index])
            }
            this.total=Math.round(this.total*100)/100;
        },
        //删除一个
        delProduct(index,shopCarId){
            this.$http.get('/eb-wxshop/wxshop/customer/delShopCar',{params:{shopCarId:shopCarId}}).then((res)=>{
                    console.log(res.body)
                    if(res.body.result=='000'){
                        this.invalidList.splice(index,1);
                    }else{
                         this.titC='删除商品失败，请稍后再试！'
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
            if(this.invalidList.length<=0){
                this.invalid=true;
                this.$refs.aaaa.innerHTML='';
            }
        },
        //失效商品清除全部
        delAll(){
            var arr=[];
            var ids;
            for(var i=0;i<this.invalidList.length;i++){
                arr.push(this.invalidList[i].id)
            }
            ids=arr.join(',')
            console.log(ids)
             this.$http.get('/eb-wxshop/wxshop/customer/batchDelShopCar',{params:{ids:ids}}).then((res)=>{
                 console.log(res)
                    if(res.body.result=='000'){
                        this.invalid=true;
                        this.$refs.aaaa.innerHTML='';   
                        this.invalidList.length=0;

                        if(this.march.length==0 && this.invalidList.length==0){
                            this.none=false;
                        }
                    }else{
                         this.titC='清除失效商品失败，请稍后再试！'
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
           
        },
        //单个商品选择
        checked(i,index){
            var c=0;
            var length=this.check[i].length;
            var _checked=!this.check[i][index];
             this.check[i].splice(index,1,_checked);
             //计算数量
             if(this.check[i][index]==true){
                  this.num=this.num+1
                  //计算金钱
                  this.total=this.total+this.inputVal[i][index]*this.money[i][index]
                 }else{
                    this.num=this.num-1;
                      //计算金钱
                     this.total=this.total-(this.inputVal[i][index]*this.money[i][index])
                 }
                 
             //获取全选的数量
             for(var s=0;s<length;s++){
                 if(this.check[i][s]==true){
                     c++
                 }else{
                    c--
                 }
             }

             //判断是否全部选上，控制商铺全选
             if(c==length){
                this.listCheckA.splice(i,1,true)
             }else{
                this.listCheckA.splice(i,1,false)
             }
            console.log(this.sum+'sum')
              if(this.num==this.marchNum){
                this.checkSum=true;
             }else{
                this.checkSum=false;
             }
            this.total=Math.round(this.total*100)/100;
        },
        //商铺全选
        listCheckAll(i){
            var c=0;
            var m=0;
            var _check=!this.listCheckA[i];
            this.listCheckA[i]=!this.listCheckA[i];
            var length=this.check[i].length;
                for(var s=0;s<length;s++){
                    this.check[i].splice(s,1,_check);
                }
                //计算金额
                    for(var j=0;j<length;j++){
                        m+=this.money[i][j]*this.inputVal[i][j]
                        
                    }
                    console.log(m)
                  //计算数量；
                if(_check==true){
                    this.num=this.num+length
                    //计算金额
                    this.total=this.total+m;
                }else{
                    this.num=this.num-length;
                    //计算金额
                    this.total=this.total-m;
                }

                for(var i=0;i<this.listCheckA.length;i++){
                     if(this.listCheckA[i]==true){
                        c++
                    }else{
                        c--
                    }
                }
                if(c==this.sum){
                    this.checkSum=true;
                }else{
                    this.checkSum=false;
                }
            this.total=Math.round(this.total*100)/100;
          
        },
        //全选
        checkAll(){
            var _check=!this.checkSum
            this.checkSum=_check;
            var m=0;
            var n=0;
            for(var i=0;i<this.listCheckA.length;i++){
                this.listCheckA.splice(i,1,_check)
                 n+=this.money[i].length;
                for(var s=0;s<this.check[i].length;s++){
                     this.check[i].splice(s,1,_check)
                     m+=this.money[i][s]*this.inputVal[i][s]
                }
            }

            if(_check){
                this.total=m;
                this.num=n;
            }else{
                this.total=0;
                 this.num=0;

            }
            this.total=Math.round(this.total*100)/100;
        },
        //删除
        delMarch(){
            var tems=[];
            var ids;
            var length=this.check.length;
            for(var i=0;i<length;i++){
                var len=this.check[i].length;
                for(var j = len; j>0; j--){
                    if(this.check[i][j-1] == true){
                        tems.push(this.march[i].shopCarList[j-1].id)
                    }
                }

            }

            ids=tems.join(',')

             this.$http.get('/eb-wxshop/wxshop/customer/batchDelShopCar',{params:{ids:ids}}).then((res)=>{
                    if(res.body.result=='000'){
                       this.total=0;
                        for(var i=0;i<length;i++){
                            // var t=[];
                            var len=this.check[i].length;
                            for(var j = len; j>0; j--){
                                if(this.check[i][j-1] == true){
                                    console.log(1)
                                    this.march[i].shopCarList.splice(j-1,1);
                                    this.check[i].splice(j-1,1);
                                    this.inputVal[i].splice(i-1,1);
                                    this.money[i].splice(i-1,1);
                                    this.marchNum=this.marchNum-1;
                                    this.num=this.num-1;
                                }
                            }
                        }

                        // //计算金额
                        var listLen=this.listCheckA.length
                        for(var i=listLen;i>0;i--){
                            if(this.listCheckA[i-1]==true){
                                this.listCheckA.splice(i-1,1);
                                this.march.splice(i-1,1);
                                this.inputVal.splice(i-1,1);
                                this.money.splice(i-1,1);
                                this.check.splice(i-1,1);
                                
                            }
                        }
                        if(this.march.length==0){
                            this.checkSum=false;
                            this.bflage=true;
                            this.sum=this.march.length;
                            this.marchNum=this.march.length
                        }

                        if(this.march.length==0 && this.invalidList.length==0){
                            this.none=false;
                        }
                    }else{
                       this.titC='删除商品失败，请稍后再试！'
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
            this.total=Math.round(this.total*100)/100;
        },
        tispFn(){
            this.tisp=false;
        },
        // 跳转
        goTo(){
            if(this.num){
            var tems=[];
            var ids;
            var length=this.check.length;
            for(var i=0;i<length;i++){
                var len=this.check[i].length;
                for(var j = len; j>0; j--){
                    if(this.check[i][j-1] == true){
                        tems.push(this.march[i].shopCarList[j-1].id)
                    }
                }

            }
             ids=tems.join(',')
                 this.$router.push("/orderDetail?ids="+ids+'&shoppingId='+this.shoppingId)
            }else{
                this.titC='请选择商品！'
                this.isC=true;
                var that=this
                setTimeout(function(){
                        that.isC=false;
                },3000)
            
           }
        },
    },
  created(){
      document.body.style.backgroundColor='#f4f4f4';
      document.title = "购物车";
      //获取购物车数据
      this.$http.get('/eb-wxshop/wxshop/customer/queryShopCar',{params:{customerId:this.wxCustomerId}}).then((res)=>{
        var json=res.body;
        // console.log(json)
        if(json.result=='000'){
            this.invalidList=json.invalidList;
            this.march=json.validList;
            this.sum=this.march.length;
            this.invSum=this.invalidList.length

            var n=0;
            if(this.march.length==0 && this.invalidList.length==0){
                this.none=false;
                return;
            }

            for(let i=0; i<this.march.length; i++){
                var arr=[];
                var mo=[];
                var check=[];
                n+=this.march[i].shopCarList.length
                this.listCheckA.push(false)
                var len=this.march[i].shopCarList.length
                for(let s=0;s<len;s++){
                    arr.push(this.march[i].shopCarList[s].num);
                    mo.push(this.march[i].shopCarList[s].productPrice)
                    check.push(false)
                }
                this.inputVal.push(arr)
                this.check.push(check)
                this.money.push(mo)
            }
            this.marchNum=n;
            this.shoppingId=this.march[0].shopCarList[0].shoppingId;
           
             console.log(this.none+'=none')
        }

       
      },(res)=>{
        this.titC='服务器网络链接中断，请稍后再试！'
        this.isC=true;
        var that=this
        setTimeout(function(){
                that.isC=false;
        },3000)
    })

    if(window.sessionStorage.getItem('binding') == 1){
        this.tisp=false;     
    }else{
         this.tisp=true;
    }
  },
  components: {
        alertC
    },
}
</script>

<style lang="less">
@import '../../common/css/car.less';
</style>
