import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue';
import CustomerList from '@/components/page/CustomerList.vue'
import CustomerForm from '@/components/page/CustomerForm.vue';
import CustomerDetail from '@/components/page/CustomerDetail.vue';
import LoginForm from '@/components/page/LoginForm.vue';
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: HomeView,
  },
  {
    path:'/login',
    component: LoginForm
  },
  {
    path: '/customers',
    name: 'customers',
    component: CustomerList
  },
  {
    path: '/add-customer',
    component: CustomerForm,
  },
  {
    path: '/customer/:id',
    component: CustomerDetail,
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
