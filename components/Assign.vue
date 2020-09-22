<template>
  <div>
    <b-modal id="modal-1" title="Assign User">
      <h5>Current Assigned Users:</h5>
      <b-list-group v-if="task">
        <b-list-group-item
          v-for="(user_assigned, index) in task.users_assigned"
          v-bind:key="index"
          href="#"
        >
          {{user_assigned.name}}
          <button
            class="btn btn-danger float-right"
            @click="removeUser(user_assigned.id)"
          >Remove</button>
        </b-list-group-item>
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Assign",
  middleware: ["auth"],
  props: {
    task_id: Number,
  },

  data() {
    return {
      form: {
        user_id: "",
      },
    };
  },

  methods: {
    ...mapActions("tasks", [
      "setTasksAction",
      "assignUserAction",
      "removeUserAction",
    ]),

    async assignUser() {
      this.assignUserAction({ user_id: this.form, task: this.task_id });
    },
    async removeUser(user) {
      this.removeUserAction({ user_id: user, task: this.task_id });
    },
  },
  async mounted() {
    await this.setTasksAction();
  },
  computed: {
    ...mapGetters("tasks", ["getTaskById"]),
    ...mapGetters("users", ["users"]),

    task() {
      return this.getTaskById(this.task_id);
    },
  },
};
</script>