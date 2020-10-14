export const state = () => ({
    projects: [],
})

export const getters = {
    projects: (state) => {
        return state.projects;
    },
    getProjectById: (state) => (id) => {
        return state.projects.find(project => project.id == id)
    },
}

export const mutations = {
    setProjects(state, projects) {
        state.projects = projects;
    },
}

export const actions = {
    async setProjectsAction(context) {
        context.commit("setProjects", (await this.$axios.$get("/projects")).data)
    },
    // CRUD
    async addProjectAction(context, project) {
        let res = await this.$axios.$post("/projects", project);
        let projectId = res.data.id;
        context.commit("setProjects", (await this.$axios.$get("/projects")).data);
        return projectId;
    },
    async editProjectAction(context, project) {
        await this.$axios.patch(`/projects/${project.id}`, project);
        context.commit("setProjects", (await this.$axios.$get("/projects")).data);
    },
    async deleteProjectAction(context, project) {
        await this.$axios.$delete(`/projects/${project}`);
        context.commit("setProjects", (await this.$axios.$get("/projects")).data);
        context.commit("tasks/setTasks", (await this.$axios.$get("/tasks")).data, { root: true });

    },
}