<template>
  <div>
    <b-modal id="modal-1" title="Assign User">
      <p class="my-4">Hello from modal!</p>
      <b-form @submit.prevent="create">
        <b-form-group label="User:">
          <b-form-select v-model="user_id" text-field="title" value-field="id" :options="users">
            <option disabled value>Assign this Task to a user</option>
          </b-form-select>
        </b-form-group>

        <b-button type="submit" variant="primary btn-lg">Submit</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Assign",
  data() {
    return {
      users: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: { C: "3PO" }, text: "This is an option with object value" },
        { value: "d", text: "This one is disabled", disabled: true },
      ],
      user_id: "",
    };
  },
};
</script>