import Vue from "vue";
import Vuex from "vuex";

import menu from "./module/menu";
import users from "./module/users";
import state from "./module/state";

Vue.use(Vuex)

export const store = new Vuex.Store({
	module:[
		menu,
		users,
		state
	]
})