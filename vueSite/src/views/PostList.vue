<template>
  <section class="post-wrap">
    <ul class="post-list clear">
      <template v-for="(data, uid, idx) in userDataList[0]">
        <li v-for="(post, key) in data">
          <div class="inner">
            <router-link v-bind:to="`/post/${uid}/${key}`">
              <!-- <p class="thumb"></p> -->
              <div class="thumbImg" :style="`background:url(${post.thumbImg}) no-repeat center; background-size:cover;`"></div>
              <h2 class="tit">{{ post.title }}</h2>
              <h2 class="sub-text" v-html="post.editorValue"></h2>
              <!-- <p class="txt">{{ post.text }}</p> -->
            </router-link>
          </div>
        </li>
      </template>
    </ul>
  </section>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import PostView from './PostView.vue'

export default {
  data() {
    return {
      userDataList: [],
    }
  },
  created(){
    const userDB = firebase.database().ref('/users');
    userDB.on('value', snapshot => {
      let users = snapshot.val();
      this.userDataList.push(users)
    })
  },
}
</script>

<style>
.post-list { width:1130px; margin:50px auto; }
.post-list li { width:33.33%; float:left; padding:15px; box-sizing:border-box; }
.post-list li .inner { background-color:#fff; padding:15px; box-shadow:0 10px 15px rgba(0,0,0,0.05) }
.post-list li .thumb { height:180px; background-color:#333;} 
.post-list li .thumbImg { width:100%; height:150px; } 
.post-list li .tit { font-size:16px; margin:20px 0 10px; }
/* .post-list li .txt { font-size:14px; height:36px; line-height:18px; overflow-y:hidden; text-overflow:ellipsis;  } */
.post-list .sub-text { font-size:14px; height:36px; line-height:18px; overflow-y:hidden; text-overflow:ellipsis;  }
.post-list .sub-text p,
.post-list .sub-text span,
.post-list .sub-text p a,
.post-list .sub-text span a
 { font-size:14px !important; line-height:19px !important; color:#aaa !important; font-weight:normal !important; margin-top:0 !important; }
</style>
