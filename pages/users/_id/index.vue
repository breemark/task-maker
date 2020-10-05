<template>
  <div class="container" v-if="employee">
    <div class="row">
      <div class="col">
        <h2 class="display-4">{{ employee.name }}</h2>
        <hr />
      </div>
    </div>
    <div class="row" v-if="employee.email">
      <div class="col-md-2">
        <strong>User Email:</strong>
      </div>
      <div class="col-md">
        <p>{{ employee.email }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-2">
        <strong>Role:</strong>
      </div>
      <div class="col-md">
        <p>{{ employee.is_admin ? "Administrator 🔑" : "User 👤" }}</p>
      </div>
    </div>

    <div v-if="authenticated">
      <div class="row justify-content-center" v-if="user.is_admin == true">
        <div class="col-md-2">
          <nuxt-link
            :to="{ name: `users-id-edit`, params: { id: employee.id } }"
          >
            <b-button block variant="outline-info">Edit User</b-button>
          </nuxt-link>
        </div>
        <div class="col-md-2" v-if="user.id != employee.id">
          <b-button
            @click="deleteUser(employee.id)"
            block
            variant="outline-danger"
            >Delete User</b-button
          >
        </div>
        <div class="col-md-2">
          <nuxt-link to="/users">
            <b-button block variant="outline-dark">Back to Users</b-button>
          </nuxt-link>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import Assign from "@/components/Assign";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },

  methods: {
    ...mapActions("users", ["deleteUserAction"]),

    async deleteUser(id) {
      this.deleteUserAction(id);
      this.$router.push(`/users/`);
    },
  },
  computed: {
    ...mapGetters("users", ["getUserById"]),

    employee() {
      return this.getUserById(this.$route.params.id);
    },

    rows() {
      return this.getTasksByProject.length;
    },
  },
};
</script>

<style>
a {
  text-decoration: none !important;
}
</style>