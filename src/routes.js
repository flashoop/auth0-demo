import { createRouter, createWebHistory } from 'vue-router'
import { authenticate, getBackend,setToken } from './services/auth'
import {  HelloWorld } from './components/HelloWorld.vue'
import { Login } from './components/Login.vue'

/** @type {import('vue-router').RouterOptions['routes']} */

export const routes = [
  { path: '/login',component: Login},
  { path: '/',component: HelloWorld}  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach(async (to, from) => {
  if (
    // make sure the user is authenticated
    !authenticate() &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'Login'
  ) {
    
    if(to.path==`/connect/auth0/redirect`){
      //写入token
      const response = await fetch(`${getBackend()}/api/auth/auth0/callback${location.search}`);
      const data = await response.json();
      setToken(data)
      return { name: 'HelloWorld' }
    }else{
      // redirect the user to the login page
      return { name: 'Login' }
    }
  }
  
})

export default router