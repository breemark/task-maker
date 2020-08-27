<template>
  <div>
    <Navbar />
    <br />
    <Nuxt />
  </div>
</template>

<script>
import Navbar from "~/components/Navbar";

export default {
  components: {
    Navbar,
  },
};
</script>