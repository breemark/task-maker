<template>
  <div class="container">
    <div class="jumbotron">
      <div class="row">
        <div class="col-sm-2">
          <a href="https://www.instagram.com/gr55342/" target="_blank">
            <img id="landingLogo" src="~/assets/logo.png" />
          </a>
        </div>
        <div class="col-sm-5">
          <h1 id="landingTitle" class="mt-5 display-2">Task Maker</h1>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="lead ml-5">Manage your projects, employees and tasks.</p>
        </div>
      </div>
      <small class="float-right"
        >Made by
        <a href="http://torres93.com" target="_blank"
          >Maximiliano Torres</a
        >
      </small>
      <hr class="my-4" />

      <p class="lead mt-5">
        <nuxt-link
          to="/register"
          class="btn btn-primary btn-block btn-lg"
          role="button"
        >
          Create an Account
        </nuxt-link>
        <nuxt-link
          to="/login"
          class="btn btn-success btn-block btn-lg"
          role="button"
        >
          Access the System
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#landingLogo {
  height: 20vh;
  float: left;
}

@media (max-width: 991px) {
  #landingTitle {
    font-size: 40px;
    font-weight: bold;
    float: center;
  }
  #landingLogo {
    height: 220px;

    float: center !important;
  }
}
</style>