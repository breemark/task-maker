<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h2 class="display-3">{{task.title}}</h2>
        <hr />
      </div>
    </div>
    <div class="row">
      <div class="col-md-2">
        <strong>Task description:</strong>
      </div>
      <div class="col-md">
        <p>{{task.content}}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2">
        <p>
          <strong>Finish before:</strong>
        </p>
      </div>
      <div class="col-md">
        <p>{{format_date(task.deadline)}}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2">
        <p>
          <strong>Project:</strong>
        </p>
      </div>
      <div class="col-md">
        <p>{{ getProjectName(task.project_id) }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-2">
        <p>
          <strong>Users assigned:</strong>
        </p>
      </div>
      <div class="col-md">
        <p>
          <b-badge
            class="mr-1"
            v-for="(user_name, index) in users_assigned_names "
            v-bind:key="index"
            variant="primary"
          >{{ user_name }}</b-badge>
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-2">
        <strong>Status:</strong>
      </div>
      <div class="col-md-2">
        <p>{{task_complete ? 'Complete ✔️' : 'Incomplete'}}</p>
      </div>
    </div>

    <Assign v-bind:task="task.id" v-bind:users="users" v-bind:users_assigned="task.users_id"></Assign>

    <hr />
    <div v-if="authenticated">
      <div class="row justify-content-center" v-if="user.is_admin == true">
        <div class="col-md-2">
          <b-button
            block
            @click="toggleComplete(task.id)"
            variant="outline-success"
          >{{!task_complete ? 'Set Complete' : 'Set Incomplete'}}</b-button>
        </div>
        <div class="col-md-2">
          <b-button block v-b-modal.modal-1 variant="outline-primary">Assign User</b-button>
        </div>
        <div class="col-md-2">
          <nuxt-link :to="{name: `tasks-id-edit`, params: {id: task.id}}">
            <b-button block variant="outline-info">Edit Task</b-button>
          </nuxt-link>
        </div>
        <div class="col-md-2">
          <b-button @click="deleteTask(task.id)" block variant="outline-danger">Delete Task</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Assign from "@/components/Assign";
import moment from "moment";

export default {
  data() {
    return {
      task: "",
      projects: "",
      users: "",
      users_assigned_names: [],
      task_complete: "",
    };
  },
  components: {
    Assign,
  },
  async asyncData({ $axios, params }) {
    let { data: task } = await $axios.$get(`/tasks/${params.id}`);
    let { data: projects } = await $axios.$get("/projects");
    let { data: users } = await $axios.$get("/users");

    return {
      task,
      projects,
      users,
    };
  },
  methods: {
    format_date(value) {
      if (value) {
        return moment.utc(String(value)).format("dddd, MMMM Do YYYY, hh:mm a");
      }
    },
    async toggleComplete(id) {
      this.$axios.$put(`/tasks/${id}/complete`);
      this.task_complete = !this.task_complete;
    },
    async deleteTask(id) {
      this.$axios.$delete(`/tasks/${id}`);
      this.$router.push("/");
    },
    getProjectName(value) {
      var result = this.projects.filter((obj) => {
        return obj.id == value;
      });

      if (!result[0]) {
        return "";
      }
      return result[0].title;
    },
  },
  computed: {},
  created() {
    this.task_complete = this.task.finished;

    this.task.users_id.forEach((user_id) => {
      var result = this.users.filter((obj) => {
        return obj.id == user_id;
      });

      if (!result[0]) {
        return "";
      }
      this.users_assigned_names.push(result[0].name);
    });
  },
};
</script>

<style>
a {
  text-decoration: none !important;
}
</style>