<template>
  <div class="container">
    <div class="row">
      <h1 class="title">Create new Task</h1>
    </div>
    <br />
    <div>
      <b-form @submit.prevent="create">
        <b-form-group label="Title:">
          <b-form-input v-model="form.title" required placeholder="Enter task title"></b-form-input>
        </b-form-group>
        <b-form-group label="Description:">
          <b-form-textarea
            v-model="form.content"
            placeholder="Enter task description"
            rows="4"
            max-rows="9"
          ></b-form-textarea>
        </b-form-group>

        <!-- <b-form-group>
          <b-form-checkbox-group v-model="form.finished">
            <b-form-checkbox value="true">Task completed</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>-->

        <b-form-group label="Deadline:">
          <input class="form-control" type="datetime-local" v-model="form.deadline" />
        </b-form-group>

        <!-- <b-form-group label="Project:">
          <b-form-select v-model="form.project_id" :options="projects"></b-form-select>
        </b-form-group>-->

        <b-button type="submit" variant="primary btn-lg">Submit</b-button>
        <!-- <b-button type="reset" variant="danger btn-lg">Reset</b-button> -->
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      form: {
        title: "",
        content: "",
        // finished: [],
        deadline: "",
        // project_id: null,
      },
      projects: [{ text: "Select One", value: null }, "1", "2"],
    };
  },
  methods: {
    async create() {
      await this.$axios.$post("/tasks", this.form);
      return this.$router.push("/tasks");
    },
  },
};
</script>

<style>
</style>