<template>
  <div class="write-post">
    <div class="inner-wrap">
      <section class="top">
        <h1 class="tit">새로운 글 쓰기</h1>
        <h2 class="sub">자유롭게 글을 작성해주세요.</h2>
      </section>
      <section class="form">
        <input class="tit" type="text" placeholder="제목" v-model="title">
        <input class="sub" type="text" placeholder="원본 링크 첨부" v-model="link">
        <textarea class="txtarea" v-model="text"></textarea>

        <div class="clear">
          <button class="btn-submit" @click.prevent="editPostSubmit">
            <span>확인</span>
          </button>
        </div>

      </section>
    </div>

  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default {
  data() {
    return {
      title: "",
      link: "",
      text: "",
    }
  },
  methods:{
    editPostSubmit(){
      let database = firebase.database();
      let userRef = database.ref('users/' + this.$store.state.currentUserUid )

      userRef.push({
        title: this.title,
        link: this.link,
        text: this.text,
        // writeDate: Date().now(),
      })

      this.$router.push('/home')

      userRef.on('value',function(data){
        console.log(data.val())
      })
    },
  },
  created(){
    console.log('hola')
  }
}
</script>

<style scoped>
.write-post { background-color:#eee; padding:50px 0;}
.write-post .top { margin-bottom:50px;}
.write-post .top .tit { font-size:30px; font-weight:normal; margin-bottom:6px; }
.write-post .top .sub { font-size:18px; font-weight:normal; color:#bbb; }
.write-post .form { background-color:#fff; padding:20px;  }
.write-post .form .tit { padding:15px; font-size:20px; width:100%; box-sizing:border-box; border:0; border-bottom:1px solid #e0e0e0; margin-bottom:10px; }
.write-post .form .sub { width:100%; font-size:15px; padding:12px 15px; border:0; border-bottom:1px solid #e0e0e0; box-sizing:border-box; margin-bottom:50px;}
.write-post .form .txtarea { width:100%; height:300px; border:0; font-size:14px; background-color:#f6f6f6; padding:15px; box-sizing:border-box; border-radius:4px;  }
.write-post .form .btn-submit { float:right; width:160px; line-height:48px; background-color:#000; color:#fff; text-align:center; margin-top:20px;  }
.write-post .form .btn-submit span { font-size:16px; }
</style>
