<template>
  <div class="container">
    <div class="row justify-content-center">
      <h2>Register</h2>
    </div>
    <br />

    <b-form @submit.prevent="register">
      <b-form-group>
        <b-form-input type="text" required placeholder="Name" v-model="form.name"></b-form-input>
      </b-form-group>

      <b-form-group description="We'll never share your email with anyone else.">
        <b-form-input type="email" required placeholder="Email" v-model.trim="form.email"></b-form-input>
        <small class="form-text text-danger" v-if="errors.email">{{errors.email[0]}}</small>
      </b-form-group>

      <b-form-group>
        <b-form-input type="password" required placeholder="Password" v-model="form.password"></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          type="password"
          required
          placeholder="Confirm password"
          v-model="form.password_confirmation"
        ></b-form-input>
        <small class="form-text text-danger" v-if="errors.password">{{errors.password[0]}}</small>
      </b-form-group>

      <b-button type="submit" variant="primary">Register</b-button>
    </b-form>

    <div class="row justify-content-center" style="margin-top: 20px">
      <p>Already got an account?</p>&nbsp;
      <nuxt-link to="/login">Login</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["guest"],
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    register() {
      this.$axios
        .$post("auth/register", this.form)
        .then((data) => {
          // login
          this.$auth.loginWith("local", {
            data: {
              email: this.form.email,
              password: this.form.password,
            },
          });
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>