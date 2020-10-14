<template>
  <div class="container">
    <div class="row">
      <h1 class="title">Register User</h1>
    </div>
    <br />
    <div>
      <b-form @submit.prevent="create">
        <b-form-group label="Name:">
          <b-form-input
            v-model="form.name"
            required
            placeholder="Enter user name"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Email:">
          <b-form-input
            type="email"
            required
            placeholder="Email"
            v-model.trim="form.email"
          ></b-form-input>
          <small class="form-text text-danger" v-if="errors.email">{{
            errors.email[0]
          }}</small>
        </b-form-group>

        <b-form-group>
          <b-form-checkbox v-model="form.is_admin" value="1" unchecked-value
            >Grant Administrative Permissions 🔑</b-form-checkbox
          >
        </b-form-group>

        <b-button type="submit" variant="primary btn-lg">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {

  middleware: ["auth", "admin"],

  data() {
    return {
      form: {
        name: "",
        email: "",
        is_admin: false,
      },
    };
  },
  methods: {
    ...mapActions("users",["addUserAction"]),


    async create() {
      let userId = await this.addUserAction(this.form);
      return this.$router.push(`/users/${userId}`);
    },
  },
};
</script>

