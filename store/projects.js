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
}