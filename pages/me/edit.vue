<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h2>Edit Profile</h2>
      </div>
    </div>
    <div>
      <form @submit.prevent="update">
        <div class="form-group mt-2">
          <label>New Name</label>

          <input type="text" class="form-control" v-model="form.name" />
          <small v-if="errors.name" class="form-text text-danger">{{
            errors.name[0]
          }}</small>
        </div>

        <div class="form-group">
          <label>New Email</label>

          <input type="email" class="form-control" v-model="form.email" />
          <small v-if="errors.email" class="form-text text-danger">{{
            errors.email[0]
          }}</small>
        </div>

        <div class="form-group">
          <label>New Password</label>

          <input type="password" class="form-control" v-model="form.password" />
        </div>
        <div class="form-group">
          <label>Confirm Password</label>

          <input
            type="password"
            class="form-control"
            v-model="form.password_confirmation"
          />
          <small v-if="formErrors.password" class="form-text text-danger">{{
            formErrors.password
          }}</small>
        </div>

        <hr />

        <button class="btn btn-outline-success">Update</button>
      </form>
      <p class="mt-5 btn btn-outline-warning">
        <nuxt-link to="/me">Cancel</nuxt-link>
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
      formErrors: {
        password: "",
      },
      form: {},
    };
  },
  methods: {
    async update() {
      if (this.form.password != this.form.password_confirmation) {
        this.formErrors.password = "Password confirmation does not match";
        return;
      }

      await this.$axios.$put(`/auth/me`, this.form);

      this.$router.push(`/me`);
    },
  },
};
</script>