<template>
  <div class="container">
    <div class="row justify-content-center">
      <h2 class>Register</h2>
    </div>
    <br />

<!-- 
    <b-form @submit.prevent="register">
      <b-form-group>
        <b-form-input type="text" required placeholder="Name" v-model="name"></b-form-input>
      </b-form-group>

      <b-form-group description="We'll never share your email with anyone else.">
        <b-form-input type="email" required placeholder="Email" v-model="email"></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input type="password" required placeholder="Password" v-model="password"></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          type="password"
          required
          placeholder="Confirm password"
          v-model="password_confirm"
        ></b-form-input>
      </b-form-group> -->

      <b-button type="submit" variant="primary">Register</b-button>
    </b-form>

    <div class="row justify-content-center" style="margin-top: 20px">
      <p>Already got an account?</p>&nbsp;
      <nuxt-link to="/login">Login</nuxt-link>
    </div>
  </div>
</template>

<script>

</script>