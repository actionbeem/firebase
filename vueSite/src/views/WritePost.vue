<template>
  <div class="write-post">
    <div class="inner-wrap">
      <template v-if="editStatus">
        <section class="top">
          <h1 class="tit">글 수정</h1>
          <h2 class="sub">글을 수정해주세요.</h2>
        </section>
      </template>
      <template v-else>
        <section class="top">
          <h1 class="tit">새로운 글 쓰기</h1>
          <h2 class="sub">자유롭게 글을 작성해주세요.</h2>
        </section>
      </template>
      <section class="form">
        <input class="tit" type="text" placeholder="제목" v-model="title">
        <input class="sub" type="text" placeholder="원본 링크 첨부" v-model="link">
        <!-- <textarea class="txtarea" v-model="text"></textarea> -->

        <textarea name="smartEditor" id="smartEditor" ref="smartEditor" rows="10" cols="100" value="스마트 에디터"></textarea>

        <div class="upload-wrap clear">
          <div class="btn-wrap">
            <label for="btn-upload">썸네일 첨부</label>
            <input type="file" id="btn-upload" @change="onFileChange">
          </div>
          <div class="img-wrap">
            <img class="img-preview" :src="thumbImg" v-model="thumbImg"/>
            <!-- <button @click="removeImage">Remove image</button> -->
          </div>
        </div>


        <div class="clear">
          <button v-if="editStatus" class="btn-submit" @click.prevent="editPost">
            <span>수정 완료</span>
          </button>
          <button v-else class="btn-submit" @click.prevent="writePost">
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
import $ from 'jquery'

let database, userRef, userUid, userKey, today;
let oEditors = [];

export default {
  data() {
    return {
      title: "",
      link: "",
      // text: "",
      writeDate: "",
      thumbImg: "",
      editorValue: "",
      editStatus: false,
    }
  },
  methods:{
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      const image = new Image();
      const reader = new FileReader();
      const vm = this;

      reader.onload = e => vm.thumbImg = e.target.result;
      reader.readAsDataURL(file);
    },
    removeImage(e) {
      this.thumbImg = '';
    },

    writePost(){
      this.getDate();
      this.getEditorValue();
      userRef.push({
        title: this.title,
        link: this.link,
        // text: this.text,
        writeDate: this.writeDate,
        thumbImg: this.thumbImg,
        editorValue: this.editorValue,
      })

      this.$router.push('/home')
    },
    editPost(){
      this.getDate();
      this.getEditorValue();
      userRef.update({
        title: this.title,
        link: this.link,
        // text: this.text,
        writeDate: this.writeDate,
        thumbImg: this.thumbImg,
        editorValue: this.editorValue,
      })

      this.$router.push('/home')
    },
    getDate(){
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth()+1; //January is 0!
      let yyyy = today.getFullYear();

      if (dd < 10) {
        dd='0'+dd
      } 
      if (mm < 10) {
        mm='0'+mm
      } 

      today = yyyy+'-'+mm+'-'+dd;
      this.writeDate = today;
    },
    getEditorValue(){
      oEditors.getById["smartEditor"].exec("UPDATE_CONTENTS_FIELD", []);  
      let editorValue = this.$refs.smartEditor.value;

      this.editorValue = editorValue;
    },
  },
  created(){
    database = firebase.database();
    userRef = database.ref('users/' + this.$store.state.currentUserUid )
    userUid = this.$route.params.paramUid;
    userKey = this.$route.params.paramKey;

    if(userUid){
      this.editStatus = true;
      userRef = database.ref(`users/${userUid}/${userKey}`)
      userRef.once('value').then(snapshot => {
        this.title = snapshot.val().title;
        this.link = snapshot.val().link;
        // this.text = snapshot.val().text;
        this.thumbImg = snapshot.val().thumbImg;
        this.editorValue = snapshot.val().editorValue;
      });

    }

  },
  mounted(){
    let self = this;
    nhn.husky.EZCreator.createInIFrame({
      oAppRef: oEditors,
      elPlaceHolder: "smartEditor",
      sSkinURI: "./smarteditor/SmartEditor2Skin.html",
      fCreator: "createSEditor2",
      fOnAppLoad(){
		    oEditors.getById["smartEditor"].exec("PASTE_HTML", [self.editorValue]);
      }
    });

    
  }
}
</script>



<style>
.write-post { background-color:#eee; padding:50px 0;}
.write-post .top { margin-bottom:50px;}
.write-post .top .tit { font-size:30px; font-weight:normal; margin-bottom:6px; }
.write-post .top .sub { font-size:18px; font-weight:normal; color:#bbb; }
.write-post .form { background-color:#fff; padding:20px;  }
.write-post .form .tit { padding:15px; font-size:20px; width:100%; box-sizing:border-box; border:0; border-bottom:1px solid #e0e0e0; margin-bottom:10px; }
.write-post .form .sub { width:100%; font-size:15px; padding:12px 15px; border:0; border-bottom:1px solid #e0e0e0; box-sizing:border-box; margin-bottom:50px;}
.write-post .form .txtarea { width:100%; height:300px; border:0; font-size:14px; background-color:#f6f6f6; padding:15px; box-sizing:border-box; border-radius:4px; margin-bottom:30px; }
.write-post .form .btn-submit { float:right; width:160px; line-height:48px; background-color:#000; color:#fff; text-align:center; margin-top:20px;  }
.write-post .form .btn-submit span { font-size:16px; }

.upload-wrap { margin-top:40px; } 
.upload-wrap .btn-wrap { width:200px; float:left;  }
.upload-wrap .img-wrap { width:400px; float:left; }
.upload-wrap .btn-wrap label { display:inline-block; width:150px; text-align:center; line-height:44px; font-size:15px; background-color:#eee; color:#777; cursor:pointer; }
.upload-wrap .btn-wrap input { opacity:0; }
.upload-wrap .img-preview { width:100px; }


.btn-se { border:1px solid #e0e0e0; }
</style>
