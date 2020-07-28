'use strict'

class TaskController {
	constructor(params) {
		const { socket, request } = params
		this.socket = socket
		this.request = request

		console.log('A new subscription on channel => ', socket.topic)
	}

	onSaved(data) {
		this.socket.broadcastToAll("saved", data);
	}

	onTasks(data) {
		this.socket.broadcastToAll("tasks", data);
	}

	onClose() {
		console.log('Closing subscription on channel => ', this.socket.topic)
	}
}

module.exports = TaskController
