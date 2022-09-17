import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: []
  },

  mutations: {
    setItems (state, payload) {
      state.items = payload
    },

    addItem (state, payload) {
      state.items.push(payload)
    },

    deleteItem (state, payload) {
      state.items = state.items.filter(state => state.id !== payload.id)
    },

    updateItem (state, payload) {
      const items = state.items.map(item => {
        if (item.id === payload.id) {
          return payload
        }
        return item
      })
      state.items = items
    }
  },

  actions: {
    setItems (state, payload) {
      state.commit('setItems', payload)
    },

    addItem (state, payload) {
      state.commit('addItem', payload)
    },

    deleteItem (state, payload) {
      state.commit('deleteItem', payload)
    },

    updateItem (state, payload) {
      state.commit('updateItem', payload)
    }
  },

  getters: {
    getItems: state => state.items
  }
})
