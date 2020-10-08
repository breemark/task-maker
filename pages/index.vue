<template>
  <div class="container">
    <div>
      <h1 class="title">Task Maker</h1>
      <br />
      <div v-if="authenticated">
        <Dashboard />
      </div>
    </div>
  </div>
</template>

<script>
import Dashboard from "~/components/Dashboard";

export default {
  components: {
    Dashboard,
  },
};
</script>
