<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand to="/">TM</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="authenticated">
          <b-nav-item to="/tasks">Tasks</b-nav-item>
          <b-nav-item v-if="user.is_admin == true" to="/projects"
            >Projects</b-nav-item
          >
          <b-nav-item v-if="user.is_admin == true" to="/users"
            >Users</b-nav-item
          >
        </b-navbar-nav>

        <b-navbar-nav v-if="authenticated" class="ml-auto">
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <strong>{{ user.name }}</strong>
            </template>
            <b-dropdown-item to="/me">Profile</b-dropdown-item>

            <b-dropdown-item @click.prevent="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav v-else class="ml-auto">
          <b-nav-item to="/login">Login</b-nav-item>
          <b-nav-item to="/register">Register</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$auth.logout();

      this.$router.push(`/`);
    },
  },
};
</script>

<style>
</style>