<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="title">Projects</h1>
      </div>
      <div class="col">
        <nuxt-link
          class="btn btn-lg btn-outline-success float-right"
          to="/projects/create"
        >Register Project</nuxt-link>
      </div>
    </div>
    <hr />

    <div
      v-for="(project, index) in projects"
      :key="index"
      class="bg-light mt-5 mb-5"
      style="padding:20px; border-radius:25px;"
    >
      <h2>📁 {{project.title}}</h2>
      <p>{{project.content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      projects: [],
    };
  },
  async asyncData({ $axios }) {
    let { data } = await $axios.$get("/projects");
    // console.log(data);
    return {
      projects: data,
    };
  },
};
</script>

<style>
</style>