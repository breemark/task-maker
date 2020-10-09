<template>
  <div class="container-fluid">
    <div>
      <br />
      <div v-if="authenticated">
        <Dashboard />
      </div>
      <div v-else>
        <LandingPage />
      </div>
    </div>
  </div>
</template>

<script>
import Dashboard from "~/components/Dashboard";
import LandingPage from "~/components/LandingPage";

export default {
  components: {
    Dashboard,
  },
};
</script>
