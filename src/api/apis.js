import axios from 'axios'
axios.defaults.baseURL = 'http://192.168.137.1:5000'

// 1. 获取商品数据
export const goodslist = () => axios.get('/goods/goods_list')

// 2. 获取商家
export const shopseller = () => axios.get('/shop/seller')

// 3. 获取评价数据
export const shopratings = () => axios.get('/shop/ratings')