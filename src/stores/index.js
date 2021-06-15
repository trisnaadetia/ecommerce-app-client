import Vue from 'vue'
import Vuex from 'vuex'
import baseUrl from '../axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    listProduct: [],
    listBanner: [],
    dataLogin: '',
    listCart: []
  },
  mutations: {
    setListProduct (state, payload) {
      state.listProduct = payload
    },
    setListBanner (state, payload) {
      state.listBanner = payload
    },
    setDataLogin (state, payload) {
      state.dataLogin = payload
    },
    setListCart (state, payload) {
      state.listCart = payload
    }
  },
  actions: {
    fetchData (context) {
      baseUrl({
        method: 'GET',
        url: '/products'
      })
        .then(({ data }) => {
          context.commit('setListProduct', data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fetchBanner (context) {
      baseUrl({
        method: 'GET',
        url: '/banners'
      })
        .then(({ data }) => {
          context.commit('setListBanner', data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    register (context, data) {
      return baseUrl({
        method: 'POST',
        url: '/register',
        data: {
          username: data.username,
          email: data.email,
          password: data.password
        }
      })
    },
    login (context, data) {
      return baseUrl({
        method: 'POST',
        url: '/login',
        data: {
          email: data.email,
          password: data.password
        }
      })
    },
    fetchCart (context, data) {
      baseUrl({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({ data }) => {
        context.commit('setListCart', data)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    postCart (context, id) {
      return baseUrl({
        method: 'POST',
        url: '/carts',
        data: {
          ProductId: id
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    checkout (context) {
      return baseUrl({
        method: 'PATCH',
        url: '/carts',
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    delCartProduct (context, payload) {
      const { CartId, ProductId } = payload
      return baseUrl({
        method: 'DELETE',
        url: '/carts',
        data: {
          CartId,
          ProductId 
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
    }
  }
})

export default store
