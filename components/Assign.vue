<template>
  <div>
    <b-modal id="modal-1" title="Assign User">
      <h5>Current Assigned Users:</h5>
      <b-list-group>
        <b-list-group-item
          v-for="(user_assigned, index) in users_assigned"
          v-bind:key="index"
          href="#"
        >
          {{getUserName(user_assigned)}}
          <button
            class="btn btn-danger float-right"
            @click="removeUser(user_assigned)"
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
    getUserName(value) {
      var result = this.users.filter((obj) => {
        return obj.id == value;
      });

      if (!result[0]) {
        return "";
      }
      return result[0].name;
    },
    assignUser() {
      this.$axios.$put(`/tasks/${this.task}/assign_user`, this.form);
      return this.$router.push("/tasks");
    },
    removeUser(user_id) {
      this.$axios.$delete(`/tasks/${this.task}/remove_user/${user_id}`);
      return this.$router.push("/tasks");
    },
  },
};
</script>