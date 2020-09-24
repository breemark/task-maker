<template>
  <div class="container" v-if="project">
    <div class="row">
      <div class="col">
        <h2 class="display-3">{{project.title}}</h2>
        <hr />
      </div>
    </div>
    <div class="row" v-if="project.content">
      <div class="col-md-2">
        <strong>Project description:</strong>
      </div>
      <div class="col-md">
        <p>{{project.content}}</p>
      </div>
    </div>
    <div class="row">
      <p>This project has {{tasks.length==0? 'no' : tasks.length }} tasks assigned</p>
    </div>

    <hr />

    <div v-if="authenticated">
      <div class="row justify-content-center" v-if="user.is_admin == true">
        <div class="col-md-2">
          <nuxt-link :to="{name: `projects-id-edit`, params: {id: project.id}}">
            <b-button block variant="outline-info">Edit Project</b-button>
          </nuxt-link>
        </div>
        <div class="col-md-2">
          <b-button @click="deleteTask(project.id)" block variant="outline-danger">Delete Project</b-button>
        </div>
        <div class="col-md-2">
          <nuxt-link to="/tasks">
            <b-button block variant="outline-dark">Back to Projects</b-button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Assign from "@/components/Assign";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },

  methods: {
    async deleteTask(id) {
      this.deleteTaskAction(id);
      this.$router.push(`/tasks/`);
    },
  },
  computed: {
    ...mapGetters("projects", ["getProjectById"]),
    ...mapGetters("tasks", ["getTasksByProject"]),

    project() {
      return this.getProjectById(this.$route.params.id);
    },
    tasks() {
      return this.getTasksByProject(this.$route.params.id);
    },
  },
  async created() {},
  async fetch() {},
  async beforeMount() {},
  async mounted() {
    console.log(this.tasks);
  },
};
</script>

<style>
a {
  text-decoration: none !important;
}
</style>