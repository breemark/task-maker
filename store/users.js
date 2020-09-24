export const state = () => ({
    users: [],
})

export const getters = {
    users: (state) => {
        return state.users;
    },
}

export const mutations = {
    setUsers(state, users) {
        state.users = users;
    },
}

export const actions = {
    async setUsersAction(context) {
        context.commit("setUsers", (await this.$axios.$get("/users")).data)
    },
    async deleteUserAction(context, user) {
        await this.$axios.$delete(`/users/${user}`);
        context.commit("setUsers", (await this.$axios.$get("/users")).data);
    },
}