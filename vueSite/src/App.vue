<template>
  <div id="app">
    <header-bar></header-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue'

export default {
  name: 'app',
  components: {
    HeaderBar,
  }
}


</script>

<style>
body {margin:0px 0px 0px 0px; padding:0px 0px 0px 0px;overflow:auto;font-family:NotoSans,sans-serif; background-color:#f6f6f6;}
img {border:none; padding:0px; margin:0px; font-size:0px; line-height:0px; vertical-align:top;}
td	{color:#555; font-size:12px;line-height:1.2;}
ul,li {list-style:none; margin:0px; padding:0px;}
h1,h2,h3,h4,h5,h6,div,p,span,em,dl,dd,dt,span,em {padding:0px 0px 0px 0px; margin:0px 0px 0px 0px;font-size:12px;line-height:1.2; text-decoration:none;}
em {font-style:normal;}
button { background:none; outline-width:0; border:0; cursor:pointer; }
input, textarea { outline-width:0; border:0; background-color:#fff; }

A:link    {color:#635C5A;text-decoration:none;}
A:visited {color:#545454;text-decoration:none;}
A:hover  {color:#666;text-decoration:none;}

.inner-wrap { width:1100px; margin:0 auto; }
.clear:after { display:block; content:""; clear:both; }


</style>
