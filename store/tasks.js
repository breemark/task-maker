export const state = () => ({
    tasks: []
})

export const getters = {
    tasks(state) {
        return state.tasks;
    }
}

export const mutations = {
    setTasks(state, tasks) {
        state.tasks = tasks;
    },
}

export const actions = {
    async setTasksAction(context) {
        context.commit("setTasks", (await this.$axios.$get("/tasks")).data)
    },
    async addTaskAction(context, task) {
        await this.$axios.$post("/tasks", task);
        context.commit("setTasks", (await this.$axios.$get("/tasks")).data);
    },
    async deleteTaskAction(context, task) {
        await this.$axios.$delete(`/tasks/${task}`);
        context.commit("setTasks", (await this.$axios.$get("/tasks")).data);
    }
}