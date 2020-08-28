<template>
  <div class="container"> 
    <div class="row justify-content-center">
      <h2>Register</h2>
    </div>
    <br />
    <div>
      <b-form @submit="onSubmit">
        <b-form-group id="input-group-2" label="Name:" label-for="input-2">
          <b-form-input id="input-2" required placeholder="Name"></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-1"
          label="Email:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input id="input-1" type="email" required placeholder="Email"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Password:" label-for="input-3">
          <b-form-input type="password" id="input-2" required placeholder="Password"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Confirm password:" label-for="input-3">
          <b-form-input type="password" id="input-2" required placeholder="Password"></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>