<template>
  <div class="container" v-if="project">
    <div class="row">
      <div class="col">
        <h2 class="display-4">{{ project.title }}</h2>
        <hr />
      </div>
    </div>
    <div class="row" v-if="project.content">
      <div class="col-md-2">
        <strong>Project description:</strong>
      </div>
      <div class="col-md">
        <p>{{ project.content }}</p>
      </div>
    </div>
    <div class="row" v-if="user.is_admin == true">
      <div class="col-md">
        <p>
          This project has
          <strong> {{ tasks.length == 0 ? "no" : tasks.length }} </strong>
          {{ tasks.length == 1 ? "task" : "tasks" }}
          assigned
        </p>
      </div>
    </div>

    <DeleteProjectModal v-bind:projectId="project.id" />

    <div v-if="authenticated">
      <div class="row justify-content-center" v-if="user.is_admin == true">
        <div class="col-md-2">
          <nuxt-link
            :to="{ name: `projects-id-edit`, params: { id: project.id } }"
          >
            <b-button block variant="outline-info">Edit Project</b-button>
          </nuxt-link>
        </div>
        <div class="col-md-2">
          <b-button v-b-modal.modal-3 block variant="outline-danger"
            >Delete Project</b-button
          >
        </div>
        <div class="col-md-2">
          <nuxt-link to="/projects">
            <b-button block variant="outline-dark">Back to Projects</b-button>
          </nuxt-link>
        </div>
      </div>
    </div>
    <hr />
    <div v-if="user.is_admin == true">
      <div v-if="tasks.length != 0">

        <b-pagination
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
            <p class="mt-3 float-right">Total Tasks: {{ tasks.length }}</p>
          </div>
        </div>

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
              class="btn btn-block m-1 btn-outline-success"
              style="color: white !important"
              :to="{
                name: 'tasks-id-edit',
                params: { id: data.value },
              }"
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
              @click="deleteTask(data.value)"
              variant="outline-danger"
              >🗑</b-button
            >
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteProjectModal from "@/components/DeleteProjectModal";

import Assign from "@/components/Assign";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      perPage: 5,
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
    // ...mapActions("projects", ["deleteProjectAction"]),

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
    ...mapGetters("projects", ["getProjectById"]),
    ...mapGetters("tasks", ["getTasksByProject"]),

    project() {
      return this.getProjectById(this.$route.params.id);
    },
    tasks() {
      return this.getTasksByProject(this.$route.params.id);
    },
    rows() {
      return this.getTasksByProject(this.$route.params.id).length;
    },
  },
};
</script>

<style>
a {
  text-decoration: none !important;
}
</style>