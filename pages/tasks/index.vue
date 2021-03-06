<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="title">📝 Tasks</h1>
      </div>
      <div class="col">
        <b-button
          v-if="user.is_admin"
          @click="toggleAssigned()"
          class="btn-lg float-right"
          variant="outline-primary"
          >{{ allTasks ? "My Tasks" : "All Tasks" }}</b-button
        >
      </div>
      <div class="col">
        <nuxt-link
          v-if="user.is_admin"
          class="btn btn-lg btn-outline-success float-right"
          to="/tasks/create"
          >Create Task</nuxt-link
        >
      </div>
    </div>

    <b-pagination class="mt-5"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="tasks-table"
    ></b-pagination>

    <div class="row">
      <div class="col">
        <p class="mt-3">Current Page: {{ currentPage }}</p>
      </div>
      <div class="col">
        <p class="mt-3 float-right">
          Total Tasks: {{ allTasks ? tasks.length : userTasks.length }}
        </p>
      </div>
    </div>

    <b-table
      id="tasks-table"
      striped
      hover
      :items="allTasks ? tasks : userTasks"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      responsive
    >
      <template v-slot:cell(deadline)="data">{{
        format_date(data.value)
      }}</template>

      <template v-slot:cell(id)="data">
        <nuxt-link
          class="btn btn-block m-1 btn-outline-info"
          style="color: white !important"
          :to="{ name: 'tasks-id', params: { id: data.value } }"
          >👁️</nuxt-link
        >
        <nuxt-link
          v-if="user.is_admin"
          class="btn btn-block m-1 btn-outline-success"
          style="color: white !important"
          :to="{ name: 'tasks-id-edit', params: { id: data.value } }"
          >✏️</nuxt-link
        >
        <b-button
          block
          class="m-1"
          @click="completeTask(data.value)"
          variant="outline-primary"
          >✓</b-button
        >
        <b-button
          block
          class="m-1"
          v-if="user.is_admin"
          @click="deleteTask(data.value)"
          variant="outline-danger"
          >🗑</b-button
        >
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
      allTasks: this.$auth.user.is_admin ? true : false,
      perPage: 9,
      currentPage: 1,
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
          label: "Operations",
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

    toggleAssigned() {
      this.allTasks = !this.allTasks;
    },
  },
  computed: {
    ...mapGetters("tasks", ["tasks", "getTasksByUser"]),

    userTasks() {
      return this.getTasksByUser(this.user.id);
    },

    rows() {
      return this.tasks.length;
    },
  },
  mounted() {},
};
</script>

<style>
a {
  text-decoration: none;
}
</style>