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
      <h2>{{task.title}}</h2>
      <p>{{task.content}}</p>
    </div>

  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      tasks: [],
    };
  },
  async asyncData({ $axios }) {
    let { data } = await $axios.$get("/tasks");
    // console.log(data);
    return {
      tasks: data,
    };
  },
};
</script>

<style>
</style>