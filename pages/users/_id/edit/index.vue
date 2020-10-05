<template>
  <div class="container" v-if="userClone && employee">
    <div class="row">
      <h2>Edit User: {{ employee.name }}</h2>
    </div>
    <div>
      <form @submit.prevent="update">
        <div class="form-group mt-5">
          <label>User Name</label>

          <input type="text" class="form-control" v-model="userClone.name" />
          <small v-if="errors.name" class="form-text text-danger">{{
            errors.name[0]
          }}</small>
        </div>
        <div class="form-group">
          <label>Email</label>

          <input type="email" class="form-control" v-model="userClone.email" />
          <small v-if="errors.email" class="form-text text-danger">{{
            errors.email[0]
          }}</small>
        </div>
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            v-model="userClone.is_admin"
          />
          <label class="form-check-label"
            >Users has Administrator permissions</label
          >
          <small v-if="errors.is_admin" class="form-text text-danger">{{
            errors.is_admin[0]
          }}</small>
        </div>
        <hr />

        <button class="btn btn-outline-success">Update</button>
      </form>
      <p class="mt-5 btn btn-outline-warning">
        <nuxt-link to="/users">Back to Users</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      userClone: this.employee
        ? {
            ...this.employee,
          }
        : {
            name: "",
            email: "",
            is_admin: "",
          },
    };
  },
  methods: {
    ...mapActions("users", ["editUserAction"]),

    async update() {
      await this.editUserAction(this.userClone);

      this.$router.push(`/users/${this.employee.id}`);
    },
  },
  computed: {
    ...mapGetters("users", ["getUserById"]),

    employee() {
      return this.getUserById(this.$route.params.id);
    },
  },
  watch: {
    employee: function () {
      this.userClone = { ...this.employee };
    },
  },
  created() {
    this.userClone = this.employee
      ? {
          ...this.employee,
        }
      : {
          name: "",
          email: "",
          is_admin: "",
        };
  },
};
</script>