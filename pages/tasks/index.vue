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
          class="btn m-1 btn-outline-info"
          style="color: white !important;"
          :to="{name: 'tasks-id', params: {id: data.value}}"
        >👁️</nuxt-link>
        <nuxt-link
          class="btn m-1 btn-outline-success"
          style="color: white !important;"
          :to="{name: 'tasks-id-edit', params: {id: data.value}}"
        >✏️</nuxt-link>
        <b-button class="m-1" @click="completeTask(data.value)" variant="outline-primary">✓</b-button>
        <b-button class="m-1" @click="deleteTask(data.value)" variant="outline-danger">🗑</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  middleware: ["auth"],
  data() {
    return {
      perPage: 9,
      currentPage: 1,
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
          key: "project",
          label: "Project",
          sortable: true,
          formatter: (value) => {
            if (value) {
              return value.title;
            }
            return "";
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
  methods: {
    ...mapActions("tasks", ["deleteTaskAction", "completeTaskAction"]),

    format_date(value) {
      if (value) {
        return moment.utc(String(value)).format("dddd, MMMM Do YYYY, hh:mm a");
      }
    },
    async deleteTask(id) {
      this.deleteTaskAction(id);
    },
    async completeTask(id) {
      this.completeTaskAction(id);
    },
  },
  computed: {
    ...mapGetters("tasks", ["tasks"]),

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