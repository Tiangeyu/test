<template>
  <div class="alertA" v-show="isShow">
    <div class="al-block">
        <h3>{{title}}</h3>
        <div class="al-button clearfix">
            <button class="fl" @click="okEnter">确认</button>
            <button class="fl" @click="cancleEnter" style="background:#000">取消</button>
        </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
    .alertA{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 99999;
        background: rgba(0, 0, 0, 0.3);
        .al-block{
            width: 580/200rem;
            height: 400/200rem;
            background: #fff;
            border-radius: 20/200rem; 
            margin: 0 auto;
            margin-top: 25vh;
        }
        h3{
            padding-top: 90/200rem;
            font-size: 32/200rem;
            color: #333;
            text-align: center;
        }
        .al-button{
            margin-top: 120/200rem;
            margin-left: 70/200rem;   
            button{
                background: #e93b39;
                width: 190/200rem;
                height: 80/200rem;
                font-size: 35/200rem;
                line-height: 80/200rem;
                text-align: center;
                margin-right: 46/200rem;
                color: #fff;
            }
           
        }
    }
</style>

<script>
    export default{
        props:['title',"isShow"],
        methods:{
            okEnter(){
                this.$emit("isOk")
            },
            cancleEnter(){
                this.$emit("isCancle")
            }
        }
    }
</script>