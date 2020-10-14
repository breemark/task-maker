<template>
  <div>
    <b-modal id="modal-3" title="Delete" @ok="deleteProject">
      <div class="text-center">
        <p>Are you sure you want to delete this project?</p>
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
  name: "DeleteProjectModal",
  middleware: ["auth"],
  props: {
    projectId: Number,
  },
  methods: {
    ...mapActions("projects", ["deleteProjectAction"]),

    async deleteProject() {
      await this.deleteProjectAction(this.projectId);
      if ($nuxt.$route.name != "projects") {
        return this.$router.push(`/projects/`);
      }
    },
  },
};
</script>

