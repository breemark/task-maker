<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="title">📝 Tasks</h1>
      </div>
      <div class="col">
        <nuxt-link class="btn btn-lg btn-outline-success float-right" to="/tasks/create">Create Task</nuxt-link>
      </div>
    </div>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="tasks-table"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>
    <b-table
      id="tasks-table"
      striped
      hover
      :items="tasks"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      responsive
    >
      <template v-slot:cell(deadline)="data">{{ format_date(data.value) }}</template>

      <template v-slot:cell(id)="data">
        <nuxt-link
          class="btn btn-primary btn-block"
          style="color: white !important;"
          :to="{name: 'tasks-id', params: {id: data.value}}"
        >View</nuxt-link>
        <b-button block @click="deleteTask(data.value)" variant="danger">Delete</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import moment from "moment";

export default {
  middleware: ["auth"],
  data() {
    return {
      perPage: 9,
      currentPage: 1,
      tasks: [],
      projects: [],
      projects_name: [],
      fields: [
        {
          key: "title",
          sortable: true,
        },
        {
          key: "deadline",
          sortable: true,
        },
        {
          key: "project_id",
          label: "Project",
          sortable: true,
          formatter: (value) => {
            var result = this.projects.filter((obj) => {
              return obj.id == value;
            });

            if (!result[0]) {
              return "";
            }
            return result[0].title;
          },
        },
        {
          key: "finished",
          sortable: true,
          formatter: (value) => {
            return value ? "Done ✅" : "";
          },
        },
        {
          key: "id",
          label: "Options",
        },
      ],
    };
  },
  async asyncData({ $axios }) {
    let { data: tasks } = await $axios.$get("/tasks");
    let { data: projects } = await $axios.$get("/projects");

    return {
      tasks,
      projects,
    };
  },
  methods: {
    format_date(value) {
      if (value) {
        return moment.utc(String(value)).format("dddd, MMMM Do YYYY, hh:mm a");
      }
    },
    async deleteTask(id) {
      this.$axios.$delete(`/tasks/${id}`);
      this.$router.push("/");
    },
  },
  computed: {
    rows() {
      return this.tasks.length;
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>