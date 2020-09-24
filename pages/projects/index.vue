<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="title">🗄️ Projects</h1>
      </div>
      <div class="col">
        <nuxt-link
          class="btn btn-lg btn-outline-success float-right"
          to="/projects/create"
        >Register Project</nuxt-link>
      </div>
    </div>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="projects-table"
    ></b-pagination>

    <div class="row">
      <div class="col">
        <p class="mt-3">Current Page: {{ currentPage }}</p>
      </div>
      <div class="col">
        <p class="mt-3 float-right">Total Projects: {{ projects.length }}</p>
      </div>
    </div>

    <b-table
      id="projects-table"
      striped
      hover
      :items="projects"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      responsive
    >
      <template v-slot:cell(deadline)="data">{{ format_date(data.value) }}</template>

      <template v-slot:cell(id)="data">
        <nuxt-link
          class="btn btn-block m-1 btn-outline-info"
          style="color: white !important;"
          :to="{name: 'projects-id', params: {id: data.value}}"
        >👁️</nuxt-link>
        <nuxt-link
          class="btn btn-block m-1 btn-outline-success"
          style="color: white !important;"
          :to="{name: 'projects-id-edit', params: {id: data.value}}"
        >✏️</nuxt-link>
        <b-button block class="m-1" @click="deleteTask(data.value)" variant="outline-danger">🗑</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  middleware: ["auth"],
  data() {
    return {
      perPage: 9,
      currentPage: 1,
      fields: [
        {
          key: "title",
          sortable: true,
        },
        {
          key: "content",
        },
        {
          key: "id",
          label: "Operations",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("projects", ["projects"]),

    rows() {
      return this.projects.length;
    },
  },
};
</script>
