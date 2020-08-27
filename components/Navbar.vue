<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand>
        <nuxt-link class="navbar-brand" to="/">TM</nuxt-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <nuxt-link class="nav-link" to="/tasks">Tasks</nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link class="nav-link" to="/projects">Projects</nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link class="nav-link" to="/users">Users</nuxt-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned ACCESS items -->

        <!-- Right aligned USER items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <strong>User</strong>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">My Tasks</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>