export default class taskMangement {
	taskList = []

	getAllTask() {
		return this.taskList
	}

	getTaskById(id) {
		return this.taskList.find((e) => e.id === id)
	}

	addTask(newTask) {
		this.taskList.push(newTask)
	}
	addTasks(newTasks) {
		newTasks.forEach((newTask) => {
			this.addTask(newTask)
		})
	}
	editTask(taskId, updateTask) {
		const index = this.taskList.findIndex((e) => e.id === taskId)
		this.taskList[index] = {
			...this.taskList[index],
			...updateTask,
		}
	}
	deleteTask(taskId) {
		this.taskList.splice(
			this.taskList.findIndex((task) => task.id === taskId),
			1
		)
	}
}
