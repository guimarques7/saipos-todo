'use strict'

const Ws = use('Ws')

const TaskHook = exports = module.exports = {}

TaskHook.updateTask = async (task) => {

	if (task.isTaskBeenConcluded()) {
		task.done = ++task.getOriginalValues().done
	}

}

TaskHook.saveTask = async (task) => {
	const topic = Ws.getChannel('tasks').topic('tasks')
    if (topic) {
      topic.broadcastToAll('tasks')
    }

}

