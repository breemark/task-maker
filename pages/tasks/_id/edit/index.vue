<template>
  <div class="container">
    <div class="row">
      <h2>Edit Task: {{task.title}}</h2>
    </div>
    <div>
      <form @submit.prevent="update">
        <div class="form-group mt-5">
          <label>Task Title</label>

          <input type="text" class="form-control" v-model="task.title" />
          <small v-if="errors.title" class="form-text text-danger">{{errors.title[0]}}</small>
        </div>

        <div class="form-group">
          <label>Task Description</label>

          <textarea class="form-control" rows="3" v-model="task.content"></textarea>
          <small v-if="errors.content" class="form-text text-danger">{{errors.content[0]}}</small>
        </div>

        <b-form-group label="Deadline:">
          <input class="form-control" type="datetime-local" v-model="task.deadline" />
        </b-form-group>

        <b-form-group label="Project:">
          <b-form-select
            v-model="task.project_id"
            text-field="title"
            value-field="id"
            :options="projects"
          >
            <option disabled value>Select the Project this Task belongs to</option>
          </b-form-select>
        </b-form-group>

        <div class="form-check">
          <input type="checkbox" class="form-check-input" v-model="task.finished" />
          <label class="form-check-label">Task Finished</label>
          <small v-if="errors.finished" class="form-text text-danger">{{errors.finished[0]}}</small>
        </div>

        <hr />

        <button class="btn btn-outline-success">Update</button>
      </form>
      <p class="mt-5 btn btn-outline-warning">
        <nuxt-link to="/tasks">Back to Tasks</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import moment from "moment";

export default {
  data() {
    return {
      task: {
        title: "",
        content: "",
        finished: "",
        deadline: "",
        project_id: "",
      },
      projects: [],
    };
  },
  async asyncData({ $axios, params }) {
    let { data: task } = await $axios.$get(`/tasks/${params.id}`);

    let { data: projects } = await $axios.$get("/projects");

    return { task, projects };
  },
  methods: {
    ...mapActions("tasks", ["editTaskAction"]),

    async update() {
      //
      await this.editTaskAction(this.task);

      // await this.$axios.patch(`/tasks/${this.$route.params.id}`, this.task);
      // Redirect
      this.$router.push("/tasks");
    },
  },
  created() {
    if (this.task.deadline) {
      this.task.deadline = moment
        .utc(String(this.task.deadline))
        .format("YYYY-MM-DDTHH:mm");
    }
  },
};
</script>