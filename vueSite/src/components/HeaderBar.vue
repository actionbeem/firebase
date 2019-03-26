<template>
  <header class="header">
    <div class="inner-wrap clear">
      <router-link to="/home">
        <p class="logo">J</p>
      </router-link>

      <div class="btn-wrap">
        <button class="btn-logout" @click="logOut" v-if="this.$store.state.currentUser">
          <span>Logout</span>
        </button>
        <button class="btn-login" @click="logIn" v-else>
          <span>Login</span>
        </button>
        
        <button class="btn-write" @click="writePost">
          <span>Write</span>
        </button> 
      </div>
    </div>
  </header>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default {
  methods: {
    logIn(){
      this.$router.push('/login')
    },
    logOut(){
      firebase.auth().signOut().then(() => {
        alert('로그아웃 되셨습니다.')
        this.$store.commit('logOut')
        this.$router.push('/home')
      }).catch(function(error){
        alert(error)
      });
    },
    writePost(){
      if(this.$store.state.currentUser){
        this.$router.push('/write')
      }else{
        alert('로그인을 해주세요.')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
.header { height:60px; box-shadow:0 5px 10px rgba(0,0,0,0.05); background-color:#fff; }
.header .logo { float:left; width:40px; height:40px; background-color:black; border-radius:50%; font-size:20px; color:#fff; line-height:45px; text-align:center; margin-top:10px; }
.header .btn-wrap { float:right; }
.header .btn-login,
.header .btn-logout,
.header .btn-write  { display:inline-block; width:70px; line-height:27px;  border-radius:3px; cursor:pointer; margin-top:14px;}
.header .btn-login  { color:rgb(21, 65, 66); }
.header .btn-logout { color:#bbb; } 
.header .btn-write  { border:1px solid #ffb11c; background-color:#ffb11c; color:#fff; margin-left:10px;}
/* .header .btn-login:hover { border-color:rgb(21, 65, 66); color:rgb(21, 65, 66); } */
/* .header .btn-write:hover { border-color:#c78404; background-color:#c78404; } */
.header .btn-write span,
.header .btn-login span,
.header .btn-logout span { font-size:15px; }
</style>
