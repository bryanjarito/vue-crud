<template>
  <b-container>
    <h1 class="text-center my-4">List of News</h1>

    <router-link to="/add-item">
      <b-icon icon="plus-circle"></b-icon> Add News
    </router-link>

    <b-row class="justify-content-md-center mt-3">
      <b-col>
        <b-table
          responsive
          striped
          hover
          id="item-table"
          :fields="fields"
          :items="items"
          :per-page="perPage"
          :current-page="currentPage"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          show-empty
        >
          <template #cell(content)="data">
            {{ data.item.content }}
          </template>

          <template #cell(date)="data">
            {{ data.item.date | moment("MMMM D, YYYY") }}
          </template>

          <template #cell(actions)="data">
            <b-button
              pill
              variant="primary"
              class="me-3"
              @click="editItem(data.item.id)"
            >
              <b-icon icon="pencil"></b-icon> Edit
            </b-button>
            <b-button
              pill
              variant="danger"
              @click="confirmDelete(data.item.id)"
              ref="confirmDelete"
            >
              <b-icon icon="trash"></b-icon> Delete
            </b-button>
          </template>
        </b-table>

        <b-pagination
          v-model="currentPage"
          v-show="items.length > 0"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="item-table"
        >
        </b-pagination>

      </b-col>
    </b-row>

    <b-modal id="confirmation" @ok="deleteItem">
      Are you sure you want to delete <span class="text-primary">{{ item.title }}</span>?
    </b-modal>
  </b-container>
</template>

<script>
export default {
  name: 'Items',
  data () {
    return {
      fields: ['title', 'content', 'date', 'actions'],
      defaultItems: [
        {
          id: 1,
          title: 'Lorem ipsum',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur nisi lacus, a tincidunt nisl suscipit venenatis. Vestibulum semper ultrices malesuada. Praesent eu nibh in magna aliquam bibendum at et ligula. Sed ornare turpis in sem blandit, et…',
          date: '2022-09-07'
        }
      ],
      item: {},
      sortBy: 'age',
      sortDesc: false,
      perPage: 3,
      currentPage: 1
    }
  },

  computed: {
    items () {
      return this.$store.getters.getItems
    },

    rows () {
      return this.items.length
    }
  },

  methods: {
    confirmDelete (id) {
      this.item = this.items.find((item) => item.id === id)
      this.$root.$emit('bv::show::modal', 'confirmation', '#confirmDelete')
    },

    async deleteItem () {
      await this.$store.dispatch('deleteItem', this.item)
    },

    editItem (id) {
      this.$router.push({ path: `/item/${id}` })
    }
  }
}
</script>

<style>
td:nth-child(2) {
  width: 38em;
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
