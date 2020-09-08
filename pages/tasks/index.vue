<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="title">Tasks</h1>
      </div>
      <div class="col">
        <nuxt-link class="btn btn-lg btn-outline-success float-right" to="/tasks/create">Create Task</nuxt-link>
      </div>
    </div>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="tasks-table"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>
    <b-table
      id="tasks-table"
      striped
      hover
      :items="tasks"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      responsive
    ></b-table>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      tasks: [],
      // links: [],
      fields: [
        {
          key: "title",
          sortable: true,
        },
        // {
        //   key: "content",
        //   sortable: true,
        // },
        {
          key: "deadline",
          sortable: true,
        },
        {
          key: "project_id",
          sortable: true,
        },
        {
          key: "finished",
          sortable: true,
        },
      ],
    };
  },
  async asyncData({ $axios }) {
    let { data, links } = await $axios.$get("/tasks");
    return {
      tasks: data,
      links,
    };
  },
  methods: {
    async loadMore(value) {
      let { data } = await this.$axios.$get(value);
      return (this.tasks = { ...this.tasks, ...data });
    },
  },
  computed: {
    rows() {
      return this.tasks.length;
    },
  },
};
</script>

<style>
</style>