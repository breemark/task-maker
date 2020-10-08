<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="title">👥 Users</h1>
      </div>
      <div class="col">
        <nuxt-link
          class="btn btn-lg btn-outline-success float-right"
          to="/users/create"
          >Register User</nuxt-link
        >
      </div>
    </div>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="users-table"
    ></b-pagination>

    <div class="row">
      <div class="col">
        <p class="mt-3">Current Page: {{ currentPage }}</p>
      </div>
      <div class="col">
        <p class="mt-3 float-right">Total Users: {{ users.length }}</p>
      </div>
    </div>

    <b-table
      id="users-table"
      striped
      hover
      :items="users"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      responsive
    >
      <template v-slot:cell(created_at)="data">{{
        format_date(data.value)
      }}</template>

      <template v-slot:cell(id)="data">
        <nuxt-link
          class="btn btn-block m-1 btn-outline-info"
          style="color: white !important"
          :to="{ name: 'users-id', params: { id: data.value } }"
          >👁️</nuxt-link
        >
        <nuxt-link
          class="btn btn-block m-1 btn-outline-success"
          style="color: white !important"
          :to="{ name: 'users-id-edit', params: { id: data.value } }"
          >✏️</nuxt-link
        >
        <b-button
          v-if="user.id != data.value"
          block
          class="m-1"
          @click="deleteUser(data.value)"
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

  middleware: ["auth", "admin"],

  data() {
    return {
      perPage: 5,
      currentPage: 1,
      fields: [
        {
          key: "name",
          sortable: true,
        },
        {
          key: "email",
          sortable: true,
        },
        {
          key: "is_admin",
          label: "Role",
          sortable: true,
          formatter: (value) => {
            if (value == true || value == 1) {
              return "Administrator 🔑";
            }
            return "User 👤";
          },
        },
        {
          key: "created_at",
          label: "Registered Date",
          sortable: true,
        },
        {
          key: "id",
          label: "Operations",
        },
      ],
    };
  },
  methods: {
    ...mapActions("users", ["deleteUserAction"]),
    format_date(value) {
      if (value) {
        return moment.utc(String(value)).format("dddd, MMMM Do YYYY, hh:mm a");
      }
    },
    async deleteUser(id) {
      this.deleteUserAction(id);
    },
  },
  computed: {
    ...mapGetters("users", ["users"]),

    rows() {
      return this.users.length;
    },
  },
};
</script>

<style>
</style>