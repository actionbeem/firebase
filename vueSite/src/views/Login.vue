<template>
  <div class="login-form">
    <form action="">
      <input type="text" id="email" placeholder="email" v-model="email">
      <input type="password" id="password" placeholder="password" v-model="password">
      <input class="btn-login" type="submit" @click.prevent="loginSubmit" value="Login">
      <button class="btn-gl-login" @click.prevent="googleLogin">
        <img src="../assets/images/gl_logo.png" alt="구글아이디 로그인 버튼 이미지">
        <span>Sign in with Google</span>
      </button>
    </form>

  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    loginSubmit(){
      var self = this;
      if (this.loginExceptionHandler()) return true;

      return firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
        if (error.code === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(error.message);
        }
        console.log(error);
      }).then(function (user) {
        console.log(user, "has been logged");
        self.$store.commit('setUserInfo', user)
        self.$store.commit('setUserUid', user.user.uid )
        self.clearForm();
        // self.authRouter();
        self.$router.push({path : '/home'});
        // self.toastMessage(user.email + " just logged in");
      });
    },
    googleLogin(){      
      let auth = firebase.auth();
      let authProvider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(authProvider)
      let vm = this;

      auth.onAuthStateChanged(function(user){
        if(user){
          console.log('success');
          vm.$store.commit('setUserInfo', user)
          vm.$store.commit('setUserUid', user.uid )
          // vm.getMemoList();
        } else {
          console.log('error')
          auth.signInWithPopup(authProvider)
        }  
      });    
    },
    // getMemoList(){
    //   let database = firebase.database();
    //   let memoRef = database.ref('users/' + this.userInfo.uid)

    //   memoRef.set({
    //     name: this.name,
    //     age: this.age
    //   })

    //   memoRef.on('value',function(data){
    //     console.log(data.val())
    //   })
    //   memoRef.on('child_changed', this.onChildChanged )
    // },
    loginExceptionHandler() {
      if ( this.email === "" || this.password === "") {
        alert("enter the email and password");
        return true;
      }
      return false;
    },
    clearForm(){
      this.email = "";
      this.password = "";
    },
    createData(){

    },
    writePost(){
      this.$router.push('/write')
    }
  }
}
</script>

<style scoped>
.login-form { height:100vh; }
.login-form form { width:300px; padding:15px; background-color:#fff; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); box-shadow:0 0 30px rgba(0,0,0,0.05) }
.login-form form input,
.login-form form button { width:100%; font-size:15px; padding:15px; box-sizing:border-box; margin-bottom:10px; border-radius:3px;}
.login-form #email,
.login-form #password { background-color:#f6f6f6; }
.login-form .btn-login { background-color:#54c9ca; color:#fff;  margin-top:30px; cursor:pointer; }
.login-form .btn-gl-login { padding:10px 0; }
.login-form .btn-gl-login img { width:25px; vertical-align:middle; }
.login-form .btn-gl-login span { vertical-align:middle; margin-left:5px; font-size:14px;}
</style>
