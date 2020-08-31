<template>
  <div class="container">
    <div class="row justify-content-center">
      <h2>Welcome back!</h2>
    </div>
    <b-form @submit.prevent="login">
      <b-form-group description="We'll never share your email with anyone else.">
        <b-form-input type="email" required placeholder="Email" v-model.trim="form.email"></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input type="password" required placeholder="Password" v-model="form.password"></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>

    <div class="row justify-content-center" style="margin-top: 20px">
      <p>Don't have an account?</p>&nbsp;
      <nuxt-link to="/register">Register</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.form,
        });
        console.log(response);
      } catch (err) {
        console.error(err.message);
      }

      this.$router.push("/");
    },
  },
};
</script>