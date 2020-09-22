<template>
  <div>
    <Navbar />
    <br />
    <Nuxt />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import Navbar from "~/components/Navbar";

export default {
  components: {
    Navbar,
  },
  methods: {
    ...mapActions(["tasks/setTasksAction"]),
    ...mapActions(["users/setUsersAction"]),
  },
  async created() {
    this["tasks/setTasksAction"]();
    this["users/setUsersAction"]();
  },
  // mounted() {
  //   this.init();
  // },
};
</script>