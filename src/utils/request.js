import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'

const $axios = axios.create({
  // baseURL: process.env.BASE_API,
  baseURL: 'https://nei.netease.com/api/apimock-v2/e87739b244ae3706efa082ed6c8070b0',
  timeout: 5000
})


export {$axios}
