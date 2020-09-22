<template>
  <div class="container" v-if="task">
    <div class="row">
      <div class="col">
        <h2 class="display-3">{{task.title}}</h2>
        <hr />
      </div>
    </div>
    <div class="row" v-if="task.content">
      <div class="col-md-2">
        <strong>Task description:</strong>
      </div>
      <div class="col-md">
        <p>{{task.content}}</p>
      </div>
    </div>
    <div class="row" v-if="task.deadline">
      <div class="col-md-2">
        <p>
          <strong>Finish before:</strong>
        </p>
      </div>
      <div class="col-md">
        <p>{{format_date(task.deadline)}}</p>
      </div>
    </div>
    <div class="row" v-if="task.project">
      <div class="col-md-2">
        <p>
          <strong>Project:</strong>
        </p>
      </div>
      <div class="col-md">
        <p>{{task.project.title }}</p>
      </div>
    </div>

    <div class="row" v-if="task.users_assigned[0]">
      <div class="col-md-2">
        <p>
          <strong>Users assigned:</strong>
        </p>
      </div>
      <div class="col-md">
        <p>
          <b-badge
            class="mr-1"
            v-for="(user_assigned, index) in task.users_assigned"
            v-bind:key="index"
            variant="primary"
          >{{ user_assigned.name }}</b-badge>
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-2">
        <strong>Status:</strong>
      </div>
      <div class="col-md-2">
        <p>{{task_finished ? 'Complete ✔️' : 'Incomplete'}}</p>
      </div>
    </div>

    <Assign v-bind:task_id="task.id"></Assign>

    <hr />
    <div v-if="authenticated">
      <div class="row justify-content-center" v-if="user.is_admin == true">
        <div class="col-md-2">
          <b-button
            block
            @click="completeTask(task.id)"
            variant="outline-success"
          >{{!task_finished ? 'Set Complete' : 'Set Incomplete'}}</b-button>
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
        <div class="col-md-2">
          <nuxt-link to="/tasks">
            <b-button block variant="outline-dark">Back to Tasks</b-button>
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
    return {
      projects: "",
      users: "",
      task_finished: "",
    };
  },
  components: {
    Assign,
  },
  async asyncData({ $axios, params, store }) {
    let { data: projects } = await $axios.$get("/projects");
    let { data: users } = await $axios.$get("/users");

    return {
      projects,
      users,
    };
  },
  methods: {
    ...mapActions("tasks", [
      "setTasksAction",
      "deleteTaskAction",
      "completeTaskAction",
    ]),

    format_date(value) {
      if (value) {
        return moment.utc(String(value)).format("dddd, MMMM Do YYYY, hh:mm a");
      }
    },

    async deleteTask(id) {
      this.deleteTaskAction(id);
      this.$router.push(`/tasks/`);
    },
    async completeTask(id) {
      this.completeTaskAction(id);

      this.task_finished = !this.task_finished;
    },
  },
  computed: {
    ...mapGetters("tasks", ["getTaskById"]),

    task() {
      return this.getTaskById(this.$route.params.id);
    },
  },
  async created() {
    if (this.task) {
      this.task_finished = this.task.finished;
    }
  },

  async fetch() {},
  async beforeMount() {},
  async mounted() {},
};
</script>

<style>
a {
  text-decoration: none !important;
}
</style>