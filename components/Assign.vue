<template>
  <div>
    <b-modal id="modal-1" title="Assign User">
      <h5>Current Assigned Users:</h5>
      <b-list-group>
        <b-list-group-item
          v-for="(user_assigned, index) in users_assigned"
          v-bind:key="index"
          href="#"
        >{{user_assigned}}</b-list-group-item>
      </b-list-group>
      <br />
      <b-form @submit.prevent="assignUser">
        <b-form-group label="User:">
          <b-form-select v-model="form.user_id" text-field="name" value-field="id" :options="users">
            <option disabled value>Assign this Task to a user</option>
          </b-form-select>
        </b-form-group>

        <b-button type="submit" variant="primary btn-lg">Assign</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Assign",
  middleware: ["auth"],
  props: {
    task: Number,
    users_assigned: Array,
    users: Array,
  },

  data() {
    return {
      form: {
        user_id: "",
      },
    };
  },

  methods: {
    assignUser() {
      // Create the relationship Task - User
      // console.log(this.user_id);
      this.$axios.$put(`/tasks/${this.task}/assign_task`, this.form);
      return this.$router.push("/tasks");
    },
  },
};
</script>