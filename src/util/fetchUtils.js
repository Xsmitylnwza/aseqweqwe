async function getTaskList(url) {
	try {
		const data = await fetch(url)
		const items = await data.json()
		return items
	} catch (error) {
		console.log(`error: ${error}`)
	}
}
async function getTaskById(url, id) {
	try {
		const data = await fetch(`${url}/${id}`)
		const item = await data.json()
		if (data.status === 200) {
			return item
		} else {
			return data.status
		}
	} catch (error) { }
}

async function addTask(url, task) {
	console.log(task)
	try {
		const response = await fetch(`${url}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				taskTitle: task.title?.trim(),
				taskDescription: task.description?.trim(),
				taskAssignees: task.assignees?.trim(),
				taskStatus: task.status
			}),
		})
		if (response.ok) {
			const responseData = await response.json();
			return responseData;
		} else {
			throw new Error('Failed to add task');
		}
	} catch (e) {
		console.log(`error: ${e}`)
	}
}

async function editTask(url, task) {
	try {
		const respone = await fetch(`${url}/${task.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: task.id,
				taskTitle: task.title,
				taskDescription: task.description,
				taskAssignees: task.assignees,
				taskStatus: task.status
			}),
		})
		if (respone.ok) {
			const responseData = await respone.json();
			return responseData;
		}
	} catch (e) {
		console.log(`error: ${e}`)
	}
}
async function deleteTaskById(url, id) {
	try {
		const response = await fetch(`${url}/${id}`, {
			method: 'DELETE',
		})
		return response
	} catch (e) {
		console.log(`error: ${e}`)
	}
}
export { getTaskList, getTaskById, addTask, editTask, deleteTaskById }
