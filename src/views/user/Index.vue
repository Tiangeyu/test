<template>
  <div>
    <sections></sections>
    <footers></footers>
  </div>
</template>
<script>
  import sections from './Section.vue'
  import footers from '../index/footer.vue'
  export default {
    components:{
      sections,
      footers
    },
    created() {
      document.body.style.backgroundColor = "#fff";
      document.title = "个人中心"
    } 
  }
</script>
