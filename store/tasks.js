
export const state = () => ({
    tasks: [],
})

export const getters = {
    tasks: (state) => {
        return state.tasks;
    },
    getTaskById: (state) => (id) => {
        return state.tasks.find(task => task.id == id)
    },
    getTasksByProject: (state) => (project) => {
        return state.tasks.filter(task => task.project.id == project)
    },

}

export const mutations = {
    setTasks(state, tasks) {
        state.tasks = tasks;
    },
}

export const actions = {
    // Set actions
    async setTasksAction(context) {
        context.commit("setTasks", (await this.$axios.$get("/tasks")).data)
    },

    // CRUD operations
    async addTaskAction(context, task) {
        await this.$axios.$post("/tasks", task);
        context.commit("setTasks", (await this.$axios.$get("/tasks")).data);
    },
    async deleteTaskAction(context, task) {
        await this.$axios.$delete(`/tasks/${task}`);
        context.commit("setTasks", (await this.$axios.$get("/tasks")).data);
    },
    async editTaskAction(context, task) {
        await this.$axios.patch(`/tasks/${task.id}`, task);
        context.commit("setTasks", (await this.$axios.$get("/tasks")).data);
    },
    async completeTaskAction(context, id) {
        await this.$axios.$put(`/tasks/${id}/complete`);
        context.commit("setTasks", (await this.$axios.$get("/tasks")).data);
    },

    // Users assigned to Tasks
    async assignUserAction(context, payload) {
        await this.$axios.$put(`/tasks/${payload.task}/assign_user`, payload.user_id);
        context.commit("setTasks", (await this.$axios.$get("/tasks")).data);
    },
    async removeUserAction(context, payload) {
        await this.$axios.$delete(`/tasks/${payload.task}/remove_user/${payload.user_id}`);
        context.commit("setTasks", (await this.$axios.$get("/tasks")).data);
    },
}