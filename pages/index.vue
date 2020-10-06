<template>
  <div class="container">
    <div>
      <h1 class="title">Task Maker</h1>
      <br>
      <Dashboard />
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
