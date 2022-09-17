<template>
  <b-form @submit="action" @reset="onReset">
    <b-row class="mt-3">
      <b-col>
        <div
          class="form-group">
          <label for="title">Title</label>
          <b-form-input
            v-model.trim="$v.title.$model"
            id="title"
            ref="title"
            placeholder="Enter Title"
            :state="title === '' && !submitStatus ? null : !$v.title.$error"
            required
          >
          </b-form-input>
        </div>
        <div
          class="text-danger"
          v-if="$v.title.$error"
        >
          Title is required
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <div role="group">
          <label for="content">Content</label>
          <div>
            <b-form-textarea
              id="content"
              v-model="content"
              placeholder="Enter content..."
              rows="3"
              max-rows="6"
              :state="content === '' && !submitStatus ? null : !$v.content.$error"
              required
            >
            </b-form-textarea>
          </div>
          <div
            class="text-danger"
            v-if="$v.content.$error"
          >
            Content is required
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <div role="group">
          <div>
            <label for="date">Date</label>
            <b-form-datepicker
              id="date"
              v-model="date"
              :state="date === '' && !submitStatus ? null : !$v.date.$error"
              required
            >
            </b-form-datepicker>
          </div>
          <div
            class="text-danger"
            v-if="$v.date.$error"
          >
            Date is required
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center mt-3">
      <b-col>
        <b-button
          v-show="!itemId"
          type="submit"
          variant="primary"
          @click="action"
        >
          <b-icon icon="plus"></b-icon> Add Item
        </b-button>
        <b-button
          v-show="itemId"
          type="submit"
          variant="primary"
          @click="action"
        >
          <b-icon icon="pencil-square"></b-icon> Update Item
        </b-button>
        <b-button
          type="reset"
          variant="danger"
          @click="onReset"
        >
          <b-icon icon="arrow-clockwise"></b-icon> Reset
        </b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Form',
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

  props: {
    id: String
  },

  validations: {
    title: {
      required
    },

    content: {
      required
    },

    date: {
      required
    }
  },

  computed: {
    items () {
      return this.$store.getters.getItems
    },

    itemId () {
      return this.id
    }
  },

  mounted () {
    this.$refs.title.$el.focus()

    if (this.itemId) {
      const item = this.items.filter(i => i.id === parseInt(this.itemId))
      this.title = item[0].title
      this.content = item[0].content
      this.date = item[0].date
    }
  },

  methods: {
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
    },

    action (e) {
      e.preventDefault()
      this.$v.$touch()
      this.submitStatus = true
      if (!this.$v.title.$error && !this.$v.content.$error && !this.$v.date.$error) {
        const item = {
          'id': this.itemId ? this.items.length : this.items.length + 1,
          'title': this.title,
          'content': this.content,
          'date': this.date
        }
        this.$emit('action', item)
      }
    },

    onReset (event) {
      event.preventDefault()
      this.title = ''
      this.content = ''
      this.date = ''
      this.$refs.title.$el.focus()
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
