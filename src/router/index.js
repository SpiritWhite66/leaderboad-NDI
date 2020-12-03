import Vue from 'vue'
import Router from 'vue-router'
import LeaderBoard from '@/components/LeaderBoard'
import Stream from '@/components/Stream'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LeaderBoard',
      component: LeaderBoard
    },
    {
      path: '/stream',
      name: 'StreamMode',
      component: Stream
    }
  ], 
  linkActiveClass: "active",
  linkExactActiveClass: "active",
})
