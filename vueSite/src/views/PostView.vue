<template>
  <div class="post-view">
    <h1 class="tit">{{ onePost.title }}</h1>
    <p class="date">date : {{ onePost.writeDate }} </p>
    <div class="inner">
      <span>원본 링크 : </span><a class="link" :href="onePost.link" target="blank">{{ onePost.link }}</a>
      <p class="text">{{ onePost.text }}</p>
    </div>
    <div class="btn-wrap clear" v-if="btnEdit">
      <button class="btn-delete" @click="deletePost">
        <span>삭제</span>
      </button>
      <button class="btn-edit" @click="editPost">
        <span>수정</span>
      </button>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

let database, paramUid, paramKey, userRef;

export default {
  data() {
    return {
      onePost: {},
      btnEdit: false,
    }
  },
  methods: {
    deletePost(){
      userRef.remove();
      this.$router.push('/home')
    },
    editPost(){
      this.$router.push({ path: '/write' , params: { guid : 'editPost!'}, props: true })
    }
  },
  created(){
    database = firebase.database();
    paramUid = this.$route.params.uid;
    paramKey = this.$route.params.key;
    userRef = database.ref(`users/${paramUid}/${paramKey}`)
    let vm = this;

    userRef.on('value',function(snapshot){
      vm.onePost = snapshot.val();
    })

    if( paramUid === this.$store.state.currentUserUid ) {
      this.btnEdit = true;
    }
  }
}
</script>

<style scoped>
.post-view { width:1100px; margin:0 auto; }
.post-view .inner {  padding:40px 30px; background-color:#fff; box-shadow:0 10px 15px rgba(0,0,0,0.05); }
.post-view .tit { font-size:24px; margin:50px 0 10px; }
.post-view .date { font-size:16px; color:#bbb; margin-bottom:30px; }
.post-view .link { display:inline-block; font-size:16px; color:cornflowerblue; margin-bottom:15px;  }
.post-view .text { font-size:14px; }
.post-view .btn-wrap { margin-top:30px; }
.post-view .btn-wrap button { float:right; display:inline-block; width:100px; line-height:40px; text-align:center; border-radius:3px; margin-left:10px; }
.post-view .btn-wrap button span { font-size:16px; }
.post-view .btn-wrap button.btn-delete { border:1px solid #aaa; background-color:#aaa; color:#fff; }
.post-view .btn-wrap button.btn-edit { border:1px solid #aaa; background-color:#fff; color:#aaa; }
</style>
