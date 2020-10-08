<template>
  <div class="container" v-if="projectClone && project">
    <div class="row">
      <h2>Edit Project: {{ project.title }}</h2>
    </div>
    <div>
      <form @submit.prevent="update">
        <div class="form-group mt-5">
          <label>Project Title</label>

          <input
            type="text"
            class="form-control"
            v-model="projectClone.title"
          />
          <small v-if="errors.title" class="form-text text-danger">{{
            errors.title[0]
          }}</small>
        </div>

        <div class="form-group">
          <label>Project Description</label>

          <textarea
            class="form-control"
            rows="3"
            v-model="projectClone.content"
          ></textarea>
          <small v-if="errors.content" class="form-text text-danger">{{
            errors.content[0]
          }}</small>
        </div>

        <hr />

        <button class="btn btn-outline-success">Update</button>
      </form>
      <p class="mt-5 btn btn-outline-warning">
        <nuxt-link to="/projects">Back to Projects</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  middleware: ["auth", "admin"],

  data() {
    return {
      projectClone: this.project
        ? {
            ...this.project,
          }
        : {
            title: "",
            content: "",
          },
    };
  },
  methods: {
    ...mapActions("projects", ["editProjectAction"]),

    async update() {
      await this.editProjectAction(this.projectClone);

      this.$router.push(`/projects/${this.project.id}`);
    },
  },
  computed: {
    ...mapGetters("projects", ["getProjectById"]),

    project() {
      return this.getProjectById(this.$route.params.id);
    },
  },
  watch: {
    project: function () {
      this.projectClone = { ...this.project };
    },
  },
  created() {
    this.projectClone = this.project
      ? {
          ...this.project,
        }
      : {
          title: "",
          content: "",
        };
  },
  mounted() {},
};
</script>