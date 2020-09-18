<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="title">👥 Users</h1>
      </div>
      <div class="col">
        <nuxt-link
          class="btn btn-lg btn-outline-success float-right"
          to="/users/create"
        >Register User</nuxt-link>
      </div>
    </div>
    <hr />

    <div
      v-for="(user, index) in users"
      :key="index"
      class="bg-light mt-5 mb-5"
      style="padding:20px; border-radius:25px;"
    >
      <h2>👤 {{user.name}}</h2>
      <h5>📧 {{user.email}}</h5>
      <p>{{user.is_admin ? 'Administrator ⭐': ''}}</p>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      users: [],
    };
  },
  async asyncData({ $axios }) {
    let { data } = await $axios.$get("/users");
    // console.log(data);
    return {
      users: data,
    };
  },
};
</script>

<style>
</style>