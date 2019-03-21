import Vue from 'vue'
import VueRouter from 'vue-router'
import WritePost from '../views/WritePost.vue'
import Login from '../views/Login.vue'
import PostList from '../views/PostList.vue'
import PostView from '../views/PostView.vue'

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: PostList
    },
    {
      path: '/login',
      component: Login
    },
    {
      name: 'write',
      path: '/write',
      component: WritePost,
      props: true
    },
    {
      path: '/post/:uid/:key',
      component: PostView
    },
  ],
});