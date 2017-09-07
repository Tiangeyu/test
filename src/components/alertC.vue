<template>
  <div class="alertC">
    <div class="al-block">
        <h3>{{title}}</h3>
    </div>
  </div>
</template>

<style lang="less" scoped>
    .alertC{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 110/200rem;
        z-index: 99999;
        text-align: center;
        .al-block{
            max-width: 580/200rem;
            padding: 15/200rem;
            border-radius: 7/200rem; 
            background: rgba(0, 0, 0, 0.6);
            display: inline-block;
        }
        h3{
            font-size: 32/200rem;
            color: #fff;
            text-align: center;
        }
    }
</style>

<script>
    export default{
        props:['title']             
    }
</script>