<template>
  <section class="section">
    <div class="container">
      <h2 class="title">My Profile</h2>
      <div class="content">
        <p>
          <strong>Username:</strong>
          {{ user.name }}
        </p>
        <p>
          <strong>Role:</strong>
          {{ isAdmin(user) }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ user.email }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  middleware: ["auth"],
  methods: {
    isAdmin(user) {
      if (user.is_admin) {
        return "Administrator";
      } else {
        return "User";
      }
    },
  },
};
</script>