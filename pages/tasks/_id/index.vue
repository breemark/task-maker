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
        <strong>Finish before:</strong>
      </div>
      <div class="col-md">
        <p>{{format_date(task.deadline)}}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2">
        <strong>Project:</strong>
      </div>
      <div class="col-md">
        <p>{{task.project_id}}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-2">
        <strong>Users assigned:</strong>
      </div>
      <div class="col-md">
        <p></p>
      </div>
    </div>

    <div class="row">
      <div class="col-2">
        <strong>Status:</strong>
      </div>
      <div class="col-md-2">
        <p>{{task.finished ? 'Complete ✔️' : 'Incomplete'}}</p>
      </div>
    </div>
    <hr />
    <div v-if="authenticated">
      <div class="row justify-content-center" v-if="user.is_admin == true">
        <div class="col-md-2">
          <b-button block variant="outline-primary">Complete</b-button>
        </div>
        <div class="col-md-2">
          <b-button id="toggle-btn" @click="toggleModal" block variant="outline-info">Assign User</b-button>
        </div>
        <div class="col-md-2">
          <nuxt-link :to="{name: 'tasks-edit', params: {id: task.id}}">
            <b-button block variant="outline-success">Edit Task</b-button>
          </nuxt-link>
        </div>
        <div class="col-md-2">
          <b-button @click="deleteTask(task.id)" block variant="outline-danger">Delete Task</b-button>
        </div>
      </div>
    </div>
    <Assign></Assign>
  </div>
</template>

<script>
import Assign from "@/components/Assign";
import moment from "moment";

export default {
  data() {
    return {
      task: "",
    };
  },
  components: {
    Assign,
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.$get(`/tasks/${params.id}`);
    return {
      task: data,
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
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["modal-assign"].toggle("#toggle-btn");
    },
  },
};
</script>

<style>
a {
  text-decoration: none !important;
}
</style>