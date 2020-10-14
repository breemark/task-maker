<template>
  <div class="container">
    <div class="row">
      <h1 class="title">Register Project</h1>
    </div>
    <br />
    <div>
      <b-form @submit.prevent="create">
        <b-form-group label="Title:">
          <b-form-input
            v-model="form.title"
            required
            placeholder="Enter project title"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Description:">
          <b-form-textarea
            v-model="form.content"
            placeholder="Enter project description"
            rows="4"
            max-rows="9"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary btn-lg">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  middleware: ["auth", "admin"],

  data() {
    return {
      form: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
    ...mapActions("projects", ["addProjectAction"]),

    async create() {
      let projectId = await this.addProjectAction(this.form);
      return this.$router.push(`/projects/${projectId}`);
    },
  },
};
</script>

<style>
</style>