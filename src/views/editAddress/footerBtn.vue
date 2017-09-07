<template>
  <section>
      <div class="btnDiv">
          <ul>
              <li @click="toDelete()"><a>删除地址</a></li>
              <li @click="toSave()"><a>保存</a></li>
          </ul>
      </div>
  </section>
</template>
<script>
export default {
    data(){
        return{
            Name:'',
            Phone:'',
            Location:'',
            Address:'',
            UserId:'',
            AddressId:'',
            wxCustomerId:window.sessionStorage.getItem('wxCustomerId'),
        }
    },
    methods:{
        //删除一个
        
        toDelete:function(){
            this.$http.get('/eb-wxshop/wxshop/customer/delAddress',{params:{addressId:this.$route.query.UserId}}).then((res)=>{
                // console.log(res.body)
                if(res.body.result=='000'){
                    this.userInfo.splice();
                    // console.log(res.body.result)
                }else{
                    alert(res.body.resultMsg)
                }
            })
        },
        toSave(){
            // var userId = this.$route.query.UserId;
            // var Name = this.Name
            // var Phone = this.Phone
            // var addressValue = this.addressValue;
            // var addLocation = this.addLocation
            var Name = this.Name;
            var Phone = this.Phone;
            var addressValue = this.Address;
            var Location = this.Location;
            var AddressId = this.AddressId;
            // console.log(Name+";"+Phone+";"+addressValue+";"+Location+';')
            this.$http.get('/eb-wxshop/wxshop/customer/updateAddress',{params:{customerId:this.wxCustomerId,addressId:AddressId,name:Name,mobile:Phone,province:addressValue,address:Location}}).then((res)=>{
                // if(res.body.result=='000'){     
                //     alert(1)
                //     this.$router.push('/address');
                // }else{
                //     alert(res.body.resultMsg)
                // }
            }).catch((res)=>{

            })
        }
    }
}
</script>
<style lang="less" scoped>
    .btnDiv{
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 97/200rem;
        border-top: 1px solid #e9e9e9;
        padding-top: 7/200rem;
        ul{
            margin: 0 auto;
            width: 650/200rem;
        }
        li{
            width: 325/200rem;
            float: left;
            a{  
                display: block;
                width: 325/200rem;
                height: 90/200rem;
                line-height: 90/200rem;
                background-color: #e93b39;
                color: #fff;
                font-size: 34/200rem; 
                text-align: center; 
            }
        }
        li:nth-child(1){
            a{
                background-color: #1a191e;
                border-bottom-left-radius: 4px;
                border-top-left-radius: 4px;
            }
        }li:nth-child(2){
            a{
                border-bottom-right-radius: 4px;
                border-top-right-radius: 4px;
            }
        }
    }
</style>

