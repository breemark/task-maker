<template>
  <div>
    <b-modal id="modal-2" title="Delete" @ok="deleteUser">
      <div class="text-center">
        <p>Are you sure you want to delete this user?</p>
      </div>
      <template v-slot:modal-footer="{ ok }">
        <b-button variant="danger" @click="ok()"> Delete </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DeleteUserModal",
  middleware: ["auth"],
  props: {
    userId: Number,
  },
  methods: {
    ...mapActions("users", ["deleteUserAction"]),

    async deleteUser() {
      await this.deleteUserAction(this.userId);
      if ($nuxt.$route.name != "users") {
        return this.$router.push(`/users/`);
      }
    },
  },
};
</script>

