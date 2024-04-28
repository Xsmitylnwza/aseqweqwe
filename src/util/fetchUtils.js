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
	} catch (error) {}
}
export { getTaskList, getTaskById }
