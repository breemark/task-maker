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
    <hr />

    <div
      v-for="(task, index) in tasks"
      :key="index"
      class="bg-light mt-5 mb-5"
      style="padding:20px; border-radius:25px;"
    >
      <h2>
        <nuxt-link :to="{name: 'tasks-id', params: {id: task.id}}">{{task.title}}</nuxt-link>
      </h2>
      <p>{{task.content}}</p>
    </div>

    <nav>
      <ul class="pagination justify-content-center">
        <li v-for="(value, key) in links" :key="key" class="page-item">
          <a @click="loadMore(value)" href="#" class="page-link">{{key}}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      tasks: [],
      links: [],
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
};
</script>

<style>
</style>