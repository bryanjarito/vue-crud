<template>
  <b-container>
    <h1 class="text-center my-4">Edit News</h1>
    <router-link to="/">
      <b-icon icon="arrow-left-circle"></b-icon> Back to list of news
    </router-link>
    <b-alert
      :show="dangerDismissCountDown"
      dismissible
      variant="danger"
      @dismissed="dangerDismissCountDown=0"
      @dismiss-count-down="dangerCountDownChanged"
    >
      News title <span class="text-danger">"{{ remarkTitle }}"</span> already used. Please enter a unique one.
    </b-alert>
    <b-alert
      :show="successDismissCountDown"
      dismissible
      variant="primary"
      @dismissed="successDismissCountDown=0"
      @dismiss-count-down="successCountDownChanged"
    >
      News <span class="text-info">{{ remarkTitle }}</span> has been updated.
    </b-alert>
    <Form
      :id="id"
      @action="updateItem"
    ></Form>
  </b-container>
</template>

<script>
import Form from './Form'

export default {
  name: 'AddItem',
  components: {
    Form
  },
  data () {
    return {
      title: '',
      content: '',
      date: '',
      remarkTitle: '',
      dismissSecs: 10,
      dangerDismissCountDown: 0,
      successDismissCountDown: 0,
      submitStatus: false
    }
  },

  computed: {
    items () {
      return this.$store.getters.getItems
    },

    id () {
      return this.$route.params.id
    }
  },

  methods: {
    async updateItem (item) {
      this.remarkTitle = item.title
      await this.$store.dispatch('updateItem', item)
      this.showSuccessAlert()
    },

    dangerCountDownChanged (dangerDismissCountDown) {
      this.dangerDismissCountDown = dangerDismissCountDown
    },

    successCountDownChanged (successDismissCountDown) {
      this.successDismissCountDown = successDismissCountDown
    },

    showDangerAlert () {
      this.dangerDismissCountDown = this.dismissSecs
    },

    showSuccessAlert () {
      this.successDismissCountDown = this.dismissSecs
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}
button.close {
  background: transparent;
  border: 0;
  position: absolute;
  right: 10px;
  top: 4px;
  font-size: 26px;
}
</style>
