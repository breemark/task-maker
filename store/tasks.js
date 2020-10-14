
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
    getTasksByProject: (state) => (project_id) => {

        let tasksProject = [];
        state.tasks.forEach(element => {
            if (element.project && element.project.id == project_id) {
                tasksProject.push(element);
            }
        });
        return tasksProject;
        // return state.tasks.filter(task => task.project.id == project_id)
    },
    getTasksByUser: (state) => (user_id) => {

        let tasksUser = [];
        state.tasks.forEach(element => {
            if (element.users_assigned) {
                element.users_assigned.forEach(subElement => {

                    if (subElement.id == user_id) {
                        tasksUser.push(element);

                    }

                });
            }
        });
        return tasksUser;
    },
    getCompletedTasks: (state) => {
        return state.tasks.filter(task => task.finished == true);
    }
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
        let res = await this.$axios.$post("/tasks", task);
        let taskId = res.data.id;
        context.commit("setTasks", (await this.$axios.$get("/tasks")).data);
        return taskId;
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