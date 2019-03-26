<template>
  <div class="post-view">
    <h1 class="tit">{{ onePost.title }}</h1>
    <p class="date">작성일 : {{ onePost.writeDate }} </p>
    <div class="inner">
      <div class="link-wrap">
        <span>원본 링크 : </span><a class="link" :href="onePost.link" target="blank">{{ onePost.link }}</a>
      </div>

      <!-- <p class="text" style="margin-bottom:20px;">{{ onePost.text }}</p> -->
      <div class="text"><p v-html="onePost.editorValue"></p></div>
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
      this.$router.push({ name:"write" , params: { "paramUid" : paramUid, "paramKey" : paramKey } })
    }
  },
  created(){
    database = firebase.database();
    paramUid = this.$route.params.uid;
    paramKey = this.$route.params.key;
    userRef = database.ref(`users/${paramUid}/${paramKey}`)

    userRef.on('value', snapshot => {
      this.onePost = snapshot.val();
    })

    if( paramUid === this.$store.state.currentUserUid ) {
      this.btnEdit = true;
    }
  }
}
</script>

<style scoped>
.post-view { width:1100px; margin:0 auto; }
.post-view .inner {  padding:40px 30px; background-color:#fff; box-shadow:0 10px 15px rgba(0,0,0,0.05); margin-bottom:50px; }
.post-view .link-wrap { margin-bottom:50px; }
.post-view .link-wrap span { font-size:16px; color:#333;}
.post-view .tit { font-size:24px; margin:50px 0 10px; }
.post-view .date { font-size:16px; color:#bbb; margin-bottom:30px; }
.post-view .link { display:inline-block; font-size:16px; color:cornflowerblue; margin-bottom:15px;  }
.post-view .text { font-size:14px; }
.post-view .btn-wrap { margin-bottom:100px; }
.post-view .btn-wrap button { float:right; display:inline-block; width:100px; line-height:40px; text-align:center; margin-left:10px; }
.post-view .btn-wrap button span { font-size:16px; }
.post-view .btn-wrap button.btn-delete { border:1px solid #555; background-color:#555; color:#fff; }
.post-view .btn-wrap button.btn-edit { border:1px solid #555; background-color:#fff; color:#555; }
</style>
