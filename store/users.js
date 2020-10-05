export const state = () => ({
    users: [],
})

export const getters = {
    users: (state) => {
        return state.users;
    },
    getUserById: (state) => (id) => {
        return state.users.find(user => user.id == id)
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
    async addUserAction(context, user) {
        await this.$axios.$post("/users", user);
        context.commit("setUsers", (await this.$axios.$get("/users")).data);
    },
    async editUserAction(context, user) {
        await this.$axios.patch(`/users/${user.id}`, user);
        context.commit("setUsers", (await this.$axios.$get("/users")).data);
    },
}