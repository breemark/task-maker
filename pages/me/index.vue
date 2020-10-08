<template>
  <section class="section">
    <div class="container">
      <h2 class="title">My Profile</h2>
      <hr />
      <div class="content">
        <p>
          <strong>Username:</strong>
          {{ user.name }}
        </p>
        <p>
          <strong>Role:</strong>
          {{ user.is_admin ? "Administrator 🔑" : "User 👤" }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ user.email }}
        </p>
      </div>
      <hr />
      <div class="row justify-content-center">
        <nuxt-link to="/me/edit">
          <b-button variant="primary">Edit Profile</b-button>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  middleware: ["auth"],
  methods: {},
};
</script>