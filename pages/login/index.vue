<template>
  <div class="container">
    <div class="row justify-content-center">
      <h2>Login</h2>
    </div>
    <br />
    <b-form @submit.prevent="login">
      <b-form-group description="We'll never share your email with anyone else.">
        <b-form-input type="email" required placeholder="Email" v-model.trim="form.email"></b-form-input>
        <small class="form-text text-danger" v-if="errors.email">{{errors.email[0]}}</small>
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
  middleware: ["guest"],
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$auth
        .loginWith("local", {
          data: {
            email: this.form.email,
            password: this.form.password,
          },
        })
        .then((data) => {
          console.log(data);
          this.$router.push("/me");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>