import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import ListTodo from "@/components/ListTodo.vue"
import Test from "@/components/test.vue"
import backup from "@/components/backup.vue"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/task",
			name: "task	",
			component: ListTodo,
			// component: backup,
		},
		{
			path: "/task/:id",
			name: "id",
			component: ListTodo,
		},
	],
})

export default router
