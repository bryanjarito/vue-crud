import Vue from 'vue'
import Router from 'vue-router'
import Items from '@/components/Items'
import AddItem from '@/components/AddItem'
import EditItem from '@/components/EditItem'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Items',
      component: Items
    },
    {
      path: '/add-item',
      name: 'AddItem',
      component: AddItem
    },
    {
      path: '/item/:id',
      name: 'EditItem',
      component: EditItem
    }
  ]
})
