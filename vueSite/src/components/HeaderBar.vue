<template>
  <header class="header">
    <div class="inner-wrap clear">
      <p class="logo">J</p>
      <button class="btn-login" @click="login">
        <span>Login</span>
      </button>
    </div>
  </header>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default {
  methods: {
    login(){
      var database = firebase.database();
      console.log(database)
    }
  }
}
</script>

<style scoped>
.header { height:60px; box-shadow:0 5px 10px rgba(0,0,0,0.05) }
.header .logo { float:left; width:40px; height:40px; background-color:black; border-radius:50%; font-size:20px; color:#fff; line-height:45px; text-align:center; margin-top:10px; }
.header .btn-login { float:right; display:inline-block; width:70px; line-height:27px; border:1px solid cadetblue; color:cadetblue; border-radius:3px; cursor:pointer; margin-top:14px;}
.header .btn-login:hover { background-color:cadetblue; color:#fff; }
.header .btn-login span { font-size:15px; }
</style>
