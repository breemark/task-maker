<template>
  <div class="container">
    <div class="row">
      <h2>Edit Task {{$route.params.id}}</h2>
    </div>
    <div>
      <form @submit.prevent="update">
        <div class="form-group mt-5">
          <input type="text" class="form-control" v-model="task.title" />
          <small v-if="errors.title" class="form-text text-danger">{{errors.title[0]}}</small>
        </div>
        <button class="btn btn-outline-success">Update</button>
      </form>
      <p class="mt-5 btn btn-outline-warning">
        <nuxt-link to="/tasks">Back to Tasks</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: {
        title: "",
      },
    };
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.$get(`/tasks/${params.id}`);
    return { task: data };
  },
  methods: {
    async update() {
      //
      await this.$axios.patch(`/tasks/${this.$route.params.id}`, {
        title: this.task.title,
      });
      // Redirect
      this.$router.push("/tasks");
    },
  },
};
</script>