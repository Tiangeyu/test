<template>
    <footer>
        <ul ref="footerUl">
            <li>
                <router-link to="/index">
                    <dl :class="{actice: homes}">
                        <dd class="home"></dd>
                        <dt>首页</dt>
                    </dl>
                </router-link>
                
            </li>
            <li>
                <router-link to="/car">
                     <dl :class="{actice: shopping}">
                        <dd class="shopping">
                        </dd>
                        <dt>购物车</dt>
                    </dl>
                    <div class="numbers" v-show="numberShow">{{numberss}}</div>
                </router-link>              
            </li>
            <li>
                <router-link to="/user">
                    <dl :class="{actice: mines}">
                        <dd class="mine"></dd>
                        <dt>我的</dt>
                    </dl>
                </router-link>            
            </li>
        </ul>
    </footer>
</template>

<style lang="less" scoped>
    footer{
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        height: 98/200rem/1.17rem;
        background: #fff;
        ul{
            border-top: 1px solid #e1e1e1;
            display: flex;
            li{
                position: relative;  
                a{
                    display: block;
                }
                width: 33.3%;
                height: 98/200rem/1.17rem;
                dd{
                    margin: 0 auto;  
                    margin-top: 10/200rem/1.17rem;                
                    background-size: 100%;
                    background-position: left center;
                    height: 50/200rem/1.17rem;
                    background-repeat: no-repeat;                  
                }
                .numbers{
                    position: absolute;
                    left: 54%;
                    top: 8/200rem/1.17rem;
                    width: 24/200rem/1.17rem;
                    height: 24/200rem/1.17rem;
                    border-radius: 100%;
                    background: #ff0000;
                    font-size: 18/200rem/1.17rem; 
                    text-align: center;
                    color: #fff;
                    line-height: 24/200rem/1.17rem;
                }  
                .home{
                    width: 46/200rem/1.17rem;
                    background-image: url('../../common/imgs/home_smalllogo.png');
                }
                .actice .home{
                    background-image: url('../../common/imgs/active-home.png');
                }
                .shopping{
                    width: 43/200rem/1.17rem;
                    background-image: url('../../common/imgs/shopping_cart.png');
                }
                .actice .shopping{
                    background-image: url('../../common/imgs/active-shopping.png');
                }
                .mine{
                    width: 29/200rem/1.17rem;
                    background-image: url('../../common/imgs/user.png');
                }
                .actice .mine{
                    background-image: url('../../common/imgs/active-user.png');
                }
                dt{
                    font-size: 20/200/1.17rem;
                    color: #333;
                    text-align: center;
                }
                .actice dt{
                    color: #aa9874;
                }
            }
        }
    }
</style>

<script>
    import Vue from 'vue'
    export default{
        data(){
            return{
                homes: false,
                shopping: false,
                mines: false,
                numberss: 0,
                picUrl: window.sessionStorage.getItem('picUrl'),
                wxCustomerId: window.sessionStorage.getItem('wxCustomerId'),
                numberShow: false
            }
        },
        created(){    
            this.$http.get('/eb-wxshop/wxshop/customer/queryShopCarNum',{params:{customerId: this.wxCustomerId}}).then(function(res){
                this.numberss = res.body.shopCarNum;
                if(this.numberss > 0){
                    this.numberShow = true;
                }
            })       
        },
        mounted() {
            // console.log(this.$route)
            if(this.$route.path == '/index'){
                this.homes = true
            }else if(this.$route.path == '/shopping'){
                this.shopping = true
            }else{
                this.mines = true
            }
        }
    }
</script>
