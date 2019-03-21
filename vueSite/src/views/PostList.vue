<template>
  <section class="post-wrap">
    <ul class="post-list clear">
      <template v-for="(data, uid, idx) in userDataList[0]">
        <li v-for="(post, key) in data">
          <div class="inner">
            <router-link v-bind:to="`/post/${uid}/${key}`">
              <p class="thumb"></p>
            </router-link>
            <h2 class="tit">{{ post.title }}</h2>
            <p class="txt">
              {{ post.text }}
            </p>
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
    const self = this;
    userDB.on('value',function(snapshot){
      let users = snapshot.val();
      self.userDataList.push(users)
    })
  },
}
</script>

<style>
.post-list { width:1130px; margin:100px auto; }
.post-list li { width:33.33%; float:left; padding:15px; box-sizing:border-box; }
.post-list li .inner { background-color:#fff; padding:15px; box-shadow:0 10px 15px rgba(0,0,0,0.05) }
.post-list li .thumb { height:180px; background-color:#333;} 
.post-list li .tit { font-size:16px; margin:20px 0 10px; }
.post-list li .txt { font-size:14px; height:36px; line-height:18px; overflow-y:hidden; text-overflow:ellipsis;  }
</style>
