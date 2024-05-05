import { createRouter, createWebHistory } from "vue-router"

import HomeView from "@/views/HomeView.vue"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			redirect: "/task",
		},
		{
			path: "/task",
			name: "task	",
			component: HomeView,
			// component: backup,
		},
		{
			path: "/task/:id",
			name: "details",
			component: HomeView,
		},
		{
			path: "/task/add",
			name: "add",
			component: HomeView
		},
		{
			path: "/task/:id/edit",
			name: "edit",
			component: HomeView
		}
	],
})

export default router
