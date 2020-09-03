<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>{{task.title}}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>{{task.content}}</p>
      </div>
    </div>
    <pre>
      {{task}}
    </pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: "",
    };
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.$get(`/tasks/${params.id}`);
    return {
      task: data,
    };
  },
};
</script>
